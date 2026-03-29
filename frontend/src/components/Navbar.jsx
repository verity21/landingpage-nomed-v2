import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useDemo } from "@/contexts/DemoContext";

const NAV_LINKS = [
  { label: "Inicio", to: "/" },
  { label: "Equipo", to: "/equipo" },
  { label: "Productos", to: "/productos" },
  { label: "Estudiantes Digitales", to: "/estudiantes-digitales" },
];

const NomedLogo = () => (
  <Link to="/" className="flex items-center gap-0.5 font-bold text-2xl" data-testid="nav-logo">
    <span style={{ background: "linear-gradient(135deg, #fc5e5f, #e8902f, #009ee7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "Outfit, sans-serif" }}>N</span>
    <span style={{ color: "#003b72", fontFamily: "Outfit, sans-serif" }}>omed</span>
  </Link>
);

export default function Navbar() {
  const { openDemo } = useDemo();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const scrollToSection = (sectionId) => {
    setMobileOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100" : "bg-white/80 backdrop-blur-xl"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <NomedLogo />

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-0.5" data-testid="desktop-nav">
          <Link to="/" className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${location.pathname === "/" ? "text-[#003b72] bg-[#003b72]/5" : "text-gray-600 hover:text-[#003b72] hover:bg-gray-50"}`} data-testid="nav-link-inicio">
            Inicio
          </Link>
          <button onClick={() => scrollToSection("nosotros")} className="px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-gray-600 hover:text-[#003b72] hover:bg-gray-50" data-testid="nav-link-nosotros">
            Nosotros
          </button>
          <button onClick={() => scrollToSection("servicios")} className="px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-gray-600 hover:text-[#003b72] hover:bg-gray-50" data-testid="nav-link-servicios">
            Servicios
          </button>
          {NAV_LINKS.filter(l => l.label !== "Inicio").map((link) => (
            <Link key={link.to} to={link.to} className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${location.pathname === link.to ? "text-[#003b72] bg-[#003b72]/5" : "text-gray-600 hover:text-[#003b72] hover:bg-gray-50"}`} data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-").replace(/[¿?]/g, "")}`}>
              {link.label}
            </Link>
          ))}
          <button onClick={() => scrollToSection("quiz")} className="px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-gray-600 hover:text-[#003b72] hover:bg-gray-50" data-testid="nav-quiz-btn">
            ¿Qué producto necesito?
          </button>
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <button onClick={openDemo} className="px-5 py-2.5 bg-[#fc5e5f] text-white rounded-full text-sm font-semibold hover:bg-[#e04e4f] transition-all hover:-translate-y-0.5 shadow-md shadow-[#fc5e5f]/20 whitespace-nowrap" data-testid="nav-contact-btn">
            Contáctanos
          </button>
        </div>

        <button className="xl:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors" onClick={() => setMobileOpen(!mobileOpen)} data-testid="mobile-menu-btn">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-2" data-testid="mobile-menu">
          <Link to="/" className="px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors" data-testid="mobile-nav-inicio">Inicio</Link>
          <button onClick={() => scrollToSection("nosotros")} className="px-4 py-3 rounded-xl text-sm font-medium text-left text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors" data-testid="mobile-nav-nosotros">Nosotros</button>
          <button onClick={() => scrollToSection("servicios")} className="px-4 py-3 rounded-xl text-sm font-medium text-left text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors" data-testid="mobile-nav-servicios">Servicios</button>
          {NAV_LINKS.filter(l => l.label !== "Inicio").map((link) => (
            <Link key={link.to} to={link.to} className="px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors" data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-").replace(/[¿?]/g, "")}`}>
              {link.label}
            </Link>
          ))}
          <button onClick={() => scrollToSection("quiz")} className="px-4 py-3 rounded-xl text-sm font-medium text-left text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors" data-testid="mobile-quiz-btn">
            ¿Qué producto necesito?
          </button>
          <button onClick={() => { setMobileOpen(false); openDemo(); }} className="mt-2 w-full px-5 py-3 bg-[#fc5e5f] text-white rounded-full text-sm font-semibold hover:bg-[#e04e4f] transition-colors" data-testid="mobile-contact-btn">
            Contáctanos
          </button>
        </div>
      )}
    </header>
  );
}
