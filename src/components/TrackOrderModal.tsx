import { useState, useEffect } from "react";
import { Order, OrderStatus } from "../types/store";
import {
  formatUGX,
  findOrderByNumber,
  getMyRecentOrderIds,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
} from "../lib/store";
import {
  X,
  Search,
  Package,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Phone,
  MessageCircle,
  Truck,
  Copy,
  Check,
  AlertCircle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderNumber?: string;
  orders: Order[]; // Live orders passed from store
  onShopClick?: () => void;
}

const STEP_DEFINITIONS: {
  status: OrderStatus;
  title: string;
  description: string;
  icon: typeof Clock;
}[] = [
  {
    status: "Pending",
    title: "Order Placed",
    description: "Received by Flosh Cents & entered in queue",
    icon: Clock,
  },
  {
    status: "Confirmed",
    title: "Confirmed & Blending",
    description: "Flosh confirmed your order; preparing your fragrance flacon",
    icon: Sparkles,
  },
  {
    status: "Ready",
    title: "Ready for Dispatch",
    description: "Packaged with luxury ribbon & handed to Kampala courier",
    icon: Truck,
  },
  {
    status: "Completed",
    title: "Delivered",
    description: "Safely received in Kampala. Enjoy your fragrance!",
    icon: CheckCircle2,
  },
];

