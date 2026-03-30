import { Link } from "react-router-dom";
import { MapPin, Mail } from "lucide-react";

const NomedLogo = () => (
  <div className="flex items-center gap-2">
    <svg width="28" height="24" viewBox="-4 -3 70 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="2,46 13,46 17,0 6,0" fill="#fc5e5f"/>
      <polygon points="15,46 29,46 47,0 33,0" fill="#e8902f"/>
      <polygon points="49,0 61,0 61,46 49,46" fill="#009ee7"/>
    </svg>
    <span style={{ color: "white", fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.35rem", letterSpacing: "-0.4px", lineHeight: 1 }}>omed</span>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-[#003b72] text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-10">
          <div>
            <Link to="/">
              <NomedLogo />
            </Link>
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xs">
              Tecnología con IA para transformar empresas y educación en Latinoamérica.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="mailto:contacto@nomed.org" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5" data-testid="footer-email">
              <Mail size={14} /> contacto@nomed.org
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} Nomed. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <MapPin size={12} />
            <span>Santiago, Chile</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
