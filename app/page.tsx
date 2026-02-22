"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronRight, Mail, Shield } from "lucide-react";
import { motion, useInView, type Transition } from "framer-motion"; // <-- IMPORT 'Transition' TYPE
import { cn } from "@/utils/cn"; // Make sure you created this file

const ACCENT = "#00A3FF";
const BG_DARK = "#050505";
const TEXT_PRIMARY = "#EAEAEA";
const TEXT_SECONDARY = "#888888";

// --- Helper Components ---
function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}

function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      {children}
    </section>
  );
}

// --- Custom Hook for Animations ---
function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  // --- THE FIX IS HERE ---
  const transition: Transition = { duration: 0.6, ease: "easeOut" };

  return {
    ref,
    isInView,
    variants: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    transition, // Return the typed constant
  };
}

// --- Website Sections ---

function TopNav() {
  const links = [
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#manifesto", label: "Manifesto" },
    { href: "#about", label: "About" },
  ];
  return (
    <div
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{
        backgroundColor: "rgba(5, 5, 5, 0.5)",
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container className="flex h-14 items-center justify-between">
        <a href="#" className="group inline-flex items-center gap-2">
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5"
            aria-hidden
          >
            <Shield className="h-4 w-4 text-white/80" />
          </span>
          <span
            className="text-sm font-semibold tracking-wide"
            style={{ color: TEXT_PRIMARY }}
          >
            LOGICFORGE<span style={{ color: ACCENT }}>.io</span>
          </span>
        </a>
        <nav className="hidden items-center gap-6 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm transition-colors hover:text-white"
              style={{ color: TEXT_SECONDARY }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm transition hover:border-white/20 hover:bg-white/10"
          style={{ color: TEXT_PRIMARY }}
        >
          <Mail className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Initiate Contact</span>
          <ChevronRight className="h-4 w-4" />
        </a>
      </Container>
    </div>
  );
}

function HeroSection() {
    const { ref, isInView, variants, transition } = useReveal();
    return (
      <Section className="relative overflow-hidden pt-20 sm:pt-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(${TEXT_SECONDARY}1A 1px, transparent 1px), linear-gradient(90deg, ${TEXT_SECONDARY}1A 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
            animation: "moveGrid 120s linear infinite"
          }}
        />
        <Container>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={transition}
            className="mx-auto max-w-4xl text-center"
          >
            <h1
              className="text-balance text-4xl font-bold tracking-tight sm:text-6xl"
              style={{ color: TEXT_PRIMARY, fontFamily: "'Clash Display', sans-serif" }}
            >
              I Don&apos;t Sell Words. I Engineer Leverage.
            </h1>
            <p
              className="mt-6 max-w-2xl mx-auto text-pretty text-base leading-relaxed sm:text-lg"
              style={{ color: TEXT_SECONDARY }}
            >
              Logic Forge is a strategy firm that builds narrative and systems for founders operating in high-stakes, chaotic markets. We turn complexity into a competitive advantage.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href="#portfolio"
                className="group relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition"
                style={{
                  backgroundColor: ACCENT,
                  boxShadow: `0 4px 14px ${ACCENT}33`,
                }}
              >
                <span className="relative">// See The Work</span>
                <ArrowRight className="relative ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </Container>
      </Section>
    );
}

function SocialProofSection() {
    const { ref, isInView, variants, transition } = useReveal();
    return (
      <Section className="border-t border-white/10" style={{ backgroundColor: `rgba(234, 234, 234, 0.03)` }}>
        <Container>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{ ...transition, delay: 0.2 }}
          >
            <p className="mb-6 text-center text-xs font-semibold tracking-widest" style={{ color: TEXT_SECONDARY }}>
              // EDITORIAL REVIEW & CONTRIBUTIONS
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <span className="font-medium" style={{ color: TEXT_PRIMARY }}>[Mind the Product]</span>
                <span className="ml-2 text-xs text-white/50" >•</span>
                <span className="ml-1 text-xs" style={{ color: TEXT_SECONDARY }}>(Forthcoming, March 2026)</span>
              </div>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <div className="font-medium" style={{ color: `${TEXT_SECONDARY}80` }}>[Tier 1 Tech Publication]</div>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <div className="font-medium" style={{ color: `${TEXT_SECONDARY}80` }}>[Global Affairs Journal]</div>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <div className="font-medium" style={{ color: `${TEXT_SECONDARY}80` }}>[Venture Capital Review]</div>
            </div>
          </motion.div>
        </Container>
      </Section>
    );
}

