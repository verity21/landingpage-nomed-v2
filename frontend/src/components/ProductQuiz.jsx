import { useState } from "react";
import { ArrowRight, RotateCcw, ArrowLeft } from "lucide-react";

const QUESTIONS = [
  {
    question: "¿Cuál es tu principal necesidad?",
    options: [
      { label: "Automatizar atención al cliente", product: "Botbee" },
      { label: "Emitir certificados", product: "Cert" },
      { label: "Generar contenido para mis redes", product: "Blog IA" },
      { label: "Preparar estudiantes para exámenes", product: "ED Master" },
      { label: "Crear materiales educativos", product: "ED Teach" },
      { label: "Gestionar clases de matemáticas", product: "ED Math" },
    ],
  },
  {
    question: "¿A quién va dirigida la solución?",
    options: [
      { label: "Clientes de mi empresa", product: "Botbee" },
      { label: "Empleados o alumnos que necesitan certificación", product: "Cert" },
      { label: "Mi audiencia en redes sociales", product: "Blog IA" },
      { label: "Estudiantes que se preparan para exámenes", product: "ED Master" },
      { label: "Docentes y alumnos", product: "ED Teach" },
      { label: "Profesores de matemáticas", product: "ED Math" },
    ],
  },
  {
    question: "¿Qué resultado buscas?",
    options: [
      { label: "Respuestas automáticas 24/7", product: "Botbee" },
      { label: "Reconocimientos con validez institucional", product: "Cert" },
      { label: "Más visibilidad online", product: "Blog IA" },
      { label: "Mejor rendimiento en evaluaciones", product: "ED Master" },
      { label: "Clases más dinámicas e interactivas", product: "ED Teach" },
      { label: "Seguimiento del aprendizaje matemático", product: "ED Math" },
    ],
  },
];

export const PRODUCT_INFO = {
  Botbee: {
    color: "#fc5e5f",
    bg: "#fc5e5f10",
    border: "#fc5e5f30",
    tagline: "El experto de tu empresa, disponible 24/7.",
    desc: "Asistente virtual inteligente entrenado con la información específica de tu negocio.",
    link: "/productos",
  },
  Cert: {
    color: "#009ee7",
    bg: "#009ee710",
    border: "#009ee730",
    tagline: "Logros auténticos, insignias y certificados al instante.",
    desc: "Plataforma integral de certificación digital para generar diplomas e insignias con validez institucional.",
    link: "/productos",
  },
  "Blog IA": {
    color: "#e8902f",
    bg: "#e8902f10",
    border: "#e8902f30",
    tagline: "Tu voz experta, impulsada por IA.",
    desc: "Convierte tus ideas clave en artículos profesionales para tu web y redes sociales.",
    link: "/productos",
  },
  "ED Master": {
    color: "#fc5e5f",
    bg: "#fc5e5f10",
    border: "#fc5e5f30",
    tagline: "Entrena con preguntas reales y llega preparado.",
    desc: "Plataforma de entrenamiento académico con bancos de preguntas, modos de práctica y evaluación.",
    link: "/estudiantes-digitales",
  },
  "ED Teach": {
    color: "#009ee7",
    bg: "#009ee710",
    border: "#009ee730",
    tagline: "Crea materiales didácticos en segundos.",
    desc: "Plataforma de creación académica con IA para generar recursos educativos personalizados.",
    link: "/estudiantes-digitales",
  },
  "ED Math": {
    color: "#e8902f",
    bg: "#e8902f10",
    border: "#e8902f30",
    tagline: "Domina las matemáticas paso a paso.",
    desc: "LMS especializado en matemáticas con seguimiento en tiempo real.",
    link: "/estudiantes-digitales",
  },
};

function getRecommendation(answers) {
  const votes = {};
  answers.forEach((a) => { votes[a] = (votes[a] || 0) + 1; });
  return Object.entries(votes).sort((a, b) => b[1] - a[1])[0][0];
}

export default function ProductQuiz({ onContact, compact = false }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (product) => {
    const newAnswers = [...answers, product];
    if (currentStep < QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentStep(currentStep + 1);
    } else {
      setResult(getRecommendation(newAnswers));
    }
  };

  const handleBack = () => {
    if (currentStep > 0) { setAnswers(answers.slice(0, -1)); setCurrentStep(currentStep - 1); }
  };

  const handleReset = () => { setCurrentStep(0); setAnswers([]); setResult(null); };

  const progress = result ? 100 : (currentStep / QUESTIONS.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" data-testid="product-quiz">
      {/* Progress */}
      <div className="h-1 bg-gray-100">
        <div className="h-full bg-gradient-to-r from-[#fc5e5f] to-[#009ee7] transition-all duration-500" style={{ width: `${progress}%` }} data-testid="quiz-progress-bar" />
      </div>

      <div className="p-6 md:p-8">
        {result ? (
          <div className="text-center" data-testid="quiz-result">
            <div className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold mb-4" style={{ background: PRODUCT_INFO[result]?.bg, color: PRODUCT_INFO[result]?.color, border: `1px solid ${PRODUCT_INFO[result]?.border}` }}>
              Tu producto ideal
            </div>
            <h3 className="text-3xl font-bold text-[#003b72] mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{result}</h3>
            <p className="font-medium mb-2" style={{ color: PRODUCT_INFO[result]?.color }}>{PRODUCT_INFO[result]?.tagline}</p>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">{PRODUCT_INFO[result]?.desc}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {onContact && (
                <button onClick={onContact} className="px-6 py-2.5 text-white rounded-full font-semibold text-sm hover:opacity-90 transition-all hover:-translate-y-0.5" style={{ background: PRODUCT_INFO[result]?.color }} data-testid="quiz-contact-btn">
                  Contáctanos
                </button>
              )}
              <a href={PRODUCT_INFO[result]?.link} className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-full font-semibold text-sm hover:border-gray-400 transition-all flex items-center gap-1.5" data-testid="quiz-learn-btn">
                Ver producto <ArrowRight size={13} />
              </a>
              <button onClick={handleReset} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors" data-testid="quiz-reset-btn">
                <RotateCcw size={13} /> Reiniciar
              </button>
            </div>
          </div>
        ) : (
          <div data-testid={`quiz-question-${currentStep + 1}`}>
            <div className="flex items-center gap-3 mb-5">
              {currentStep > 0 && (
                <button onClick={handleBack} className="p-1.5 rounded-lg text-gray-400 hover:text-[#003b72] hover:bg-gray-100 transition-colors" data-testid="quiz-back-btn">
                  <ArrowLeft size={16} />
                </button>
              )}
              <span className="text-xs font-medium uppercase tracking-widest text-[#009ee7]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                Pregunta {currentStep + 1} de {QUESTIONS.length}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#003b72] mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
              {QUESTIONS[currentStep].question}
            </h3>

            <div className="grid sm:grid-cols-2 gap-2.5">
              {QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.product)}
                  className="text-left px-4 py-3 border border-gray-200 rounded-xl text-gray-700 text-sm font-medium hover:border-[#009ee7] hover:text-[#009ee7] hover:bg-[#009ee7]/5 transition-all flex items-center justify-between group"
                  data-testid={`quiz-option-q${currentStep + 1}-${idx + 1}`}
                >
                  {option.label}
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-[#009ee7] shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
