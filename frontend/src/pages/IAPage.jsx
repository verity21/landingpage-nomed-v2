import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { ArrowLeft, BrainCircuit, CheckCircle, ArrowRight, Zap, MessageSquare, Eye, Shield } from "lucide-react";

const COLOR = "#003b72";
const ACCENT = "#009ee7";
const BG = "#003b7210";

const FEATURES = [
  { icon: <MessageSquare size={18} />, title: "Procesamiento de lenguaje natural (NLP)", desc: "Analizamos, clasificamos y respondemos texto en lenguaje humano. Desde análisis de sentimientos hasta generación de contenido automático." },
  { icon: <BrainCircuit size={18} />, title: "Modelos de IA personalizados", desc: "Entrenamos modelos con tus propios datos para resolver problemas específicos de tu empresa con alta precisión." },
  { icon: <Eye size={18} />, title: "Visión por computadora", desc: "Detección de objetos, clasificación de imágenes y análisis visual para automatizar procesos de inspección y control." },
  { icon: <Zap size={18} />, title: "IA generativa aplicada al negocio", desc: "Implementamos LLMs (GPT, Claude, Gemini) integrados en tus sistemas internos para potenciar la productividad de tu equipo." },
  { icon: <Shield size={18} />, title: "IA responsable y segura", desc: "Desarrollamos soluciones con control total de los datos, sin exposición de información sensible a terceros." },
];

const BENEFITS = [
  "Automatización de tareas cognitivas repetitivas",
  "Decisiones más rápidas y precisas basadas en datos",
  "Reducción de costos operativos hasta un 40%",
  "Ventaja competitiva sostenida en tu industria",
  "Implementación ágil: primeros resultados en semanas, no meses",
];

export default function IAPage() {
  const { openDemo } = useDemo();
  return (
    <div style={{ fontFamily: "IBM Plex Sans, sans-serif" }}>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 h-14 flex items-center justify-between px-6" data-testid="service-topbar">
        <Link to="/" className="flex items-center gap-0.5 font-bold text-xl" data-testid="service-logo">
          <span style={{ background: "linear-gradient(135deg, #fc5e5f, #e8902f, #009ee7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "Outfit, sans-serif" }}>N</span>
          <span style={{ color: "#003b72", fontFamily: "Outfit, sans-serif" }}>omed</span>
        </Link>
        <Link to="/#servicios" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#003b72] transition-colors" data-testid="service-back-btn">
          <ArrowLeft size={15} /> Volver a Servicios
        </Link>
      </div>
      <section className="pt-28 pb-16 bg-white" data-testid="ia-hero">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold mb-8" style={{ background: BG, color: COLOR }}>
            <BrainCircuit size={20} /> IA Aplicada
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif", color: COLOR }}>
            Inteligencia artificial <span style={{ color: ACCENT }}>integrada en tu negocio</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
            Dejamos de hablar de IA como concepto y la convertimos en resultados tangibles para tu empresa. Integramos modelos de lenguaje, visión y predicción directamente en tus procesos operativos.
          </p>
          <button onClick={openDemo} className="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-full font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg" style={{ background: COLOR, boxShadow: `0 8px 24px ${COLOR}30` }} data-testid="ia-contact-btn">
            Solicitar consultoría <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10" style={{ fontFamily: "Outfit, sans-serif", color: COLOR }}>¿Qué hacemos en IA Aplicada?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: BG, color: ACCENT }}>{f.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: "Outfit, sans-serif", color: COLOR }}>{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "Outfit, sans-serif", color: COLOR }}>¿Qué logra tu empresa?</h2>
          <ul className="flex flex-col gap-4">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-gray-700">
                <CheckCircle size={20} style={{ color: ACCENT, marginTop: "2px" }} className="shrink-0" /><span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="py-16" style={{ background: COLOR }} data-testid="ia-cta">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>¿Listo para integrar IA en tu empresa?</h2>
          <p className="text-white/80 mb-7 text-lg">Cuéntanos tu desafío y diseñamos la solución de IA exacta que necesitas.</p>
          <button onClick={openDemo} className="px-8 py-4 bg-white rounded-full font-semibold hover:bg-gray-100 transition-all" style={{ color: COLOR }} data-testid="ia-cta-btn">Hablar con el equipo</button>
        </div>
      </section>
    </div>
  );
}
