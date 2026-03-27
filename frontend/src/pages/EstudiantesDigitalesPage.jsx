import { useDemo } from "@/contexts/DemoContext";
import { Award, ExternalLink, CheckCircle, BookOpen, Calculator, Trophy } from "lucide-react";

const ED_PRODUCTS = [
  {
    id: "ed-master", icon: <Trophy size={26} />, color: "#fc5e5f", bg: "#fc5e5f15", name: "ED Master",
    tagline: "Entrena con preguntas reales y llega preparado a tu examen.",
    desc: "Plataforma de entrenamiento académico con bancos de preguntas organizados por materias. Permite estudiar mediante distintos modos de entrenamiento, simular evaluaciones y analizar el desempeño.",
    features: ["Modo práctica: retroalimentación inmediata, sin límite de tiempo", "Modo evaluación: simulación con tiempo y preguntas aleatorias", "Flashcards de estudio interactivas", "Seguimiento del progreso e historial", "Indicador de preparación personalizado", "Sistema de logros y beneficios por avance"],
  },
  {
    id: "ed-teach", icon: <BookOpen size={26} />, color: "#009ee7", bg: "#009ee715", name: "ED Teach",
    tagline: "Crea materiales didácticos y juegos educativos en segundos.",
    desc: "Plataforma de creación académica para que docentes generen recursos educativos personalizados en segundos usando IA.",
    features: ["Genera materiales desde texto, URL o archivo", "Flashcards, datos curiosos y ChatBot educativo", "Evaluaciones: cuestionarios, crucigramas, ruleta, quizzes", "Juegos: Sudoku, Tic Tac Toe, Conecta 4, Battleship", "Compartir por QR, WhatsApp, Google Classroom", "Interfaz diseñada para docentes con poca experiencia tech"],
  },
  {
    id: "ed-math", icon: <Calculator size={26} />, color: "#e8902f", bg: "#e8902f15", name: "ED Math",
    tagline: "Domina las matemáticas paso a paso.",
    desc: "Plataforma de gestión de aprendizaje especializada en matemáticas. Docentes crean cursos personalizados, estudiantes acceden a un entorno dinámico con seguimiento en tiempo real.",
    features: ["Gestión de cursos matemáticos personalizables", "Sistema de evaluación integrada", "Métricas de desempeño para docentes", "Panel del estudiante con notas y progreso", "Visualización de logros y rachas", "Certificación al completar el curso"],
  },
];

