import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Clock3,
  Leaf,
  Sparkles,
  ShoppingBag,
  Menu,
  X,
  MapPin,
  Star,
  ArrowRight,
  MessageCircle,
  Phone,
  Plus,
  ImagePlus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "256753325780";
const WHATSAPP_DISPLAY = "0753 325 780";
const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

import heroPerfume from "@/assets/hero-perfume.jpg";
import royalBloom from "@/assets/royal-bloom.jpg";
import midnightEssence from "@/assets/midnight-essence.jpg";
import natureSpirit from "@/assets/nature-spirit.jpg";
import aboutFlosh from "@/assets/about-flosh.jpg";
import floshPortrait1 from "@/assets/flosh-portrait-1.jpg.asset.json";
import floshPortrait2 from "@/assets/flosh-portrait-2.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flosh Cents | Luxury Fragrances Kampala" },
      {
        name: "description",
        content:
          "Flosh Cents is a luxury fragrance house in Kampala, Uganda. Premium perfumes crafted for elegance, confidence and unforgettable moments.",
      },
      { property: "og:title", content: "Flosh Cents | Luxury Fragrances Kampala" },
      {
        property: "og:description",
        content:
          "Premium perfumes crafted in Kampala, Uganda — elegance, confidence and unforgettable moments in every bottle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CATEGORIES = [
  "Oil Perfumes",
  "Spray Perfumes",
  "Designer Inspired",
  "Body Mists",
  "Gift Sets",
] as const;

type Category = (typeof CATEGORIES)[number];

type Product = {
  name: string;
  notes: string;
  description: string;
  price: number;
  size: string;
  category: Category;
  stock: number;
  image: string;
  tag: string;
  custom?: boolean;
};

const ugx = (n: number) => `UGX ${n.toLocaleString("en-UG")}`;

const DEFAULT_PRODUCTS: Product[] = [
  {
    name: "Royal Bloom",
    notes: "Rose · Peony · Warm Amber",
    description: "A luxury floral fragrance that opens soft and lingers like silk.",
    price: 150000,
    size: "100ml",
    category: "Spray Perfumes",
    stock: 12,
    image: royalBloom,
    tag: "Best Seller",
  },
  {
    name: "Midnight Essence",
    notes: "Oud · Black Pepper · Vetiver",
    description: "A deep masculine scent, bold and unforgettable after dark.",
    price: 180000,
    size: "100ml",
    category: "Designer Inspired",
    stock: 8,
    image: midnightEssence,
    tag: "Signature",
  },
  {
    name: "Nature Spirit",
    notes: "Citrus · Green Leaves · Musk",
    description: "A fresh natural fragrance inspired by Uganda's lush landscapes.",
    price: 120000,
    size: "75ml",
    category: "Spray Perfumes",
    stock: 15,
    image: natureSpirit,
    tag: "New",
  },
  {
    name: "One PM",
    notes: "Bergamot · Lavender · Cedar",
    description: "The crisp daytime classic — clean, sharp and office ready.",
    price: 200000,
    size: "100ml",
    category: "Designer Inspired",
    stock: 6,
    image: midnightEssence,
    tag: "Premium",
  },
  {
    name: "Golden Oud Oil",
    notes: "Pure Oud · Saffron · Sandalwood",
    description: "Concentrated attar oil — a single dab lasts the entire day.",
    price: 35000,
    size: "6ml roll-on",
    category: "Oil Perfumes",
    stock: 30,
    image: royalBloom,
    tag: "Oil",
  },
  {
    name: "Vanilla Silk Oil",
    notes: "Vanilla · Tonka · Soft Musk",
    description: "Warm sweet body oil perfume, gentle on the skin and long lasting.",
    price: 15000,
    size: "3ml roll-on",
    category: "Oil Perfumes",
    stock: 40,
    image: natureSpirit,
    tag: "Affordable",
  },
  {
    name: "Pocket Attar Mini",
    notes: "Rose Attar · Amber",
    description: "Handbag-size oil perfume — the perfect first Flosh Cents scent.",
    price: 5000,
    size: "1.5ml",
    category: "Oil Perfumes",
    stock: 60,
    image: royalBloom,
    tag: "From UGX 5,000",
  },
  {
    name: "Garden Fresh Mist",
    notes: "Green Apple · Jasmine · Cotton",
    description: "Light refreshing body mist for everyday freshness.",
    price: 25000,
    size: "150ml",
    category: "Body Mists",
    stock: 25,
    image: natureSpirit,
    tag: "Everyday",
  },
  {
    name: "Flosh Duo Gift Set",
    notes: "Spray 50ml + Oil 6ml",
    description: "A wrapped gift set pairing a signature spray with a matching oil.",
    price: 95000,
    size: "Set",
    category: "Gift Sets",
    stock: 10,
    image: midnightEssence,
    tag: "Gift",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-panel shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#home" className="font-display text-2xl font-semibold tracking-wide">
          <span className="gold-text">Flosh</span>{" "}
          <span className="text-foreground">Cents</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#shop"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Shop Now
          </a>
        </nav>

        <button
          className="text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav className="glass-panel border-t border-border px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium tracking-widest text-foreground uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <img
        src={heroPerfume}
        alt="Flosh Cents luxury amber perfume bottle glowing against a dark green backdrop"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-20 lg:px-10">
        <div className="max-w-2xl">
          <div className="reveal is-visible mb-6 flex items-center gap-3">
            <span className="gold-line h-px w-12" />
            <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
              Kampala · Uganda
            </span>
          </div>

          <h1 className="font-display text-5xl leading-[1.05] font-medium sm:text-6xl lg:text-7xl">
            Fragrance That Tells{" "}
            <em className="gold-text not-italic">Your Story</em>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Premium perfumes crafted for elegance, confidence and unforgettable
            moments — bottled in the heart of Kampala.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold tracking-wide text-primary-foreground uppercase shadow-gold transition-transform hover:scale-105"
            >
              <ShoppingBag size={18} />
              Shop Collection
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#about"
              className="rounded-full border border-primary/40 px-8 py-4 text-sm font-semibold tracking-wide text-primary uppercase transition-colors hover:bg-primary/10"
            >
              Our Story
            </a>
          </div>
        </div>
      </div>

      <div className="animate-float absolute right-10 bottom-10 hidden lg:block">
        <div className="glass-panel rounded-2xl px-6 py-4">
          <div className="flex items-center gap-2 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Loved by fragrance collectors across East Africa
          </p>
        </div>
      </div>
    </section>
  );
}

