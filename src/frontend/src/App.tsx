import { useMutation } from "@tanstack/react-query";
import {
  ArrowRight,
  Award,
  Briefcase,
  Check,
  ChevronRight,
  Clock,
  Gavel,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
  Star,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { useActor } from "./hooks/useActor";

// ─── useInView hook ───────────────────────────────────────────────────────────
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const services = [
  {
    icon: Scale,
    title: "Strategic Visa Applications",
    desc: "Maximise your approval chances with a precisely crafted, evidence-backed application strategy.",
  },
  {
    icon: Gavel,
    title: "High-Stakes Visa Appeals",
    desc: "When a refusal threatens your future, we build the strongest possible case for review.",
  },
  {
    icon: Users,
    title: "Complex Family & Partner Visas",
    desc: "Navigate intricate relationship and family visa pathways with clarity and confidence.",
  },
  {
    icon: Award,
    title: "Skilled Migration Strategy",
    desc: "Position yourself for success in Australia's competitive skilled migration landscape.",
  },
  {
    icon: Briefcase,
    title: "Business & Investment Migration",
    desc: "Structured, strategic pathways for entrepreneurs and investors seeking Australian residency.",
  },
];

const testimonials = [
  {
    quote:
      "Great communication and completely hassle free. AE & Associates handled every detail with precision. I couldn't have asked for a better outcome.",
    author: "Sarah M.",
  },
  {
    quote:
      "Answered our questions with patience and care. They guided us through a very stressful appeals process and we achieved the result we needed.",
    author: "James & Priya T.",
  },
  {
    quote:
      "Professional, responsive, and highly knowledgeable. Their strategic approach to our complex case made all the difference.",
    author: "David K.",
  },
];

const whyUs = [
  "Proven success in complex and difficult cases",
  "Clear, direct, and honest communication",
  "Fast and responsive service",
  "Strong attention to detail",
  "Client-focused, supportive approach",
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────
function InViewSection({
  children,
  className = "",
  stagger = false,
}: { children: React.ReactNode; className?: string; stagger?: boolean }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`${
        stagger ? "stagger-children" : "in-view-hidden"
      } ${inView ? "in-view-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── STARS ────────────────────────────────────────────────────────────────────
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 stars-gold" aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static decorative list
        <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
      ))}
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-solid" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <a
          href="#home"
          className="flex flex-col leading-none"
          data-ocid="nav.link"
        >
          <span
            className="font-serif text-2xl font-bold"
            style={{ color: "var(--gold)" }}
          >
            AE & Associates
          </span>
          <span
            className="text-[10px] tracking-[0.25em] uppercase"
            style={{ color: "oklch(0.72 0.10 82 / 0.7)" }}
          >
            Law and Migration
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-xs tracking-widest uppercase font-medium transition-colors duration-200"
              style={{ color: "oklch(0.82 0.006 250)" }}
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-gold px-5 py-2.5"
            data-ocid="nav.primary_button"
          >
            Book Consultation
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
          style={{ color: "var(--gold)" }}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden mobile-nav-open px-6 pb-6"
          style={{ background: "oklch(0.14 0.038 250 / 0.98)" }}
        >
          <div className="flex flex-col gap-4 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="text-sm tracking-widest uppercase py-2 border-b"
                style={{
                  color: "oklch(0.82 0.006 250)",
                  borderColor: "oklch(0.72 0.10 82 / 0.15)",
                }}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-gold px-5 py-3 text-center mt-2"
              data-ocid="nav.primary_button"
            >
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center hero-pattern"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.12 0.04 252) 0%, oklch(0.16 0.042 248) 50%, oklch(0.19 0.035 240) 100%)",
      }}
    >
      {/* Abstract geometric overlay */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-10"
          style={{
            background:
              "radial-gradient(ellipse at 80% 30%, oklch(0.72 0.10 82 / 0.3) 0%, transparent 60%)",
          }}
        />
        <svg
          className="absolute right-8 top-1/4 w-72 h-72 opacity-5"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="oklch(0.72 0.10 82)"
            strokeWidth="1"
          />
          <circle
            cx="100"
            cy="100"
            r="65"
            stroke="oklch(0.72 0.10 82)"
            strokeWidth="0.5"
          />
          <circle
            cx="100"
            cy="100"
            r="40"
            stroke="oklch(0.72 0.10 82)"
            strokeWidth="0.5"
          />
          <line
            x1="10"
            y1="100"
            x2="190"
            y2="100"
            stroke="oklch(0.72 0.10 82)"
            strokeWidth="0.5"
          />
          <line
            x1="100"
            y1="10"
            x2="100"
            y2="190"
            stroke="oklch(0.72 0.10 82)"
            strokeWidth="0.5"
          />
        </svg>
        <svg
          className="absolute right-16 top-1/3 w-96 h-96 opacity-[0.03]"
          viewBox="0 0 300 300"
          fill="none"
          aria-hidden="true"
        >
          <polygon
            points="150,10 290,280 10,280"
            stroke="oklch(0.72 0.10 82)"
            strokeWidth="1"
            fill="none"
          />
          <polygon
            points="150,50 260,260 40,260"
            stroke="oklch(0.72 0.10 82)"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
        <div className="max-w-2xl">
          {/* Gold label */}
          <div className="mb-6 flex items-center gap-3">
            <span className="gold-divider animate-gold-line" />
            <span
              className="text-xs tracking-[0.3em] uppercase font-medium"
              style={{ color: "var(--gold)" }}
            >
              Immigration Law Specialists
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6 animate-fade-up">
            Winning Complex Immigration Cases
            <em className="not-italic" style={{ color: "var(--gold)" }}>
              {" "}
              Others Walk Away From
            </em>
          </h1>

          {/* Animated gold line */}
          <div
            className="gold-divider mb-8 animate-gold-line"
            style={{ animationDelay: "0.3s" }}
          />

          <p
            className="text-lg leading-relaxed mb-10"
            style={{ color: "oklch(0.82 0.006 250)" }}
          >
            Trusted by individuals and families across Australia for high-stakes
            visa applications, refusals, and appeals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="btn-gold px-8 py-4"
              data-ocid="hero.primary_button"
            >
              Schedule a Private Consultation
            </a>
            <a
              href="tel:+61415668668"
              className="btn-outline-white px-8 py-4 text-center"
              data-ocid="hero.secondary_button"
            >
              Speak to an Expert
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.14 0.038 250))",
        }}
      />
    </section>
  );
}

// ─── POSITIONING SECTION ──────────────────────────────────────────────────────
function Positioning() {
  return (
    <section
      id="about"
      className="py-28"
      style={{ background: "oklch(0.17 0.04 248)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <InViewSection className="text-center mb-16">
          <p
            className="text-xs tracking-[0.35em] uppercase font-semibold mb-4"
            style={{ color: "var(--gold)" }}
          >
            Our Approach
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Immigration Law, Handled with Precision
          </h2>
          <p
            className="max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ color: "oklch(0.78 0.008 250)" }}
          >
            We work with clients who need more than basic advice — they need
            strategy, clarity, and results. From visa applications to complex
            refusals and appeals, every case is handled with a meticulous,
            results-driven approach.
          </p>
        </InViewSection>

        {/* Stats */}
        <InViewSection
          stagger
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { num: "160+", label: "Clients Served" },
            { num: "5.0", label: "Star Rating" },
            { num: "100%", label: "Cases Taken Seriously" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-serif text-5xl font-bold mb-2"
                style={{ color: "var(--gold)" }}
              >
                {stat.num}
              </div>
              <div
                className="text-sm tracking-widest uppercase"
                style={{ color: "oklch(0.78 0.008 250)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </InViewSection>
      </div>
    </section>
  );
}

// ─── SERVICES SECTION ─────────────────────────────────────────────────────────
function Services() {
  return (
    <section
      id="services"
      className="py-28"
      style={{ background: "oklch(0.14 0.038 250)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <InViewSection className="text-center mb-16">
          <p
            className="text-xs tracking-[0.35em] uppercase font-semibold mb-4"
            style={{ color: "var(--gold)" }}
          >
            What We Do
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Expert Immigration Services
          </h2>
        </InViewSection>

        <InViewSection
          stagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="service-card p-8"
                style={{ background: "oklch(0.19 0.04 248)" }}
              >
                <div className="mb-5">
                  <Icon
                    className="w-8 h-8"
                    style={{ color: "var(--gold)" }}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "oklch(0.72 0.006 250)" }}
                >
                  {service.desc}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-semibold transition-colors duration-200"
                  style={{ color: "var(--gold)" }}
                >
                  Learn More{" "}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            );
          })}
        </InViewSection>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-28"
      style={{ background: "oklch(0.16 0.04 250)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <InViewSection className="text-center mb-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Clients Across Australia
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Stars />
            <span
              className="font-serif text-2xl font-bold"
              style={{ color: "var(--gold)" }}
            >
              5.0 Rating
            </span>
            <span
              className="text-sm"
              style={{ color: "oklch(0.72 0.006 250)" }}
            >
              — 160+ Clients
            </span>
          </div>
        </InViewSection>

        <InViewSection
          stagger
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className="p-8 border"
              style={{
                background: "oklch(0.19 0.04 248)",
                borderColor: "oklch(0.72 0.10 82 / 0.2)",
              }}
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <Stars />
              <blockquote
                className="mt-5 mb-5 text-sm leading-relaxed italic"
                style={{ color: "oklch(0.88 0.005 250)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p
                className="text-xs tracking-widest uppercase font-medium"
                style={{ color: "var(--gold)" }}
              >
                — {t.author}, Verified Client
              </p>
            </div>
          ))}
        </InViewSection>
      </div>
    </section>
  );
}

// ─── AUTHORITY / WHY US ───────────────────────────────────────────────────────
function WhyUs() {
  return (
    <section
      id="why-us"
      className="py-28"
      style={{ background: "oklch(0.14 0.038 250)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <InViewSection>
            <p
              className="text-xs tracking-[0.35em] uppercase font-semibold mb-4"
              style={{ color: "var(--gold)" }}
            >
              Why Choose Us
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              When the Outcome Matters, Experience Matters
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "oklch(0.78 0.008 250)" }}
            >
              Immigration law is more than paperwork — it requires strategy,
              timing, and deep expertise. We are trusted by clients facing
              complex and high-pressure situations, where every decision impacts
              their future.
            </p>
          </InViewSection>

          <InViewSection stagger className="space-y-4">
            {whyUs.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 p-5 border"
                style={{
                  background: "oklch(0.19 0.04 248)",
                  borderColor: "oklch(0.72 0.10 82 / 0.15)",
                }}
              >
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: "oklch(0.72 0.10 82 / 0.15)" }}
                  aria-hidden="true"
                >
                  <Check
                    className="w-3.5 h-3.5"
                    style={{ color: "var(--gold)" }}
                  />
                </div>
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.88 0.005 250)" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </InViewSection>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
function Contact() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    matter: "",
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.submitContactForm(
        form.name,
        form.email,
        form.phone,
        form.matter,
      );
    },
    onSuccess: () => {
      toast.success("Message sent! We'll be in touch shortly.");
      setForm({ name: "", email: "", phone: "", matter: "" });
    },
    onError: () =>
      toast.error(
        "Failed to send message. Please try again or call us directly.",
      ),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <section
      id="contact"
      className="py-28"
      style={{ background: "oklch(0.17 0.04 248)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <InViewSection className="text-center mb-16">
          <p
            className="text-xs tracking-[0.35em] uppercase font-semibold mb-4"
            style={{ color: "var(--gold)" }}
          >
            Get in Touch
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Speak to a Migration Expert
          </h2>
          <p className="text-lg" style={{ color: "oklch(0.78 0.008 250)" }}>
            Get clear, strategic advice tailored to your situation.
          </p>
        </InViewSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact details */}
          <InViewSection className="space-y-8">
            <div className="flex items-start gap-5">
              <div
                className="w-12 h-12 flex-shrink-0 flex items-center justify-center border"
                style={{
                  borderColor: "oklch(0.72 0.10 82 / 0.3)",
                  color: "var(--gold)",
                }}
                aria-hidden="true"
              >
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-1 font-medium"
                  style={{ color: "var(--gold)" }}
                >
                  Address
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.82 0.006 250)" }}
                >
                  259 Water St
                  <br />
                  Spring Hill QLD 4000, Australia
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div
                className="w-12 h-12 flex-shrink-0 flex items-center justify-center border"
                style={{
                  borderColor: "oklch(0.72 0.10 82 / 0.3)",
                  color: "var(--gold)",
                }}
                aria-hidden="true"
              >
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-1 font-medium"
                  style={{ color: "var(--gold)" }}
                >
                  Phone
                </p>
                <a
                  href="tel:+61415668668"
                  className="text-sm hover:underline"
                  style={{ color: "oklch(0.82 0.006 250)" }}
                  data-ocid="contact.link"
                >
                  +61 415 668 668
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div
                className="w-12 h-12 flex-shrink-0 flex items-center justify-center border"
                style={{
                  borderColor: "oklch(0.72 0.10 82 / 0.3)",
                  color: "var(--gold)",
                }}
                aria-hidden="true"
              >
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-1 font-medium"
                  style={{ color: "var(--gold)" }}
                >
                  Hours
                </p>
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.82 0.006 250)" }}
                >
                  Open until 6:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div
                className="w-12 h-12 flex-shrink-0 flex items-center justify-center border"
                style={{
                  borderColor: "oklch(0.72 0.10 82 / 0.3)",
                  color: "var(--gold)",
                }}
                aria-hidden="true"
              >
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-1 font-medium"
                  style={{ color: "var(--gold)" }}
                >
                  Email
                </p>
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.82 0.006 250)" }}
                >
                  info@aeassociates.com.au
                </p>
              </div>
            </div>

            <a
              href="tel:+61415668668"
              className="btn-gold inline-flex px-8 py-4 mt-4"
              data-ocid="contact.primary_button"
            >
              Book a Private Consultation{" "}
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </InViewSection>

          {/* Contact form */}
          <InViewSection>
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              data-ocid="contact.modal"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs tracking-widest uppercase mb-2 font-medium"
                  style={{ color: "var(--gold)" }}
                >
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 text-sm outline-none transition-colors"
                  style={{
                    background: "oklch(0.19 0.04 248)",
                    border: "1px solid oklch(0.72 0.10 82 / 0.25)",
                    color: "var(--off-white)",
                  }}
                  placeholder="Your full name"
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs tracking-widest uppercase mb-2 font-medium"
                  style={{ color: "var(--gold)" }}
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className="w-full px-4 py-3 text-sm outline-none transition-colors"
                  style={{
                    background: "oklch(0.19 0.04 248)",
                    border: "1px solid oklch(0.72 0.10 82 / 0.25)",
                    color: "var(--off-white)",
                  }}
                  placeholder="your@email.com"
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-xs tracking-widest uppercase mb-2 font-medium"
                  style={{ color: "var(--gold)" }}
                >
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="w-full px-4 py-3 text-sm outline-none transition-colors"
                  style={{
                    background: "oklch(0.19 0.04 248)",
                    border: "1px solid oklch(0.72 0.10 82 / 0.25)",
                    color: "var(--off-white)",
                  }}
                  placeholder="+61 4XX XXX XXX"
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-matter"
                  className="block text-xs tracking-widest uppercase mb-2 font-medium"
                  style={{ color: "var(--gold)" }}
                >
                  Brief Description of Matter
                </label>
                <textarea
                  id="contact-matter"
                  required
                  rows={4}
                  value={form.matter}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, matter: e.target.value }))
                  }
                  className="w-full px-4 py-3 text-sm outline-none transition-colors resize-none"
                  style={{
                    background: "oklch(0.19 0.04 248)",
                    border: "1px solid oklch(0.72 0.10 82 / 0.25)",
                    color: "var(--off-white)",
                  }}
                  placeholder="Briefly describe your immigration matter..."
                  data-ocid="contact.textarea"
                />
              </div>

              {mutation.isSuccess && (
                <div
                  className="p-3 text-sm"
                  style={{
                    background: "oklch(0.72 0.10 82 / 0.1)",
                    color: "var(--gold)",
                    border: "1px solid oklch(0.72 0.10 82 / 0.3)",
                  }}
                  data-ocid="contact.success_state"
                >
                  ✓ Message received. We'll contact you shortly.
                </div>
              )}
              {mutation.isError && (
                <div
                  className="p-3 text-sm"
                  style={{
                    background: "oklch(0.57 0.245 27 / 0.1)",
                    color: "oklch(0.75 0.15 27)",
                    border: "1px solid oklch(0.57 0.245 27 / 0.3)",
                  }}
                  data-ocid="contact.error_state"
                >
                  Failed to send. Please call us at +61 415 668 668.
                </div>
              )}

              <button
                type="submit"
                disabled={mutation.isPending}
                className="btn-gold w-full py-4 justify-center"
                data-ocid="contact.submit_button"
              >
                {mutation.isPending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </InViewSection>
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.12 0.04 252) 0%, oklch(0.16 0.04 248) 100%)",
        borderTop: "1px solid oklch(0.72 0.10 82 / 0.25)",
      }}
    >
      {/* Gold gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--gold), transparent)",
        }}
        aria-hidden="true"
      />

      <InViewSection className="max-w-3xl mx-auto text-center px-6">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Don't Leave Your Future to Chance
        </h2>
        <p className="text-lg mb-10" style={{ color: "oklch(0.78 0.008 250)" }}>
          Get expert guidance on your immigration matter today.
        </p>
        <a
          href="#contact"
          className="btn-gold px-10 py-5 text-sm"
          data-ocid="cta.primary_button"
        >
          Schedule a Private Consultation
        </a>
      </InViewSection>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "oklch(0.11 0.035 252)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div
              className="font-serif text-2xl font-bold mb-1"
              style={{ color: "var(--gold)" }}
            >
              AE & Associates
            </div>
            <div
              className="text-xs tracking-[0.25em] uppercase mb-6"
              style={{ color: "oklch(0.72 0.10 82 / 0.6)" }}
            >
              Law and Migration
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.65 0.006 250)" }}
            >
              Expert immigration law services for individuals, families, and
              businesses across Australia.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase font-semibold mb-5"
              style={{ color: "var(--gold)" }}
            >
              Quick Links
            </p>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm transition-colors duration-200 hover:underline"
                  style={{ color: "oklch(0.65 0.006 250)" }}
                  data-ocid="footer.link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase font-semibold mb-5"
              style={{ color: "var(--gold)" }}
            >
              Contact Us
            </p>
            <div
              className="space-y-3 text-sm"
              style={{ color: "oklch(0.65 0.006 250)" }}
            >
              <p>259 Water St, Spring Hill QLD 4000</p>
              <a
                href="tel:+61415668668"
                className="block hover:underline"
                data-ocid="footer.link"
              >
                +61 415 668 668
              </a>
              <p>Open until 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{ background: "oklch(0.72 0.10 82 / 0.15)" }}
        />

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "oklch(0.5 0.005 250)" }}
        >
          <p>© {year} AE & Associates Law and Migration | Spring Hill, QLD</p>
          <p>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="underline hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── FLOATING BUTTON ──────────────────────────────────────────────────────────
function FloatingButton() {
  return (
    <a
      href="#contact"
      className="fixed bottom-6 right-6 z-40 btn-gold px-5 py-3 shadow-lg animate-pulse-glow hidden md:flex"
      data-ocid="floating.primary_button"
    >
      Book Consultation
    </a>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <Hero />
        <Positioning />
        <Services />
        <Testimonials />
        <WhyUs />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingButton />
    </div>
  );
}
