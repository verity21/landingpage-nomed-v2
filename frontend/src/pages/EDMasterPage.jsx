import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { ArrowLeft, Trophy, CheckCircle, ArrowRight, BookOpen, BarChart3, Star, Clock } from "lucide-react";

const COLOR = "#FF7878";
const BG = "#FF787810";

const FEATURES = [
  { icon: <BookOpen size={18} />, title: "Modo práctica", desc: "Entrenamiento sin límite de tiempo con retroalimentación inmediata en cada pregunta para reforzar el aprendizaje." },
  { icon: <Clock size={18} />, title: "Modo evaluación", desc: "Simulación real de examen: tiempo limitado y preguntas aleatorias para reproducir las condiciones de la prueba real." },
  { icon: <Star size={18} />, title: "Flashcards de estudio", desc: "Tarjetas de estudio interactivas diseñadas para reforzar conceptos clave de forma ágil y efectiva." },
  { icon: <BarChart3 size={18} />, title: "Seguimiento del progreso", desc: "Estadísticas detalladas de desempeño, historial de evaluaciones e indicador de nivel de preparación." },
  { icon: <Trophy size={18} />, title: "Sistema de logros", desc: "Beneficios y recompensas por avance que incentivan la práctica constante y el compromiso del estudiante." },
];

const BENEFITS = [
  "Planes accesibles para todos los grupos de cursos",
  "Modo demo disponible para probar antes de comprar",
  "Explicación o justificación en cada respuesta",
  "Contribución de preguntas: los estudiantes pueden sugerir contenido nuevo",
  "Plataforma web responsiva: acceso desde computadora, tablet o móvil",
];

export default function EDMasterPage() {
  const { openDemo } = useDemo();
  return (
    <div style={{ fontFamily: "IBM Plex Sans, sans-serif" }}>
      {/* Minimal top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 h-14 flex items-center justify-between px-6" data-testid="product-topbar">
        <Link to="/" className="flex items-center gap-0.5 font-bold text-xl" data-testid="product-logo">
          <span style={{ background: "linear-gradient(135deg, #fc5e5f, #e8902f, #009ee7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "Outfit, sans-serif" }}>N</span>
          <span style={{ color: "#003b72", fontFamily: "Outfit, sans-serif" }}>omed</span>
        </Link>
        <Link to="/estudiantes-digitales" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#2B7F87] transition-colors" data-testid="product-back-btn">
          <ArrowLeft size={15} /> Volver a Estudiantes Digitales
        </Link>
      </div>

      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: "#F3EEEC" }} data-testid="ed-master-hero">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold mb-8" style={{ background: BG, color: COLOR }}>
            <Trophy size={20} /> ED Master
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#003b72] leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
            Entrena con preguntas reales y llega <span style={{ color: COLOR }}>preparado a tu examen</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
            Plataforma digital de entrenamiento académico que permite a los estudiantes prepararse para sus evaluaciones mediante práctica continua con bancos de preguntas organizados por materias. Gana confianza y destreza antes de tu examen real.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={openDemo} className="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-full font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg" style={{ background: COLOR, boxShadow: `0 8px 24px ${COLOR}35` }} data-testid="ed-master-contact-btn">
              Solicitar demo <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#003b72] mb-10" style={{ fontFamily: "Outfit, sans-serif" }}>Modos y funcionalidades</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100" data-testid={`ed-master-feature-${f.title.substring(0,5)}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: BG, color: COLOR }}>{f.icon}</div>
                <h3 className="font-bold text-[#003b72] text-base mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16" style={{ background: "#F3EEEC" }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#003b72] mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>Más características</h2>
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
      <section className="py-16" style={{ background: COLOR }} data-testid="ed-master-cta">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>¿Quieres implementar ED Master en tu institución?</h2>
          <p className="text-white/80 mb-7 text-lg">Contáctanos y te mostramos cómo mejorar el rendimiento de tus estudiantes.</p>
          <button onClick={openDemo} className="px-8 py-4 bg-white rounded-full font-semibold hover:bg-gray-100 transition-all hover:-translate-y-0.5 shadow-lg" style={{ color: COLOR }} data-testid="ed-master-cta-btn">
            Hablar con el equipo
          </button>
        </div>
      </section>
    </div>
  );
}
