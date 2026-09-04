import { Product } from "../types/store";
import { formatUGX, WHATSAPP_NUMBER } from "../lib/store";
import { ShoppingBag, Eye, Sparkles, MessageCircle, AlertCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  priority?: boolean;
}

export function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0 || !product.isAvailable;

  const handleWhatsAppQuick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Hello Flosh Cents! I'd like to ask about / order *${product.name}* (${product.type}, ${product.size}) — ${formatUGX(product.price)}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <article
      onClick={() => onSelect(product)}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-gold cursor-pointer"
    >
      {/* Product Image & Badges */}
      <div className="relative overflow-hidden bg-background/50">
        <img
          src={product.image}
          alt={`${product.name} perfume bottle by Flosh Cents`}
          width={600}
          height={750}
          loading="lazy"
          className={`aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            isOutOfStock ? "grayscale opacity-60" : ""
          }`}
        />

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
          <span className="rounded-full bg-background/85 px-3 py-1 text-[11px] font-bold tracking-wider text-primary uppercase backdrop-blur shadow-sm">
            {product.tag}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase backdrop-blur ${
              product.type === "Oil Perfume"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
            }`}
          >
            {product.type}
          </span>
        </div>

        {/* Stock Status Badge */}
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
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 border border-primary/40 px-2.5 py-1 text-[10px] font-bold tracking-wider text-primary uppercase backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              In Stock ({product.stock})
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
            className="inline-flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-xs font-bold tracking-widest text-foreground uppercase backdrop-blur transition-transform hover:scale-105"
          >
            <Eye size={14} className="text-primary" />
            Quick View
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-2xl font-medium tracking-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="shrink-0 rounded-full border border-primary/30 px-2.5 py-1 text-[11px] font-bold tracking-wider text-primary uppercase">
            {product.size}
          </span>
        </div>

        {/* Fragrance Notes */}
        <p className="mt-1.5 flex items-center gap-1.5 text-xs tracking-wider text-primary/90 font-medium">
          <Sparkles size={13} className="shrink-0 text-primary" />
          <span className="line-clamp-1">{product.displayNotes}</span>
        </p>

        {/* Short description */}
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Bottom Pricing & CTA */}
        <div className="mt-auto pt-5 flex items-center justify-between border-t border-border/60">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
              Price
            </span>
            <span className="font-display text-xl font-bold text-primary">
              {formatUGX(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleWhatsAppQuick}
              title="Inquire via WhatsApp"
              className="rounded-full border border-primary/30 p-2.5 text-primary transition-all hover:bg-primary/15 hover:scale-105"
            >
              <MessageCircle size={16} />
            </button>

            <button
              type="button"
              disabled={isOutOfStock}
              onClick={(e) => {
                e.stopPropagation();
                if (!isOutOfStock) onAddToCart(product);
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold tracking-wide uppercase transition-all ${
                isOutOfStock
                  ? "bg-muted text-muted-foreground cursor-not-allowed border border-border"
                  : "bg-primary text-primary-foreground shadow-gold hover:scale-105 active:scale-95"
              }`}
            >
              <ShoppingBag size={14} />
              {isOutOfStock ? "Sold Out" : "Add to Bag"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
