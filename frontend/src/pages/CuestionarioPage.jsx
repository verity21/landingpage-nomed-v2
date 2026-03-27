import { useDemo } from "@/contexts/DemoContext";
import ProductQuiz from "@/components/ProductQuiz";

export default function CuestionarioPage() {
  const { openDemo } = useDemo();

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-[#003b72] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#009ee7] font-medium mb-4">Herramienta de selección</p>
          <h1 className="text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>¿Qué producto necesito?</h1>
          <p className="text-white/60 text-lg max-w-xl">Responde 3 preguntas y te recomendamos el producto de Nomed que mejor se adapta a ti.</p>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-16 bg-gray-50 min-h-[60vh]" data-testid="quiz-section">
        <div className="max-w-2xl mx-auto px-6">
          <ProductQuiz onContact={openDemo} />
        </div>
      </section>
    </>
  );
}
