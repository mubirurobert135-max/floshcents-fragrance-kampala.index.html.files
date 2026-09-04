import { useState, useRef } from "react";
import {
  Product,
  Order,
  OrderStatus,
  PerfumeType,
  ProductCategory,
  ProductTag,
} from "../types/store";
import { formatUGX, WHATSAPP_NUMBER } from "../lib/store";
import {
  X,
  Plus,
  Package,
  ShoppingBag,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Check,
  AlertTriangle,
  Lock,
  Unlock,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Search,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import royalBloom from "@/assets/royal-bloom.jpg";
import midnightEssence from "@/assets/midnight-essence.jpg";
import natureSpirit from "@/assets/nature-spirit.jpg";
import heroPerfume from "@/assets/hero-perfume.jpg";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  onSaveProduct: (p: Partial<Product> & { name: string; price: number }) => Product;
  onDeleteProduct: (id: string) => void;
  onUpdateStock: (id: string, newStock: number) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const PRESET_IMAGES = [
  { label: "Royal Bloom (Amber Rose)", src: royalBloom },
  { label: "Midnight Essence (Noir Oud)", src: midnightEssence },
  { label: "Nature Spirit (Botanical)", src: natureSpirit },
  { label: "Executive (Gold Flacon)", src: heroPerfume },
];

export function AdminDashboard({
  isOpen,
  onClose,
  products,
  orders,
  onSaveProduct,
  onDeleteProduct,
  onUpdateStock,
  onUpdateOrderStatus,
}: AdminDashboardProps) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState<"inventory" | "orders" | "newProduct">("inventory");
  const [orderFilter, setOrderFilter] = useState<"All" | OrderStatus>("All");
  const [productSearch, setProductSearch] = useState("");

  // Product form state (for add & edit)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState<PerfumeType>("Spray Perfume");
  const [formCategory, setFormCategory] = useState<ProductCategory>("Spray Perfumes");
  const [formSize, setFormSize] = useState("100ml");
  const [formPrice, setFormPrice] = useState("50000");
  const [formStock, setFormStock] = useState("15");
  const [formDescription, setFormDescription] = useState("");
  const [formTopNotes, setFormTopNotes] = useState("");
  const [formMiddleNotes, setFormMiddleNotes] = useState("");
  const [formBaseNotes, setFormBaseNotes] = useState("");
  const [formTag, setFormTag] = useState<ProductTag>("New Arrival");
  const [formImage, setFormImage] = useState(royalBloom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "flosh2026" || passcode === "flosh" || passcode === "1234") {
      setIsAuthenticated(true);
      setAuthError(false);
      toast.success("Welcome, Flosh! Admin session started.");
    } else {
      setAuthError(true);
      toast.error("Incorrect passcode. Try 'flosh2026'");
    }
  };

  const handleOpenEdit = (p: Product) => {
    setEditingId(p.id);
    setFormName(p.name);
    setFormType(p.type);
    setFormCategory(p.category);
    setFormSize(p.size);
    setFormPrice(p.price.toString());
    setFormStock(p.stock.toString());
    setFormDescription(p.description);
    setFormTopNotes(p.notes.top);
    setFormMiddleNotes(p.notes.middle);
    setFormBaseNotes(p.notes.base);
    setFormTag(p.tag);
    setFormImage(p.image);
    setActiveTab("newProduct");
  };

  const resetForm = () => {
    setEditingId(null);
    setFormName("");
    setFormType("Spray Perfume");
    setFormCategory("Spray Perfumes");
    setFormSize("100ml");
    setFormPrice("50000");
    setFormStock("15");
    setFormDescription("");
    setFormTopNotes("Bergamot & Jasmine");
    setFormMiddleNotes("Damask Rose");
    setFormBaseNotes("Amber & Sandalwood");
    setFormTag("New Arrival");
    setFormImage(royalBloom);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      toast.error("Perfume name is required.");
      return;
    }

    const priceNum = Number(formPrice.replace(/[^\d]/g, ""));
    if (!priceNum || priceNum < 5000 || priceNum > 200000) {
      toast.error("Price must be between UGX 5,000 and UGX 200,000.");
      return;
    }

    const stockNum = Math.max(0, Number(formStock.replace(/[^\d]/g, "")) || 0);

    const saved = onSaveProduct({
      id: editingId || undefined,
      name: formName.trim(),
      type: formType,
      category: formCategory,
      size: formSize.trim() || (formType === "Oil Perfume" ? "6ml" : "100ml"),
      price: priceNum,
      stock: stockNum,
      description: formDescription.trim() || "Handcrafted luxury fragrance by Flosh Cents.",
      notes: {
        top: formTopNotes.trim() || "Fresh Notes",
        middle: formMiddleNotes.trim() || "Floral Blend",
        base: formBaseNotes.trim() || "Amber Base",
      },
      displayNotes: `${formTopNotes.trim() || "Fresh"} · ${formMiddleNotes.trim() || "Floral"} · ${formBaseNotes.trim() || "Amber"}`,
      tag: formTag,
      image: formImage,
      isAvailable: stockNum > 0,
    });

    toast.success(editingId ? `Updated ${saved.name}` : `Added ${saved.name} to shop!`, {
      description: `Stock: ${saved.stock} units · ${formatUGX(saved.price)}`,
    });

    resetForm();
    setActiveTab("inventory");
  };

  const filteredOrders =
    orderFilter === "All" ? orders : orders.filter((o) => o.status === orderFilter);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.type.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.tag.toLowerCase().includes(productSearch.toLowerCase()),
  );

  const totalRevenue = orders.reduce(
    (sum, o) => (o.status !== "Cancelled" ? sum + o.totalAmount : sum),
    0,
  );
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  const inputCls =
    "w-full rounded-xl border border-border bg-background/80 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl transition-all my-4 max-h-[94vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-border/80 px-6 py-4 bg-background/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary border border-primary/30">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold tracking-wide flex items-center gap-2">
                Flosh <span className="gold-text">Admin Portal</span>
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary tracking-widest uppercase">
                  Owner
                </span>
              </h2>
              <p className="text-xs text-muted-foreground">Stock Management & Customer Orders</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Lock size={12} /> Lock
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close dashboard"
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Auth Gate */}
        {!isAuthenticated ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 sm:p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 border border-primary/30 text-primary mb-4">
              <Lock size={28} />
            </div>
            <h3 className="font-display text-3xl font-bold">Owner Access Required</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Please enter the owner passcode to access Flosh Cents stock management and customer
              orders.
            </p>

            <form onSubmit={handleLogin} className="mt-6 w-full max-w-xs space-y-4">
              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  placeholder="Enter passcode (e.g. flosh2026)"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setAuthError(false);
                  }}
                  className={`w-full rounded-2xl border px-4 py-3 text-center text-sm font-medium tracking-widest text-foreground focus:outline-none ${
                    authError
                      ? "border-destructive bg-destructive/10"
                      : "border-border bg-background/80 focus:border-primary"
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-gold hover:scale-105 transition-transform"
              >
                <Unlock size={14} /> Unlock Dashboard
              </button>

              <p className="text-[11px] text-muted-foreground">
                Default Owner Passcode:{" "}
                <span className="font-mono text-primary font-bold">flosh2026</span>
              </p>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 p-6 border-b border-border/60 bg-background/30">
              <div className="rounded-2xl border border-border/80 bg-background/50 p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Total Perfumes
                </span>
                <span className="font-display text-2xl font-bold text-foreground mt-1 block">
                  {products.length}
                </span>
              </div>
              <div className="rounded-2xl border border-border/80 bg-background/50 p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Total Orders
                </span>
                <span className="font-display text-2xl font-bold text-primary mt-1 block">
                  {orders.length}
                </span>
              </div>
              <div className="rounded-2xl border border-border/80 bg-background/50 p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Out of Stock
                </span>
                <span
                  className={`font-display text-2xl font-bold mt-1 block ${outOfStockCount > 0 ? "text-destructive" : "text-emerald-400"}`}
                >
                  {outOfStockCount}
                </span>
              </div>
              <div className="rounded-2xl border border-border/80 bg-background/50 p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Store Volume
                </span>
                <span className="font-display text-2xl font-bold text-primary mt-1 block">
                  {formatUGX(totalRevenue)}
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center justify-between px-6 pt-4 border-b border-border/60">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    resetForm();
                    setActiveTab("inventory");
                  }}
                  className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold tracking-wider uppercase transition-colors ${
                    activeTab === "inventory"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Package size={15} />
                  Stock Inventory ({products.length})
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold tracking-wider uppercase transition-colors ${
                    activeTab === "orders"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ShoppingBag size={15} />
                  Orders ({orders.length})
                  {orders.filter((o) => o.status === "Pending").length > 0 && (
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </button>

                <button
                  onClick={() => {
                    if (activeTab !== "newProduct") resetForm();
                    setActiveTab("newProduct");
                  }}
                  className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold tracking-wider uppercase transition-colors ${
                    activeTab === "newProduct"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Plus size={15} />
                  {editingId ? "Edit Perfume" : "Add New Perfume"}
                </button>
              </div>

              {activeTab === "inventory" && (
                <button
                  onClick={() => {
                    resetForm();
                    setActiveTab("newProduct");
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-gold hover:scale-105 transition-transform"
                >
                  <Plus size={14} /> Add Perfume
                </button>
              )}
            </div>

            {/* TAB 1: INVENTORY MANAGEMENT */}
            {activeTab === "inventory" && (
              <div className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <Search size={15} className="absolute left-3.5 top-3 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search inventory..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className={`${inputCls} pl-9`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Tip: Adjust stock directly with the + / - buttons to reflect real inventory.
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-border/80">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-background/80 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/80">
                      <tr>
                        <th className="p-3.5">Perfume</th>
                        <th className="p-3.5">Type & Size</th>
                        <th className="p-3.5">Price</th>
                        <th className="p-3.5">Available Stock</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {filteredProducts.map((p) => {
                        const isZero = p.stock === 0;
                        return (
                          <tr key={p.id} className="hover:bg-background/40 transition-colors">
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="h-10 w-10 rounded-xl object-cover border border-border shrink-0"
                                />
                                <div>
                                  <span className="font-display text-sm font-semibold text-foreground block">
                                    {p.name}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground truncate max-w-[200px] block">
                                    {p.displayNotes}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5">
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                                  p.type === "Oil Perfume"
                                    ? "bg-amber-500/20 text-amber-300"
                                    : "bg-emerald-500/20 text-emerald-300"
                                }`}
                              >
                                {p.type}
                              </span>
                              <span className="text-muted-foreground block text-[11px] mt-0.5">
                                {p.size}
                              </span>
                            </td>
                            <td className="p-3.5 font-display text-sm font-bold text-primary">
                              {formatUGX(p.price)}
                            </td>
                            <td className="p-3.5">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => onUpdateStock(p.id, Math.max(0, p.stock - 1))}
                                  className="rounded-lg bg-background border border-border p-1 hover:bg-muted text-muted-foreground"
                                  title="Reduce stock"
                                >
                                  -
                                </button>
                                <span
                                  className={`w-8 text-center font-display text-sm font-bold ${
                                    isZero ? "text-destructive" : "text-foreground"
                                  }`}
                                >
                                  {p.stock}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateStock(p.id, p.stock + 1)}
                                  className="rounded-lg bg-background border border-border p-1 hover:bg-muted text-muted-foreground"
                                  title="Add stock"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="p-3.5">
                              {isZero ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-destructive/15 border border-destructive/30 px-2 py-0.5 text-[10px] font-bold text-destructive uppercase">
                                  Out of Stock
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 border border-primary/30 px-2 py-0.5 text-[10px] font-bold text-primary uppercase">
                                  Available
                                </span>
                              )}
                            </td>
                            <td className="p-3.5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleOpenEdit(p)}
                                  className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                                  title="Edit Perfume"
                                >
                                  <Edit2 size={13} />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Delete ${p.name} from store?`)) {
                                      onDeleteProduct(p.id);
                                      toast.info(`Deleted ${p.name}`);
                                    }
                                  }}
                                  className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors"
                                  title="Delete Perfume"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: ORDERS MANAGEMENT */}
            {activeTab === "orders" && (
              <div className="p-6 space-y-4">
                {/* Orders Filter */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {(
                      ["All", "Pending", "Confirmed", "Ready", "Completed", "Cancelled"] as const
                    ).map((status) => (
                      <button
                        key={status}
                        onClick={() => setOrderFilter(status)}
                        className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
                          orderFilter === status
                            ? "bg-primary text-primary-foreground"
                            : "border border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {filteredOrders.length} order(s) listed
                  </span>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
                    No orders found matching status filter.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-2xl border border-border/80 bg-background/50 p-5 transition-all hover:border-primary/40 space-y-4"
                      >
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-display text-lg font-bold text-primary">
                              #{order.id}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock size={12} />
                              {new Date(order.createdAt).toLocaleString("en-UG", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>

                          {/* Status Badge & Controller */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Status:</span>
                            <select
                              value={order.status}
                              onChange={(e) => {
                                onUpdateOrderStatus(order.id, e.target.value as OrderStatus);
                                toast.success(`Order #${order.id} updated to ${e.target.value}`);
                              }}
                              className={`rounded-xl border px-3 py-1 text-xs font-bold uppercase ${
                                order.status === "Confirmed"
                                  ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300"
                                  : order.status === "Pending"
                                    ? "border-amber-500/50 bg-amber-500/20 text-amber-300"
                                    : order.status === "Ready"
                                      ? "border-blue-500/50 bg-blue-500/20 text-blue-300"
                                      : order.status === "Completed"
                                        ? "border-primary/50 bg-primary/20 text-primary"
                                        : "border-destructive/50 bg-destructive/20 text-destructive"
                              }`}
                            >
                              <option value="Pending" className="bg-card text-foreground">
                                Pending
                              </option>
                              <option value="Confirmed" className="bg-card text-foreground">
                                Confirmed
                              </option>
                              <option value="Ready" className="bg-card text-foreground">
                                Ready
                              </option>
                              <option value="Completed" className="bg-card text-foreground">
                                Completed
                              </option>
                              <option value="Cancelled" className="bg-card text-foreground">
                                Cancelled
                              </option>
                            </select>
                          </div>
                        </div>

                        {/* Customer Info & Location */}
                        <div className="grid gap-3 sm:grid-cols-3 text-xs">
                          <div>
                            <span className="text-muted-foreground uppercase font-bold text-[10px] block">
                              Customer
                            </span>
                            <span className="font-semibold text-foreground text-sm">
                              {order.customerName}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <a
                                href={`tel:${order.phoneNumber}`}
                                className="inline-flex items-center gap-1 text-primary hover:underline"
                              >
                                <Phone size={11} /> {order.phoneNumber}
                              </a>
                              <a
                                href={`https://wa.me/${order.phoneNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
                                  `Hello ${order.customerName}! This is Flosh from Flosh Cents regarding your order #${order.id}.`,
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:text-emerald-300"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle size={13} />
                              </a>
                            </div>
                          </div>

                          <div>
                            <span className="text-muted-foreground uppercase font-bold text-[10px] block">
                              Delivery Location
                            </span>
                            <span className="text-foreground flex items-start gap-1 mt-0.5">
                              <MapPin size={12} className="text-primary shrink-0 mt-0.5" />
                              {order.deliveryLocation}
                            </span>
                          </div>

                          <div>
                            <span className="text-muted-foreground uppercase font-bold text-[10px] block">
                              Total Order Amount
                            </span>
                            <span className="font-display text-lg font-bold text-primary">
                              {formatUGX(order.totalAmount)}
                            </span>
                            {order.instructions && (
                              <p className="mt-1 text-[11px] text-muted-foreground italic">
                                "{order.instructions}"
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Items Ordered */}
                        <div className="rounded-xl border border-border/50 bg-background/40 p-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                            Perfumes in this order:
                          </span>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {order.items.map((item) => (
                              <div
                                key={item.productId}
                                className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-card/60"
                              >
                                <div className="flex items-center gap-2">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-6 w-6 rounded-md object-cover"
                                  />
                                  <span>
                                    <strong>{item.quantity}x</strong> {item.name}{" "}
                                    <span className="text-muted-foreground">({item.type})</span>
                                  </span>
                                </div>
                                <span className="font-semibold text-primary">
                                  {formatUGX(item.subtotal)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ADD OR EDIT PERFUME PRODUCT */}
            {activeTab === "newProduct" && (
              <form onSubmit={handleSaveProductSubmit} className="p-6 space-y-6 max-w-3xl mx-auto">
                <div className="text-center">
                  <h3 className="font-display text-2xl font-bold">
                    {editingId ? `Edit ${formName}` : "Add New Perfume Product"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Products appear immediately in the customer shop and catalog.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Perfume Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Caramel Amber Oil"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Perfume Type *
                    </label>
                    <select
                      value={formType}
                      onChange={(e) => {
                        const val = e.target.value as PerfumeType;
                        setFormType(val);
                        if (val === "Oil Perfume") {
                          setFormCategory("Oil Perfumes");
                          setFormSize("6ml roll-on");
                        } else {
                          setFormCategory("Spray Perfumes");
                          setFormSize("100ml");
                        }
                      }}
                      className={inputCls}
                    >
                      <option value="Spray Perfume">Spray Perfume</option>
                      <option value="Oil Perfume">Oil Perfume</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Price in Uganda Shillings (UGX 5,000 → 200,000) *
                    </label>
                    <input
                      type="number"
                      required
                      min={5000}
                      max={200000}
                      step={1000}
                      placeholder="e.g. 15000 or 150000"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className={inputCls}
                    />
                    <span className="text-[11px] text-primary mt-1 block">
                      Preview: {formatUGX(Number(formPrice) || 0)}
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Initial Stock Quantity *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      placeholder="e.g. 10"
                      value={formStock}
                      onChange={(e) => setFormStock(e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Bottle Size / Volume
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3ml, 6ml roll-on, 50ml, 100ml"
                      value={formSize}
                      onChange={(e) => setFormSize(e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Marketing Tag
                    </label>
                    <select
                      value={formTag}
                      onChange={(e) => setFormTag(e.target.value as ProductTag)}
                      className={inputCls}
                    >
                      <option value="New Arrival">New Arrival</option>
                      <option value="Best Seller">Best Seller</option>
                      <option value="Affordable">Affordable (from 5,000)</option>
                      <option value="Signature">Signature Blend</option>
                      <option value="Premium">Premium Executive</option>
                      <option value="Gift">Gift Set</option>
                    </select>
                  </div>
                </div>

                {/* Fragrance Notes Breakdown */}
                <div className="rounded-2xl border border-border/80 bg-background/50 p-4 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <Sparkles size={14} /> Fragrance Notes (Pyramid)
                  </span>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="text-[11px] text-muted-foreground block mb-1">
                        Top Notes
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bergamot, Citrus"
                        value={formTopNotes}
                        onChange={(e) => setFormTopNotes(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted-foreground block mb-1">
                        Middle/Heart Notes
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Damask Rose, Lavender"
                        value={formMiddleNotes}
                        onChange={(e) => setFormMiddleNotes(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted-foreground block mb-1">
                        Base Notes
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Oud, Sandalwood, Amber"
                        value={formBaseNotes}
                        onChange={(e) => setFormBaseNotes(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Short Perfume Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe the mood, wearability, and longevity..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Product Image Selection / Upload */}
                <div className="rounded-2xl border border-border/80 bg-background/50 p-4 space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                    Product Image
                  </label>
                  <div className="flex flex-wrap items-center gap-4">
                    <img
                      src={formImage}
                      alt="Selected bottle preview"
                      className="h-20 w-16 rounded-xl object-cover border-2 border-primary/50"
                    />

                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/20 transition-colors"
                      >
                        Upload Custom Photo
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <span className="text-[11px] text-muted-foreground block">
                        Or pick from Flosh Cents luxury bottle designs:
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        type="button"
                        key={preset.label}
                        onClick={() => setFormImage(preset.src)}
                        className={`flex items-center gap-2 p-1.5 rounded-xl border text-left transition-colors ${
                          formImage === preset.src
                            ? "border-primary bg-primary/15"
                            : "border-border/60 hover:bg-background/80"
                        }`}
                      >
                        <img
                          src={preset.src}
                          alt={preset.label}
                          className="h-8 w-8 rounded-lg object-cover"
                        />
                        <span className="text-[10px] text-foreground font-medium truncate">
                          {preset.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary py-4 text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-gold hover:scale-[1.02] transition-transform"
                  >
                    <CheckCircle2 size={16} />
                    {editingId ? "Save Changes to Perfume" : "Publish to Online Shop"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setActiveTab("inventory");
                    }}
                    className="rounded-full border border-border px-6 py-4 text-xs font-bold uppercase text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
