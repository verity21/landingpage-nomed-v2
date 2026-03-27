import { useDemo } from "@/contexts/DemoContext";
import { Bot, Award, PenSquare, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PRODUCTOS = [
  {
    id: "botbee", icon: <Bot size={32} />, color: "#fc5e5f", bg: "#fc5e5f15", name: "Botbee",
    tagline: "El experto de tu empresa, disponible 24/7.",
    desc: "Asistente virtual inteligente entrenado con la información específica de tu negocio. Guía a clientes y usuarios resolviendo dudas basadas en tus documentos.",
    features: ["Responde solo con tus documentos propios", "No usa datos genéricos de internet", "Nombre, cargo y tono de voz personalizables", "Sube archivos y crea tu agente de ayuda", "Se adapta a cualquier rubro"],
  },
  {
    id: "cert", icon: <Award size={32} />, color: "#009ee7", bg: "#009ee715", name: "Cert",
    tagline: "Logros auténticos, insignias y certificados al instante.",
    desc: "Plataforma integral de certificación digital para generar diplomas e insignias con validez institucional. Para instituciones, empresas, emprendedores y profesores.",
    features: ["Emisión masiva de certificados", "Personalización de identidad visual", "Verificación con código QR antifalsificación", "Fidelidad de diseño PDF", "Versatilidad para distintos perfiles"],
  },
  {
    id: "blog", icon: <PenSquare size={32} />, color: "#e8902f", bg: "#e8902f15", name: "Blog IA",
    tagline: "Tu voz experta, impulsada por IA.",
    desc: "Herramienta que convierte tus ideas clave en artículos profesionales para tu web y redes sociales sin escribir todo desde cero.",
    features: ["Publica en LinkedIn e Instagram con un clic", "Sistema ágil: crea, revisa y lanza", "Mejora tu posicionamiento en Google", "Diseñado para evitar complicaciones técnicas", "Contenido adaptado a tu industria"],
  },
];

export default function ProductosPage() {
  const { openDemo } = useDemo();
  return (
    <>
      <section className="pt-28 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#fc5e5f] font-medium mb-4">Productos Corporativos</p>
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-[#003b72] leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>Herramientas listas para usar</h1>
              <p className="text-lg text-gray-600 leading-relaxed">Productos corporativos con IA, listos para implementar desde el primer día. Sin configuraciones complejas.</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              {PRODUCTOS.map((p) => (
                <a key={p.id} href={`#${p.id}`} className="flex items-center gap-2 px-4 py-2.5 border rounded-full text-sm font-medium transition-all hover:-translate-y-0.5" style={{ borderColor: p.color, color: p.color }} data-testid={`jump-${p.id}`}>
                  {p.name} <ArrowRight size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {PRODUCTOS.map((product, idx) => (
        <section key={product.id} id={product.id} className={`py-20 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`} data-testid={`product-section-${product.id}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
              <div className={idx % 2 !== 0 ? "lg:order-2" : ""}>
                <div className="inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ background: product.bg, color: product.color }}>
                  {product.icon} {product.name}
                </div>
                <h2 className="text-4xl font-bold text-[#003b72] mb-3 leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>{product.tagline}</h2>
                <p className="text-gray-600 leading-relaxed mb-7">{product.desc}</p>
                <ul className="flex flex-col gap-3 mb-8">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-gray-700 text-sm">
                      <CheckCircle size={17} style={{ color: product.color }} className="shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <button onClick={openDemo} className="px-7 py-3.5 text-white rounded-full font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg" style={{ background: product.color, boxShadow: `0 8px 20px ${product.color}35` }} data-testid={`product-contact-btn-${product.id}`}>
                  Contáctanos sobre {product.name}
                </button>
              </div>
              <div className={`hidden lg:block ${idx % 2 !== 0 ? "lg:order-1" : ""}`}>
                <div className="w-full rounded-3xl p-12 flex items-center justify-center" style={{ background: product.bg, minHeight: "320px" }}>
                  <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-xl" style={{ background: product.color }}>
                    <div className="text-white" style={{ transform: "scale(1.8)" }}>{product.icon}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 bg-[#003b72] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>¿No sabes cuál elegir?</h2>
          <p className="text-white/60 mb-6">Contesta 3 preguntas y te recomendamos el producto ideal.</p>
          <Link to="/que-producto-necesito" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#003b72] rounded-full font-semibold hover:bg-gray-100 transition-colors" data-testid="productos-quiz-btn">
            ¿Qué producto necesito? <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
