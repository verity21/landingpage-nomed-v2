// @ts-nocheck
import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { ArrowLeft, Bot, CheckCircle, ArrowRight, ShieldCheck, Clock, FileText, Mic } from "lucide-react";

const COLOR = "#fc5e5f";
const BG = "#fc5e5f10";

const FEATURES = [
  { icon: <FileText size={18} />, title: "Solo tus documentos", desc: "Responde únicamente con la información que tú provees. Sin inventar ni usar datos genéricos de internet." },
  { icon: <Mic size={18} />, title: "Personalidad de marca", desc: "Define su nombre, cargo y tono de voz para que represente fielmente tu identidad corporativa." },
  { icon: <ShieldCheck size={18} />, title: "Carga de conocimiento", desc: "Sube archivos, manuales y bases de datos para transformar tu conocimiento en respuestas inmediatas." },
  { icon: <Clock size={18} />, title: "Disponible 24/7", desc: "Atiende consultas de clientes y usuarios en cualquier momento del día, sin tiempo de espera." },
];

const BENEFITS = [
  "Se adapta a cualquier industria o rubro",
  "Reduce consultas repetitivas y carga de soporte",
  "Implementación rápida sin configuraciones complejas",
  "Coherencia total en el tono de comunicación de tu empresa",
  "Disponible en web, apps y canales digitales",
];

export default function BotbeePage() {
  const { openDemo } = useDemo();
  return (
    <div style={{ fontFamily: "IBM Plex Sans, sans-serif" }}>
      {/* Minimal top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 h-14 flex items-center justify-between px-6" data-testid="product-topbar">
        <Link to="/" className="flex items-center gap-0.5 font-bold text-xl" data-testid="product-logo">
          <span style={{ background: "linear-gradient(135deg, #fc5e5f, #e8902f, #009ee7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "Outfit, sans-serif" }}>N</span>
          <span style={{ color: "#003b72", fontFamily: "Outfit, sans-serif" }}>omed</span>
        </Link>
        <Link to="/productos" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#003b72] transition-colors" data-testid="product-back-btn">
          <ArrowLeft size={15} /> Volver a Productos
        </Link>
      </div>

      {/* Hero */}
      <section className="pt-28 pb-16 bg-white" data-testid="botbee-hero">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold mb-8" style={{ background: BG, color: COLOR }}>
            <Bot size={20} /> Botbee
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#003b72] leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
            El experto de tu empresa, disponible <span style={{ color: COLOR }}>24/7</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
            Asistente virtual inteligente entrenado con la información específica de tu negocio. Guía a clientes y usuarios resolviendo dudas basadas en tus propios documentos — sin inventar, sin datos genéricos.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={openDemo} className="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-full font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg" style={{ background: COLOR, boxShadow: `0 8px 24px ${COLOR}35` }} data-testid="botbee-contact-btn">
              Solicitar demo <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#003b72] mb-10" style={{ fontFamily: "Outfit, sans-serif" }}>¿Cómo funciona Botbee?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm" data-testid={`botbee-feature-${f.title.substring(0,5)}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: BG, color: COLOR }}>{f.icon}</div>
                <h3 className="font-bold text-[#003b72] text-lg mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#003b72] mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>¿Qué logra tu empresa con Botbee?</h2>
          <ul className="flex flex-col gap-4">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-gray-700">
                <CheckCircle size={20} style={{ color: COLOR, marginTop: "2px" }} className="shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: COLOR }} data-testid="botbee-cta">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>¿Listo para tener tu experto virtual?</h2>
          <p className="text-white/80 mb-7 text-lg">Cuéntanos de tu empresa y te mostramos cómo Botbee puede transformar tu atención al cliente.</p>
          <button onClick={openDemo} className="px-8 py-4 bg-white rounded-full font-semibold hover:bg-gray-100 transition-all hover:-translate-y-0.5 shadow-lg" style={{ color: COLOR }} data-testid="botbee-cta-btn">
            Hablar con el equipo
          </button>
        </div>
      </section>
    </div>
  );
}