export default function EstudiantesDigitalesPage() {
  const { openDemo } = useDemo();
  return (
    <div style={{ fontFamily: "IBM Plex Sans, sans-serif" }}>
      {/* Hero con identidad ED */}
      <section className="pt-28 pb-16 relative overflow-hidden" style={{ background: "#fffbf7" }} data-testid="ed-hero">
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-40" style={{ background: "radial-gradient(ellipse 80% 80% at 100% 20%, #e8902f20, transparent)" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#e8902f", color: "white" }}>
              <Award size={20} />
            </div>
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#e8902f" }}>Alianza Tecnológica</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif", color: "#003b72" }}>
                Nomed &amp; <span style={{ color: "#e8902f" }}>Estudiantes Digitales</span>
              </h1>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "#003b72cc" }}>
                Nomed respalda tecnológicamente a Estudiantes Digitales, la plataforma educativa online fundada por Federica Morici con el Método Aurora® propio. Clases 100% online, comunidad activa y pedagogía de vanguardia.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href="https://estudiantesdigitales.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-full font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5" style={{ background: "#e8902f" }} data-testid="ed-visit-btn">
                  Ir a Estudiantes Digitales <ExternalLink size={15} />
                </a>
                <button onClick={openDemo} className="px-7 py-3.5 border-2 rounded-full font-semibold transition-all hover:-translate-y-0.5" style={{ borderColor: "#003b72", color: "#003b72" }} data-testid="ed-contact-btn">
                  Contáctanos
                </button>
              </div>
            </div>
            <div className="hidden lg:block rounded-3xl p-10 text-center" style={{ background: "#fff3e8" }}>
              <div className="text-6xl font-bold mb-2" style={{ fontFamily: "Outfit, sans-serif", color: "#e8902f" }}>Método</div>
              <div className="text-6xl font-bold mb-4" style={{ fontFamily: "Outfit, sans-serif", color: "#003b72" }}>Aurora®</div>
              <p className="text-sm" style={{ color: "#003b72aa" }}>Pedagogía de vanguardia con impacto<br />comprobado en Latinoamérica</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reconocimientos */}
      <section className="py-12" style={{ background: "#fff8f2" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Award size={22} style={{ color: "#e8902f" }} />, bg: "#e8902f15", title: "Top 100 Aurora Tech Award", desc: "Federica Morici reconocida entre más de 3.400 postulaciones de 127 países." },
              { icon: <Trophy size={22} style={{ color: "#003b72" }} />, bg: "#003b7215", title: "World Internet Conference China 2025", desc: "Método Aurora® reconocido como caso destacado mundial en educación digital." },
            ].map((rec) => (
              <div key={rec.title} className="flex items-start gap-4 p-6 rounded-2xl border bg-white" style={{ borderColor: "#e8902f30" }} data-testid={`ed-recognition-${rec.title.substring(0, 5)}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: rec.bg }}>{rec.icon}</div>
                <div>
                  <h4 className="font-bold text-lg mb-1" style={{ color: "#003b72", fontFamily: "Outfit, sans-serif" }}>{rec.title}</h4>
                  <p className="text-sm" style={{ color: "#666" }}>{rec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos ED */}
      <section className="py-20" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.2em] font-medium mb-3" style={{ color: "#e8902f" }}>Productos de la alianza</p>
            <h2 className="text-4xl font-bold" style={{ fontFamily: "Outfit, sans-serif", color: "#003b72" }}>Herramientas EdTech</h2>
          </div>
          <div className="flex flex-col gap-14">
            {ED_PRODUCTS.map((product, idx) => (
              <div key={product.id} className={`grid lg:grid-cols-2 gap-10 items-center`} data-testid={`ed-product-${product.id}`}>
                <div className={idx % 2 !== 0 ? "lg:order-2" : ""}>
                  <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-4" style={{ background: product.bg, color: product.color }}>
                    {product.icon} {product.name}
                  </div>
                  <h3 className="text-3xl font-bold mb-3 leading-tight" style={{ fontFamily: "Outfit, sans-serif", color: "#003b72" }}>{product.tagline}</h3>
                  <p className="leading-relaxed mb-5" style={{ color: "#555" }}>{product.desc}</p>
                  <ul className="flex flex-col gap-2.5">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "#444" }}>
                        <CheckCircle size={16} style={{ color: product.color, marginTop: "2px" }} className="shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`hidden lg:flex items-center justify-center rounded-3xl p-12 min-h-52 ${idx % 2 !== 0 ? "lg:order-1" : ""}`} style={{ background: product.bg }}>
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl" style={{ background: product.color }}>
                    <div className="text-white" style={{ transform: "scale(1.6)" }}>{product.icon}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ background: "#e8902f" }} data-testid="ed-cta-section">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>¿Quieres saber más sobre la alianza?</h2>
          <p className="text-white/80 mb-7">Visita Estudiantes Digitales o contáctate con el equipo de Nomed.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://estudiantesdigitales.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#e8902f] rounded-full font-semibold hover:bg-orange-50 transition-all" data-testid="ed-cta-visit-btn">
              Ir a Estudiantes Digitales <ExternalLink size={15} />
            </a>
            <button onClick={openDemo} className="px-7 py-3.5 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#e8902f] transition-all" data-testid="ed-cta-contact-btn">
              Contáctanos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
