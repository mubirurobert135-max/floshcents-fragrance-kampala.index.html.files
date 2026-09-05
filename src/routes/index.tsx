import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
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
  Package,
  Flower2,
  Zap,
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
import { TrackOrderModal } from "../components/TrackOrderModal";
import { FloshLogo } from "../components/FloshLogo";
import {
  BUSINESS_NAME,
  BUSINESS_OWNER,
  BUSINESS_LOCATION,
  BUSINESS_TAGLINE,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  SUE_PHONE_NUMBER,
  SUE_PHONE_DISPLAY,
  SUE_NAME,
  SUE_ROLE,
  formatUGX,
} from "../lib/store";
import { Product } from "../types/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flosh Scents | Scent of Confidence • Essence of Luxury" },
      {
        name: "description",
        content:
          "Flosh Scents is a luxury fragrance house in Kampala, Uganda. Premium perfumes, Eau de Parfum, and concentrated oils. Find your signature.",
      },
      { property: "og:title", content: "Flosh Scents | Scent of Confidence • Essence of Luxury" },
      {
        property: "og:description",
        content: "Explore the official Flosh Scents collection with same-day Kampala delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Simplified Navigation
const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "SHOP", href: "#shop" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
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
  onOpenTrack: () => void;
}

function Header({ cartCount, onOpenCart, onOpenAdmin, onOpenTrack }: HeaderProps) {
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
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-b border-[#D4AF37]/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Official Flosh Scents Gold & Black Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <FloshLogo size="sm" showTagline={false} />
        </a>

        {/* Desktop Simplified Navigation: HOME | SHOP | ABOUT | CONTACT */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-bold tracking-[0.25em] text-foreground/80 uppercase transition-colors hover:text-[#F3E5AB]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Track Order */}
          <button
            onClick={onOpenTrack}
            title="Track Order Status"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-[#D4AF37]/40 transition-all"
          >
            <Truck size={13} className="text-[#D4AF37]" />
            <span>Track</span>
          </button>

          {/* Owner Admin Portal */}
          <button
            onClick={onOpenAdmin}
            title="Owner Stock & Orders Dashboard"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#F3E5AB] hover:bg-[#D4AF37]/20 transition-all"
          >
            <Shield size={13} />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* Shopping Bag Button */}
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
        <nav className="bg-black/95 backdrop-blur-xl border-t border-[#D4AF37]/30 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-bold tracking-[0.2em] text-foreground uppercase hover:text-[#F3E5AB] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                setOpen(false);
                onOpenTrack();
              }}
              className="text-left text-sm font-bold tracking-[0.2em] text-[#D4AF37] uppercase flex items-center gap-2 pt-2 border-t border-white/10"
            >
              <Truck size={15} /> Track My Order
            </button>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenAdmin();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#F3E5AB] uppercase"
              >
                <Shield size={14} /> Flosh Admin Portal
              </button>
              <span className="text-xs text-muted-foreground">Kampala, UG</span>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero({
  onShopClick,
  onOrderNowClick,
}: {
  onShopClick: () => void;
  onOrderNowClick: () => void;
}) {
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-black text-center"
    >
      {/* Background imagery with deep luxury black treatment */}
      <img
        src={heroPerfume}
        alt="Flosh Scents luxury fragrance bottle glowing in darkness"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-35"
        priority="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/80 to-black/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,rgba(0,0,0,0.85)_75%)]" />

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pt-32 pb-20 flex flex-col items-center">
        {/* Kampala, Uganda Gold Badge */}
        <div className="reveal is-visible mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-black/60 px-4 py-1.5 text-xs font-bold tracking-[0.25em] text-[#F3E5AB] uppercase backdrop-blur-md shadow-sm">
          <MapPin size={13} className="text-[#D4AF37]" />
          <span>Kampala, Uganda</span>
        </div>

        {/* Prominent Official Flosh Scents Gold & Black Emblem */}
        <div className="mb-6 flex flex-col items-center">
          <FloshLogo size="hero" showTagline={true} className="flex-col text-center" />
        </div>

        {/* Tagline */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal uppercase tracking-wider text-foreground">
          FIND YOUR <span className="gold-text">SIGNATURE</span>
        </h1>

        {/* Subhead */}
        <p className="mt-4 max-w-xl text-lg sm:text-xl font-light tracking-wide text-foreground/85">
          Premium scents. Unforgettable presence.
        </p>

        {/* Action Buttons: SHOP COLLECTION | ORDER NOW */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onShopClick}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-xs font-bold tracking-[0.2em] text-primary-foreground uppercase shadow-gold transition-all hover:scale-105 hover:bg-primary/90"
          >
            <ShoppingBag size={16} />
            <span>SHOP COLLECTION</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onOrderNowClick}
            className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/60 bg-black/70 px-8 py-4 text-xs font-bold tracking-[0.2em] text-[#F3E5AB] uppercase backdrop-blur transition-all hover:bg-[#D4AF37]/20 hover:scale-105"
          >
            <Zap size={16} className="text-[#D4AF37]" />
            <span>ORDER NOW</span>
          </button>
        </div>

        {/* Subtle delivery highlight */}
        <p className="mt-8 text-xs tracking-widest text-muted-foreground uppercase flex items-center justify-center gap-2">
          <Truck size={14} className="text-[#D4AF37]" />
          <span>Same-Day Kampala Delivery • 100% Authentic Scents</span>
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black/60 py-24 border-t border-border/60"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Founder Portrait */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 rounded-3xl border border-[#D4AF37]/30" />
            <img
              src="/IMG-20260902-WA0057.jpg"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== floshPortrait && !target.src.endsWith(floshPortrait)) {
                  target.src = floshPortrait;
                }
              }}
              alt="Flosh, founder of Flosh Scents"
              width={896}
              height={1200}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="relative aspect-[3/4] w-full rounded-2xl object-cover object-top shadow-2xl"
            />
            <div className="absolute -bottom-3 left-4 rounded-xl bg-black/90 border border-[#D4AF37]/40 px-5 py-2.5 backdrop-blur-md shadow-xl">
              <p className="font-display text-base font-bold text-[#F3E5AB]">Flosh</p>
              <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                Owner & Founder
              </p>
            </div>
          </div>

          {/* Minimal Luxury Story */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">
              <Sparkles size={14} />
              <span>ABOUT FLOSH SCENTS</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground uppercase leading-tight">
              Luxury Scents. <br />
              <span className="gold-text">Confident Presence.</span>
            </h2>

            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              <MapPin size={14} className="text-[#D4AF37]" />
              <span>Kampala, Uganda</span>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground/90 font-light">
              Flosh Scents is a Kampala-born fragrance boutique dedicated to bespoke scent profiles,
              uncompromising oil concentration, and memorable sillage. Every creation is crafted to
              elevate confidence and leave an indelible impression.
            </p>

            {/* Direct Leadership Contacts: SUE (Director) & Flosh (Owner) */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* SUE - Director with Rose Flower */}
              <div className="rounded-2xl border border-rose-500/40 bg-rose-950/20 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-rose-300 text-xs font-bold tracking-wider uppercase mb-1">
                  <span>🌹</span>
                  <span>{SUE_NAME}</span>
                </div>
                <p className="text-xs text-rose-200/90 font-medium">{SUE_ROLE}</p>
                <a
                  href={`tel:+${SUE_PHONE_NUMBER}`}
                  className="mt-2 text-sm font-mono font-bold text-white hover:text-rose-300 flex items-center gap-1.5 transition-colors"
                >
                  <Phone size={13} className="text-rose-400" />
                  <span>0760370341</span>
                </a>
              </div>

              {/* Flosh - Owner */}
              <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-[#F3E5AB] text-xs font-bold tracking-wider uppercase mb-1">
                  <Sparkles size={13} />
                  <span>{BUSINESS_OWNER}</span>
                </div>
                <p className="text-xs text-muted-foreground font-medium">Founder & Perfumer</p>
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="mt-2 text-sm font-mono font-bold text-white hover:text-[#F3E5AB] flex items-center gap-1.5 transition-colors"
                >
                  <Phone size={13} className="text-[#D4AF37]" />
                  <span>{WHATSAPP_DISPLAY}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-8 sm:p-12 text-center">
        <img
          src={aboutFlosh}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">
            CONTACT & ORDERS
          </span>
          <h2 className="font-display mt-2 text-3xl sm:text-4xl font-normal text-foreground uppercase">
            CONNECT WITH <span className="gold-text">FLOSH SCENTS</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
            Kampala, Uganda • Quick orders, delivery coordination & fragrance advice.
          </p>

          {/* Contact Cards: SUE (Director) & Flosh */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            {/* SUE - Director of Flosh Scents with Rose Flower */}
            <div className="relative overflow-hidden rounded-2xl border border-rose-500/40 bg-gradient-to-b from-rose-950/30 to-black/80 p-5 shadow-lg flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 px-3 py-0.5 text-xs font-bold text-rose-300 uppercase">
                  <span role="img" aria-label="rose flower">
                    🌹
                  </span>
                  <span>{SUE_NAME}</span>
                </div>
                <h3 className="font-display mt-2 text-xl font-bold text-foreground flex items-center gap-2">
                  <span>{SUE_NAME}</span>
                  <span role="img" aria-label="rose flower">
                    🌹
                  </span>
                </h3>
                <p className="text-xs font-semibold tracking-wider text-rose-300 uppercase">
                  {SUE_ROLE}
                </p>
                <p className="mt-1 text-xs text-muted-foreground font-mono">0760370341</p>
              </div>

              <div className="mt-5 flex gap-2">
                <a
                  href={`https://wa.me/${SUE_PHONE_NUMBER}?text=${encodeURIComponent(
                    "Hello Sue! 🌹 I am contacting you regarding Flosh Scents.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 px-3 py-2 text-xs font-bold tracking-wider text-white uppercase transition-transform hover:scale-105"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp SUE</span>
                </a>
                <a
                  href={`tel:+${SUE_PHONE_NUMBER}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-rose-400/40 bg-rose-500/10 hover:bg-rose-500/20 px-3.5 py-2 text-xs font-bold tracking-wider text-rose-200 uppercase transition-colors"
                >
                  <Phone size={13} />
                  <span>Call</span>
                </a>
              </div>
            </div>

            {/* FLOSH - Owner */}
            <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-b from-[#D4AF37]/10 to-black/80 p-5 shadow-lg flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 px-3 py-0.5 text-xs font-bold text-[#F3E5AB] uppercase">
                  <Sparkles size={12} />
                  <span>{BUSINESS_OWNER}</span>
                </div>
                <h3 className="font-display mt-2 text-xl font-bold text-foreground">
                  {BUSINESS_OWNER}
                </h3>
                <p className="text-xs font-semibold tracking-wider text-[#C5A059] uppercase">
                  Owner & Perfumer
                </p>
                <p className="mt-1 text-xs text-muted-foreground font-mono">{WHATSAPP_DISPLAY}</p>
              </div>

              <div className="mt-5 flex gap-2">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hello Flosh Scents! I would like to place an order.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 px-3 py-2 text-xs font-bold tracking-wider text-white uppercase transition-transform hover:scale-105"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Flosh</span>
                </a>
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 px-3.5 py-2 text-xs font-bold tracking-wider text-[#F3E5AB] uppercase transition-colors"
                >
                  <Phone size={13} />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({
  onOpenAdmin,
  onOpenTrack,
}: {
  onOpenAdmin: () => void;
  onOpenTrack?: () => void;
}) {
  return (
    <footer className="border-t border-border/60 bg-black py-12">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10 space-y-4">
        <div className="flex justify-center">
          <FloshLogo size="sm" showTagline={false} />
        </div>

        <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A059] uppercase">
          {BUSINESS_TAGLINE}
        </p>
        <p className="text-xs text-muted-foreground">{BUSINESS_LOCATION}</p>

        {/* Minimal Nav Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-bold tracking-wider uppercase text-muted-foreground pt-2">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-[#F3E5AB] transition-colors">
              {link.label}
            </a>
          ))}
          {onOpenTrack && (
            <button
              onClick={onOpenTrack}
              className="hover:text-[#F3E5AB] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Truck size={12} className="text-[#D4AF37]" /> Track Order
            </button>
          )}
          <button
            onClick={onOpenAdmin}
            className="text-[#D4AF37] hover:underline font-bold flex items-center gap-1"
          >
            <Shield size={12} /> Admin Portal
          </button>
        </div>

        <div className="gold-line mx-auto mt-4 h-px w-24" />
        <p className="text-[11px] tracking-widest text-muted-foreground uppercase">
          © {new Date().getFullYear()} {BUSINESS_NAME} · {BUSINESS_LOCATION}
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
    isTrackOpen,
    trackingOrderNumber,
    orderSuccess,
    setSelectedProduct,
    setIsCartOpen,
    setIsCheckoutOpen,
    setIsAdminOpen,
    setIsTrackOpen,
    setTrackingOrderNumber,
    openTrackingWithOrder,
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

  const handleOpenGeneralTrack = () => {
    setTrackingOrderNumber("");
    setIsTrackOpen(true);
  };

  // Direct Order Now from card: adds selected item and quantity and opens checkout immediately
  const handleOrderNow = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity);
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Persistent Navigation Header */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTrack={handleOpenGeneralTrack}
      />

      {/* Hero Section */}
      <Hero
        onShopClick={handleShopScroll}
        onOrderNowClick={() => {
          // If cart has items, open checkout directly, otherwise smooth scroll to collection
          if (cart.length > 0) {
            setIsCheckoutOpen(true);
          } else {
            handleShopScroll();
          }
        }}
      />

      {/* Product Collection (THE COLLECTION) */}
      <ShopSection
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p, qty) => addToCart(p, qty || 1)}
        onOrderNow={handleOrderNow}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTrack={(id) => (id ? openTrackingWithOrder(id) : handleOpenGeneralTrack())}
      />

      {/* Minimal About Section */}
      <About />

      {/* Minimal Contact Section */}
      <Contact />

      {/* Minimal Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} onOpenTrack={handleOpenGeneralTrack} />

      {/* Product Details Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, qty) => {
          addToCart(product, qty);
          setSelectedProduct(null);
        }}
        onOrderNow={handleOrderNow}
      />

      {/* Shopping Cart Drawer */}
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

      {/* Checkout & Instant Order Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        onSubmitOrder={handleCreateOrder}
        orderSuccess={orderSuccess}
        onClearOrderSuccess={() => setOrderSuccess(null)}
        onTrackOrder={(orderId) => openTrackingWithOrder(orderId)}
      />

      {/* Order Tracking Modal */}
      <TrackOrderModal
        isOpen={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
        initialOrderNumber={trackingOrderNumber}
        orders={orders}
        onShopClick={handleShopScroll}
      />

      {/* Owner Admin Portal */}
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
