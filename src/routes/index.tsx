import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  ShieldCheck,
  Shield,
  Truck,
  Droplets,
} from "lucide-react";
import heroPerfume from "@/assets/hero-perfume.jpg";
import aboutFlosh from "@/assets/about-flosh.jpg";
import floshPortrait from "@/assets/flosh-portrait.jpg";

import { useStore } from "../hooks/useStore";
import { ShopSection } from "../components/ShopSection";
import { ProductDetailModal } from "../components/ProductDetailModal";
import { CartDrawer } from "../components/CartDrawer";
import { CheckoutModal } from "../components/CheckoutModal";
import { AdminDashboard } from "../components/AdminDashboard";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, formatUGX } from "../lib/store";
import { Product } from "../types/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flosh Cents | Luxury Perfumes & Online Shop Kampala" },
      {
        name: "description",
        content:
          "Flosh Cents is a luxury fragrance house in Kampala, Uganda offering premium oil perfumes, spray perfumes, live stock management, and online ordering.",
      },
      { property: "og:title", content: "Flosh Cents | Luxury Perfumes & Online Shop Kampala" },
      {
        property: "og:description",
        content:
          "Explore handcrafted perfume oils and sprays from UGX 5,000 to UGX 200,000 with same-day Kampala delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Shop Perfumes", href: "#shop" },
  { label: "About Flosh", href: "#about" },
  { label: "Why Flosh", href: "#why-us" },
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
      { threshold: 0.12 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
}

