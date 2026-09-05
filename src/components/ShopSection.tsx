import { useState, useMemo } from "react";
import { Product } from "../types/store";
import { ProductCard } from "./ProductCard";
import { Search, ArrowUpDown, Sparkles, Droplets, Truck, X } from "lucide-react";

interface ShopSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onOrderNow?: (product: Product, quantity?: number) => void;
  onOpenAdmin?: () => void;
  onOpenTrack?: (orderId?: string) => void;
}

type MainCategoryFilter = "ALL" | "MEN" | "WOMEN" | "UNISEX";
type ScentTagFilter = "ALL" | "Fruity" | "Woody" | "Sweet" | "Premium";
type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

export function ShopSection({
  products,
  onSelectProduct,
  onAddToCart,
  onOrderNow,
  onOpenTrack,
}: ShopSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<MainCategoryFilter>("ALL");
  const [scentTag, setScentTag] = useState<ScentTagFilter>("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.displayNotes.toLowerCase().includes(q) ||
          (p.scentProfile && p.scentProfile.toLowerCase().includes(q)) ||
          p.notes.top.toLowerCase().includes(q) ||
          p.notes.middle.toLowerCase().includes(q) ||
          p.notes.base.toLowerCase().includes(q),
      );
    }

    // Main Category filter (ALL | MEN | WOMEN | UNISEX)
    if (categoryFilter === "MEN") {
      result = result.filter(
        (p) =>
          p.gender === "Men's" ||
          p.category === "Men's" ||
          p.name.toLowerCase().includes("lucky") ||
          p.name.toLowerCase().includes("black opens"),
      );
    } else if (categoryFilter === "WOMEN") {
      result = result.filter(
        (p) =>
          p.gender === "Women's" ||
          p.category === "Women's" ||
          p.name.toLowerCase().includes("212") ||
          p.name.toLowerCase().includes("vip"),
      );
    } else if (categoryFilter === "UNISEX") {
      result = result.filter(
        (p) =>
          p.gender === "Unisex" ||
          p.category === "Unisex" ||
          p.name.toLowerCase().includes("brun") ||
          p.name.toLowerCase().includes("tangelo") ||
          p.name.toLowerCase().includes("banana") ||
          p.name.toLowerCase().includes("blazberry") ||
          p.name.toLowerCase().includes("plum") ||
          p.name.toLowerCase().includes("cherry") ||
          p.name.toLowerCase().includes("540"),
      );
    }

    // Scent Note / Profile filter (Fruity | Woody | Sweet | Premium)
    if (scentTag === "Fruity") {
      result = result.filter(
        (p) =>
          p.type.toLowerCase().includes("fruity") ||
          p.displayNotes.toLowerCase().includes("plum") ||
          p.displayNotes.toLowerCase().includes("cherry") ||
          p.displayNotes.toLowerCase().includes("berry") ||
          p.displayNotes.toLowerCase().includes("citrus") ||
          p.displayNotes.toLowerCase().includes("banana") ||
          (p.scentProfile && p.scentProfile.toLowerCase().includes("fruit")),
      );
    } else if (scentTag === "Woody") {
      result = result.filter(
        (p) =>
          p.displayNotes.toLowerCase().includes("woody") ||
          p.displayNotes.toLowerCase().includes("wood") ||
          p.displayNotes.toLowerCase().includes("cedar") ||
          p.displayNotes.toLowerCase().includes("guaiac") ||
          (p.scentProfile && p.scentProfile.toLowerCase().includes("wood")),
      );
    } else if (scentTag === "Sweet") {
      result = result.filter(
        (p) =>
          p.displayNotes.toLowerCase().includes("vanilla") ||
          p.displayNotes.toLowerCase().includes("honey") ||
          p.displayNotes.toLowerCase().includes("praline") ||
          p.displayNotes.toLowerCase().includes("sugar") ||
          (p.scentProfile && p.scentProfile.toLowerCase().includes("sweet")),
      );
    } else if (scentTag === "Premium") {
      result = result.filter(
        (p) => p.tag === "Premium" || p.tag === "Signature" || p.price >= 60000,
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => b.createdAt - a.createdAt);
    } else {
      // Default: Liquid Brun, 212 VIP, Lucky Billion, Black Opens first
      const priorityIds = [
        "fc-prod-liquidbrun",
        "fc-prod-212",
        "fc-prod-lucky",
        "fc-prod-blackopens",
        "fc-prod-540",
        "fc-prod-tangelo",
        "fc-prod-banana",
        "fc-prod-blazberry",
        "fc-prod-plumdrop",
        "fc-prod-icedcherry",
      ];
      result.sort((a, b) => {
        const aIndex = priorityIds.indexOf(a.id);
        const bIndex = priorityIds.indexOf(b.id);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return 0;
      });
    }

    return result;
  }, [products, searchQuery, categoryFilter, scentTag, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
    setCategoryFilter("ALL");
    setScentTag("ALL");
    setSortBy("featured");
  };

  return (
    <section id="shop" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A059]">
            Kampala, Uganda
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground uppercase">
          THE <span className="gold-text">COLLECTION</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground tracking-wide">
          Curated scents of distinction. Same-day delivery across Kampala.
        </p>
      </div>

      {/* Control Navigation: Main Tabs (ALL | MEN | WOMEN | UNISEX) + Small Search Icon */}
      <div className="mb-10 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/80 pb-4">
          {/* Primary Category Tabs */}
          <nav
            aria-label="Product categories"
            className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0"
          >
            {(["ALL", "MEN", "WOMEN", "UNISEX"] as const).map((cat) => {
              const isActive = categoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`relative px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${
                    isActive ? "text-[#F3E5AB]" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Tools: Small Search Icon Toggle & Sort */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* Small Search Toggle Button */}
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-black/80 px-3 py-1.5 shadow-lg">
                  <Search size={14} className="text-[#D4AF37]" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search scent..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-36 sm:w-48 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X size={13} />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="ml-1 text-muted-foreground hover:text-foreground"
                    title="Close search"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search collection"
                  className="flex items-center gap-1.5 rounded-full border border-border/80 bg-card/60 px-3.5 py-2 text-xs font-medium text-muted-foreground hover:border-[#D4AF37]/60 hover:text-[#F3E5AB] transition-colors"
                >
                  <Search size={14} className="text-[#D4AF37]" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 rounded-full border border-border/80 bg-card/60 px-3 py-1.5 text-xs text-muted-foreground">
              <ArrowUpDown size={13} className="text-[#D4AF37]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort collection"
                className="bg-transparent font-medium text-foreground focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured" className="bg-card text-foreground">
                  Featured
                </option>
                <option value="price-asc" className="bg-card text-foreground">
                  Price: Low to High
                </option>
                <option value="price-desc" className="bg-card text-foreground">
                  Price: High to Low
                </option>
                <option value="newest" className="bg-card text-foreground">
                  Newest
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Secondary Scent Profile Chips (Fruity | Woody | Sweet | Premium) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mr-1 flex items-center gap-1">
              <Sparkles size={12} className="text-[#D4AF37]" /> Notes:
            </span>
            {(["ALL", "Fruity", "Woody", "Sweet", "Premium"] as const).map((tag) => {
              const active = scentTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setScentTag(tag)}
                  className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                    active
                      ? "bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/60 font-semibold"
                      : "border border-border/60 bg-card/40 text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* Quick Track Order link */}
          {onOpenTrack && (
            <button
              onClick={() => onOpenTrack()}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-[#D4AF37] transition-colors"
            >
              <Truck size={13} />
              <span>Track Order</span>
            </button>
          )}
        </div>

        {/* Results indicator */}
        {(searchQuery || categoryFilter !== "ALL" || scentTag !== "ALL") && (
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span>
              Showing {filteredProducts.length} perfume{filteredProducts.length !== 1 ? "s" : ""}
            </span>
            <button onClick={resetFilters} className="text-[#D4AF37] hover:underline font-medium">
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border/80 p-12 text-center max-w-md mx-auto">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/25 text-primary mx-auto mb-4">
            <Droplets size={24} />
          </div>
          <h3 className="font-display text-xl font-medium text-foreground">No fragrances found</h3>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Try adjusting your search keyword or selected category filters.
          </p>
          <button
            onClick={resetFilters}
            className="mt-5 rounded-full bg-primary px-5 py-2 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-gold transition-transform hover:scale-105"
          >
            Show All Fragrances
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              onOrderNow={onOrderNow}
            />
          ))}
        </div>
      )}
    </section>
  );
}
