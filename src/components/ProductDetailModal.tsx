import { useState, useEffect } from "react";
import { Product } from "../types/store";
import { formatUGX, WHATSAPP_NUMBER } from "../lib/store";
import {
  X,
  ShoppingBag,
  Zap,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  AlertCircle,
} from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOrderNow: (product: Product, quantity: number) => void;
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onOrderNow,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  if (!isOpen || !product) return null;

  const isOutOfStock = product.stock <= 0 || !product.isAvailable;
  const maxAvailable = Math.max(0, product.stock);

  const increment = () => {
    if (quantity < maxAvailable) {
      setQuantity((q) => q + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleWhatsApp = () => {
    const msg = `Hello Flosh Cents! I'm inquiring about *${product.name}* (${product.type}, ${product.size}) — ${formatUGX(product.price)}. Is it available for delivery in Kampala?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl transition-all my-8 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-20 rounded-full bg-background/80 p-2.5 text-foreground backdrop-blur-md transition-transform hover:scale-110 hover:text-primary border border-border"
        >
          <X size={18} />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Column: Image */}
            <div className="relative flex flex-col items-center">
              <div className="relative w-full overflow-hidden rounded-2xl border border-border/80 bg-background/40">
                <img
                  src={product.image}
                  alt={`${product.name} perfume bottle`}
                  className={`aspect-[4/5] w-full object-cover ${
                    isOutOfStock ? "grayscale opacity-75" : ""
                  }`}
                />
                <span className="absolute top-4 left-4 rounded-full bg-background/85 px-3 py-1 text-xs font-bold tracking-widest text-primary uppercase backdrop-blur border border-border">
                  {product.tag}
                </span>

                <span className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur">
                  {product.size}
                </span>
              </div>

              {/* Delivery Guarantee note */}
              <div className="mt-4 flex w-full items-center justify-center gap-6 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Truck size={14} className="text-primary" /> Same-day Kampala delivery
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-primary" /> 100% Authentic Oils
                </span>
              </div>
            </div>

            {/* Right Column: Details & Actions */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Type Badge & Category */}
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-bold tracking-wider uppercase ${
                      product.type === "Oil Perfume"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {product.type}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>

                {/* Name */}
                <h2 className="font-display mt-2.5 text-3xl font-semibold sm:text-4xl text-foreground">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-display text-3xl font-bold text-primary">
                    {formatUGX(product.price)}
                  </span>
                  <span className="text-xs tracking-wider text-muted-foreground uppercase">
                    Uganda Shillings
                  </span>
                </div>

                {/* Live Stock indicator */}
                <div className="mt-4">
                  {isOutOfStock ? (
                    <div className="inline-flex items-center gap-2 rounded-xl bg-destructive/15 border border-destructive/30 px-3.5 py-1.5 text-xs font-semibold text-destructive">
                      <AlertCircle size={15} />
                      Currently Out of Stock — Backorder via WhatsApp
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/25 px-3.5 py-1.5 text-xs font-semibold text-primary">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      In Stock: {product.stock} units available
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                {/* Fragrance Notes Breakdown */}
                <div className="mt-6 rounded-2xl border border-border/80 bg-background/50 p-4">
                  <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                    <Sparkles size={14} />
                    Fragrance Pyramid
                  </h4>
                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex items-baseline justify-between border-b border-border/40 pb-1.5">
                      <span className="font-medium text-muted-foreground">Top Notes:</span>
                      <span className="font-semibold text-foreground text-right">
                        {product.notes.top}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between border-b border-border/40 pb-1.5">
                      <span className="font-medium text-muted-foreground">Heart Notes:</span>
                      <span className="font-semibold text-foreground text-right">
                        {product.notes.middle}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-medium text-muted-foreground">Base Notes:</span>
                      <span className="font-semibold text-foreground text-right">
                        {product.notes.base}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity Selector & Order Buttons */}
              <div className="mt-8 space-y-4">
                {/* Quantity Control */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Quantity
                  </span>
                  <div className="flex items-center rounded-full border border-border bg-background/80 p-1">
                    <button
                      type="button"
                      disabled={isOutOfStock || quantity <= 1}
                      onClick={decrement}
                      className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center font-display text-lg font-bold text-foreground">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      disabled={isOutOfStock || quantity >= maxAvailable}
                      onClick={increment}
                      className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={() => onAddToCart(product, quantity)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-3.5 text-xs font-bold tracking-wider text-primary uppercase transition-all hover:bg-primary/20 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingBag size={16} />
                    Add to Bag
                  </button>

                  <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={() => onOrderNow(product, quantity)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3.5 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-gold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Zap size={16} />
                    Order Now
                  </button>
                </div>

                {/* WhatsApp Help / Inquiry */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="inline-flex w-full items-center justify-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors py-1"
                >
                  <MessageCircle size={14} className="text-primary" />
                  Have questions about this scent? Ask Flosh on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
