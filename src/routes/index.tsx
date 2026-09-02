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

type Product = {
  name: string;
  notes: string;
  description: string;
  price: string;
  image: string;
  tag: string;
  custom?: boolean;
};

const DEFAULT_PRODUCTS: Product[] = [
  {
    name: "Royal Bloom",
    notes: "Rose · Peony · Warm Amber",
    description: "A luxury floral fragrance that opens soft and lingers like silk.",
    price: "UGX 150,000",
    image: royalBloom,
    tag: "Best Seller",
  },
  {
    name: "Midnight Essence",
    notes: "Oud · Black Pepper · Vetiver",
    description: "A deep masculine scent, bold and unforgettable after dark.",
    price: "UGX 180,000",
    image: midnightEssence,
    tag: "Signature",
  },
  {
    name: "Nature Spirit",
    notes: "Citrus · Green Leaves · Musk",
    description: "A fresh natural fragrance inspired by Uganda's lush landscapes.",
    price: "UGX 120,000",
    image: natureSpirit,
    tag: "New",
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
  return (
    <section id="shop" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="reveal mb-14 text-center">
        <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
          The Collection
        </span>
        <h2 className="font-display mt-3 text-4xl font-medium sm:text-5xl">
          Customer <span className="gold-text">Favourites</span>
        </h2>
        <div className="gold-line mx-auto mt-6 h-px w-40" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product: Product, i: number) => (
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
            </div>

            <div className="p-6">
              <h3 className="font-display text-2xl font-medium">{product.name}</h3>
              <p className="mt-1 text-xs tracking-widest text-primary uppercase">
                {product.notes}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="font-display text-xl font-semibold text-primary">
                  {product.price}
                </span>
                <button
                  onClick={() =>
                    toast.success(`${product.name} added to your bag`, {
                      description: "Checkout & delivery options coming soon.",
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold tracking-wide text-primary-foreground uppercase transition-transform hover:scale-105"
                >
                  <ShoppingBag size={14} />
                  Add to Bag
                </button>
              </div>
            </div>
          </article>
        ))}
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
    <footer id="contact" className="border-t border-border bg-background py-14">
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

function Index() {
  useScrollReveal();
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Products />
      <About />
      <Features />
      <Footer />
    </main>
  );
}
