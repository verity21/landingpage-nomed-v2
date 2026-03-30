// @ts-nocheck
import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { ArrowLeft, Smartphone, CheckCircle, ArrowRight, Monitor, Layers, Zap, Palette } from "lucide-react";

const COLOR = "#009ee7";
const BG = "#009ee710";

const FEATURES = [
  { icon: <Monitor size={18} />, title: "Aplicaciones web modernas", desc: "Desarrollamos con React, Next.js y tecnologías de vanguardia para garantizar velocidad, SEO y experiencia de usuario óptima." },
  { icon: <Smartphone size={18} />, title: "Apps móviles multiplataforma", desc: "Una sola base de código para iOS y Android con React Native. Performance nativa, menor tiempo de desarrollo." },
  { icon: <Layers size={18} />, title: "Progressive Web Apps (PWA)", desc: "Apps que funcionan offline y se instalan en el dispositivo del usuario, combinando lo mejor de la web y el móvil." },
  { icon: <Palette size={18} />, title: "UI/UX de alto impacto", desc: "Diseño centrado en el usuario, con interfaces intuitivas, animaciones cuidadas y flujos de conversión optimizados." },
  { icon: <Zap size={18} />, title: "Performance y escalabilidad", desc: "Arquitecturas que soportan desde 100 hasta millones de usuarios sin degradar la experiencia." },
];

const BENEFITS = [
  "Experiencia de usuario que genera confianza y retención",
  "Tiempo de desarrollo optimizado con tecnologías modernas",
  "Código mantenible y escalable a largo plazo",
  "Compatible con todos los dispositivos y navegadores",
  "Entrega incremental: verás avances desde la primera semana",
];

export default function WebMobilePage() {
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
      <section className="pt-28 pb-16 bg-white" data-testid="web-hero">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold mb-8" style={{ background: BG, color: COLOR }}>
            <Smartphone size={20} /> Web & Mobile
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#003b72] leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
            Software que tus usuarios <span style={{ color: COLOR }}>aman usar</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
            Diseñamos y desarrollamos aplicaciones web y móviles de alto rendimiento. Desde MVPs hasta plataformas complejas, con foco absoluto en la experiencia del usuario y la calidad del código.
          </p>
          <button onClick={openDemo} className="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-full font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg" style={{ background: COLOR, boxShadow: `0 8px 24px ${COLOR}30` }} data-testid="web-contact-btn">
            Solicitar consultoría <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#003b72] mb-10" style={{ fontFamily: "Outfit, sans-serif" }}>¿Qué desarrollamos?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
          <h2 className="text-3xl font-bold text-[#003b72] mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>¿Por qué trabajar con Nomed?</h2>
          <ul className="flex flex-col gap-4">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-gray-700">
                <CheckCircle size={20} style={{ color: COLOR, marginTop: "2px" }} className="shrink-0" /><span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="py-16" style={{ background: COLOR }} data-testid="web-cta">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>¿Tienes una idea de app o web?</h2>
          <p className="text-white/80 mb-7 text-lg">Cuéntanos tu visión y te mostramos cómo hacerla realidad.</p>
          <button onClick={openDemo} className="px-8 py-4 bg-white rounded-full font-semibold hover:bg-gray-100 transition-all" style={{ color: COLOR }} data-testid="web-cta-btn">Hablar con el equipo</button>
        </div>
      </section>
    </div>
  );
}
