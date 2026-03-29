import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { ArrowLeft, PenSquare, CheckCircle, ArrowRight, Share2, TrendingUp, Zap, Target } from "lucide-react";

const COLOR = "#e8902f";
const BG = "#e8902f10";

const FEATURES = [
  { icon: <Zap size={18} />, title: "Artículos en segundos", desc: "Convierte tus ideas clave en artículos profesionales sin escribir todo desde cero. Crea, revisa y publica en un flujo simplificado." },
  { icon: <Share2 size={18} />, title: "Publica en redes con un clic", desc: "Envía directamente a LinkedIn e Instagram desde la plataforma. Sin copiar y pegar, sin complicaciones técnicas." },
  { icon: <TrendingUp size={18} />, title: "Mejora tu visibilidad en Google", desc: "Contenido optimizado para posicionamiento SEO. Aparece más en búsquedas relevantes a tu industria." },
  { icon: <Target size={18} />, title: "Diseñado para tu industria", desc: "Cada artículo generado se adapta al contexto y vocabulario específico de tu sector empresarial." },
];

const BENEFITS = [
  "Mantén tu blog siempre activo sin esfuerzo",
  "Aumenta tu autoridad digital y la confianza de tus clientes",
  "Ahorra horas de redacción cada semana",
  "Detecta qué temas interesan más a tu audiencia",
  "Sin barreras técnicas: diseñado para cualquier profesional",
];

export default function BlogIAPage() {
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
      <section className="pt-28 pb-16 bg-white" data-testid="blogia-hero">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold mb-8" style={{ background: BG, color: COLOR }}>
            <PenSquare size={20} /> Blog IA
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#003b72] leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
            Tu voz experta, <span style={{ color: COLOR }}>impulsada por IA</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
            Construye autoridad y atrae a tu audiencia en tiempo récord. Una herramienta que toma tus ideas clave y las convierte en artículos profesionales para tu web y redes sociales, sin escribir todo desde cero.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={openDemo} className="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-full font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg" style={{ background: COLOR, boxShadow: `0 8px 24px ${COLOR}35` }} data-testid="blogia-contact-btn">
              Solicitar demo <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#003b72] mb-10" style={{ fontFamily: "Outfit, sans-serif" }}>¿Qué puede hacer Blog IA por ti?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm" data-testid={`blogia-feature-${f.title.substring(0,5)}`}>
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
          <h2 className="text-3xl font-bold text-[#003b72] mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>Beneficios para tu marca</h2>
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
      <section className="py-16" style={{ background: COLOR }} data-testid="blogia-cta">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>¿Listo para publicar contenido de impacto?</h2>
          <p className="text-white/80 mb-7 text-lg">Cuéntanos tu industria y te mostramos cómo Blog IA puede posicionarte como referente.</p>
          <button onClick={openDemo} className="px-8 py-4 bg-white rounded-full font-semibold hover:bg-gray-100 transition-all hover:-translate-y-0.5 shadow-lg" style={{ color: COLOR }} data-testid="blogia-cta-btn">
            Hablar con el equipo
          </button>
        </div>
      </section>
    </div>
  );
}
