// @ts-nocheck
import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { ArrowLeft, Award, Linkedin, Twitter } from "lucide-react";

const CEO_IMG = "https://customer-assets.emergentagent.com/job_ai-solutions-site/artifacts/4sf6wnov_CEONomed.png";

const TEAM = [
  {
    name: "Felipe Robinet",
    role: "CEO & Fundador",
    company: "Nomed",
    img: CEO_IMG,
    initials: null,
    desc: "Líder visionario en tecnología e inteligencia artificial. Fundó Nomed con el objetivo de transformar empresas y educación en Latinoamérica mediante soluciones innovadoras.",
    badges: ["Fundador de Nomed", "Experto en IA"],
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Federica Morici",
    role: "Fundadora",
    company: "Estudiantes Digitales",
    img: null,
    initials: "FM",
    desc: "Creadora del Método Aurora® y fundadora de Estudiantes Digitales. Reconocida internacionalmente por su innovación en educación tecnológica.",
    badges: ["Top 100 Aurora Tech Award", "World Internet Conference China 2025"],
    linkedin: "#",
    twitter: "#",
  },
];

export default function EquipoPage() {
  const { openDemo } = useDemo();

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-14 bg-[#003b72] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, #009ee7, transparent)" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors" data-testid="equipo-back-btn">
            <ArrowLeft size={15} /> Volver al inicio
          </Link>
          <p className="text-xs uppercase tracking-[0.25em] text-[#009ee7] font-medium mb-4">Equipo</p>
          <h1 className="text-5xl lg:text-6xl font-bold max-w-2xl leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
            Las personas detrás de Nomed
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Nuestro equipo está conformado por profesionales apasionados por la tecnología y la educación, unidos por una misión clara: transformar empresas e instituciones educativas en Latinoamérica mediante soluciones de inteligencia artificial accesibles y de alto impacto.
          </p>
        </div>
      </section>

      {/* Team objective banner */}
      <section className="py-10 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#fc5e5f] font-medium mb-3">Nuestro propósito</p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Se dedican cada día a construir productos de software que no solo resuelven problemas reales, sino que generan valor sostenible para nuestros clientes. Su objetivo en Nomed es combinar experiencia técnica de primer nivel con una profunda comprensión del negocio, asegurando que cada proyecto sea una historia de éxito. Creemos que la tecnología con propósito puede cambiar organizaciones y vidas.
            </p>
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {TEAM.map((member) => (
              <div key={member.name} className="card-lift bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm" data-testid={`team-${member.name.toLowerCase().replace(/\s+/g, "-")}`}>
                {/* Photo area */}
                <div className="h-48 flex items-center justify-center relative" style={{ background: "linear-gradient(135deg, #009ee7, #003b72)" }}>
                  {member.img ? (
                    <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-xl" />
                  ) : (
                    <div className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl border-4 border-white/30 shadow-xl" style={{ background: "rgba(255,255,255,0.15)" }}>
                      {member.initials}
                    </div>
                  )}
                </div>
                {/* Info area */}
                <div className="p-6">
                  <h3 className="font-bold text-[#003b72] text-xl mb-0.5" style={{ fontFamily: "Outfit, sans-serif" }}>{member.name}</h3>
                  <p className="text-[#fc5e5f] font-semibold text-sm mb-0.5">{member.role}</p>
                  <p className="text-gray-400 text-xs mb-4">{member.company}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.desc}</p>
                  <ul className="flex flex-col gap-1.5 mb-5">
                    {member.badges.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-gray-500">
                        <Award size={12} className="text-[#fc5e5f] shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <a href={member.linkedin} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#003b72] hover:text-white flex items-center justify-center transition-all text-gray-500" data-testid={`team-linkedin-${member.name.split(" ")[0].toLowerCase()}`}>
                      <Linkedin size={15} />
                    </a>
                    <a href={member.twitter} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#009ee7] hover:text-white flex items-center justify-center transition-all text-gray-500" data-testid={`team-twitter-${member.name.split(" ")[0].toLowerCase()}`}>
                      <Twitter size={15} />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Placeholder */}
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center" data-testid="team-placeholder">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-gray-400 text-2xl">+</span>
              </div>
              <p className="text-gray-400 text-sm font-medium">Más integrantes próximamente</p>
            </div>
          </div>

          {/* Join CTA */}
          <div className="bg-[#003b72] text-white rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>¿Quieres trabajar con nosotros?</h2>
            <p className="text-white/60 mb-6 max-w-lg mx-auto">Somos un equipo apasionado por la tecnología y la educación. Si compartes esa visión, nos encantaría conocerte.</p>
            <button onClick={openDemo} className="px-8 py-3.5 bg-[#fc5e5f] text-white rounded-full font-semibold hover:bg-[#e04e4f] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#fc5e5f]/30" data-testid="equipo-contact-btn">
              Contáctanos
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
