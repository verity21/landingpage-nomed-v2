// @ts-nocheck
import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { ArrowLeft, Link2, CheckCircle, ArrowRight, Database, GitMerge, Webhook, Shield } from "lucide-react";

const COLOR = "#e8902f";
const BG = "#e8902f10";

const FEATURES = [
  { icon: <GitMerge size={18} />, title: "APIs REST y GraphQL", desc: "Diseñamos e implementamos APIs robustas que permiten la comunicación entre tus sistemas de manera rápida y segura." },
  { icon: <Webhook size={18} />, title: "Webhooks y eventos en tiempo real", desc: "Conectamos sistemas con notificaciones instantáneas. Cuando ocurre algo en un sistema, los demás reaccionan automáticamente." },
  { icon: <Database size={18} />, title: "Sincronización de datos entre plataformas", desc: "Mantenemos los datos consistentes entre ERP, CRM, e-commerce y cualquier plataforma que uses." },
  { icon: <Shield size={18} />, title: "Seguridad y autenticación", desc: "Implementamos OAuth2, JWT y manejo seguro de credenciales para proteger todas las integraciones." },
];

const BENEFITS = [
  "Elimina la duplicación manual de datos entre sistemas",
  "Todos tus sistemas hablan el mismo idioma",
  "Reduce el tiempo de implementación de nuevas herramientas",
  "Visibilidad unificada de todo el ecosistema tecnológico",
  "Escalabilidad: nuevas integraciones sin romper las existentes",
];

export default function IntegracionesPage() {
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
      <section className="pt-28 pb-16 bg-white" data-testid="int-hero">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold mb-8" style={{ background: BG, color: COLOR }}>
            <Link2 size={20} /> Integraciones
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#003b72] leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
            Tus sistemas conectados, <span style={{ color: COLOR }}>funcionando como uno solo</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
            Conectamos aplicaciones, plataformas y sistemas para que compartan datos y trabajen en sincronía. Adiós a los silos de información y la duplicación manual de datos.
          </p>
          <button onClick={openDemo} className="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-full font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg" style={{ background: COLOR, boxShadow: `0 8px 24px ${COLOR}30` }} data-testid="int-contact-btn">
            Solicitar consultoría <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#003b72] mb-10" style={{ fontFamily: "Outfit, sans-serif" }}>Tipos de integraciones</h2>
          <div className="grid sm:grid-cols-2 gap-6">
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
          <h2 className="text-3xl font-bold text-[#003b72] mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>¿Qué logra tu empresa?</h2>
          <ul className="flex flex-col gap-4">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-gray-700">
                <CheckCircle size={20} style={{ color: COLOR, marginTop: "2px" }} className="shrink-0" /><span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="py-16" style={{ background: COLOR }} data-testid="int-cta">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>¿Tus sistemas no se hablan entre sí?</h2>
          <p className="text-white/80 mb-7 text-lg">Cuéntanos qué herramientas usas y diseñamos la arquitectura de integración ideal.</p>
          <button onClick={openDemo} className="px-8 py-4 bg-white rounded-full font-semibold hover:bg-gray-100 transition-all" style={{ color: COLOR }} data-testid="int-cta-btn">Hablar con el equipo</button>
        </div>
      </section>
    </div>
  );
}
