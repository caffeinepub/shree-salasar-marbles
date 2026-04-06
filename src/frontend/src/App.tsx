import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Review {
  name: string;
  stars: number;
  text: string;
  initials: string;
}

const REVIEWS: Review[] = [
  {
    name: "Suresh Patil",
    stars: 5,
    text: "Excellent quality marble at very reasonable prices. The showroom has a huge variety of designs. Highly recommended for anyone building or renovating.",
    initials: "SP",
  },
  {
    name: "Priya Sharma",
    stars: 5,
    text: "Very professional service. The team helped us choose the perfect tiles for our home. Fast delivery and great quality. Will definitely come back.",
    initials: "PS",
  },
  {
    name: "Ravi Deshmukh",
    stars: 5,
    text: "Best marble shop in Chhatrapati Sambhajinagar! Great collection, fair prices, and very helpful staff. Our house looks beautiful now.",
    initials: "RD",
  },
  {
    name: "Anita Kulkarni",
    stars: 4,
    text: "Good variety of granite and marble options. The staff was patient and knowledgeable. Overall a great experience buying from Shree Salasar Marbles.",
    initials: "AK",
  },
];

const PRODUCTS = [
  {
    image: "/assets/generated/product-marble.dim_800x600.jpg",
    title: "Natural Marble",
    description:
      "Elegant Italian and Indian marble for floors, walls, and countertops",
    tag: "Premium",
  },
  {
    image: "/assets/generated/product-granite.dim_800x600.jpg",
    title: "Premium Granite",
    description:
      "Durable and beautiful granite slabs for kitchens, bathrooms, and more",
    tag: "Bestseller",
  },
  {
    image: "/assets/generated/product-tiles.dim_800x600.jpg",
    title: "Designer Tiles",
    description:
      "Wide variety of ceramic, vitrified, and mosaic tiles for every taste",
    tag: "New Arrivals",
  },
];

const WHY_US = [
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
        />
      </svg>
    ),
    title: "Quality Assured",
    desc: "Every stone is hand-selected for superior quality, consistency, and natural beauty.",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
        />
      </svg>
    ),
    title: "Best Prices",
    desc: "Competitive pricing with no compromise on quality. Direct from source to your home.",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    ),
    title: "Expert Guidance",
    desc: "Our experienced team helps you choose the perfect material for every space.",
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
        />
      </svg>
    ),
    title: "Fast Delivery",
    desc: "Reliable delivery across Chhatrapati Sambhajinagar and surrounding regions.",
  },
];