export function TrackOrderModal({
  isOpen,
  onClose,
  initialOrderNumber = "",
  orders,
  onShopClick,
}: TrackOrderModalProps) {
  const [query, setQuery] = useState("");
  const [searchedId, setSearchedId] = useState("");
  const [copied, setCopied] = useState(false);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  // Keep search query and searched order up to date
  useEffect(() => {
    if (isOpen) {
      const recents = getMyRecentOrderIds();
      setRecentIds(recents);

      if (initialOrderNumber) {
        setQuery(initialOrderNumber);
        setSearchedId(initialOrderNumber);
      } else if (recents.length > 0) {
        // Pre-fill most recent order for convenience if empty
        setQuery((prev) => prev || recents[0]);
        setSearchedId((prev) => prev || recents[0]);
      }
    }
  }, [isOpen, initialOrderNumber]);

  if (!isOpen) return null;

  // Find order in live store orders list to guarantee real-time updates
  const cleanSearched = searchedId.trim().replace(/^#/, "").toUpperCase();
  const currentOrder: Order | null = cleanSearched
    ? orders.find((o) => o.id.replace(/^#/, "").toUpperCase() === cleanSearched) ||
      findOrderByNumber(cleanSearched)
    : null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter an order number (e.g. FC-2609-7241).");
      return;
    }
    setSearchedId(query.trim());
  };

  const handleSelectRecent = (id: string) => {
    setQuery(id);
    setSearchedId(id);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Order number copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper for tracking steps progression
  const getStepIndex = (status: OrderStatus) => {
    if (status === "Pending") return 0;
    if (status === "Confirmed") return 1;
    if (status === "Ready") return 2;
    if (status === "Completed") return 3;
    return -1; // Cancelled
  };

  const activeStepIdx = currentOrder ? getStepIndex(currentOrder.status) : -1;

  const generateWhatsAppInquiryUrl = (order: Order) => {
    const text = `Hello Flosh! 👋\nI am tracking my Flosh Cents order *#${order.id}* placed for *${order.customerName}*.\nDelivery destination: ${order.deliveryLocation}.\nTotal: ${formatUGX(order.totalAmount)}.\nCould you please share a quick update on delivery in Kampala? Thank you!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const formatDate = (ts: number) => {
    try {
      const d = new Date(ts);
      return d.toLocaleDateString("en-UG", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Recent";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl transition-all my-4 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 px-6 py-5 bg-card/90">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary">
              <Package size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-bold text-foreground">Track My Order</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Status
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Check order status & delivery progress instantly without an account
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close track order modal"
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Order Search Form */}
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
              Enter Your Unique Order Number
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="e.g. FC-2609-7241 or #FC-2609-8815"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background/90 pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none uppercase tracking-wider font-mono shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-gold hover:scale-105 active:scale-95 transition-all"
              >
                <Search size={15} />
                Track
              </button>
            </div>

            {/* Quick Suggestions / Recent Orders on this device */}
            {recentIds.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                <span className="text-muted-foreground font-semibold text-[11px] mr-1">
                  Your Recent Orders:
                </span>
                {recentIds.slice(0, 3).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleSelectRecent(id)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-mono font-bold border transition-colors ${
                      cleanSearched === id.toUpperCase()
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-border/80 bg-background/50 text-muted-foreground hover:text-foreground hover:border-primary/40"
                    }`}
                  >
                    #{id}
                  </button>
                ))}
              </div>
            )}
          </form>

          {/* Results Display */}
          {cleanSearched ? (
            currentOrder ? (
              /* ORDER FOUND VIEW */
              <div className="space-y-6 pt-2">
                {/* Status Hero Banner */}
                <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground block">
                        Order Number
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <h3 className="font-mono text-xl font-extrabold text-foreground tracking-wide">
                          #{currentOrder.id}
                        </h3>
                        <button
                          onClick={() => handleCopy(currentOrder.id)}
                          className="text-muted-foreground hover:text-primary transition-colors p-1"
                          title="Copy order number"
                        >
                          {copied ? (
                            <Check size={16} className="text-emerald-500" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Placed on {formatDate(currentOrder.createdAt)}
                      </span>
                    </div>

                    {/* Status Pill */}
                    <div className="text-right">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">
                        Current Status
                      </span>
                      {currentOrder.status === "Pending" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3.5 py-1.5 text-xs font-bold text-amber-400">
                          <Clock size={14} /> Order Placed & Queued
                        </span>
                      )}
                      {currentOrder.status === "Confirmed" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 px-3.5 py-1.5 text-xs font-bold text-blue-400">
                          <Sparkles size={14} /> Confirmed & Handcrafting
                        </span>
                      )}
                      {currentOrder.status === "Ready" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-1.5 text-xs font-bold text-emerald-400">
                          <Truck size={14} /> Ready for Dispatch
                        </span>
                      )}
                      {currentOrder.status === "Completed" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 px-3.5 py-1.5 text-xs font-bold text-teal-300">
                          <CheckCircle2 size={14} /> Delivered & Completed
                        </span>
                      )}
                      {currentOrder.status === "Cancelled" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 border border-destructive/30 px-3.5 py-1.5 text-xs font-bold text-destructive">
                          <AlertCircle size={14} /> Cancelled
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Visual Step Progress Tracker (for active orders) */}
                  {currentOrder.status !== "Cancelled" ? (
                    <div className="pt-3 border-t border-border/60">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {STEP_DEFINITIONS.map((step, idx) => {
                          const isDone = activeStepIdx > idx;
                          const isCurrent = activeStepIdx === idx;
                          const isUpcoming = activeStepIdx < idx;
                          const StepIcon = step.icon;

                          return (
                            <div
                              key={step.status}
                              className={`rounded-xl p-3 border transition-all ${
                                isCurrent
                                  ? "border-primary bg-primary/10 shadow-sm"
                                  : isDone
                                    ? "border-emerald-500/30 bg-emerald-500/5 text-muted-foreground"
                                    : "border-border/50 bg-background/30 opacity-60"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1.5">
                                <div
                                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                                    isCurrent
                                      ? "bg-primary text-primary-foreground animate-pulse"
                                      : isDone
                                        ? "bg-emerald-500 text-white"
                                        : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {isDone ? <Check size={12} /> : idx + 1}
                                </div>
                                <StepIcon
                                  size={15}
                                  className={
                                    isCurrent
                                      ? "text-primary"
                                      : isDone
                                        ? "text-emerald-400"
                                        : "text-muted-foreground"
                                  }
                                />
                              </div>
                              <p
                                className={`text-xs font-bold ${
                                  isCurrent ? "text-primary" : "text-foreground"
                                }`}
                              >
                                {step.title}
                              </p>
                              <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                                {step.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-xs text-muted-foreground">
                      <p className="font-semibold text-destructive mb-1">
                        Notice Regarding Cancellation
                      </p>
                      This order has been marked as cancelled. If this was done by mistake or you
                      need a replacement, please message Flosh on WhatsApp.
                    </div>
                  )}
                </div>

                {/* Delivery & Recipient Details */}
                <div className="rounded-2xl border border-border bg-card/60 p-4 grid sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Recipient
                    </span>
                    <p className="font-semibold text-foreground text-sm">
                      {currentOrder.customerName}
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1.5 mt-1">
                      <Phone size={13} className="text-primary" /> {currentOrder.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Delivery Destination
                    </span>
                    <p className="text-foreground flex items-start gap-1.5">
                      <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>{currentOrder.deliveryLocation}</span>
                    </p>
                    {currentOrder.instructions && (
                      <p className="text-muted-foreground italic mt-1 text-[11px]">
                        Note: "{currentOrder.instructions}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Items Ordered List */}
                <div className="rounded-2xl border border-border bg-background/50 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
                    <span>Perfumes Ordered ({currentOrder.items.length})</span>
                    <span>Total Amount</span>
                  </div>

                  <div className="space-y-3">
                    {currentOrder.items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center justify-between text-xs gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 rounded-xl object-cover border border-border/60 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-foreground text-sm">{item.name}</p>
                            <p className="text-muted-foreground text-[11px]">
                              {item.type} · {item.size} · Qty: {item.quantity} ×{" "}
                              {formatUGX(item.unitPrice)}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-primary text-sm shrink-0">
                          {formatUGX(item.subtotal)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground block">Grand Total (UGX)</span>
                      <span className="text-[11px] text-emerald-500 font-medium">
                        Cash on delivery or Mobile Money
                      </span>
                    </div>
                    <span className="font-display text-2xl font-bold text-primary">
                      {formatUGX(currentOrder.totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Direct Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={generateWhatsAppInquiryUrl(currentOrder)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle size={16} />
                    Inquire on WhatsApp ({WHATSAPP_DISPLAY})
                  </a>

                  <a
                    href={`tel:+${WHATSAPP_NUMBER}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-card py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Phone size={15} />
                    Call Flosh
                  </a>
                </div>
              </div>
            ) : (
              /* ORDER NOT FOUND VIEW */
              <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/15 text-destructive">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Order Not Found</h3>
                  <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto">
                    We could not find an order matching{" "}
                    <strong className="text-foreground">#{query}</strong>. Please check that you
                    entered the full order number (e.g. FC-2609-XXXX) or message Flosh directly.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Hello Flosh, I'm trying to track my order (${query}) but need help finding it. Could you check for me?`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all shadow"
                  >
                    <MessageCircle size={15} />
                    Ask Flosh on WhatsApp
                  </a>

                  <button
                    onClick={() => {
                      setQuery("");
                      setSearchedId("");
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-card"
                  >
                    <RotateCcw size={14} />
                    Try Another Number
                  </button>
                </div>
              </div>
            )
          ) : (
            /* INITIAL EMPTY VIEW: GUIDE */
            <div className="rounded-2xl border border-dashed border-border p-8 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                <Package size={26} />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-base font-bold text-foreground">
                  Track Your Flosh Cents Fragrance
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  Every order placed receives a unique number like{" "}
                  <strong className="text-primary font-mono">FC-2609-XXXX</strong> on your checkout
                  receipt and WhatsApp confirmation.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-primary" /> No login or account needed
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck size={14} className="text-primary" /> Live Kampala dispatch status
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border/80 px-6 py-4 bg-card/60 flex items-center justify-between text-xs">
          <span className="text-muted-foreground text-[11px]">
            Direct delivery in Kampala · WhatsApp {WHATSAPP_DISPLAY}
          </span>
          <button
            onClick={() => {
              onClose();
              if (onShopClick) onShopClick();
            }}
            className="font-bold text-primary hover:underline flex items-center gap-1 uppercase tracking-wider text-[11px]"
          >
            Shop Perfumes <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