function ServicesSection() {
    const { ref, isInView, variants, transition } = useReveal();
    const services = [
      { title: "The Authority Engine", icon: "⚙️", desc: "We architect and deploy a content system that establishes you as the undisputed thought leader in your niche.", deliverable: "A portfolio of bylined articles in Tier-1 publications, a library of high-signal social content, and a narrative that attracts inbound leads." },
      { title: "Narrative Architecture", icon: "🧭", desc: "A 2-week deep dive into your business to find the 'signal in the noise.' We diagnose your core value proposition and build a GTM narrative that your customers actually understand.", deliverable: "The 'Sovereign's Codex'—a master strategy document defining your mission, enemy, and story." },
      { title: "Sovereign Advisory", icon: "👑", desc: "I become your fractional Head of Narrative Strategy. Direct access for critical decisions on product, marketing, and competitive warfare.", deliverable: "A second brain dedicated to your victory. (Limited to two clients per quarter)." },
    ];
    return (
      <Section id="services">
        <Container>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={transition}
          >
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: TEXT_PRIMARY, fontFamily: "'Clash Display', sans-serif" }}>
                The Armory: Systems for Dominance
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <div key={s.title} className="group rounded-2xl p-6 transition-all duration-300" style={{ border: `1px solid rgba(255, 255, 255, 0.1)`, backgroundColor: `rgba(234, 234, 234, 0.03)` }}>
                  <div className="text-3xl">{s.icon}</div>
                  <h3 className="mt-4 text-lg font-semibold" style={{ color: TEXT_PRIMARY }}>{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: TEXT_SECONDARY }}>{s.desc}</p>
                  <p className="mt-4 text-xs font-medium" style={{ color: TEXT_SECONDARY }}><span style={{ color: `rgba(234, 234, 234, 0.6)` }}>DELIVERABLE:</span> {s.deliverable}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>
    );
}