function Products({
  products,
  onRemove,
}: {
  products: Product[];
  onRemove: (name: string) => void;
}) {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const visible =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <section
      id="shop"
      className="relative overflow-hidden px-6 py-24 lg:px-10"
    >
      <img
        src={floshPortrait2.url}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/92 to-background" />

      <div className="relative mx-auto max-w-7xl">
      <div className="reveal mb-10 text-center">
        <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
          The Store
        </span>
        <h2 className="font-display mt-3 text-4xl font-medium sm:text-5xl">
          Perfume <span className="gold-text">Store</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Oil perfumes, sprays, designer-inspired scents and gift sets — from
          UGX 5,000 to UGX 200,000. Live stock updated by Flosh.
        </p>
        <div className="gold-line mx-auto mt-6 h-px w-40" />
      </div>

      <div className="reveal mb-12 flex flex-wrap justify-center gap-3">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-5 py-2 text-xs font-bold tracking-widest uppercase transition-colors ${
              filter === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-primary/30 text-primary hover:bg-primary/10"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product: Product, i: number) => (
          <article
            key={product.name}
            className="reveal group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-gold"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={`${product.name} perfume bottle by Flosh Cents`}
                width={800}
                height={1000}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 rounded-full bg-background/70 px-3 py-1 text-[11px] font-bold tracking-widest text-primary uppercase backdrop-blur">
                {product.tag}
              </span>
              {product.custom && (
                <button
                  onClick={() => onRemove(product.name)}
                  aria-label={`Remove ${product.name}`}
                  className="absolute top-4 right-4 rounded-full bg-background/70 p-2 text-destructive backdrop-blur transition-transform hover:scale-110"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-2xl font-medium">{product.name}</h3>
                <span className="mt-1 shrink-0 rounded-full border border-primary/30 px-2 py-1 text-[10px] font-bold tracking-widest text-primary uppercase">
                  {product.size}
                </span>
              </div>
              <p className="mt-1 text-xs tracking-widest text-primary uppercase">
                {product.notes}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              <p className="mt-3 text-xs tracking-widest text-muted-foreground uppercase">
                {product.category} ·{" "}
                {product.stock > 0 ? (
                  <span className="text-primary">{product.stock} in stock</span>
                ) : (
                  <span className="text-destructive">Sold out</span>
                )}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="font-display text-xl font-semibold text-primary">
                  {ugx(product.price)}
                </span>
                <a
                  href={whatsappLink(
                    `Hello Flosh Cents! I'd like to order ${product.name} (${product.size}) — ${ugx(product.price)}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    toast.success(`Ordering ${product.name} on WhatsApp`, {
                      description: "Flosh will confirm delivery in Kampala.",
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold tracking-wide text-primary-foreground uppercase transition-transform hover:scale-105"
                >
                  <ShoppingBag size={14} />
                  Order
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-forest py-24">
      <div className="animate-glow-pulse absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        <div className="reveal relative">
          <div className="absolute -inset-4 rounded-3xl border border-primary/25" />
          <img
            src={aboutFlosh}
            alt="Flosh, founder of Flosh Cents, in her Kampala perfume atelier"
            width={900}
            height={1100}
            loading="lazy"
            className="relative aspect-[9/11] w-full rounded-3xl object-cover"
          />
          <div className="glass-panel absolute -bottom-6 left-6 rounded-2xl px-6 py-4">
            <p className="font-display text-lg text-primary">Flosh</p>
            <p className="text-xs tracking-widest text-muted-foreground uppercase">
              Founder & Perfumer
            </p>
          </div>
        </div>

        <div className="reveal">
          <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
            Our Story
          </span>
          <h2 className="font-display mt-3 text-4xl font-medium sm:text-5xl">
            About <span className="gold-text">Flosh Cents</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Flosh Cents is a luxury fragrance brand based in Kampala, Uganda.
            Founded by Flosh, our mission is to create unique scents that
            express personality, confidence and unforgettable memories.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Every bottle is blended with premium oils and inspired by the
            richness of Africa — from blooming gardens to midnight city air.
            We believe a scent is more than perfume: it is your signature.
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm text-primary">
            <MapPin size={16} />
            <span className="tracking-wide">Kampala, Uganda</span>
          </div>

          <a
            href="#shop"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-bold tracking-widest text-primary uppercase"
          >
            Explore the collection
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: Clock3,
    title: "Long Lasting",
    text: "Blends designed to stay with you from morning to midnight.",
  },
  {
    icon: Leaf,
    title: "Inspired by Nature",
    text: "Botanical notes drawn from Uganda's rich landscapes.",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    text: "Fine oils, careful blending, elegant presentation.",
  },
];

function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="reveal grid gap-6 rounded-3xl border border-border bg-card p-10 sm:grid-cols-3">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
              <feature.icon size={24} />
            </div>
            <h3 className="font-display mt-4 text-xl font-medium">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <p className="font-display text-3xl font-semibold">
          <span className="gold-text">Flosh</span> Cents
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Luxury Perfumes · Kampala, Uganda
        </p>
        <div className="gold-line mx-auto mt-6 h-px w-32" />
        <p className="mt-6 text-xs tracking-widest text-muted-foreground uppercase">
          © 2026 Flosh Cents — All rights reserved
        </p>
      </div>
    </footer>
  );
}

function AddPerfume({ onAdd }: { onAdd: (p: Product) => void }) {
  const [form, setForm] = useState({
    name: "",
    notes: "",
    description: "",
    price: "",
    size: "",
    stock: "",
    category: CATEGORIES[0] as Category,
    tag: "New",
  });
  const [image, setImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const onImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price.trim()) {
      toast.error("Please add at least a name and price.");
      return;
    }
    if (!image) {
      toast.error("Please upload a photo of the perfume.");
      return;
    }
    const price = Number(form.price.replace(/[^\d]/g, ""));
    if (!price) {
      toast.error("Enter the price in numbers, e.g. 25000.");
      return;
    }
    onAdd({
      name: form.name.trim(),
      notes: form.notes.trim() || "Signature Blend",
      description: form.description.trim() || "A new Flosh Cents creation.",
      price,
      size: form.size.trim() || "100ml",
      category: form.category,
      stock: Number(form.stock.replace(/[^\d]/g, "")) || 1,
      image,
      tag: form.tag.trim() || "New",
      custom: true,
    });
    setForm({
      name: "",
      notes: "",
      description: "",
      price: "",
      size: "",
      stock: "",
      category: CATEGORIES[0] as Category,
      tag: "New",
    });
    setImage(null);
    if (fileRef.current) fileRef.current.value = "";
    toast.success(`${form.name} added to the collection`, {
      description: "Saved in this browser.",
    });
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none";

  return (
    <section id="add-perfume" className="relative overflow-hidden bg-forest py-24">
      <img
        src={floshPortrait1.url}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest via-forest/90 to-forest" />
      <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
        <div className="reveal mb-12 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
            Stock Manager
          </span>
          <h2 className="font-display mt-3 text-4xl font-medium sm:text-5xl">
            Add Stock to the <span className="gold-text">Store</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Flosh adds new perfumes here — they appear instantly in the store
            above for customers to see and order.
          </p>
          <div className="gold-line mx-auto mt-6 h-px w-40" />
        </div>


        <form
          onSubmit={submit}
          className="reveal glass-panel space-y-5 rounded-3xl p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <input
              className={inputCls}
              placeholder="Perfume name *"
              value={form.name}
              onChange={update("name")}
            />
            <input
              className={inputCls}
              placeholder="Price (e.g. UGX 150,000) *"
              value={form.price}
              onChange={update("price")}
            />
            <input
              className={inputCls}
              placeholder="Notes (e.g. Rose · Amber · Musk)"
              value={form.notes}
              onChange={update("notes")}
            />
            <input
              className={inputCls}
              placeholder="Tag (e.g. New, Best Seller)"
              value={form.tag}
              onChange={update("tag")}
            />
          </div>
          <textarea
            className={`${inputCls} min-h-24 resize-y`}
            placeholder="Short description"
            value={form.description}
            onChange={update("description")}
          />

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-xs font-bold tracking-widest text-primary uppercase transition-colors hover:bg-primary/10"
            >
              <ImagePlus size={16} />
              {image ? "Change Photo" : "Upload Photo *"}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImage}
            />
            {image && (
              <img
                src={image}
                alt="New perfume preview"
                className="h-16 w-16 rounded-xl border border-primary/40 object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold tracking-wide text-primary-foreground uppercase shadow-gold transition-transform hover:scale-105"
          >
            <Plus size={16} />
            Add to Collection
          </button>
        </form>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="reveal relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center sm:p-16">
        <div className="animate-glow-pulse absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
          Get in Touch
        </span>
        <h2 className="font-display mt-3 text-4xl font-medium sm:text-5xl">
          Order on <span className="gold-text">WhatsApp</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted-foreground">
          Message Flosh directly to order, ask about a scent, or book a
          fragrance consultation in Kampala.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={whatsappLink("Hello Flosh Cents! I'd like to order a perfume.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold tracking-wide text-primary-foreground uppercase shadow-gold transition-transform hover:scale-105"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-8 py-4 text-sm font-semibold tracking-wide text-primary uppercase transition-colors hover:bg-primary/10"
          >
            <Phone size={16} />
            {WHATSAPP_DISPLAY}
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <MapPin size={16} className="text-primary" />
          Kampala, Uganda
        </div>
      </div>
    </section>
  );
}

const STORAGE_KEY = "flosh-cents-custom-products";

function loadCustomProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

function Index() {
  useScrollReveal();
  const [customProducts, setCustomProducts] = useState<Product[]>([]);

  useEffect(() => {
    setCustomProducts(loadCustomProducts());
  }, []);

  const addProduct = (p: Product) => {
    setCustomProducts((prev) => {
      const next = [...prev, p];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        toast.error("Image too large to save in this browser.");
      }
      return next;
    });
  };

  const removeProduct = (name: string) => {
    setCustomProducts((prev) => {
      const next = prev.filter((p) => p.name !== name);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    toast.success("Perfume removed from the collection.");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Products products={[...DEFAULT_PRODUCTS, ...customProducts]} onRemove={removeProduct} />
      <AddPerfume onAdd={addProduct} />
      <About />
      <Features />
      <Contact />
      <Footer />
    </main>
  );
}