function Header({ cartCount, onOpenCart, onOpenAdmin }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "glass-panel shadow-lg border-b border-border/80 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 font-display text-2xl font-bold tracking-wide"
        >
          <span className="gold-text">Flosh</span> <span className="text-foreground">Cents</span>
          <span className="hidden sm:inline-block rounded-full bg-primary/15 border border-primary/30 px-2 py-0.5 text-[10px] font-bold text-primary tracking-widest uppercase">
            Kampala
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-bold tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          {/* Owner Admin Portal Button */}
          <button
            onClick={onOpenAdmin}
            title="Owner Stock & Orders Dashboard"
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/20 hover:border-primary/50 transition-all"
          >
            <Shield size={14} />
            <span className="hidden sm:inline">Owner</span> Admin
          </button>

          {/* Cart Bag Button */}
          <button
            onClick={onOpenCart}
            aria-label="Open shopping bag"
            className="relative flex items-center justify-center rounded-full bg-primary p-2.5 text-primary-foreground shadow-gold hover:scale-105 active:scale-95 transition-all"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[11px] font-bold text-white shadow-md border-2 border-background animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="text-foreground md:hidden p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <nav className="glass-panel border-t border-border px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-bold tracking-widest text-foreground uppercase hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-border/60 flex items-center justify-between">
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenAdmin();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase"
              >
                <Shield size={14} /> Flosh Admin Dashboard
              </button>
              <span className="text-xs text-muted-foreground">Kampala, UG</span>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero({ onShopClick }: { onShopClick: () => void }) {
  return (
    <section id="home" className="relative flex min-h-[92vh] items-center overflow-hidden">
      <img
        src={heroPerfume}
        alt="Flosh Cents luxury amber perfume bottle glowing against a dark green backdrop"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-10">
        <div className="max-w-2xl">
          <div className="reveal is-visible mb-6 flex items-center gap-3">
            <span className="gold-line h-px w-12" />
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
              Kampala · Uganda
            </span>
          </div>

          <h1 className="font-display text-5xl leading-[1.05] font-medium sm:text-6xl lg:text-7xl">
            Fragrance That Tells <em className="gold-text not-italic">Your Story</em>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Artisanal spray perfumes and concentrated perfume oils crafted for elegance and
            presence. From pocket gems at <strong>UGX 5,000</strong> to signature flacons at{" "}
            <strong>UGX 200,000</strong>.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onShopClick}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-xs font-bold tracking-widest text-primary-foreground uppercase shadow-gold transition-all hover:scale-105"
            >
              <ShoppingBag size={16} />
              Shop Perfumes
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hello Flosh! I'm visiting the Flosh Cents store and would like to order a fragrance.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card/60 backdrop-blur px-8 py-4 text-xs font-bold tracking-widest text-primary uppercase transition-colors hover:bg-primary/10"
            >
              <MessageCircle size={16} />
              WhatsApp Consultation
            </a>
          </div>

          {/* Quick Perks Pill */}
          <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-muted-foreground pt-4 border-t border-border/40">
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-primary" /> Same-day delivery in Kampala
            </span>
            <span className="flex items-center gap-1.5">
              <Droplets size={14} className="text-primary" /> Pure concentrated perfume oils
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-primary" /> Live stock & real-time inventory
            </span>
          </div>
        </div>
      </div>

      {/* Floating Review Card */}
      <div className="animate-float absolute right-10 bottom-12 hidden lg:block">
        <div className="glass-panel rounded-2xl p-5 border border-primary/30 max-w-xs shadow-2xl">
          <div className="flex items-center gap-1.5 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
          <p className="mt-2 text-xs font-medium text-foreground leading-snug">
            "The Vanilla Silk Oil and Royal Bloom are divine! Long lasting and the Kampala delivery
            was so fast."
          </p>
          <span className="mt-2 text-[10px] text-muted-foreground uppercase tracking-wider block font-semibold">
            — Sharon M., Kololo
          </span>
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
        <div className="reveal relative pb-10">
          <div className="absolute -inset-4 rounded-3xl border border-primary/25" />
          <img
            src="/IMG-20260902-WA0057.jpg"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== floshPortrait && !target.src.endsWith(floshPortrait)) {
                target.src = floshPortrait;
              }
            }}
            alt="Flosh, founder and perfumer of Flosh Cents, smiling in a sunlit botanical garden in Kampala"
            width={896}
            height={1200}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="relative aspect-[3/4] w-full rounded-3xl object-cover object-top shadow-2xl"
          />
          <div className="glass-panel absolute -bottom-4 left-6 rounded-2xl px-6 py-4 border border-primary/30 shadow-xl">
            <p className="font-display text-lg font-bold text-primary">Flosh</p>
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
            Flosh Cents is a luxury fragrance house based in Kampala, Uganda. Founded by Flosh, our
            mission is to craft evocative scents that express personality, confidence and
            unforgettable memories.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Every bottle is blended with premium oils and inspired by the natural beauty and vibrant
            pulse of Kampala — from morning rain over the hills to intimate midnight soirees.
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm text-primary font-medium">
            <MapPin size={18} />
            <span className="tracking-wide">Kampala, Uganda · Direct Store & Workshop</span>
          </div>

          <a
            href="#shop"
            className="group mt-8 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase"
          >
            Explore the perfumes
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
    title: "Long Lasting Longevity",
    text: "Formulated with high-concentration essential oils that remain vibrant from morning until midnight.",
  },
  {
    icon: Leaf,
    title: "African Botanicals",
    text: "Rich notes of Damascus rose, golden amber, oud, citrus and lush figs blended with care.",
  },
  {
    icon: Sparkles,
    title: "Flexible UGX Pricing",
    text: "From portable pocket attars at UGX 5,000 to bespoke grand flacons up to UGX 200,000.",
  },
];

