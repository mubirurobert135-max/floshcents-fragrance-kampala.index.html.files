import { useState } from "react";
import { Product } from "../types/store";
import { formatUGX, WHATSAPP_NUMBER } from "../lib/store";
import {
  ShoppingBag,
  Eye,
  Sparkles,
  MessageCircle,
  AlertCircle,
  Plus,
  Minus,
  Zap,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onOrderNow?: (product: Product, quantity?: number) => void;
  priority?: boolean;
}

export function ProductCard({ product, onSelect, onAddToCart, onOrderNow }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = product.stock <= 0 || !product.isAvailable;
  const maxAvailable = Math.max(0, product.stock);

  const handleWhatsAppQuick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Hello Flosh Scents! I would like to order *${product.name}* (Qty: ${quantity}, ${product.type}, ${product.size}) — ${formatUGX(product.price * quantity)}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleOrderNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    if (onOrderNow) {
      onOrderNow(product, quantity);
    } else {
      onAddToCart(product, quantity);
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    onAddToCart(product, quantity);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity < maxAvailable) {
      setQuantity((q) => q + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  // Gender or Category string
  const categoryLine = [product.size, product.gender || product.category]
    .filter(Boolean)
    .join(" • ");

  return (
    <article
      onClick={() => onSelect(product)}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D4AF37]/50 hover:shadow-[0_12px_40px_rgba(212,175,55,0.15)] cursor-pointer"
    >
      {/* Product Image & Badges */}
      <div className="relative overflow-hidden bg-black/40">
        <img
          src={product.image}
          alt={`${product.name} perfume by Flosh Scents`}
          width={600}
          height={750}
          loading="lazy"
          className={`aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            isOutOfStock ? "grayscale opacity-60" : ""
          }`}
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
          {product.tag && (
            <span className="rounded-full bg-black/85 border border-[#D4AF37]/40 px-3 py-1 text-[10px] font-bold tracking-wider text-[#F3E5AB] uppercase backdrop-blur shadow-sm">
              {product.tag}
            </span>
          )}
          <span className="rounded-full bg-black/75 border border-white/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-foreground/90 uppercase backdrop-blur">
            {product.type}
          </span>
        </div>

        {/* In Stock Indicator */}
        <div className="absolute top-3.5 right-3.5">
          {isOutOfStock ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-destructive/90 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur shadow-sm">
              <AlertCircle size={12} />
              Out of Stock
            </span>
          ) : product.stock <= 5 ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-1 text-[10px] font-bold tracking-wider text-black uppercase backdrop-blur shadow-sm">
              Only {product.stock} Left
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/80 border border-emerald-500/40 px-2.5 py-1 text-[10px] font-bold tracking-wider text-emerald-300 uppercase backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              In Stock
            </span>
          )}
        </div>

        {/* Quick View Hover Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-black/90 border border-[#D4AF37]/40 px-4 py-2 text-xs font-bold tracking-widest text-[#F3E5AB] uppercase backdrop-blur transition-transform hover:scale-105"
          >
            <Eye size={14} className="text-[#D4AF37]" />
            Quick View
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Name & Size/Category */}
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-2xl font-medium tracking-tight text-foreground group-hover:text-[#F3E5AB] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>
          <p className="text-xs font-medium tracking-wider text-[#C5A059] uppercase">
            {categoryLine}
          </p>
        </div>

        {/* Fragrance Notes / Scent Profile */}
        <p className="mt-2 flex items-center gap-1.5 text-xs tracking-wider text-muted-foreground font-medium">
          <Sparkles size={13} className="shrink-0 text-[#D4AF37]" />
          <span className="line-clamp-1">{product.scentProfile || product.displayNotes}</span>
        </p>

        {/* Short Description */}
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground/90 line-clamp-2">
          {product.description}
        </p>

        {/* Pricing, Quantity & Order Actions */}
        <div className="mt-auto pt-4 border-t border-border/60">
          <div className="flex items-end justify-between mb-3">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/80 block">
                Flosh Scents Retail Price
              </span>
              <span className="font-display text-xl sm:text-2xl font-bold text-[#F3E5AB]">
                {formatUGX(product.price)}
              </span>
            </div>

            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center rounded-full border border-border/80 bg-background/80 p-0.5"
              >
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={handleDecrement}
                  className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={12} />
                </button>
                <span className="w-7 text-center font-display text-sm font-bold text-foreground">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={quantity >= maxAvailable}
                  onClick={handleIncrement}
                  className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={12} />
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
            {/* Direct Order Now Button */}
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleOrderNowClick}
              className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold tracking-wider uppercase transition-all ${
                isOutOfStock
                  ? "bg-muted text-muted-foreground cursor-not-allowed border border-border"
                  : "bg-primary text-primary-foreground shadow-gold hover:bg-primary/90 hover:scale-[1.02] active:scale-95"
              }`}
            >
              <Zap size={14} />
              {isOutOfStock ? "Sold Out" : "Order Now"}
            </button>

            {/* Add to Bag */}
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCartClick}
              title="Add to Shopping Bag"
              className="rounded-full border border-primary/40 bg-primary/10 p-2.5 text-primary transition-all hover:bg-primary/20 hover:scale-105 active:scale-95 disabled:opacity-40"
            >
              <ShoppingBag size={15} />
            </button>

            {/* Quick WhatsApp Inquiry */}
            <button
              type="button"
              onClick={handleWhatsAppQuick}
              title="Inquire on WhatsApp"
              className="rounded-full border border-[#D4AF37]/30 p-2.5 text-[#D4AF37] transition-all hover:bg-[#D4AF37]/15 hover:scale-105 active:scale-95"
            >
              <MessageCircle size={15} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