// ─── Star Rating ──────────────────────────────────────────────────────────────
function Stars({ count, total = 5 }: { count: number; total?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <svg
          key={i < count ? `filled-${i}` : `empty-${i}`}
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`w-4 h-4 ${i < count ? "fill-gold" : "fill-muted"}`}
          style={
            i < count
              ? { fill: "oklch(var(--gold))" }
              : { fill: "oklch(var(--muted))" }
          }
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── WhatsApp SVG ──────────────────────────────────────────────────────────────
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Products", id: "products" },
    { label: "Reviews", id: "reviews" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-white/85 border-b border-border shadow-xs"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="flex flex-col items-start focus:outline-none"
          data-ocid="nav.link"
          aria-label="Go to top"
        >
          <span
            className={`font-display text-lg md:text-xl font-semibold tracking-wide transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            Shree Salasar
          </span>
          <span className="text-gold text-xs font-body tracking-widest uppercase">
            Marbles
          </span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => scrollTo(link.id)}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className={`font-body text-sm tracking-wide transition-colors duration-300 hover:text-gold ${
                  scrolled ? "text-foreground" : "text-white/90"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="tel:+918668216976"
          data-ocid="nav.call.button"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-sm font-body text-sm font-medium tracking-wide text-white bg-gold hover:bg-gold-dark transition-colors duration-300 shadow-gold"
          style={{ backgroundColor: "oklch(var(--gold))", color: "white" }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          Call Now
        </a>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors ${
            scrolled ? "text-foreground" : "text-white"
          }`}
          onClick={() => setMenuOpen((v) => !v)}
          data-ocid="nav.toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-border ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => scrollTo(link.id)}
                data-ocid={`nav.${link.label.toLowerCase()}.mobile.link`}
                className="font-body text-base text-foreground hover:text-gold transition-colors w-full text-left"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <a
              href="tel:+918668216976"
              data-ocid="nav.call.mobile.button"
              className="flex items-center gap-2 font-body text-base font-medium text-white rounded-sm px-4 py-2.5 w-full justify-center transition-colors"
              style={{ backgroundColor: "oklch(var(--gold))" }}
            >
              Call Now
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url(/assets/generated/hero-marble-bg.dim_1920x1080.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gold vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 text-center px-4 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div
            className="h-px w-16 bg-gold opacity-70"
            style={{ backgroundColor: "oklch(var(--gold))" }}
          />
          <span
            className="text-gold text-xs tracking-[0.3em] uppercase font-body"
            style={{ color: "oklch(var(--gold-light))" }}
          >
            Est. 2009
          </span>
          <div
            className="h-px w-16 bg-gold opacity-70"
            style={{ backgroundColor: "oklch(var(--gold))" }}
          />
        </div>

        {/* Main Title */}
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-3"
          style={{ color: "oklch(var(--gold-light))" }}
        >
          Shree Salasar
        </h1>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-4 text-white">
          Marbles
        </h1>

        {/* Hindi subtitle */}
        <p
          className="font-body text-xl md:text-2xl mb-3"
          style={{ color: "oklch(var(--gold-light))", opacity: 0.85 }}
        >
          श्री सालासर मार्बल्स
        </p>

        {/* Tagline */}
        <p className="font-body text-base md:text-lg text-white/80 tracking-wide mb-2">
          Premium Marble, Granite &amp; Tiles Supplier
        </p>

        {/* Rating */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Stars count={5} />
          <span className="text-white/70 font-body text-sm">
            4.8 · 69 Reviews
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+918668216976"
            data-ocid="hero.call.button"
            className="flex items-center gap-3 px-8 py-4 rounded-sm font-body font-semibold text-sm tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-gold-lg"
            style={{ backgroundColor: "oklch(var(--gold))" }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            Call Now
          </a>
          <a
            href="https://wa.me/918668216976"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.whatsapp.button"
            className="flex items-center gap-3 px-8 py-4 rounded-sm font-body font-semibold text-sm tracking-widest uppercase text-white border border-white/40 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <WhatsAppIcon className="w-5 h-5" />
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <button
        type="button"
        onClick={scrollToAbout}
        data-ocid="hero.scroll.button"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-gold transition-colors duration-300 animate-bounce"
        aria-label="Scroll down"
        style={{ color: "oklch(var(--gold-light) / 0.7)" }}
      >
        <span className="font-body text-xs tracking-[0.2em] uppercase">
          Explore
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
    </section>
  );
}

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionHeader({
  label,
  title,
  subtitle,
  light = false,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="text-center mb-14">
      {label && (
        <p
          className="font-body text-xs tracking-[0.3em] uppercase mb-4"
          style={{
            color: light ? "oklch(var(--gold-light))" : "oklch(var(--gold))",
          }}
        >
          {label}
        </p>
      )}
      <h2
        className={`font-display text-3xl md:text-5xl font-bold mb-6 relative inline-block gold-underline ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`font-body text-base md:text-lg max-w-2xl mx-auto mt-8 ${
            light ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const stats = [
    { value: "4.8★", label: "Rating" },
    { value: "69+", label: "Reviews" },
    { value: "500+", label: "Projects" },
    { value: "15+", label: "Years Experience" },
  ];

  return (
    <section id="about" className="section-pad bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p
              className="font-body text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "oklch(var(--gold))" }}
            >
              About Us
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Crafting Beautiful
              <br />
              <span style={{ color: "oklch(var(--gold))" }}>
                Spaces Since 2009
              </span>
            </h2>
            <div
              className="h-0.5 w-16 mb-8"
              style={{ backgroundColor: "oklch(var(--gold))" }}
            />
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              We are a premier supplier of high-quality marble, granite, and
              tiles in Chhatrapati Sambhajinagar. With years of experience and a
              passion for excellence, we bring the finest natural stones to
              transform your spaces.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-10">
              From contemporary minimalist interiors to traditional grand
              designs, our extensive collection ensures every vision becomes a
              reality. Our expert team guides you through every step — from
              selection to installation.
            </p>
            <a
              href="tel:+918668216976"
              data-ocid="about.call.button"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold tracking-widest uppercase text-white px-8 py-3.5 rounded-sm transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-gold"
              style={{ backgroundColor: "oklch(var(--gold))" }}
            >
              Get in Touch
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-8 rounded-sm text-center border hover-lift"
                style={{
                  borderColor: "oklch(var(--gold) / 0.25)",
                  background:
                    "linear-gradient(135deg, oklch(var(--card)), oklch(var(--secondary)))",
                }}
              >
                <p
                  className="font-display text-4xl md:text-5xl font-bold mb-2"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  {stat.value}
                </p>
                <p className="font-body text-sm text-muted-foreground tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────
function Products() {
  return (
    <section
      id="products"
      className="section-pad"
      style={{ backgroundColor: "oklch(0.96 0.004 80)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Our Collection"
          title="Premium Stone Products"
          subtitle="Discover our curated collection of natural stones, meticulously sourced from the finest quarries across India and the world."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => (
            <div
              key={product.title}
              data-ocid={`products.item.${index + 1}`}
              className="group rounded-sm overflow-hidden bg-white hover-lift cursor-pointer"
              style={{
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                {/* Tag */}
                <span
                  className="absolute top-4 left-4 font-body text-xs font-semibold tracking-widest uppercase text-white px-3 py-1.5 rounded-sm"
                  style={{ backgroundColor: "oklch(var(--gold))" }}
                >
                  {product.tag}
                </span>
              </div>
              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {product.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                  {product.description}
                </p>
                <div
                  className="flex items-center gap-2"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  <span className="font-body text-xs tracking-wider uppercase font-semibold">
                    View Details
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
function Reviews() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % REVIEWS.length);
    }, 4000);
  }, []);

  const resetAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    startAutoPlay();
  }, [startAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoPlay]);

  const goTo = (index: number) => {
    setActive(index);
    resetAutoPlay();
  };

  return (
    <section
      id="reviews"
      className="section-pad"
      style={{
        background:
          "linear-gradient(135deg, oklch(var(--dark-surface)), oklch(var(--dark-surface-2)))",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Customer Reviews"
          title="What Our Clients Say"
          subtitle="Trusted by hundreds of homeowners and builders across Marathwada."
          light
        />
        <div className="relative max-w-3xl mx-auto">
          {/* Review Card */}
          <div
            key={active}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-8 md:p-12 text-center"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
            data-ocid={`reviews.item.${active + 1}`}
          >
            {/* Stars */}
            <div className="flex justify-center mb-6">
              <Stars count={REVIEWS[active].stars} />
            </div>

            {/* Quote */}
            <svg
              aria-hidden="true"
              viewBox="0 0 32 32"
              className="w-8 h-8 mx-auto mb-4 opacity-30"
              style={{ fill: "oklch(var(--gold))" }}
            >
              <path d="M10 8C5.582 8 2 11.582 2 16s3.582 8 8 8c4.418 0 8-3.582 8-8V8H10zm20 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8V8h-8z" />
            </svg>

            <p className="font-body text-base md:text-lg text-white/85 leading-relaxed mb-8 italic">
              &ldquo;{REVIEWS[active].text}&rdquo;
            </p>

            {/* Reviewer */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-display text-base font-bold text-white"
                style={{ backgroundColor: "oklch(var(--gold) / 0.7)" }}
              >
                {REVIEWS[active].initials}
              </div>
              <div>
                <p className="font-display text-base font-semibold text-white">
                  {REVIEWS[active].name}
                </p>
                <p className="font-body text-xs text-white/50 tracking-wide">
                  Verified Customer
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              type="button"
              onClick={() =>
                goTo((active - 1 + REVIEWS.length) % REVIEWS.length)
              }
              data-ocid="reviews.pagination_prev"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-colors duration-300"
              style={
                { "--hover-color": "oklch(var(--gold))" } as React.CSSProperties
              }
              aria-label="Previous review"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {REVIEWS.map((review, i) => (
                <button
                  type="button"
                  key={review.name}
                  onClick={() => goTo(i)}
                  data-ocid={`reviews.tab.${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? "24px" : "8px",
                    height: "8px",
                    backgroundColor:
                      i === active
                        ? "oklch(var(--gold))"
                        : "oklch(1 0 0 / 0.3)",
                  }}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo((active + 1) % REVIEWS.length)}
              data-ocid="reviews.pagination_next"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-gold transition-colors duration-300"
              aria-label="Next review"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyChooseUs() {
  return (
    <section id="why" className="section-pad bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Why Choose Us"
          title="The Salasar Difference"
          subtitle="We don't just sell stones — we help you build spaces that tell your story."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_US.map((item, index) => (
            <div
              key={item.title}
              data-ocid={`why.item.${index + 1}`}
              className="group p-8 rounded-sm border text-center hover-lift cursor-default"
              style={{
                borderColor: "oklch(var(--border))",
                background: "oklch(var(--card))",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 transition-colors duration-300"
                style={{ backgroundColor: "oklch(var(--gold) / 0.1)" }}
              >
                <span style={{ color: "oklch(var(--gold))" }}>{item.icon}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Location ─────────────────────────────────────────────────────────────────
function Location() {
  return (
    <section
      id="location"
      className="section-pad"
      style={{ backgroundColor: "oklch(0.96 0.004 80)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Find Us"
          title="Visit Our Showroom"
          subtitle="Come experience our premium collection in person. Our team is ready to help you find the perfect stone."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Address Card */}
          <div
            className="rounded-sm p-8 text-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(var(--dark-surface)), oklch(var(--dark-surface-2)))",
              boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
            }}
          >
            <h3
              className="font-display text-xl font-semibold mb-6"
              style={{ color: "oklch(var(--gold-light))" }}
            >
              Shree Salasar Marbles
            </h3>

            <div className="space-y-5">
              <div className="flex gap-4">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <div>
                  <p className="font-body text-sm text-white/60 mb-1">
                    Address
                  </p>
                  <p className="font-body text-sm text-white/85 leading-relaxed">
                    Beed Bypass Rd, near Balapur, Kaman,
                    <br />
                    Chhatrapati Sambhajinagar,
                    <br />
                    Maharashtra 431006
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <div>
                  <p className="font-body text-sm text-white/60 mb-1">Phone</p>
                  <a
                    href="tel:+918668216976"
                    data-ocid="location.call.button"
                    className="font-body text-sm font-medium hover:opacity-80 transition-opacity"
                    style={{ color: "oklch(var(--gold-light))" }}
                  >
                    +91 8668216976
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: "oklch(var(--gold))" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-body text-sm text-white/60 mb-1">Hours</p>
                  <p className="font-body text-sm text-white/85">
                    Mon – Sat: 9AM – 7PM
                  </p>
                  <p className="font-body text-sm text-white/85">
                    Sunday: 10AM – 5PM
                  </p>
                </div>
              </div>

              <div
                className="pt-4 border-t"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                <a
                  href="https://wa.me/918668216976"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="location.whatsapp.button"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-sm font-body text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Get Directions on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div
            className="lg:col-span-2 rounded-sm overflow-hidden"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
          >
            <iframe
              src="https://maps.google.com/maps?q=R9WG%2BRX+Chhatrapati+Sambhajinagar,+Maharashtra&output=embed"
              width="100%"
              height="400"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shree Salasar Marbles Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="section-pad"
      style={{
        background:
          "linear-gradient(135deg, oklch(var(--dark-surface)), oklch(var(--dark-surface-2)))",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Get In Touch"
          title="Contact Us"
          subtitle="Ready to transform your space? Reach out and we'll help you get started."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Call Card */}
          <a
            href="tel:+918668216976"
            data-ocid="contact.call.button"
            className="group flex flex-col items-center p-8 rounded-sm border text-center hover-lift transition-all duration-300 cursor-pointer"
            style={{
              borderColor: "oklch(var(--gold) / 0.3)",
              background: "oklch(1 0 0 / 0.04)",
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: "oklch(var(--gold) / 0.15)" }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-7 h-7"
                style={{ color: "oklch(var(--gold))" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">
              Call Us
            </h3>
            <p className="font-body text-sm text-white/60 mb-3">
              Mon–Sat, 9AM–7PM
            </p>
            <p
              className="font-body font-semibold"
              style={{ color: "oklch(var(--gold-light))" }}
            >
              +91 8668216976
            </p>
          </a>

          {/* WhatsApp Card */}
          <a
            href="https://wa.me/918668216976"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.whatsapp.button"
            className="group flex flex-col items-center p-8 rounded-sm border text-center hover-lift transition-all duration-300 cursor-pointer"
            style={{
              borderColor: "oklch(var(--gold) / 0.3)",
              background: "oklch(1 0 0 / 0.04)",
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: "rgba(37,211,102,0.15)" }}
            >
              <WhatsAppIcon className="w-7 h-7 text-green-400" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">
              WhatsApp
            </h3>
            <p className="font-body text-sm text-white/60 mb-3">
              Quick response guaranteed
            </p>
            <p className="font-body font-semibold" style={{ color: "#25D366" }}>
              Chat with Us Now
            </p>
          </a>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            data-ocid="contact.form"
            className="p-8 rounded-sm border"
            style={{
              borderColor: "oklch(var(--gold) / 0.3)",
              background: "oklch(1 0 0 / 0.04)",
            }}
          >
            <h3 className="font-display text-lg font-semibold text-white mb-6">
              Send a Message
            </h3>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  data-ocid="contact.name.input"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-gold h-11 font-body text-sm rounded-sm"
                />
              </div>
              <div>
                <Input
                  placeholder="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  required
                  data-ocid="contact.phone.input"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-gold h-11 font-body text-sm rounded-sm"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  required
                  rows={4}
                  data-ocid="contact.message.textarea"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-gold font-body text-sm rounded-sm resize-none"
                />
              </div>
              {submitted && (
                <p
                  data-ocid="contact.success_state"
                  className="font-body text-sm text-center py-2 rounded-sm"
                  style={{
                    color: "oklch(var(--gold-light))",
                    backgroundColor: "oklch(var(--gold) / 0.1)",
                  }}
                >
                  ✓ Message sent! We'll call you back shortly.
                </p>
              )}
              <Button
                type="submit"
                data-ocid="contact.submit_button"
                className="w-full font-body text-sm font-semibold tracking-widest uppercase text-white rounded-sm h-11 hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: "oklch(var(--gold))",
                  color: "white",
                }}
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="border-t"
      style={{
        borderColor: "oklch(var(--gold) / 0.2)",
        background: "oklch(0.09 0.01 60)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h2
              className="font-display text-2xl font-bold mb-2"
              style={{ color: "oklch(var(--gold-light))" }}
            >
              Shree Salasar Marbles
            </h2>
            <p
              className="font-body text-sm mb-4"
              style={{ color: "oklch(var(--gold) / 0.6)" }}
            >
              श्री सालासर मार्बल्स
            </p>
            <p className="font-body text-sm text-white/50 leading-relaxed max-w-xs">
              Premium marble, granite &amp; tiles supplier in Chhatrapati
              Sambhajinagar since 2009.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-base font-semibold text-white mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", id: "hero" },
                { label: "About Us", id: "about" },
                { label: "Products", id: "products" },
                { label: "Reviews", id: "reviews" },
                { label: "Contact", id: "contact" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    data-ocid={`footer.${link.label.toLowerCase().replace(" ", "_")}.link`}
                    className="font-body text-sm text-white/50 hover:text-gold transition-colors duration-300"
                    style={{ "--tw-text-opacity": "1" } as React.CSSProperties}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-base font-semibold text-white mb-5">
              Contact Info
            </h3>
            <div className="space-y-4">
              <p className="font-body text-sm text-white/50 leading-relaxed">
                Beed Bypass Rd, near Balapur,
                <br />
                Kaman, Chhatrapati Sambhajinagar,
                <br />
                Maharashtra 431006
              </p>
              <a
                href="tel:+918668216976"
                className="block font-body text-sm transition-colors duration-300"
                style={{ color: "oklch(var(--gold-light))" }}
              >
                +91 8668216976
              </a>
              <a
                href="https://wa.me/918668216976"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-body text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                WhatsApp Available
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="font-body text-xs text-white/30 text-center">
            © {year} Shree Salasar Marbles. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Stars count={5} />
            <span className="font-body text-xs text-white/30">
              4.8 · 69 Verified Reviews
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp ────────────────────────────────────────────────────────
function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918668216976"
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.floating.button"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-luxury hover:scale-110 transition-transform duration-300"
      style={{ backgroundColor: "#25D366" }}
    >
      <WhatsAppIcon className="w-7 h-7 text-white" />
    </a>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Reviews />
        <WhyChooseUs />
        <Location />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
