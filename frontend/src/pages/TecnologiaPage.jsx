import { useDemo } from "@/contexts/DemoContext";
import { BrainCircuit, Zap, Link2, Smartphone, BarChart3, TrendingUp, MessageSquare, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CAPACIDADES = [
  { icon: <BrainCircuit size={22} />, title: "IA Aplicada", desc: "Modelos personalizados para resolver problemas específicos de tu negocio." },
  { icon: <Zap size={22} />, title: "Automatización", desc: "Eliminamos tareas repetitivas y optimizamos procesos con IA." },
  { icon: <Link2 size={22} />, title: "Integraciones", desc: "Conectamos tus sistemas y automatizamos flujos con APIs modernas." },
  { icon: <Smartphone size={22} />, title: "Web & Mobile", desc: "Plataformas web y apps móviles a medida con excelente experiencia de usuario." },
  { icon: <BarChart3 size={22} />, title: "Data & Analytics", desc: "Convierte datos en decisiones con dashboards e insights en tiempo real." },
  { icon: <TrendingUp size={22} />, title: "Transformación Digital", desc: "Acompañamos tu organización en el camino hacia la modernización tecnológica." },
];

const SERVICIOS = [
  { icon: <MessageSquare size={24} />, color: "#fc5e5f", bg: "#fc5e5f15", title: "Consultoría Estratégica", desc: "Definición de arquitectura y estrategia digital adaptada a tu negocio." },
  { icon: <Link2 size={24} />, color: "#009ee7", bg: "#009ee715", title: "Integraciones y APIs", desc: "Conexión de sistemas y automatización de procesos con IA." },
  { icon: <Shield size={24} />, color: "#e8902f", bg: "#e8902f15", title: "Soporte y Continuidad", desc: "Acompañamiento continuo para mantener tus sistemas operativos y en crecimiento." },
];

export default function TecnologiaPage() {
  const { openDemo } = useDemo();
  return (
    <>
      <section className="pt-28 pb-16 bg-[#003b72] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 70% at 80% 50%, #fc5e5f, transparent)" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <p className="text-xs uppercase tracking-[0.25em] text-[#009ee7] font-medium mb-4">Tecnología</p>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
                Desarrollo de software a medida — <span style={{ color: "#fc5e5f" }}>IA Powered</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Resolvemos problemas de forma innovadora. Equipos especializados, entregas ágiles y total transparencia en cada etapa del proyecto.
              </p>
              <button onClick={openDemo} className="px-8 py-3.5 bg-[#fc5e5f] text-white rounded-full font-semibold hover:bg-[#e04e4f] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#fc5e5f]/30" data-testid="tecnologia-hero-contact-btn">
                Contáctanos
              </button>
            </div>
            <div className="hidden lg:block">
              <img src="https://images.unsplash.com/photo-1762279388957-c6ed514d3353?w=600&q=80" alt="Technology" className="w-full rounded-2xl opacity-80 object-cover h-72" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#fc5e5f] font-medium mb-3">Capacidades</p>
            <h2 className="text-4xl font-bold text-[#003b72]" style={{ fontFamily: "Outfit, sans-serif" }}>Lo que podemos construir juntos</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPACIDADES.map((cap) => (
              <div key={cap.title} className="card-lift bg-white border border-gray-100 rounded-2xl p-6 group" data-testid={`capacidad-${cap.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="w-11 h-11 rounded-xl bg-[#003b72]/5 flex items-center justify-center mb-4 text-[#003b72] group-hover:bg-[#003b72] group-hover:text-white transition-all">{cap.icon}</div>
                <h3 className="font-bold text-[#003b72] text-lg mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{cap.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#fc5e5f] font-medium mb-3">Servicios complementarios</p>
            <h2 className="text-4xl font-bold text-[#003b72]" style={{ fontFamily: "Outfit, sans-serif" }}>Más allá del desarrollo</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICIOS.map((svc) => (
              <div key={svc.title} className="card-lift bg-white rounded-2xl p-8 border border-gray-100" data-testid={`servicio-${svc.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: svc.bg, color: svc.color }}>{svc.icon}</div>
                <h3 className="font-bold text-[#003b72] text-xl mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>{svc.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#003b72] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>¿Tienes un proyecto en mente?</h2>
          <p className="text-white/60 mb-8 text-lg max-w-xl mx-auto">Cuéntanos tu desafío y juntos encontramos la solución tecnológica ideal.</p>
          <button onClick={openDemo} className="px-10 py-4 bg-[#fc5e5f] text-white rounded-full font-semibold text-lg hover:bg-[#e04e4f] transition-all hover:-translate-y-0.5 shadow-xl shadow-[#fc5e5f]/30" data-testid="tecnologia-bottom-contact-btn">
            Contáctanos
          </button>
        </div>
      </section>
    </>
  );
}
