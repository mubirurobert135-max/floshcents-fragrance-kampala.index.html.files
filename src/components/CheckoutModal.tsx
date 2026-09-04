import { useState } from "react";
import { CartItem, Product, Order } from "../types/store";
import { formatUGX, generateDirectWhatsAppLink } from "../lib/store";
import {
  X,
  CheckCircle2,
  MessageCircle,
  Truck,
  Phone,
  User,
  MapPin,
  FileText,
  ShoppingBag,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartTotal: number;
  onSubmitOrder: (orderData: {
    customerName: string;
    phoneNumber: string;
    deliveryLocation: string;
    instructions?: string;
    items: { product: Product; quantity: number }[];
  }) => Order;
  orderSuccess: Order | null;
  onClearOrderSuccess: () => void;
}

const KAMPALA_LOCATIONS = [
  "Kampala Central / CBD",
  "Kololo / Nakasero",
  "Ntinda / Ministers Village",
  "Bugolobi / Mbuya",
  "Muyenga / Kansanga",
  "Naguru / Bukoto",
  "Kisaasi / Kyanja",
  "Rubaga / Mengo",
  "Entebbe Road / Lubowa",
  "Nalya / Kiwatule",
  "Other (Specify in address)",
];

export function CheckoutModal({
  isOpen,
  onClose,
  cart,
  cartTotal,
  onSubmitOrder,
  orderSuccess,
  onClearOrderSuccess,
}: CheckoutModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedArea, setSelectedArea] = useState(KAMPALA_LOCATIONS[0]);
  const [customAddress, setCustomAddress] = useState("");
  const [instructions, setInstructions] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen && !orderSuccess) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!phone.trim() || phone.trim().length < 8) {
      toast.error("Please enter a valid Ugandan phone number (e.g. 0772 123 456).");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your shopping bag is empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      const fullLocation =
        selectedArea === "Other (Specify in address)"
          ? customAddress.trim() || "Kampala Delivery"
          : customAddress.trim()
            ? `${selectedArea} — ${customAddress.trim()}`
            : selectedArea;

      const newOrder = onSubmitOrder({
        customerName: name.trim(),
        phoneNumber: phone.trim(),
        deliveryLocation: fullLocation,
        instructions: instructions.trim(),
        items: cart.map((i) => ({ product: i.product, quantity: i.quantity })),
      });

      toast.success("Order received successfully!", {
        description: `Order #${newOrder.id} generated. Stock updated.`,
      });
    } catch {
      toast.error("Could not complete order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyOrderNumber = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    toast.success("Order number copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => {
          if (orderSuccess) {
            onClearOrderSuccess();
          }
          onClose();
        }}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl transition-all my-6 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border/80 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/30">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-wide">
                {orderSuccess ? "Order Confirmation" : "Complete Your Order"}
              </h3>
              <p className="text-xs text-muted-foreground">Flosh Cents · Kampala, Uganda</p>
            </div>
          </div>

          <button
            onClick={() => {
              if (orderSuccess) onClearOrderSuccess();
              onClose();
            }}
            aria-label="Close checkout"
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {orderSuccess ? (
            /* SUCCESS CONFIRMATION VIEW */
            <div className="text-center space-y-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-400">
                <CheckCircle2 size={42} />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Thank You!
                </span>
                <h3 className="font-display text-3xl font-bold text-foreground mt-1">
                  Order received successfully!
                </h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                  Your perfumes are reserved. Flosh will reach out to schedule your delivery.
                </p>
              </div>

              {/* Order Number Badge */}
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 text-center">
                <span className="text-xs text-muted-foreground uppercase tracking-wider block">
                  Your Unique Order Number
                </span>
                <div className="flex items-center justify-center gap-3 mt-1.5">
                  <span className="font-display text-2xl font-bold tracking-widest text-primary">
                    #{orderSuccess.id}
                  </span>
                  <button
                    onClick={() => handleCopyOrderNumber(orderSuccess.id)}
                    title="Copy Order ID"
                    className="rounded-full bg-background/80 p-1.5 text-muted-foreground hover:text-foreground border border-border"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Order Details Summary */}
              <div className="rounded-2xl border border-border/80 bg-background/50 p-4 text-left text-xs space-y-2.5">
                <div className="flex justify-between pb-2 border-b border-border/40">
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-semibold text-foreground">{orderSuccess.customerName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-border/40">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-semibold text-foreground">{orderSuccess.phoneNumber}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-border/40">
                  <span className="text-muted-foreground">Delivery To:</span>
                  <span className="font-semibold text-foreground text-right max-w-[240px]">
                    {orderSuccess.deliveryLocation}
                  </span>
                </div>
                <div className="pt-1">
                  <span className="text-muted-foreground block mb-1">Items:</span>
                  <ul className="space-y-1 pl-2 border-l border-primary/40">
                    {orderSuccess.items.map((it) => (
                      <li key={it.productId} className="flex justify-between">
                        <span>
                          {it.quantity}x {it.name} ({it.type})
                        </span>
                        <span className="font-medium text-primary">{formatUGX(it.subtotal)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between pt-2 border-t border-border/40 font-display text-base font-bold text-primary">
                  <span>Total Due:</span>
                  <span>{formatUGX(orderSuccess.totalAmount)}</span>
                </div>
              </div>

              {/* Big Gold WhatsApp CTA */}
              <div className="space-y-3 pt-2">
                <a
                  href={generateDirectWhatsAppLink(orderSuccess)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 py-4 text-xs font-bold tracking-widest text-white uppercase shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle size={18} />
                  Send Order to Flosh on WhatsApp
                </a>

                <button
                  onClick={() => {
                    onClearOrderSuccess();
                    onClose();
                  }}
                  className="w-full rounded-full border border-border py-3 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  Return to Perfume Shop
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM VIEW */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Order Items Preview */}
              <div className="rounded-2xl border border-border/80 bg-background/50 p-4">
                <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span>Order Summary ({cart.length} items)</span>
                  <span className="text-primary font-display text-base font-bold">
                    {formatUGX(cartTotal)}
                  </span>
                </div>
                <div className="max-h-32 overflow-y-auto space-y-2 pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between text-xs py-1 border-b border-border/30 last:border-0"
                    >
                      <span className="truncate pr-2">
                        {item.quantity}x{" "}
                        <strong className="text-foreground">{item.product.name}</strong>{" "}
                        <span className="text-muted-foreground">({item.product.size})</span>
                      </span>
                      <span className="font-semibold text-primary shrink-0">
                        {formatUGX(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <User size={13} className="text-primary" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className={inputCls}
                    placeholder="e.g. Flavia Namubiru"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <Phone size={13} className="text-primary" />
                    Phone Number (WhatsApp or Direct Call) *
                  </label>
                  <input
                    type="tel"
                    required
                    className={inputCls}
                    placeholder="e.g. 0753 123 456 or 0772 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <MapPin size={13} className="text-primary" />
                    Delivery Area in Kampala *
                  </label>
                  <select
                    className={inputCls}
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                  >
                    {KAMPALA_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc} className="bg-card text-foreground">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                    Street Address, Landmark, or House Number
                  </label>
                  <input
                    type="text"
                    className={inputCls}
                    placeholder="e.g. Near Shell Ntinda, Apartment 4B"
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <FileText size={13} className="text-primary" />
                    Optional Instructions
                  </label>
                  <textarea
                    rows={2}
                    className={`${inputCls} resize-none`}
                    placeholder="e.g. Gift wrap requested, deliver after 3pm..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  />
                </div>
              </div>

              {/* Delivery notice */}
              <div className="flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 p-3 text-xs text-muted-foreground">
                <Truck size={16} className="text-primary shrink-0" />
                <span>
                  Delivery is made across Kampala, Entebbe, and Wakiso. Payment is confirmed upon
                  order receipt or cash on delivery.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-4 text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-gold transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                  <CheckCircle2 size={16} />
                  Confirm & Place Order ({formatUGX(cartTotal)})
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