function Features() {
  return (
    <section id="why-us" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="reveal grid gap-6 rounded-3xl border border-border bg-card p-10 sm:grid-cols-3 shadow-xl">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="text-center p-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 text-primary mb-4">
              <feature.icon size={24} />
            </div>
            <h3 className="font-display text-xl font-bold">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="reveal relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center sm:p-16">
        <img
          src={aboutFlosh}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-card/90 via-card/85 to-card" />
        <div className="animate-glow-pulse absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative">
          <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
            Order & Inquire
          </span>
          <h2 className="font-display mt-3 text-4xl font-medium sm:text-5xl">
            Connect Directly with <span className="gold-text">Flosh</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted-foreground text-sm sm:text-base">
            Need a recommendation for a wedding, gift, or everyday signature? Message Flosh directly
            on WhatsApp for immediate assistance and swift Kampala delivery.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hello Flosh Cents! I'd like to consult on fragrance selection and place an order.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-8 py-4 text-xs font-bold tracking-widest text-white uppercase shadow-lg transition-transform hover:scale-105"
            >
              <MessageCircle size={18} />
              WhatsApp Flosh ({WHATSAPP_DISPLAY})
            </a>
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-8 py-4 text-xs font-bold tracking-widest text-primary uppercase transition-colors hover:bg-primary/10"
            >
              <Phone size={16} />
              Call {WHATSAPP_DISPLAY}
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
            <MapPin size={15} className="text-primary" />
            <span>Kampala Delivery · Cash on Delivery & Mobile Money accepted</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onOpenAdmin }: { onOpenAdmin: () => void }) {
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10 space-y-6">
        <p className="font-display text-3xl font-semibold">
          <span className="gold-text">Flosh</span> Cents
        </p>
        <p className="text-sm text-muted-foreground">
          Luxury Perfumes & Fragrance House · Kampala, Uganda
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-xs font-bold tracking-wider uppercase text-muted-foreground">
          <a href="#home" className="hover:text-primary transition-colors">
            Home
          </a>
          <a href="#shop" className="hover:text-primary transition-colors">
            Shop Perfumes
          </a>
          <a href="#about" className="hover:text-primary transition-colors">
            About Flosh
          </a>
          <a href="#contact" className="hover:text-primary transition-colors">
            Contact
          </a>
          <button
            onClick={onOpenAdmin}
            className="text-primary hover:underline font-bold flex items-center gap-1"
          >
            <Shield size={12} /> Flosh Admin Portal
          </button>
        </div>

        <div className="gold-line mx-auto mt-6 h-px w-32" />
        <p className="text-xs tracking-widest text-muted-foreground uppercase">
          © {new Date().getFullYear()} Flosh Cents — All rights reserved · Handcrafted in Kampala
        </p>
      </div>
    </footer>
  );
}

function Index() {
  useScrollReveal();

  const {
    products,
    orders,
    cart,
    cartTotal,
    cartCount,
    selectedProduct,
    isCartOpen,
    isCheckoutOpen,
    isAdminOpen,
    orderSuccess,
    setSelectedProduct,
    setIsCartOpen,
    setIsCheckoutOpen,
    setIsAdminOpen,
    setOrderSuccess,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    handleSaveProduct,
    handleDeleteProduct,
    handleUpdateStock,
    handleCreateOrder,
    handleUpdateOrderStatus,
  } = useStore();

  const handleShopScroll = () => {
    const el = document.getElementById("shop");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleOrderNowFromModal = (product: Product, quantity: number) => {
    addToCart(product, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Persistent Navigation Header */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Hero with CTA */}
      <Hero onShopClick={handleShopScroll} />

      {/* Customer Perfume Shop & Live Inventory Catalog */}
      <ShopSection
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p) => addToCart(p, 1)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* About Flosh Section (preserves exact requested photo) */}
      <About />

      {/* Why Flosh Cents Features */}
      <Features />

      {/* Contact & Direct Ordering */}
      <Contact />

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Product Details Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, qty) => {
          addToCart(product, qty);
          setSelectedProduct(null);
        }}
        onOrderNow={handleOrderNowFromModal}
      />

      {/* Slide-in Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout & Order Confirmation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        onSubmitOrder={handleCreateOrder}
        orderSuccess={orderSuccess}
        onClearOrderSuccess={() => setOrderSuccess(null)}
      />

      {/* Flosh Admin Dashboard: Products, Stock & Customer Orders */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        orders={orders}
        onSaveProduct={handleSaveProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateStock={handleUpdateStock}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />
    </main>
  );
}
