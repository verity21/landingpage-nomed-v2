import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { ArrowLeft, BarChart3, CheckCircle, ArrowRight, LineChart, Database, TrendingUp, Eye } from "lucide-react";

const COLOR = "#2B7F87";
const BG = "#2B7F8710";

const FEATURES = [
  { icon: <Eye size={18} />, title: "Dashboards en tiempo real", desc: "Paneles interactivos que muestran el estado de tu negocio al instante: ventas, operaciones, marketing y más en un solo lugar." },
  { icon: <LineChart size={18} />, title: "Análisis predictivo", desc: "Modelos estadísticos y de IA que anticipan tendencias, demanda y comportamientos del cliente antes de que ocurran." },
  { icon: <Database size={18} />, title: "Arquitectura de datos", desc: "Diseñamos pipelines de datos eficientes: desde la recolección hasta el almacenamiento y procesamiento escalable." },
  { icon: <TrendingUp size={18} />, title: "KPIs personalizados", desc: "Definimos y medimos los indicadores clave específicos de tu industria y objetivos de negocio." },
];

const BENEFITS = [
  "Decisiones basadas en datos reales, no intuición",
  "Visibilidad total del negocio en tiempo real",
  "Detección temprana de oportunidades y riesgos",
  "Reportes automáticos que ahorran horas de trabajo",
  "Ventaja competitiva sostenida mediante inteligencia de negocio",
];

export default function DataPage() {
  const { openDemo } = useDemo();
  return (
    <div style={{ fontFamily: "IBM Plex Sans, sans-serif" }}>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 h-14 flex items-center justify-between px-6" data-testid="service-topbar">
        <Link to="/" className="flex items-center gap-0.5 font-bold text-xl">
          <span style={{ background: "linear-gradient(135deg, #fc5e5f, #e8902f, #009ee7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "Outfit, sans-serif" }}>N</span>
          <span style={{ color: "#003b72", fontFamily: "Outfit, sans-serif" }}>omed</span>
        </Link>
        <Link to="/#servicios" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#003b72] transition-colors" data-testid="service-back-btn">
          <ArrowLeft size={15} /> Volver a Servicios
        </Link>
      </div>
      <section className="pt-28 pb-16 bg-white" data-testid="data-hero">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold mb-8" style={{ background: BG, color: COLOR }}>
            <BarChart3 size={20} /> Data & Analytics
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#003b72] leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
            Tus datos, convertidos en <span style={{ color: COLOR }}>decisiones inteligentes</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
            Recopilamos, procesamos y visualizamos tus datos para que cada decisión en tu empresa esté respaldada por evidencia. Desde dashboards operativos hasta modelos predictivos avanzados.
          </p>
          <button onClick={openDemo} className="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-full font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg" style={{ background: COLOR, boxShadow: `0 8px 24px ${COLOR}30` }} data-testid="data-contact-btn">
            Solicitar consultoría <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#003b72] mb-10" style={{ fontFamily: "Outfit, sans-serif" }}>¿Qué hacemos con tus datos?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: BG, color: COLOR }}>{f.icon}</div>
                <h3 className="font-bold text-[#003b72] text-base mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#003b72] mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>¿Qué logra tu empresa?</h2>
          <ul className="flex flex-col gap-4">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-gray-700">
                <CheckCircle size={20} style={{ color: COLOR, marginTop: "2px" }} className="shrink-0" /><span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="py-16" style={{ background: COLOR }} data-testid="data-cta">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>¿Quieres ver tu negocio con claridad?</h2>
          <p className="text-white/80 mb-7 text-lg">Cuéntanos qué datos tienes y diseñamos la estrategia de analytics perfecta para ti.</p>
          <button onClick={openDemo} className="px-8 py-4 bg-white rounded-full font-semibold hover:bg-gray-100 transition-all" style={{ color: COLOR }} data-testid="data-cta-btn">Hablar con el equipo</button>
        </div>
      </section>
    </div>
  );
}
