// @ts-nocheck
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { motion } from "framer-motion";
import ProductQuiz from "@/components/ProductQuiz";
import { AuroraText } from "@/registry/magicui/aurora-text";
import axios from "axios";
import {
  BrainCircuit, Package, GraduationCap, ArrowRight, Sparkles,
  CheckCircle, Target, Eye, Search, Layout, Code, Headphones,
  Bot, Award, PenSquare, BookOpen, Calculator, Trophy,
  Zap, Link2, Smartphone, BarChart3, TrendingUp, Layers, Plug,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const API = `/api`;

const HERO_DREAM_CARDS = [
  {
    icon: <BrainCircuit size={16} />,
    iconBg: "#f5616615",
    title: "Especialidad en IA",
    text: "Soluciones a medida impulsadas por inteligencia artificial",
    accent: "#f56166",
    glow: "rgba(245, 97, 102, 0.34)",
  },
  {
    icon: <Package size={16} />,
    iconBg: "#1f9bd715",
    title: "Productos Corporativos",
    chips: [
      { label: "Botbee", icon: <Bot size={12} /> },
      { label: "Cert", icon: <Award size={12} /> },
      { label: "Blog", icon: <PenSquare size={12} /> },
    ],
    accent: "#1f9bd7",
    glow: "rgba(31, 155, 215, 0.34)",
  },
  {
    icon: <GraduationCap size={16} />,
    iconBg: "#e58f3515",
    title: "Productos ED Tech",
    chips: [{ label: "ED Teach" }, { label: "ED Math" }, { label: "ED Master" }],
    accent: "#e58f35",
    glow: "rgba(229, 143, 53, 0.34)",
  },
];

/* ---- HERO ---- */
function HeroSection({ openDemo }) {
  return (
    <section className="bg-white relative" id="inicio" style={{ minHeight: 520 }}>

      {/* Neon circuit SVG background — clipped to section bounds */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        viewBox="0 0 900 480"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="gc"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="go"><feGaussianBlur stdDeviation="2"   result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="gp"><feGaussianBlur stdDeviation="1.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {/* Base lines */}
        <g fill="none" stroke="#06b6d4" strokeWidth="0.5" opacity=".08" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="0,85 60,85 60,125 145,125 145,85 235,85 235,145 310,145"/>
          <polyline points="0,210 82,210 82,168 178,168 178,210 258,210 258,252 338,252"/>
          <polyline points="60,125 60,182 0,182"/>
          <polyline points="145,125 182,125 182,85 262,85 262,145 320,145"/>
        </g>
        <g fill="none" stroke="#f97316" strokeWidth="0.5" opacity=".07" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="900,68 832,68 832,108 750,108 750,68 662,68 662,112 588,112 588,68 502,68 502,112 438,112"/>
          <polyline points="900,205 842,205 842,248 766,248 766,205 688,205"/>
          <polyline points="832,108 832,162 868,162 868,218"/>
        </g>
        <g fill="none" stroke="#8b5cf6" strokeWidth="0.5" opacity=".07" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="148,480 148,412 208,412 208,358 278,358 278,412 358,412 358,458"/>
          <polyline points="900,375 822,375 822,338 742,338 742,375 678,375 678,418 608,418 608,458"/>
          <polyline points="420,0 420,52 462,52 462,92 502,92 502,52 542,52 542,0"/>
        </g>
        {/* Animated cyan flow */}
        <g filter="url(#gc)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="0,85 60,85 60,125 145,125 145,85 235,85 235,145 310,145" stroke="#0891b2" strokeWidth="1" opacity=".2"/>
          <polyline points="0,85 60,85 60,125 145,125 145,85 235,85 235,145 310,145" className="hero-fp" stroke="#22d3ee" strokeWidth="2" opacity=".45"/>
          <polyline points="0,210 82,210 82,168 178,168 178,210 258,210 258,252 338,252" stroke="#0891b2" strokeWidth="0.8" opacity=".15"/>
          <polyline points="0,210 82,210 82,168 178,168 178,210 258,210 258,252 338,252" className="hero-fp2" stroke="#67e8f9" strokeWidth="1.8" opacity=".4" style={{ animationDelay: ".8s" }}/>
        </g>
        {/* Animated orange flow */}
        <g filter="url(#go)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="900,68 832,68 832,108 750,108 750,68 662,68 662,112 588,112 588,68 502,68 502,112 438,112" stroke="#ea580c" strokeWidth="1" opacity=".18"/>
          <polyline points="900,68 832,68 832,108 750,108 750,68 662,68 662,112 588,112 588,68 502,68 502,112 438,112" className="hero-fp" stroke="#fb923c" strokeWidth="2" opacity=".45" style={{ animationDelay: "1.2s", animationDuration: "3s" }}/>
          <polyline points="900,205 842,205 842,248 766,248 766,205 688,205" stroke="#ea580c" strokeWidth="0.8" opacity=".14"/>
          <polyline points="900,205 842,205 842,248 766,248 766,205 688,205" className="hero-fp3" stroke="#fdba74" strokeWidth="1.8" opacity=".4" style={{ animationDelay: ".4s" }}/>
        </g>
        {/* Animated purple flow */}
        <g filter="url(#gp)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="148,480 148,412 208,412 208,358 278,358 278,412 358,412 358,458" stroke="#7c3aed" strokeWidth="0.8" opacity=".15"/>
          <polyline points="148,480 148,412 208,412 208,358 278,358 278,412 358,412 358,458" className="hero-fp2" stroke="#a78bfa" strokeWidth="1.8" opacity=".4" style={{ animationDelay: "1.8s", animationDuration: "3.5s" }}/>
          <polyline points="900,375 822,375 822,338 742,338 742,375 678,375 678,418 608,418 608,458" stroke="#7c3aed" strokeWidth="0.8" opacity=".15"/>
          <polyline points="900,375 822,375 822,338 742,338 742,375 678,375 678,418 608,418 608,458" className="hero-fp" stroke="#c4b5fd" strokeWidth="1.8" opacity=".38" style={{ animationDelay: "2.2s", animationDuration: "2.8s" }}/>
          <polyline points="420,0 420,52 462,52 462,92 502,92 502,52 542,52 542,0" stroke="#7c3aed" strokeWidth="0.8" opacity=".14"/>
          <polyline points="420,0 420,52 462,52 462,92 502,92 502,52 542,52 542,0" className="hero-fp3" stroke="#a78bfa" strokeWidth="1.8" opacity=".38" style={{ animationDelay: ".6s" }}/>
        </g>
        {/* Cyan nodes */}
        <g filter="url(#gc)">
          <circle cx="60"  cy="85"  r="3"   fill="#06b6d4" className="hero-nd"/>
          <circle cx="145" cy="125" r="3"   fill="#22d3ee" className="hero-nd2" style={{ animationDelay: ".3s" }}/>
          <circle cx="235" cy="85"  r="3"   fill="#06b6d4" className="hero-nd"  style={{ animationDelay: ".7s" }}/>
          <circle cx="82"  cy="210" r="2.5" fill="#22d3ee" className="hero-nd2" style={{ animationDelay: "1s" }}/>
          <circle cx="178" cy="168" r="2.5" fill="#67e8f9" className="hero-nd3" style={{ animationDelay: ".2s" }}/>
          <circle cx="462" cy="52"  r="2.5" fill="#06b6d4" className="hero-nd2" style={{ animationDelay: "1.5s" }}/>
          <circle cx="502" cy="92"  r="3"   fill="#22d3ee" className="hero-nd"  style={{ animationDelay: ".9s" }}/>
        </g>
        {/* Orange nodes */}
        <g filter="url(#go)">
          <circle cx="832" cy="68"  r="3"   fill="#f97316" className="hero-nd2" style={{ animationDelay: ".5s" }}/>
          <circle cx="750" cy="108" r="3"   fill="#fb923c" className="hero-nd"  style={{ animationDelay: "1.1s" }}/>
          <circle cx="662" cy="68"  r="2.5" fill="#fed7aa" className="hero-nd3" style={{ animationDelay: ".8s" }}/>
          <circle cx="588" cy="112" r="2.5" fill="#f97316" className="hero-nd2" style={{ animationDelay: "1.4s" }}/>
          <circle cx="502" cy="68"  r="2.5" fill="#f97316" className="hero-nd"  style={{ animationDelay: ".3s" }}/>
          <circle cx="842" cy="248" r="2.5" fill="#fb923c" className="hero-nd3" style={{ animationDelay: "1.7s" }}/>
        </g>
        {/* Purple nodes */}
        <g filter="url(#gp)">
          <circle cx="208" cy="412" r="2.5" fill="#8b5cf6" className="hero-nd2" style={{ animationDelay: "1.2s" }}/>
          <circle cx="278" cy="358" r="3"   fill="#a78bfa" className="hero-nd"  style={{ animationDelay: ".6s" }}/>
          <circle cx="742" cy="375" r="2.5" fill="#7c3aed" className="hero-nd3" style={{ animationDelay: "2s" }}/>
          <circle cx="678" cy="418" r="2.5" fill="#a78bfa" className="hero-nd2" style={{ animationDelay: "1.3s" }}/>
        </g>
        {/* Decorative chips */}
        <g opacity=".12" fill="none" strokeWidth="0.6">
          <rect x="54"  y="153" width="20" height="14" rx="2" stroke="#06b6d4"/>
          <line x1="54" y1="157" x2="49" y2="157" stroke="#06b6d4"/><line x1="54" y1="162" x2="49" y2="162" stroke="#06b6d4"/>
          <line x1="74" y1="157" x2="79" y2="157" stroke="#06b6d4"/><line x1="74" y1="162" x2="79" y2="162" stroke="#06b6d4"/>
          <rect x="788" y="132" width="20" height="14" rx="2" stroke="#f97316"/>
          <line x1="788" y1="136" x2="783" y2="136" stroke="#f97316"/><line x1="788" y1="141" x2="783" y2="141" stroke="#f97316"/>
          <line x1="808" y1="136" x2="813" y2="136" stroke="#f97316"/><line x1="808" y1="141" x2="813" y2="141" stroke="#f97316"/>
          <rect x="333" y="388" width="20" height="14" rx="2" stroke="#8b5cf6"/>
          <line x1="333" y1="392" x2="328" y2="392" stroke="#8b5cf6"/><line x1="333" y1="397" x2="328" y2="397" stroke="#8b5cf6"/>
          <line x1="353" y1="392" x2="358" y2="392" stroke="#8b5cf6"/><line x1="353" y1="397" x2="358" y2="397" stroke="#8b5cf6"/>
        </g>
      </svg>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center pt-28 pb-16 min-h-[520px]">

        {/* Left: text */}
        <motion.div initial="hidden" animate="visible" variants={stagger}>

          <motion.h1
            variants={fadeUp}
            className="hero-main-title font-extrabold leading-tight mb-5"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(40px, 4.5vw, 58px)", letterSpacing: "-1.5px" }}
          >
            <span style={{ color: "#074076" }}>Construimos<br />tecnología con<br /></span>
            <AuroraText className="hero-aurora-brand">inteligencia artificial</AuroraText><br />
            <span style={{ color: "#074076" }}>para empresas y<br />educación</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-main-subtitle text-sm mb-7 leading-relaxed" style={{ color: "#64748b" }}>
            Software a medida, productos corporativos con IA y EdTech.<br />
            Transformación real en Latinoamérica.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
            <button onClick={openDemo} className="hero-cta-btn hero-cta-btn-primary" data-testid="hero-contact-btn">
              <span className="hero-cta-btn-label">Contáctanos</span>
              <span className="hero-cta-btn-icon"><ArrowRight size={15} /></span>
            </button>
            <button
              onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
              className="hero-cta-btn hero-cta-btn-ghost"
              data-testid="hero-services-btn"
            >
              <span className="hero-cta-btn-label">Ver servicios</span>
              <span className="hero-cta-btn-icon"><ArrowRight size={15} /></span>
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="hero-presence-row flex items-center gap-3 text-xs flex-wrap" style={{ color: "#94a3b8" }}>
            <span className="hero-presence-label">Presencia en</span>
            {[
              { country: "Chile", flagSrc: "https://flagcdn.com/w40/cl.png" },
              { country: "México", flagSrc: "https://flagcdn.com/w40/mx.png" },
              { country: "Perú", flagSrc: "https://flagcdn.com/w40/pe.png" },
              { country: "Argentina", flagSrc: "https://flagcdn.com/w40/ar.png" },
            ].map((c) => (
              <span key={c.country} className="hero-presence-country flex items-center gap-1 font-medium" style={{ color: "#475569" }}>
                <img src={c.flagSrc} alt={`Bandera de ${c.country}`} className="w-4 h-4 rounded-sm object-cover" loading="lazy" /> {c.country}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: glass cards */}
        <div className="hidden lg:flex flex-col gap-4 ml-auto" style={{ width: "100%", maxWidth: 340 }}>
          {/* Card 1 — IA · brand navy */}
          <div className="hero-glass-card" style={{ animationName: "heroFloat1", borderTop: "2px solid rgba(0,59,114,.35)", boxShadow: "0 6px 28px rgba(0,59,114,.09),0 1px 0 rgba(255,255,255,.8) inset" }}>
            <div style={{ width: 42, height: 42, background: "rgba(0,59,114,.08)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, fontSize: 20 }}>🔬</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#003b72", marginBottom: 6 }}>Especialidad en IA</div>
            <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>Soluciones a medida impulsadas por inteligencia artificial</div>
          </div>

          {/* Card 2 — Corporativos · brand coral */}
          <div className="hero-glass-card" style={{ animationName: "heroFloat2", animationDelay: ".5s", borderTop: "2px solid rgba(252,94,95,.35)", boxShadow: "0 6px 28px rgba(252,94,95,.09),0 1px 0 rgba(255,255,255,.8) inset" }}>
            <div style={{ width: 42, height: 42, background: "rgba(252,94,95,.08)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, fontSize: 20 }}>📦</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fc5e5f", marginBottom: 10 }}>Productos Corporativos</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Botbee", "Cert", "Blog"].map((l) => (
                <span key={l} style={{ background: "rgba(252,94,95,.07)", border: "1px solid rgba(252,94,95,.25)", color: "#fc5e5f", fontSize: 12, padding: "4px 12px", borderRadius: 10 }}>{l}</span>
              ))}
            </div>
          </div>

          {/* Card 3 — EdTech · brand sky */}
          <div className="hero-glass-card" style={{ animationName: "heroFloat3", animationDelay: "1s", borderTop: "2px solid rgba(0,158,231,.35)", boxShadow: "0 6px 28px rgba(0,158,231,.09),0 1px 0 rgba(255,255,255,.8) inset" }}>
            <div style={{ width: 42, height: 42, background: "rgba(0,158,231,.08)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, fontSize: 20 }}>🎓</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#009ee7", marginBottom: 10 }}>Estudiantes Digitales</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["ED Teach", "ED Math", "ED Master"].map((l) => (
                <span key={l} style={{ background: "rgba(0,158,231,.07)", border: "1px solid rgba(0,158,231,.25)", color: "#009ee7", fontSize: 12, padding: "4px 12px", borderRadius: 10 }}>{l}</span>
              ))}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}

/* ---- PARTNERS ---- */
const PARTNERS = ["SPDA", "DICAPI", "Estudiantes Digitales", "SPDA", "DICAPI", "Estudiantes Digitales"];
function PartnersSection() {
  return (
    <section className="py-10 bg-gray-50 border-y border-gray-100" data-testid="partners-section">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-6">Partners</p>
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span key={i} className="text-lg font-bold text-gray-300 uppercase tracking-widest mx-12 whitespace-nowrap hover:text-[#003b72] transition-colors" style={{ fontFamily: "IBM Plex Mono, monospace" }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- NOSOTROS ---- */
const PROCESO = [
  { num: "01", icon: <Search size={18} />, title: "Entendemos el problema", desc: "Nos sumergimos en tu negocio para entender el desafío real antes de proponer cualquier solución." },
  { num: "02", icon: <Layout size={18} />, title: "Definimos la solución", desc: "Co-diseñamos contigo la arquitectura, tecnología y roadmap exactos para tu necesidad." },
  { num: "03", icon: <Code size={18} />, title: "Desarrollamos con agilidad", desc: "Iteraciones rápidas, entregas frecuentes y total transparencia durante todo el proceso." },
  { num: "04", icon: <Headphones size={18} />, title: "Acompañamos el crecimiento", desc: "Soporte, mejoras y escalabilidad continua. No terminamos en la entrega, crecemos contigo." },
];

function NosotrosSection() {
  return (
    <section className="py-20 bg-white" id="nosotros">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#003b72] mb-4 leading-tight text-center" style={{ fontFamily: "Outfit, sans-serif" }}>
            Nosotros
          </h2>
          <p className="text-2xl lg:text-3xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Empresa especializada en desarrollo de software a medida
          </p>
          <p className="text-xl lg:text-3xl font-semibold gradient-text mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
            IA Powered
          </p>
          <p className="text-gray-500 text-base leading-relaxed max-w-3xl mx-auto mt-3">
            Resolvemos problemas de forma innovadora. Equipos especializados, entregas ágiles y total transparencia en cada etapa del proyecto.
          </p>
        </div>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <div className="bg-[#f8fafc] rounded-2xl p-7 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#fc5e5f]/10 flex items-center justify-center"><Target size={17} color="#fc5e5f" /></div>
              <h3 className="font-bold text-[#003b72] text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>Misión</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">Mejorar la calidad educativa y el desarrollo empresarial mediante tecnología de IA, creando soluciones accesibles que transformen organizaciones en Latinoamérica.</p>
          </div>
          <div className="bg-[#003b72]/3 rounded-2xl p-7 border border-[#003b72]/8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#009ee7]/10 flex items-center justify-center"><Eye size={17} color="#009ee7" /></div>
              <h3 className="font-bold text-[#003b72] text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>Visión</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">Ser el principal partner tecnológico en IA para empresas y organizaciones en Latinoamérica, liderando la transformación digital con soluciones de impacto real.</p>
          </div>
        </div>

        {/* Presence with flags */}
        <div className="bg-[#003b72] text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-5 mb-14">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Presencia regional</p>
            <h3 className="text-xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>4 países, 1 visión</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {[{ country: "Chile", flagSrc: "https://flagcdn.com/w40/cl.png", note: "Sede central" }, { country: "México", flagSrc: "https://flagcdn.com/w40/mx.png" }, { country: "Perú", flagSrc: "https://flagcdn.com/w40/pe.png" }, { country: "Argentina", flagSrc: "https://flagcdn.com/w40/ar.png" }].map((c) => (
              <div key={c.country} className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5">
                <img src={c.flagSrc} alt={`Bandera de ${c.country}`} className="w-5 h-5 rounded-sm object-cover" loading="lazy" />
                <span className="font-medium text-sm">{c.country}</span>
                {c.note && <span className="text-xs text-white/50">{c.note}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#003b72] text-center" style={{ fontFamily: "Outfit, sans-serif" }}>¿Cómo trabajamos?</h2>
        </div>

        {/* Desktop timeline */}
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {/* Animated connector line (desktop only) */}
          <div className="hidden lg:block absolute h-0.5 timeline-line-animated top-5 z-0" style={{ left: "12.5%", right: "12.5%" }} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4">
            {PROCESO.map((step, idx) => {
              const circleColors = ["#fc5e5f", "#e8902f", "#009ee7", "#003b72"];
              const color = circleColors[idx];
              return (
                <motion.div key={step.num} variants={fadeUp} className="flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0 relative">
                  {/* Mobile vertical connector */}
                  {idx < PROCESO.length - 1 && (
                    <div className="lg:hidden absolute left-5 w-0.5 bg-gray-200 z-0" style={{ top: "42px", height: "calc(100% + 24px)" }} />
                  )}
                  {/* Number circle — brand color per step */}
                  <div
                    className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm z-10 relative shrink-0 lg:mb-5"
                    style={{ background: color, boxShadow: `0 4px 14px ${color}40` }}
                  >
                    {idx + 1}
                  </div>
                  <div className="lg:text-center pb-4 lg:pb-0 lg:px-2">
                    <div className="flex lg:justify-center mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18`, color }}>{step.icon}</div>
                    </div>
                    <h4 className="font-bold text-[#003b72] mb-1 text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>{step.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-10 text-center">
          <Link to="/equipo" className="inline-flex items-center gap-2 px-8 py-4 bg-[#003b72] text-white rounded-full font-semibold text-base hover:bg-[#002a55] transition-all hover:-translate-y-0.5 shadow-md shadow-[#003b72]/20" data-testid="equipo-link">
            Conoce a nuestro equipo <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---- SERVICIOS ---- */
const SERVICIOS_CAPS = [
  { icon: <BrainCircuit size={16} />, label: "IA Aplicada" },
  { icon: <Zap size={16} />, label: "Automatización" },
  { icon: <Link2 size={16} />, label: "Integraciones" },
  { icon: <Smartphone size={16} />, label: "Web & Mobile" },
  { icon: <BarChart3 size={16} />, label: "Data & Analytics" },
  { icon: <TrendingUp size={16} />, label: "Transformación Digital" },
];
const SERVICE_CARDS = [
  { icon: <BrainCircuit size={28} />, color: "#003b72", bg: "#003b7210", label: "IA", sub: "Integrada en todo", desc: "Integramos inteligencia artificial en tus procesos para automatizar tareas y mejorar decisiones de negocio." },
  { icon: <Layers size={28} />, color: "#fc5e5f", bg: "#fc5e5f10", label: "Agile", sub: "Metodología ágil", desc: "Metodología ágil con iteraciones rápidas, entregas frecuentes y total transparencia durante el proyecto." },
  { icon: <Plug size={28} />, color: "#e8902f", bg: "#e8902f10", label: "APIs", sub: "Integraciones", desc: "Conectamos tus sistemas y plataformas con APIs robustas, seguras y bien documentadas." },
  { icon: <BarChart3 size={28} />, color: "#009ee7", bg: "#009ee710", label: "Data", sub: "Analytics", desc: "Transformamos tus datos en insights accionables para impulsar la estrategia de tu negocio." },
];
function ServiciosSection({ openDemo }) {
  return (
    <section className="py-20 bg-white relative" id="servicios">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="grid lg:grid-cols-2 gap-14 items-center"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          {/* Left column */}
          <div>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest bg-[#009ee7]/10 text-[#009ee7] px-4 py-2 rounded-full mb-5">Servicios</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-[#003b72] mb-3 leading-tight text-center" style={{ fontFamily: "Outfit, sans-serif" }}>
              Desarrollo de software a medida
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg font-semibold text-[#fc5e5f] mb-4">IA Powered</motion.p>
            <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-8">
              Nos apasiona resolver problemas de forma innovadora. Trabajamos con agilidad y equipos especializados para garantizar el avance sin contratiempos de tu proyecto tecnológico.
            </motion.p>
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
              {SERVICIOS_CAPS.map((cap) => (
                <div key={cap.label} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <span className="text-[#003b72]">{cap.icon}</span>
                  <span>{cap.label}</span>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp}>
              <button onClick={openDemo} className="inline-flex items-center gap-2 px-8 py-4 bg-[#003b72] text-white rounded-full font-semibold text-base hover:bg-[#002a55] transition-all hover:-translate-y-0.5 shadow-md shadow-[#003b72]/20" data-testid="servicios-contact-btn">
                Contáctanos <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
          {/* Right column — 2x2 flip cards */}
          <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
            {SERVICE_CARDS.map((card) => (
              <motion.div key={card.label} variants={fadeUp} className="flip-card" data-testid={`service-card-${card.label.toLowerCase()}`}>
                <div className="flip-inner">
                  {/* Front */}
                  <div className="flip-front shadow-sm" style={{ borderColor: card.color }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: card.bg, color: card.color }}>
                      {card.icon}
                    </div>
                    <h4 className="font-bold text-[#003b72] text-xl mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{card.label}</h4>
                    <p className="text-gray-400 text-sm">{card.sub}</p>
                  </div>
                  {/* Back */}
                  <div className="flip-back" style={{ background: card.color }}>
                    <h4 className="font-bold text-lg mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{card.label}</h4>
                    <p className="text-sm leading-relaxed opacity-90">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}

/* ---- PRODUCTOS ---- */
const CORP_PRODUCTS = [
  { id: "botbee", icon: <Bot size={22} />, color: "#fc5e5f", bg: "#fc5e5f12", name: "Botbee", tagline: "El experto de tu empresa, disponible 24/7.", desc: "Asistente virtual inteligente entrenado con la información de tu negocio.", href: "/productos/botbee" },
  { id: "cert", icon: <Award size={22} />, color: "#009ee7", bg: "#009ee712", name: "Cert", tagline: "Certificados e insignias al instante.", desc: "Plataforma de certificación digital con validez institucional.", href: "/productos/cert" },
  { id: "blog", icon: <PenSquare size={22} />, color: "#e8902f", bg: "#e8902f12", name: "Blog IA", tagline: "Tu voz experta, impulsada por IA.", desc: "Convierte tus ideas en artículos profesionales para web y redes.", href: "/productos/blog-ia" },
];
const ED_PRODUCTS = [
  { id: "ed-master", icon: <Trophy size={22} />, color: "#FF7878", bg: "#FF787812", name: "ED Master", tagline: "Entrena y llega preparado a tu examen.", desc: "Plataforma de entrenamiento con bancos de preguntas y simulaciones.", href: "/estudiantes-digitales/ed-master" },
  { id: "ed-teach", icon: <BookOpen size={22} />, color: "#65B4B8", bg: "#65B4B812", name: "ED Teach", tagline: "Crea materiales didácticos en segundos.", desc: "Genera recursos educativos con IA para docentes.", href: "/estudiantes-digitales/ed-teach" },
  { id: "ed-math", icon: <Calculator size={22} />, color: "#2B7F87", bg: "#2B7F8712", name: "ED Math", tagline: "Domina las matemáticas paso a paso.", desc: "LMS especializado en matemáticas con seguimiento en tiempo real.", href: "/estudiantes-digitales/ed-math" },
];

function ProductCard({ product }) {
  return (
    <a href={product.href} className="card-lift bg-white border border-gray-100 rounded-2xl p-6 group block" data-testid={`product-card-${product.id}`}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: product.bg, color: product.color }}>{product.icon}</div>
      <h4 className="font-bold text-[#003b72] text-lg mb-1 group-hover:text-[#009ee7] transition-colors" style={{ fontFamily: "Outfit, sans-serif" }}>{product.name}</h4>
      <p className="text-xs font-medium mb-2" style={{ color: product.color }}>{product.tagline}</p>
      <p className="text-gray-500 text-sm leading-relaxed">{product.desc}</p>
      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-gray-400 group-hover:text-[#009ee7] group-hover:gap-2.5 transition-all">
        Ver más <ArrowRight size={12} />
      </div>
    </a>
  );
}

function ProductosSection() {
  const location = useLocation();
  const [tab, setTab] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("productos") === "ed" ? "ed" : "corp";
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get("productos");
    if (t === "ed" || t === "corp") setTab(t);
  }, [location.search]);
  return (
    <section className="py-20 bg-gray-50" id="productos">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
          <div>
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-[#fc5e5f] font-medium mb-3">Nuestros productos</motion.p>
            <motion.h2 variants={fadeUp} className="text-5xl font-bold text-[#003b72] text-center" style={{ fontFamily: "Outfit, sans-serif" }}>Herramientas listas para usar</motion.h2>
          </div>
          <motion.div variants={fadeUp} className="flex gap-2 bg-white border border-gray-200 rounded-full p-1">
            <button onClick={() => setTab("corp")} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${tab === "corp" ? "bg-[#003b72] text-white" : "text-gray-500 hover:text-[#003b72]"}`} data-testid="tab-corporativos">Corporativos</button>
            <button onClick={() => setTab("ed")} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${tab === "ed" ? "bg-[#2B7F87] text-white" : "text-gray-500 hover:text-[#2B7F87]"}`} data-testid="tab-estudiantes">Estudiantes Digitales</button>
          </motion.div>
        </motion.div>
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid={tab === "corp" ? "corp-products-grid" : "ed-products-grid"}>
          {(tab === "corp" ? CORP_PRODUCTS : ED_PRODUCTS).map((p) => <ProductCard key={p.id} product={p} />)}
        </motion.div>
      </div>
    </section>
  );
}

/* ---- QUIZ ---- */
function QuizSection({ openDemo }) {
  return (
    <section className="py-20 bg-white" id="quiz">
      <motion.div className="max-w-4xl mx-auto px-6"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
        <motion.div variants={fadeUp} className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#fc5e5f] font-medium mb-3">Encuentra tu producto ideal</p>
          <h2 className="text-4xl font-bold text-[#003b72] mb-3 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>¿Qué producto necesito?</h2>
          <p className="text-gray-500">Responde 3 preguntas y te recomendamos el producto ideal. <span className="text-gray-400 text-sm">(opcional)</span></p>
        </motion.div>
        <motion.div variants={fadeUp}>
          <ProductQuiz onContact={openDemo} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---- CONTACTO ---- */
const PRODUCTOS_LIST = ["Botbee", "Cert", "Blog IA", "ED Master", "ED Teach", "ED Math", "Desarrollo a Medida"];
function ContactoSection() {
  const [form, setForm] = useState({ nombre: "", apellido: "", email: "", empresa: "", producto: "", desafio: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      await axios.post(`${API}/demo`, { ...form, tipo: "formulario" });
      setSuccess(true);
    } catch { setError("Ocurrió un error. Intenta de nuevo."); }
    setLoading(false);
  };

  return (
    <section className="py-20 bg-[#f8fafc]" id="contacto" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#fc5e5f] font-medium mb-4">Contáctanos</p>
            <h2 className="text-4xl font-bold text-[#003b72] mb-5 leading-tight text-center" style={{ fontFamily: "Outfit, sans-serif" }}>Hablemos sobre tu proyecto</h2>
            <p className="text-gray-600 leading-relaxed mb-8">Nuestro equipo responde en menos de 24 horas. Cuéntanos tu desafío y juntos encontramos la mejor solución.</p>
            <ul className="flex flex-col gap-3 mb-10">
              {["Respuesta en menos de 24 horas", "Demo personalizada según tu industria", "Sin compromisos", "Propuesta inicial sin costo"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700 text-sm">
                  <CheckCircle size={17} className="text-[#009ee7] shrink-0" />{item}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-3 gap-4">
              {[{ value: "4", label: "países" }, { value: "6", label: "productos activos" }, { value: "<24h", label: "tiempo de respuesta" }].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-[#003b72]" style={{ fontFamily: "Outfit, sans-serif" }}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {success ? (
              <div className="text-center py-8" data-testid="contact-success">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={30} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#003b72] mb-2">¡Mensaje recibido!</h3>
                <p className="text-gray-500 text-sm">Nuestro equipo se pondrá en contacto en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" data-testid="contact-form">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                    <input required className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7]" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} data-testid="contact-input-nombre" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
                    <input required className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7]" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} data-testid="contact-input-apellido" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input required type="email" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7]" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} data-testid="contact-input-email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                  <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7]" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} data-testid="contact-input-empresa" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">¿Qué producto te interesa?</label>
                  <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7] bg-white" value={form.producto} onChange={(e) => setForm({ ...form, producto: e.target.value })} data-testid="contact-select-producto">
                    <option value="">Seleccionar...</option>
                    {PRODUCTOS_LIST.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">¿Cuál es tu principal desafío?</label>
                  <textarea rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7] resize-none" value={form.desafio} onChange={(e) => setForm({ ...form, desafio: e.target.value })} placeholder="Cuéntanos sobre tu necesidad..." data-testid="contact-textarea-desafio" />
                </div>
                {error && <p className="text-red-500 text-sm" data-testid="contact-error">{error}</p>}
                <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#fc5e5f] text-white rounded-full font-semibold hover:bg-[#e04e4f] transition-colors disabled:opacity-60 shadow-lg shadow-[#fc5e5f]/20" data-testid="contact-submit-btn">
                  {loading ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- MAIN ---- */
export default function HomePage() {
  const { openDemo } = useDemo();
  const location = useLocation();

  // Handle scroll-to-quiz from nav or redirect
  useEffect(() => {
    if (location.state?.scrollTo === "quiz") {
      setTimeout(() => {
        const el = document.getElementById("quiz");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  }, [location.state]);

  return (
    <>
      <HeroSection openDemo={openDemo} />
      <PartnersSection />
      <NosotrosSection />
      <ServiciosSection openDemo={openDemo} />
      <ProductosSection />
      <QuizSection openDemo={openDemo} />
      <ContactoSection />
    </>
  );
}
