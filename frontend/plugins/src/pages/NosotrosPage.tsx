// @ts-nocheck
import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { MapPin, Target, Eye, Search, Layout, Code, Headphones, ArrowRight, Users } from "lucide-react";

const PROCESO = [
  { num: "01", icon: <Search size={20} />, title: "Entendemos el problema", desc: "Nos sumergimos en tu negocio para entender el desafío real antes de proponer cualquier solución." },
  { num: "02", icon: <Layout size={20} />, title: "Definimos la solución", desc: "Arquitectura, tecnología y roadmap. Co-diseñamos contigo para que la solución sea exactamente lo que necesitas." },
  { num: "03", icon: <Code size={20} />, title: "Desarrollamos con agilidad", desc: "Iteraciones rápidas, entregas frecuentes y total transparencia durante todo el desarrollo." },
  { num: "04", icon: <Headphones size={20} />, title: "Acompañamos el crecimiento", desc: "Soporte, mejoras y escalabilidad. No terminamos en la entrega, crecemos contigo." },
];

export default function NosotrosPage() {
  const { openDemo } = useDemo();

  return (
    <>
      <section className="pt-28 pb-16 bg-[#003b72] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, #009ee7, transparent)" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <p className="text-xs uppercase tracking-[0.25em] text-[#009ee7] font-medium mb-4">Nosotros</p>
          <h1 className="text-5xl lg:text-6xl font-bold max-w-3xl leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
            Construimos el futuro tecnológico de Latinoamérica
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#f8fafc] rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#fc5e5f]/10 flex items-center justify-center"><Target size={18} color="#fc5e5f" /></div>
                <h3 className="font-bold text-[#003b72] text-xl" style={{ fontFamily: "Outfit, sans-serif" }}>Misión</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">Mejorar la calidad educativa y el desarrollo empresarial mediante tecnología de IA, creando soluciones accesibles que transformen organizaciones en Latinoamérica.</p>
            </div>
            <div className="bg-[#003b72]/3 rounded-2xl p-8 border border-[#003b72]/8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#009ee7]/10 flex items-center justify-center"><Eye size={18} color="#009ee7" /></div>
                <h3 className="font-bold text-[#003b72] text-xl" style={{ fontFamily: "Outfit, sans-serif" }}>Visión</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">Ser el principal partner tecnológico en IA para empresas y organizaciones en Latinoamérica, liderando la transformación digital con soluciones de impacto real.</p>
            </div>
          </div>

          <div className="bg-[#003b72] text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Presencia regional</p>
              <h3 className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>4 países, 1 visión</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {[{ country: "Chile", note: "Sede central" }, { country: "México" }, { country: "Perú" }, { country: "Argentina" }].map((c) => (
                <div key={c.country} className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3">
                  <MapPin size={14} className="text-[#009ee7]" />
                  <span className="font-medium">{c.country}</span>
                  {c.note && <span className="text-xs text-white/50">{c.note}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[#fc5e5f] font-medium mb-3">Cómo trabajamos</p>
            <h2 className="text-4xl font-bold text-[#003b72] max-w-xl" style={{ fontFamily: "Outfit, sans-serif" }}>Trabajamos codo a codo con el cliente</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PROCESO.map((step, idx) => (
              <div key={step.num} className="card-lift bg-white rounded-2xl p-8 border border-gray-100 flex gap-6" data-testid={`proceso-step-${idx + 1}`}>
                <div className="shrink-0">
                  <div className="text-5xl font-bold opacity-10 leading-none" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#003b72" }}>{step.num}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#009ee7]/10 flex items-center justify-center text-[#009ee7]">{step.icon}</div>
                    <h3 className="font-bold text-[#003b72] text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#003b72] to-[#005aa8] text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>Conoce a nuestro equipo</h3>
                <p className="text-white/60 text-sm">Las personas detrás de Nomed</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/equipo" className="px-6 py-3 bg-white text-[#003b72] rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2" data-testid="nosotros-equipo-link">
                Ver equipo <ArrowRight size={15} />
              </Link>
              <button onClick={openDemo} className="px-6 py-3 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-colors" data-testid="nosotros-contact-btn">
                Contáctanos
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