function PortfolioSection() {
    const { ref, isInView, variants, transition } = useReveal();
    const items = [
        { title: "The 'Angry Churn' Metric", subtitle: "Published in Mind the Product (Forthcoming)", description: "Why your most hated users are your most valuable asset. An analysis of counter-intuitive signals that prove product-market fit.", cta: "Read on MTP →", disabled: true, href: "#"},
        { title: "The RAG Liability", subtitle: "An Independent Analysis by Logic Forge", description: "A technical teardown of why standard RAG architecture is a compliance time bomb for enterprise AI.", cta: "Read The Analysis →", href: "https://logicforge.substack.com/p/the-rag-liability" },
        { title: "The Death of the SDR", subtitle: "A Logic Forge Whitepaper", description: "A mathematical proof of the inevitability of replacing human sales development with programmatic outreach.", cta: "Read The Whitepaper →", href: "https://logicforge.substack.com/p/the-death-of-the-sdr" },
        { title: "The Digital Dollarization of Africa", subtitle: "A Geopolitical Report by Logic Forge", description: "How US-dollar stablecoins are becoming the de-facto currency for commerce in Africa, creating unintentional American soft power.", cta: "Read The Report →", href: "https://logicforge.substack.com/p/the-digital-dollarization-of-africa" },
        { title: "The WhatsApp State", subtitle: "A Sociological Report from Lagos", description: "Documenting how informal networks on WhatsApp have replaced the functions of a failing state in Nigeria.", cta: "Read The Report →", href: "https://logicforge.substack.com/p/the-whatsapp-state" },
        { title: "The 'Sovereign' Founder", subtitle: "A Manifesto by Logic Forge", description: "The new model for solopreneurs: using AI leverage and psychological framing to build high-margin, zero-employee empires.", cta: "Read The Manifesto →", href: "https://logicforge.substack.com/p/the-sovereign-founder" },
      ];
  
    return (
      <Section id="portfolio" style={{ backgroundColor: `rgba(234, 234, 234, 0.03)` }}>
        <Container>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={transition}
          >
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: TEXT_PRIMARY, fontFamily: "'Clash Display', sans-serif" }}>
                // The Architect's Library: Proof of Work
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <div key={index} className={`flex flex-col rounded-2xl p-6 transition-all duration-300 ${item.disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"}`} style={{ border: `1px solid rgba(255, 255, 255, 0.1)`, backgroundColor: `rgba(5, 5, 5, 0.5)` }}>
                  <div className="flex-grow">
                    <h3 className="text-base font-semibold" style={{ color: TEXT_PRIMARY }}>{item.title}</h3>
                    <p className="mt-2 text-xs font-medium uppercase tracking-wider" style={{ color: TEXT_SECONDARY }}>{item.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: TEXT_SECONDARY }}>{item.description}</p>
                  </div>
                  <a href={item.href} className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${item.disabled ? "pointer-events-none" : "group"}`} style={{ color: ACCENT }} target="_blank" rel="noopener noreferrer">
                    <span>{item.cta}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>
    );
}

function ManifestoSection() {
    const { ref, isInView, variants, transition } = useReveal();
    return (
      <Section id="manifesto">
        <Container>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={transition}
            className="mx-auto max-w-4xl rounded-2xl p-8 sm:p-12 text-center"
            style={{ border: `1px solid rgba(255, 255, 255, 0.1)`, backgroundColor: `rgba(5, 5, 5, 0.5)` }}
          >
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: TEXT_PRIMARY, fontFamily: "'Clash Display', sans-serif" }}>
              Your Blog is a Graveyard.
            </h2>
            <p className="mt-6 text-pretty leading-relaxed sm:text-lg" style={{ color: TEXT_SECONDARY }}>
              You spend $5k a month on listicles that get 100 views. You chase SEO keywords your customers don&apos;t search for. You publish "thought leadership" with zero thoughts. Your content budget is a furnace where you burn cash for warmth. It's noise. It generates zero qualified pipeline. Why? Because you are building content, not authority. Content is a commodity. Authority is a weapon. I don't sell content. I build systems that manufacture authority at scale. If you are tired of running a content graveyard, we should talk.
            </p>
          </motion.div>
        </Container>
      </Section>
    );
}

function AboutSection() {
    const { ref, isInView, variants, transition } = useReveal();
    return (
      <Section id="about">
        <Container>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={transition}
            className="grid gap-10 sm:grid-cols-12 sm:items-center"
          >
            <div className="sm:col-span-4 flex justify-center">
              <div className="h-[200px] w-[200px] rounded-full border border-white/10 bg-white/5" aria-label="Professional headshot of Alexander Carter" />
            </div>
            <div className="sm:col-span-8">
              <h2 className="text-3xl font-bold tracking-tight" style={{ color: TEXT_PRIMARY, fontFamily: "'Clash Display', sans-serif" }}>
                Alexander Carter
              </h2>
              <p className="text-base font-medium mt-1" style={{ color: ACCENT }}>Technology Analyst & Narrative Strategist</p>
              <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: TEXT_SECONDARY }}>
                Based in Lagos, Nigeria, I analyze the collision between emerging technology and complex markets. My work focuses on how systems—from financial protocols to social hierarchies—are built, broken, and rebuilt by new waves of innovation.
              </p>
              <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: TEXT_SECONDARY }}>
                I don't write "content." I architect narrative frameworks that give founders a competitive edge. My analysis on product strategy is forthcoming in Mind the Product.
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>
    );
}
  
function ContactSection() {
    const { ref, isInView, variants, transition } = useReveal();
    const [status, setStatus] = useState<"idle" | "sent">("idle");
    const budgetOptions = useMemo(() => ["Select...", "<$5k/mo (Advisory Only)", "$5k-10k/mo (Narrative Architecture)", "$10k+/mo (Authority Engine)"], []);
  
    return (
      <Section id="contact" style={{ backgroundColor: `rgba(234, 234, 234, 0.03)` }}>
        <Container>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={transition}
          >
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight" style={{ color: TEXT_PRIMARY, fontFamily: "'Clash Display', sans-serif" }}>
                    // Initiate Contact
                </h2>
                <p className="mt-3 text-base leading-relaxed" style={{ color: TEXT_SECONDARY }}>
                    If you have a problem of sufficient complexity, describe the constraint. I'll reply with a plan.
                </p>
            </div>
            <div className="mx-auto mt-12 max-w-lg">
              <form
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                onSubmit={(e) => { e.preventDefault(); setStatus("sent"); }}
              >
                <div className="grid gap-4">
                  <label className="grid gap-1.5"><span className="text-sm font-medium" style={{ color: TEXT_SECONDARY }}>Your Name</span><input required className="h-11 rounded-md border border-white/10 bg-[#0a0a0a]/60 px-3 text-sm text-white outline-none transition focus:border-blue-500"/></label>
                  <label className="grid gap-1.5"><span className="text-sm font-medium" style={{ color: TEXT_SECONDARY }}>Company URL</span><input required type="url" className="h-11 rounded-md border border-white/10 bg-[#0a0a0a]/60 px-3 text-sm text-white outline-none transition focus:border-blue-500" /></label>
                  <label className="grid gap-1.5"><span className="text-sm font-medium" style={{ color: TEXT_SECONDARY }}>The Constraint</span><textarea required rows={3} className="rounded-md border border-white/10 bg-[#0a0a0a]/60 px-3 py-2 text-sm text-white outline-none transition focus:border-blue-500" placeholder="In one sentence, what is the single biggest constraint holding back your growth?" /></label>
                  <label className="grid gap-1.5"><span className="text-sm font-medium" style={{ color: TEXT_SECONDARY }}>Budget</span><select className="h-11 rounded-md border border-white/10 bg-[#0a0a0a]/60 px-3 text-sm text-white outline-none transition focus:border-blue-500">{budgetOptions.map((b) => (<option key={b} value={b}>{b}</option>))}</select></label>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" className="group inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition" style={{ backgroundColor: ACCENT }}>
                    <span>Send Transmission</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-xs text-white/50">
                    {status === "sent" ? "Transmission queued. Acknowledged. I will respond if the mission is a fit." : "Response time: 24–72 hours."}
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
          <div className="mt-24 border-t border-white/10 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <p className="text-xs text-white/40">© {new Date().getFullYear()} LogicForge.io</p>
              <div className="text-xs text-white/40">Built for signal. Deployed in dark mode.</div>
            </div>
          </div>
        </Container>
      </Section>
    );
}

export default function Home() {
    return (
      <div
        className="min-h-screen"
        style={{ 
          backgroundColor: BG_DARK, 
          color: TEXT_PRIMARY,
          fontFamily: "'Inter', sans-serif" 
        }}
      >
        <style jsx global>{`
          @keyframes moveGrid {
            0% { background-position: 0 0; }
            100% { background-position: -2400px -2400px; }
          }
        `}</style>
        <TopNav />
        <main>
          <HeroSection />
          <SocialProofSection />
          <ServicesSection />
          <PortfolioSection />
          <ManifestoSection />
          <AboutSection />
          <ContactSection />
        </main>
      </div>
    );
}