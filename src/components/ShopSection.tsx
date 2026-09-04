import { useState, useMemo } from "react";
import { Product } from "../types/store";
import { ProductCard } from "./ProductCard";
import { Search, Filter, ArrowUpDown, Sparkles, Layers, Droplets, Tag, Check } from "lucide-react";

interface ShopSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenAdmin?: () => void;
}

type TypeFilter = "All" | "Spray Perfume" | "Oil Perfume";
type TagFilter = "All" | "Best Seller" | "New Arrival" | "Affordable";
type SortOption = "featured" | "price-asc" | "price-desc" | "newest";
type PriceFilter = "all" | "under-25k" | "25k-100k" | "above-100k";

export function ShopSection({ products, onSelectProduct, onAddToCart }: ShopSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<TypeFilter>("All");
  const [selectedTag, setSelectedTag] = useState<TagFilter>("All");
  const [selectedPrice, setSelectedPrice] = useState<PriceFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  // Filtered and sorted products list
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
          p.notes.top.toLowerCase().includes(q) ||
          p.notes.middle.toLowerCase().includes(q) ||
          p.notes.base.toLowerCase().includes(q),
      );
    }

    // Type filter
    if (selectedType !== "All") {
      result = result.filter((p) => p.type === selectedType);
    }

    // Tag filter
    if (selectedTag !== "All") {
      result = result.filter((p) => p.tag === selectedTag);
    }

    // Price range filter
    if (selectedPrice === "under-25k") {
      result = result.filter((p) => p.price < 25000);
    } else if (selectedPrice === "25k-100k") {
      result = result.filter((p) => p.price >= 25000 && p.price <= 100000);
    } else if (selectedPrice === "above-100k") {
      result = result.filter((p) => p.price > 100000);
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => b.createdAt - a.createdAt);
    } else {
      // Default: best sellers and available items first
      result.sort((a, b) => {
        if (a.stock > 0 && b.stock === 0) return -1;
        if (a.stock === 0 && b.stock > 0) return 1;
        return 0;
      });
    }

    return result;
  }, [products, searchQuery, selectedType, selectedTag, selectedPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSelectedTag("All");
    setSelectedPrice("all");
    setSortBy("featured");
  };

  return (
    <section id="shop" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">
          <Sparkles size={14} />
          Kampala Fragrance Boutique
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Shop Our <span className="gold-text">Perfumes</span>
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Explore artisanal spray perfumes and concentrated perfume oils starting from UGX 5,000 up
          to executive flacons at UGX 200,000.
        </p>
      </div>

      {/* Control Bar: Search, Category Chips, Price, Sort */}
      <div className="space-y-4 mb-10">
        {/* Search Bar & Sort */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search size={16} className="absolute left-4 top-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by perfume name, notes (e.g. Vanilla, Rose, Oud)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-border bg-card/70 pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-3 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-3 py-2 text-xs">
              <ArrowUpDown size={14} className="text-primary" />
              <span className="text-muted-foreground font-semibold">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent font-medium text-foreground focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-card text-foreground">
                  Featured / Available First
                </option>
                <option value="price-asc" className="bg-card text-foreground">
                  Price: Low to High (from UGX 5k)
                </option>
                <option value="price-desc" className="bg-card text-foreground">
                  Price: High to Low
                </option>
                <option value="newest" className="bg-card text-foreground">
                  Newest Arrivals
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Pills & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Type Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1 flex items-center gap-1">
              <Layers size={13} className="text-primary" /> Type:
            </span>
            {(["All", "Spray Perfume", "Oil Perfume"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedType === type
                    ? "bg-primary text-primary-foreground shadow-gold"
                    : "border border-border/80 bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {type === "All" ? "All Types" : type}
              </button>
            ))}
          </div>

          {/* Curated Tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1 flex items-center gap-1">
              <Tag size={13} className="text-primary" /> Curated:
            </span>
            {(["All", "Best Seller", "New Arrival", "Affordable"] as const).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  selectedTag === tag
                    ? "bg-primary/20 text-primary border border-primary/40 font-bold"
                    : "text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                {tag === "Affordable" ? "From UGX 5,000" : tag}
              </button>
            ))}
          </div>

          {/* Price Brackets */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">
              Budget:
            </span>
            {[
              { id: "all", label: "All Prices" },
              { id: "under-25k", label: "< 25k" },
              { id: "25k-100k", label: "25k - 100k" },
              { id: "above-100k", label: "> 100k" },
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedPrice(b.id as PriceFilter)}
                className={`rounded-full px-2.5 py-0.5 text-xs transition-all ${
                  selectedPrice === b.id
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/40">
          <span>
            Showing <strong className="text-foreground">{filteredProducts.length}</strong> of{" "}
            {products.length} perfumes
          </span>
          {(searchQuery ||
            selectedType !== "All" ||
            selectedTag !== "All" ||
            selectedPrice !== "all") && (
            <button
              onClick={resetFilters}
              className="text-primary hover:underline font-medium flex items-center gap-1"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center max-w-lg mx-auto">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/25 text-primary mx-auto mb-4">
            <Droplets size={28} />
          </div>
          <h3 className="font-display text-2xl font-bold">No perfumes match your search</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your search keywords or removing the price and category filters.
          </p>
          <button
            onClick={resetFilters}
            className="mt-6 rounded-full bg-primary px-6 py-2.5 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-gold hover:scale-105 transition-transform"
          >
            Show All Perfumes
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
            />
          ))}
        </div>
      )}
    </section>
  );
}
