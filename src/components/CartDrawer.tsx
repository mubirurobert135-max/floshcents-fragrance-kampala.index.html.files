import { CartItem } from "../types/store";
import { formatUGX, WHATSAPP_NUMBER } from "../lib/store";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  Truck,
  Sparkles,
} from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartTotal: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  cartTotal,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const itemsList = cart
      .map(
        (it, idx) =>
          `${idx + 1}. *${it.product.name}* (${it.product.type}, ${it.product.size})\n   Qty: ${it.quantity} × ${formatUGX(it.product.price)} = ${formatUGX(it.product.price * it.quantity)}`,
      )
      .join("\n");

    const message = `✨ *FLOSH CENTS — DIRECT WHATSAPP ORDER* ✨
━━━━━━━━━━━━━━━━━━━━
🛍️ *Items in Bag:*
${itemsList}

💰 *Subtotal:* ${formatUGX(cartTotal)}
━━━━━━━━━━━━━━━━━━━━
Hello Flosh! I want to order these perfumes. Can we arrange delivery in Kampala?`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-border bg-card shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-border/80 px-6 py-5">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-primary" />
              <h2 className="font-display text-2xl font-semibold tracking-wide">
                Your Shopping <span className="gold-text">Bag</span>
              </h2>
              <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-bold text-primary">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close bag"
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Content */}
          {cart.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border border-primary/25 text-primary mb-4">
                <ShoppingBag size={32} />
              </div>
              <h3 className="font-display text-2xl font-medium">Your bag is empty</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                Explore our collection of oil perfumes and sprays crafted in Kampala.
              </p>
              <button
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-gold hover:scale-105 transition-transform"
              >
                Browse Perfumes
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart.map((item) => {
                  const maxStock = item.product.stock;
                  return (
                    <div
                      key={item.product.id}
                      className="flex gap-4 rounded-2xl border border-border/70 bg-background/50 p-3.5 transition-colors hover:border-primary/40"
                    >
                      {/* Product Thumbnail */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-20 w-18 rounded-xl object-cover border border-border"
                      />

                      {/* Details */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <h4 className="font-display text-base font-medium leading-snug">
                              {item.product.name}
                            </h4>
                            <span className="text-[11px] font-semibold text-primary/80 uppercase">
                              {item.product.type} · {item.product.size}
                            </span>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            aria-label={`Remove ${item.product.name}`}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          {/* Unit & Subtotal */}
                          <div>
                            <span className="font-display text-sm font-bold text-primary">
                              {formatUGX(item.product.price * item.quantity)}
                            </span>
                            {item.quantity > 1 && (
                              <span className="block text-[10px] text-muted-foreground">
                                {formatUGX(item.product.price)} each
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center rounded-full border border-border bg-card p-0.5">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="rounded-full p-1 text-muted-foreground hover:text-foreground"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-7 text-center font-display text-sm font-bold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              disabled={item.quantity >= maxStock}
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="rounded-full p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={onClearCart}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors underline"
                  >
                    Clear shopping bag
                  </button>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Truck size={12} className="text-primary" /> Delivery arranged in Kampala
                  </span>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="border-t border-border/80 bg-background/95 p-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-display text-xl font-bold text-primary">
                    {formatUGX(cartTotal)}
                  </span>
                </div>

                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Sparkles size={12} className="text-primary shrink-0" />
                  Free fragrance sample vial included with orders above UGX 50,000!
                </p>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={onProceedToCheckout}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-gold hover:scale-[1.02] active:scale-98 transition-all"
                  >
                    Proceed to Order
                    <ArrowRight size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 py-3 text-xs font-bold tracking-widest text-primary uppercase hover:bg-primary/20 transition-colors"
                  >
                    <MessageCircle size={15} />
                    Order via WhatsApp
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
