import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { ArrowLeft } from "lucide-react";

const CEO_IMG = "https://customer-assets.emergentagent.com/job_ai-solutions-site/artifacts/4sf6wnov_CEONomed.png";

const TEAM = [
  {
    name: "Felipe Robinet",
    role: "CEO & Fundador",
    img: CEO_IMG,
    quote: "Democratizar el acceso a herramientas de IA en Latinoamérica.",
    linkedin: null,
  },
  {
    name: "Federica Morici",
    role: "Fundadora de Estudiantes Digitales",
    img: null,
    initials: "FM",
    badge: "Top 100 Aurora Tech Award",
    quote: "Método Aurora® reconocido en World Internet Conference China 2025.",
    linkedin: null,
  },
];

export default function EquipoPage() {
  const { openDemo } = useDemo();

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#003b72] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, #009ee7, transparent)" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <Link to="/nosotros" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors" data-testid="equipo-back-btn">
            <ArrowLeft size={15} /> Volver a Nosotros
          </Link>
          <p className="text-xs uppercase tracking-[0.25em] text-[#009ee7] font-medium mb-4">Equipo</p>
          <h1 className="text-5xl lg:text-6xl font-bold max-w-2xl leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
            Las personas detrás de Nomed
          </h1>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {TEAM.map((member) => (
              <div key={member.name} className="card-lift bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center" data-testid={`team-${member.name.toLowerCase().replace(" ", "-")}`}>
                {member.img ? (
                  <img src={member.img} alt={member.name} className="w-28 h-28 rounded-full mb-5 object-cover border-4 border-white shadow-lg" />
                ) : (
                  <div className="w-28 h-28 rounded-full mb-5 bg-gradient-to-br from-[#e8902f] to-[#fc5e5f] flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                    {member.initials}
                  </div>
                )}
                <h3 className="font-bold text-[#003b72] text-xl mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{member.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{member.role}</p>
                {member.badge && (
                  <span className="inline-block text-xs bg-[#e8902f]/10 text-[#e8902f] px-3 py-1.5 rounded-full font-medium mb-3">{member.badge}</span>
                )}
                <p className="text-sm text-gray-400 italic leading-relaxed">&ldquo;{member.quote}&rdquo;</p>
              </div>
            ))}

            {/* Placeholder "more members coming" */}
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
