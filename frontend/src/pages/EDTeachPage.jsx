import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { ArrowLeft, BookOpen, CheckCircle, ArrowRight, Gamepad2, Share2, Wand2, Users } from "lucide-react";

const COLOR = "#65B4B8";
const BG = "#65B4B810";

const FEATURES = [
  { icon: <Wand2 size={18} />, title: "Generación de materiales con IA", desc: "Crea recursos didácticos desde un tema, texto, URL o archivo. La IA los transforma en materiales listos para usar en segundos." },
  { icon: <BookOpen size={18} />, title: "Materiales de estudio", desc: "Flashcards, datos curiosos y ChatBot educativo personalizado para reforzar el aprendizaje de manera interactiva." },
  { icon: <Gamepad2 size={18} />, title: "Gamificación educativa", desc: "Juegos como Sudoku, Tic Tac Toe, Conecta 4 y Battleship integrados en el aprendizaje para mayor engagement." },
  { icon: <Users size={18} />, title: "Evaluaciones interactivas", desc: "Cuestionarios, crucigramas, ruletas y quizzes con videos de YouTube para diversificar la evaluación." },
  { icon: <Share2 size={18} />, title: "Compartir fácilmente", desc: "Distribuye materiales por QR, WhatsApp o Google Classroom con un solo clic. Sin barreras tecnológicas." },
];

const BENEFITS = [
  "Interfaz diseñada especialmente para docentes con poca experiencia tecnológica",
  "Personalización total del contenido: edita, añade o elimina según tus objetivos",
  "Acceso con invitación: administradores controlan quién accede a la plataforma",
  "Plataforma web responsiva: funciona en computadora, tablet y móvil",
  "Ideal para cualquier nivel educativo y área de conocimiento",
];

export default function EDTeachPage() {
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
      <section className="pt-28 pb-16" style={{ background: "#F3EEEC" }} data-testid="ed-teach-hero">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold mb-8" style={{ background: BG, color: COLOR }}>
            <BookOpen size={20} /> ED Teach
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#003b72] leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
            Crea materiales didácticos y juegos educativos <span style={{ color: COLOR }}>en segundos</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
            Plataforma de creación académica para docentes de todos los niveles y edades. Usando inteligencia artificial, transforma cualquier tema en una experiencia de aprendizaje interactiva, personalizada y lista para compartir.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={openDemo} className="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-full font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg" style={{ background: COLOR, boxShadow: `0 8px 24px ${COLOR}35` }} data-testid="ed-teach-contact-btn">
              Solicitar demo <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#003b72] mb-10" style={{ fontFamily: "Outfit, sans-serif" }}>¿Qué puedes crear con ED Teach?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100" data-testid={`ed-teach-feature-${f.title.substring(0,5)}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: BG, color: COLOR }}>{f.icon}</div>
                <h3 className="font-bold text-[#003b72] text-base mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16" style={{ background: "#CEE5D1" }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#003b72] mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>Diseñado para el docente real</h2>
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
      <section className="py-16" style={{ background: "#2B7F87" }} data-testid="ed-teach-cta">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>¿Quieres transformar tus clases con IA?</h2>
          <p className="text-white/80 mb-7 text-lg">Contáctanos y te mostramos cómo ED Teach puede potenciar tu enseñanza.</p>
          <button onClick={openDemo} className="px-8 py-4 bg-white rounded-full font-semibold hover:bg-gray-100 transition-all hover:-translate-y-0.5 shadow-lg" style={{ color: "#2B7F87" }} data-testid="ed-teach-cta-btn">
            Hablar con el equipo
          </button>
        </div>
      </section>
    </div>
  );
}
