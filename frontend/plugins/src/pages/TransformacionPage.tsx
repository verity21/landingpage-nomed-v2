// @ts-nocheck
import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { ArrowLeft, TrendingUp, CheckCircle, ArrowRight, Map, Users, Layers, Target } from "lucide-react";

const COLOR = "#65B4B8";
const DARK = "#003b72";
const BG = "#65B4B810";

const FEATURES = [
  { icon: <Map size={18} />, title: "Diagnóstico y hoja de ruta digital", desc: "Analizamos el estado actual de tus procesos y tecnología, e identificamos el camino de transformación más eficiente y rentable." },
  { icon: <Layers size={18} />, title: "Modernización de sistemas legacy", desc: "Actualizamos aplicaciones antiguas o migramos a arquitecturas modernas sin interrumpir las operaciones del negocio." },
  { icon: <Users size={18} />, title: "Capacitación y adopción tecnológica", desc: "Acompañamos a tu equipo en la adopción de nuevas herramientas con formación práctica y soporte continuo." },
  { icon: <Target size={18} />, title: "Cultura de datos e innovación", desc: "Instalamos en tu organización las metodologías y mentalidad para seguir innovando de forma autónoma y sostenida." },
];

const BENEFITS = [
  "Visión clara del estado digital actual y los pasos a seguir",
  "Transición ordenada sin riesgos operativos",
  "Equipo capacitado y alineado con las nuevas tecnologías",
  "Mayor eficiencia y reducción de costos operativos",
  "Organización preparada para el futuro digital",
];

export default function TransformacionPage() {
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
      <section className="pt-28 pb-16 bg-white" data-testid="transf-hero">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold mb-8" style={{ background: BG, color: COLOR }}>
            <TrendingUp size={20} /> Transformación Digital
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif", color: DARK }}>
            Transforma tu empresa <span style={{ color: COLOR }}>para el mundo digital</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
            La transformación digital no es solo tecnología — es cambiar la manera en que tu empresa opera, decide y crece. Te acompañamos en cada paso: diagnóstico, implementación, capacitación y cultura de innovación.
          </p>
          <button onClick={openDemo} className="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-full font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg" style={{ background: DARK, boxShadow: `0 8px 24px ${DARK}30` }} data-testid="transf-contact-btn">
            Solicitar consultoría <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10" style={{ fontFamily: "Outfit, sans-serif", color: DARK }}>Nuestro enfoque de transformación</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: BG, color: COLOR }}>{f.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: "Outfit, sans-serif", color: DARK }}>{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "Outfit, sans-serif", color: DARK }}>¿Qué logra tu empresa?</h2>
          <ul className="flex flex-col gap-4">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-gray-700">
                <CheckCircle size={20} style={{ color: COLOR, marginTop: "2px" }} className="shrink-0" /><span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="py-16" style={{ background: DARK }} data-testid="transf-cta">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>¿Tu empresa está lista para transformarse?</h2>
          <p className="text-white/80 mb-7 text-lg">Hablemos sobre tu punto de partida y diseñamos juntos el camino hacia la digitalización.</p>
          <button onClick={openDemo} className="px-8 py-4 bg-white rounded-full font-semibold hover:bg-gray-100 transition-all" style={{ color: DARK }} data-testid="transf-cta-btn">Hablar con el equipo</button>
        </div>
      </section>
    </div>
  );
}
