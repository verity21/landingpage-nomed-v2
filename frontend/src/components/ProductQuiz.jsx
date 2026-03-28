import { useState } from "react";
import { ArrowRight, RotateCcw, ArrowLeft } from "lucide-react";

/* Scoring-based quiz: each answer contributes points to products */
const QUESTIONS = [
  {
    question: "¿Cuál es tu principal necesidad?",
    options: [
      { label: "Automatizar respuestas a consultas y atención de clientes", scores: { Botbee: 5 } },
      { label: "Emitir certificados o diplomas con validez institucional", scores: { Cert: 5 } },
      { label: "Crear contenido profesional para mis redes sociales y web", scores: { "Blog IA": 5 } },
      { label: "Preparar a mis estudiantes para evaluaciones y exámenes", scores: { "ED Master": 5 } },
      { label: "Diseñar materiales didácticos y actividades educativas con IA", scores: { "ED Teach": 5 } },
      { label: "Gestionar cursos de matemáticas con seguimiento de alumnos", scores: { "ED Math": 5 } },
    ],
  },
  {
    question: "¿Cuál describe mejor tu perfil?",
    options: [
      { label: "Empresa o negocio que atiende clientes externos", scores: { Botbee: 4, "Blog IA": 2, Cert: 1 } },
      { label: "Institución que certifica logros, capacitaciones o cursos", scores: { Cert: 4, "ED Master": 1, "ED Math": 1 } },
      { label: "Profesional o marca que genera contenido digital", scores: { "Blog IA": 4, Botbee: 2 } },
      { label: "Estudiante o academia de preparación académica", scores: { "ED Master": 4, "ED Math": 2 } },
      { label: "Docente que crea clases o recursos educativos", scores: { "ED Teach": 4, "ED Math": 2, "ED Master": 1 } },
      { label: "Institución educativa con cursos de matemáticas", scores: { "ED Math": 4, "ED Teach": 2, Cert: 1 } },
    ],
  },
  {
    question: "¿Qué resultado es más importante para ti?",
    options: [
      { label: "Reducir consultas repetitivas y mejorar la experiencia del cliente", scores: { Botbee: 4, "Blog IA": 1 } },
      { label: "Dar reconocimientos con validez a alumnos o empleados", scores: { Cert: 4, "ED Master": 1 } },
      { label: "Aumentar mi visibilidad digital y posicionamiento en buscadores", scores: { "Blog IA": 4, Botbee: 1 } },
      { label: "Mejorar el rendimiento y confianza de mis estudiantes", scores: { "ED Master": 3, "ED Math": 2 } },
      { label: "Hacer mis clases más dinámicas e interactivas con tecnología", scores: { "ED Teach": 4, "ED Math": 1 } },
      { label: "Tener control y métricas del aprendizaje de cada alumno", scores: { "ED Math": 4, "ED Teach": 1, "ED Master": 1 } },
    ],
  },
];

export const PRODUCT_INFO = {
  Botbee: {
    color: "#fc5e5f",
    bg: "#fc5e5f10",
    border: "#fc5e5f30",
    tagline: "El experto de tu empresa, disponible 24/7.",
    desc: "Asistente virtual inteligente entrenado con la información de tu negocio. Resuelve dudas de clientes sin intervención humana.",
    link: "/productos#botbee",
  },
  Cert: {
    color: "#009ee7",
    bg: "#009ee710",
    border: "#009ee730",
    tagline: "Logros auténticos, insignias y certificados al instante.",
    desc: "Plataforma de certificación digital con validez institucional. Emite diplomas e insignias con verificación QR antifalsificación.",
    link: "/productos#cert",
  },
  "Blog IA": {
    color: "#e8902f",
    bg: "#e8902f10",
    border: "#e8902f30",
    tagline: "Tu voz experta, impulsada por IA.",
    desc: "Convierte tus ideas en artículos profesionales para tu web y redes sociales. Publica en LinkedIn e Instagram con un clic.",
    link: "/productos#blog",
  },
  "ED Master": {
    color: "#fc5e5f",
    bg: "#fc5e5f10",
    border: "#fc5e5f30",
    tagline: "Entrena con preguntas reales y llega preparado a tu examen.",
    desc: "Plataforma de entrenamiento académico con bancos de preguntas, modos de práctica, simulaciones y seguimiento del progreso.",
    link: "/estudiantes-digitales#ed-master",
  },
  "ED Teach": {
    color: "#65B4B8",
    bg: "#65B4B810",
    border: "#65B4B830",
    tagline: "Crea materiales didácticos y juegos educativos en segundos.",
    desc: "Genera recursos educativos personalizados con IA: flashcards, evaluaciones, juegos interactivos y más, en segundos.",
    link: "/estudiantes-digitales#ed-teach",
  },
  "ED Math": {
    color: "#2B7F87",
    bg: "#2B7F8710",
    border: "#2B7F8730",
    tagline: "Domina las matemáticas paso a paso.",
    desc: "LMS especializado en matemáticas con seguimiento en tiempo real, métricas de desempeño y certificación al completar.",
    link: "/estudiantes-digitales#ed-math",
  },
};

function getRecommendation(allAnswerScores) {
  const totals = {};
  allAnswerScores.forEach((answerScores) => {
    Object.entries(answerScores).forEach(([product, pts]) => {
      totals[product] = (totals[product] || 0) + pts;
    });
  });
  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
}

export default function ProductQuiz({ onContact }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (scores) => {
    const newAnswers = [...answers, scores];
    if (currentStep < QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentStep(currentStep + 1);
    } else {
      setResult(getRecommendation(newAnswers));
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setAnswers(answers.slice(0, -1));
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  const progress = result ? 100 : (currentStep / QUESTIONS.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" data-testid="product-quiz">
      {/* Progress bar */}
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
            <p className="text-gray-500 text-sm mb-7 max-w-md mx-auto leading-relaxed">{PRODUCT_INFO[result]?.desc}</p>
            <div className="flex flex-wrap gap-3 justify-center mb-5">
              {onContact && (
                <button onClick={onContact} className="px-6 py-2.5 text-white rounded-full font-semibold text-sm hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-md" style={{ background: PRODUCT_INFO[result]?.color }} data-testid="quiz-contact-btn">
                  Contáctanos
                </button>
              )}
              <a href={PRODUCT_INFO[result]?.link} className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-full font-semibold text-sm hover:border-gray-400 transition-all flex items-center gap-1.5" data-testid="quiz-learn-btn">
                Ver producto <ArrowRight size={13} />
              </a>
            </div>
            <button onClick={handleReset} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mx-auto transition-colors" data-testid="quiz-reset-btn">
              <RotateCcw size={13} /> Reiniciar cuestionario
            </button>
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
                <button key={idx} onClick={() => handleAnswer(option.scores)} className="text-left px-4 py-3.5 border border-gray-200 rounded-xl text-gray-700 text-sm font-medium hover:border-[#009ee7] hover:text-[#009ee7] hover:bg-[#009ee7]/5 transition-all flex items-center justify-between group" data-testid={`quiz-option-q${currentStep + 1}-${idx + 1}`}>
                  <span>{option.label}</span>
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
