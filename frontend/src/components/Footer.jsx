import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { MapPin, Mail } from "lucide-react";

const NomedLogo = () => (
  <div className="flex items-center gap-0.5 font-bold text-2xl">
    <span style={{ background: "linear-gradient(135deg, #fc5e5f, #e8902f, #009ee7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "Outfit, sans-serif" }}>N</span>
    <span style={{ color: "white", fontFamily: "Outfit, sans-serif" }}>omed</span>
  </div>
);

export default function Footer() {
  const { openDemo } = useDemo();
  return (
    <footer className="bg-[#003b72] text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div className="lg:col-span-1">
            <NomedLogo />
            <p className="mt-4 text-white/60 text-sm leading-relaxed">
              Tecnología con IA para transformar empresas y educación en Latinoamérica.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Chile", "México", "Perú", "Argentina"].map((c) => (
                <span key={c} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70">{c}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-4">Tecnología</h4>
            <ul className="flex flex-col gap-3">
              {[{ label: "Desarrollo a Medida", to: "/tecnologia" }, { label: "Consultoría IA", to: "/tecnologia" }, { label: "Integraciones y APIs", to: "/tecnologia" }, { label: "Soporte y Continuidad", to: "/tecnologia" }].map((item) => (
                <li key={item.label}><Link to={item.to} className="text-sm text-white/60 hover:text-white transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-4">Productos</h4>
            <ul className="flex flex-col gap-3">
              {[{ label: "Botbee", to: "/productos" }, { label: "Cert", to: "/productos" }, { label: "Blog IA", to: "/productos" }, { label: "ED Master", to: "/estudiantes-digitales" }, { label: "ED Teach", to: "/estudiantes-digitales" }, { label: "ED Math", to: "/estudiantes-digitales" }].map((item) => (
                <li key={item.label}><Link to={item.to} className="text-sm text-white/60 hover:text-white transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-4">Empresa</h4>
            <ul className="flex flex-col gap-3">
              {[{ label: "Inicio", to: "/" }, { label: "Equipo", to: "/equipo" }, { label: "Estudiantes Digitales", to: "/estudiantes-digitales" }, { label: "¿Qué producto necesito?", to: "/#quiz" }].map((item) => (
                <li key={item.label}><Link to={item.to} className="text-sm text-white/60 hover:text-white transition-colors">{item.label}</Link></li>
              ))}
              <li><a href="mailto:contacto@nomed.org" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1" data-testid="footer-email"><Mail size={12} /> contacto@nomed.org</a></li>
            </ul>
            <button onClick={openDemo} className="mt-6 px-5 py-2.5 bg-[#fc5e5f] text-white rounded-full text-sm font-semibold hover:bg-[#e04e4f] transition-colors" data-testid="footer-contact-btn">
              Contáctanos
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} Nomed. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <MapPin size={12} />
            <span>Santiago, Chile · México · Perú · Argentina</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
