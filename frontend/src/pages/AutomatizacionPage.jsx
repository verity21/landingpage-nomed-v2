import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { ArrowLeft, Zap, CheckCircle, ArrowRight, RefreshCw, Clock, Settings, BarChart3 } from "lucide-react";

const COLOR = "#fc5e5f";
const BG = "#fc5e5f10";

const FEATURES = [
  { icon: <RefreshCw size={18} />, title: "Automatización de procesos (RPA)", desc: "Replicamos flujos de trabajo manuales mediante robots de software que operan 24/7 sin errores ni fatiga." },
  { icon: <Settings size={18} />, title: "Workflows inteligentes", desc: "Diseñamos flujos de trabajo con lógica de negocio compleja, condiciones dinámicas y escalado automático." },
  { icon: <Clock size={18} />, title: "Procesamiento en tiempo real", desc: "Eventos, alertas y acciones desencadenados automáticamente al instante, sin intervención humana." },
  { icon: <BarChart3 size={18} />, title: "Monitoreo y reportes automáticos", desc: "Generación automática de informes periódicos, notificaciones de anomalías y alertas de rendimiento." },
];

const BENEFITS = [
  "Ahorra entre 20 y 40 horas semanales de trabajo manual por área",
  "Elimina errores humanos en procesos críticos",
  "Escala operaciones sin contratar personal adicional",
  "Respuesta inmediata a eventos del negocio",
  "Visibilidad total del estado de cada proceso",
];

export default function AutomatizacionPage() {
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
      <section className="pt-28 pb-16 bg-white" data-testid="auto-hero">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold mb-8" style={{ background: BG, color: COLOR }}>
            <Zap size={20} /> Automatización
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#003b72] leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
            Elimina lo repetitivo, <span style={{ color: COLOR }}>enfócate en lo que importa</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
            Identificamos los procesos manuales que consumen tiempo de tu equipo y los automatizamos con flujos inteligentes. Menos errores, más velocidad, mayor capacidad operativa.
          </p>
          <button onClick={openDemo} className="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-full font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg" style={{ background: COLOR, boxShadow: `0 8px 24px ${COLOR}30` }} data-testid="auto-contact-btn">
            Solicitar consultoría <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#003b72] mb-10" style={{ fontFamily: "Outfit, sans-serif" }}>¿Qué automatizamos?</h2>
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
          <h2 className="text-3xl font-bold text-[#003b72] mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>Beneficios para tu operación</h2>
          <ul className="flex flex-col gap-4">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-gray-700">
                <CheckCircle size={20} style={{ color: COLOR, marginTop: "2px" }} className="shrink-0" /><span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="py-16" style={{ background: COLOR }} data-testid="auto-cta">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>¿Cuánto tiempo pierde tu equipo en tareas manuales?</h2>
          <p className="text-white/80 mb-7 text-lg">Hablemos y encontremos juntos qué automatizar primero.</p>
          <button onClick={openDemo} className="px-8 py-4 bg-white rounded-full font-semibold hover:bg-gray-100 transition-all" style={{ color: COLOR }} data-testid="auto-cta-btn">Hablar con el equipo</button>
        </div>
      </section>
    </div>
  );
}
