import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import ProductQuiz from "@/components/ProductQuiz";
import axios from "axios";
import {
  BrainCircuit, Package, GraduationCap, ArrowRight, Sparkles,
  CheckCircle, Target, Eye, Search, Layout, Code, Headphones,
  Bot, Award, PenSquare, BookOpen, Calculator, Trophy,
  Zap, Link2, Smartphone, BarChart3, TrendingUp, Layers, Plug,
} from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/* ---- HERO ---- */
function HeroSection({ openDemo }) {
  return (
    <section className="pt-28 pb-20 bg-white overflow-hidden relative" id="inicio">
      <div className="absolute top-0 right-0 w-2/3 h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.04]" style={{ background: "radial-gradient(ellipse 80% 80% at 100% 10%, #009ee7, transparent)" }} />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-[0.06]" style={{ background: "#fc5e5f", filter: "blur(60px)" }} />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#003b72]/5 border border-[#003b72]/10 rounded-full px-4 py-2 text-sm font-medium text-[#003b72] mb-7">
              <Sparkles size={14} className="text-[#fc5e5f]" />
              IA para Empresas &amp; Educación — Latinoamérica
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-[#003b72] leading-tight mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
              Construimos tecnología con <span className="gradient-text">inteligencia artificial</span> para empresas y educación
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
              Software a medida, productos corporativos con IA y EdTech. Transformación real en Latinoamérica.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={openDemo} className="px-7 py-3.5 bg-[#fc5e5f] text-white rounded-full font-semibold hover:bg-[#e04e4f] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#fc5e5f]/25" data-testid="hero-contact-btn">
                Contáctanos
              </button>
              <Link to="/tecnologia" className="px-7 py-3.5 border-2 border-[#003b72] text-[#003b72] rounded-full font-semibold hover:bg-[#003b72] hover:text-white transition-all" data-testid="hero-services-btn">
                Ver servicios
              </Link>
            </div>
            {/* Countries with flags */}
            <div className="flex items-center gap-3 text-sm text-gray-400 flex-wrap">
              <span>Presencia en</span>
              {[
                { country: "Chile", flag: "🇨🇱" },
                { country: "México", flag: "🇲🇽" },
                { country: "Perú", flag: "🇵🇪" },
                { country: "Argentina", flag: "🇦🇷" },
              ].map((c) => (
                <span key={c.country} className="flex items-center gap-1 text-[#003b72] font-medium">
                  <span>{c.flag}</span> {c.country}
                </span>
              ))}
            </div>
          </div>
          {/* Floating product cards */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-sm">
              <div className="card-lift float-anim bg-white border border-gray-100 rounded-2xl p-6 shadow-xl mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: "#fc5e5f15" }}>
                  <BrainCircuit size={22} color="#fc5e5f" />
                </div>
                <h3 className="font-bold text-[#003b72] text-lg">Especialidad en IA</h3>
                <p className="text-sm text-gray-500 mt-1">Soluciones a medida impulsadas por inteligencia artificial</p>
              </div>
              <div className="card-lift float-anim-delay bg-white border border-gray-100 rounded-2xl p-6 shadow-xl mb-4 ml-10">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: "#009ee715" }}>
                  <Package size={22} color="#009ee7" />
                </div>
                <h3 className="font-bold text-[#003b72] text-lg">Productos Corporativos</h3>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {["Botbee", "Cert", "Blog"].map((p) => (
                    <span key={p} className="text-xs bg-[#009ee7]/10 text-[#009ee7] px-2 py-1 rounded-full font-medium">{p}</span>
                  ))}
                </div>
              </div>
              <div className="card-lift float-anim-delay-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-xl">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: "#e8902f15" }}>
                  <GraduationCap size={22} color="#e8902f" />
                </div>
                <h3 className="font-bold text-[#003b72] text-lg">Estudiantes Digitales</h3>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {["ED Teach", "ED Math", "ED Master"].map((p) => (
                    <span key={p} className="text-xs bg-[#e8902f]/10 text-[#e8902f] px-2 py-1 rounded-full font-medium">{p}</span>
                  ))}
                </div>
              </div>
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
        <div className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#003b72] mb-4 leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
            NOSOTROS
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
            Empresa especializada en desarrollo de software a medida — <span className="gradient-text font-semibold">IA Powered</span>
          </p>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl mt-3">
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
            {[{ country: "Chile", flag: "🇨🇱", note: "Sede central" }, { country: "México", flag: "🇲🇽" }, { country: "Perú", flag: "🇵🇪" }, { country: "Argentina", flag: "🇦🇷" }].map((c) => (
              <div key={c.country} className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5">
                <span className="text-lg">{c.flag}</span>
                <span className="font-medium text-sm">{c.country}</span>
                {c.note && <span className="text-xs text-white/50">{c.note}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#003b72]" style={{ fontFamily: "Outfit, sans-serif" }}>¿CÓMO TRABAJAMOS?</h2>
        </div>

        {/* Desktop timeline */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute h-0.5 bg-gradient-to-r from-[#fc5e5f] via-[#009ee7] to-[#e8902f] top-5 z-0" style={{ left: "12.5%", right: "12.5%" }} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4">
            {PROCESO.map((step, idx) => (
              <div key={step.num} className="flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0 relative">
                {/* Mobile vertical connector */}
                {idx < PROCESO.length - 1 && (
                  <div className="lg:hidden absolute left-5 w-0.5 bg-gray-200 z-0" style={{ top: "42px", height: "calc(100% + 24px)" }} />
                )}
                {/* Number circle */}
                <div className="w-10 h-10 rounded-full bg-[#003b72] text-white flex items-center justify-center font-bold text-sm z-10 relative shrink-0 lg:mb-5 shadow-lg shadow-[#003b72]/20">
                  {idx + 1}
                </div>
                <div className="lg:text-center pb-4 lg:pb-0 lg:px-2">
                  <div className="flex lg:justify-center mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#009ee7]/10 flex items-center justify-center text-[#009ee7]">{step.icon}</div>
                  </div>
                  <h4 className="font-bold text-[#003b72] mb-1 text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>{step.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

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
  { icon: <BrainCircuit size={28} />, color: "#003b72", bg: "#003b7210", label: "IA", sub: "Integrada en todo" },
  { icon: <Layers size={28} />, color: "#fc5e5f", bg: "#fc5e5f10", label: "Agile", sub: "Metodología ágil" },
  { icon: <Plug size={28} />, color: "#e8902f", bg: "#e8902f10", label: "APIs", sub: "Integraciones" },
  { icon: <BarChart3 size={28} />, color: "#009ee7", bg: "#009ee710", label: "Data", sub: "Analytics" },
];
function ServiciosSection({ openDemo }) {
  return (
    <section className="py-20 bg-white" id="servicios">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left column */}
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-[#009ee7]/10 text-[#009ee7] px-4 py-2 rounded-full mb-5">Servicios</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#003b72] mb-3 leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
              Desarrollo de software a medida
            </h2>
            <p className="text-lg font-semibold text-[#fc5e5f] mb-4">IA Powered</p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Nos apasiona resolver problemas de forma innovadora. Trabajamos con agilidad y equipos especializados para garantizar el avance sin contratiempos de tu proyecto tecnológico.
            </p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
              {SERVICIOS_CAPS.map((cap) => (
                <div key={cap.label} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <span className="text-[#003b72]">{cap.icon}</span>
                  <span>{cap.label}</span>
                </div>
              ))}
            </div>
            <button onClick={openDemo} className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#003b72] text-white rounded-full font-semibold hover:bg-[#002a55] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#003b72]/20" data-testid="servicios-contact-btn">
              Contáctanos <ArrowRight size={15} />
            </button>
          </div>
          {/* Right column — 2x2 cards */}
          <div className="grid grid-cols-2 gap-4">
            {SERVICE_CARDS.map((card) => (
              <div key={card.label} className="card-lift bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all" data-testid={`service-card-${card.label.toLowerCase()}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: card.bg, color: card.color }}>
                  {card.icon}
                </div>
                <h4 className="font-bold text-[#003b72] text-xl mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{card.label}</h4>
                <p className="text-gray-400 text-sm">{card.sub}</p>
              </div>
            ))}
          </div>
        </div>
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
  const [tab, setTab] = useState("corp");
  return (
    <section className="py-20 bg-gray-50" id="productos">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#fc5e5f] font-medium mb-3">Nuestros productos</p>
            <h2 className="text-5xl font-bold text-[#003b72]" style={{ fontFamily: "Outfit, sans-serif" }}>Herramientas listas para usar</h2>
          </div>
          <div className="flex gap-2 bg-white border border-gray-200 rounded-full p-1">
            <button onClick={() => setTab("corp")} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${tab === "corp" ? "bg-[#003b72] text-white" : "text-gray-500 hover:text-[#003b72]"}`} data-testid="tab-corporativos">
              Corporativos
            </button>
            <button onClick={() => setTab("ed")} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${tab === "ed" ? "bg-[#2B7F87] text-white" : "text-gray-500 hover:text-[#2B7F87]"}`} data-testid="tab-estudiantes">
              Estudiantes Digitales
            </button>
          </div>
        </div>

        {tab === "corp" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="corp-products-grid">
            {CORP_PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="ed-products-grid">
            {ED_PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        <div className="mt-8 text-center">
          <a href={tab === "corp" ? "/productos" : "/estudiantes-digitales"} className="inline-flex items-center gap-2 text-[#009ee7] font-medium text-sm hover:gap-3 transition-all" data-testid="products-more-link">
            Ver todos los productos <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---- QUIZ ---- */
function QuizSection({ openDemo }) {
  return (
    <section className="py-20 bg-white" id="quiz">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#fc5e5f] font-medium mb-3">Encuentra tu producto ideal</p>
          <h2 className="text-4xl font-bold text-[#003b72] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>¿Qué producto necesito?</h2>
          <p className="text-gray-500">Responde 3 preguntas y te recomendamos el producto ideal. <span className="text-gray-400 text-sm">(opcional)</span></p>
        </div>
        <ProductQuiz onContact={openDemo} />
      </div>
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
            <h2 className="text-4xl font-bold text-[#003b72] mb-5 leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>Hablemos sobre tu proyecto</h2>
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
