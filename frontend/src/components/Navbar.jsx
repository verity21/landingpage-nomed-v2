import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, Bot, Award, PenSquare, Trophy, BookOpen, Calculator } from "lucide-react";
import { useDemo } from "@/contexts/DemoContext";

/* ---- Mega Menu Data ---- */
const MEGA_CATEGORIES = [
  {
    id: "corporativos",
    label: "Productos Corporativos",
    viewAllLink: "/productos",
    viewAllLabel: "Ver todos los productos",
    products: [
      { name: "Botbee", desc: "Asistente virtual inteligente entrenado con los documentos de tu empresa.", link: "/productos/botbee", color: "#fc5e5f", icon: <Bot size={18} /> },
      { name: "Cert", desc: "Emite certificados digitales con validez institucional y verificación QR.", link: "/productos/cert", color: "#009ee7", icon: <Award size={18} /> },
      { name: "Blog IA", desc: "Convierte tus ideas en artículos profesionales para web y redes sociales.", link: "/productos/blog-ia", color: "#e8902f", icon: <PenSquare size={18} /> },
    ],
  },
  {
    id: "ed-tech",
    label: "Nuestras ED Tech",
    viewAllLink: "/estudiantes-digitales",
    viewAllLabel: "Ver Estudiantes Digitales",
    products: [
      { name: "ED Master", desc: "Plataforma de entrenamiento académico con bancos de preguntas y simulaciones.", link: "/estudiantes-digitales/ed-master", color: "#FF7878", icon: <Trophy size={18} /> },
      { name: "ED Teach", desc: "Genera materiales didácticos, juegos y evaluaciones con IA en segundos.", link: "/estudiantes-digitales/ed-teach", color: "#65B4B8", icon: <BookOpen size={18} /> },
      { name: "ED Math", desc: "LMS especializado en matemáticas con seguimiento de progreso en tiempo real.", link: "/estudiantes-digitales/ed-math", color: "#2B7F87", icon: <Calculator size={18} /> },
    ],
  },
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
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("corporativos");
  const location = useLocation();
  const navigate = useNavigate();
  const megaRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location]);

  /* Close mega menu on outside click */
  useEffect(() => {
    if (!megaOpen) return;
    const handle = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [megaOpen]);

  const scrollToSection = (sectionId) => {
    setMobileOpen(false);
    setMegaOpen(false);
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

  const currentCat = MEGA_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <header ref={megaRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || megaOpen ? "bg-white shadow-sm border-b border-gray-100" : "bg-white/90 backdrop-blur-xl"}`} data-testid="navbar">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <NomedLogo />

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-0.5" data-testid="desktop-nav">
          <Link to="/" className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${location.pathname === "/" && !megaOpen ? "text-[#003b72] bg-[#003b72]/5" : "text-gray-600 hover:text-[#003b72] hover:bg-gray-50"}`} data-testid="nav-link-inicio">
            Inicio
          </Link>
          <button onClick={() => scrollToSection("nosotros")} className="px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-gray-600 hover:text-[#003b72] hover:bg-gray-50" data-testid="nav-link-nosotros">
            Nosotros
          </button>
          <button onClick={() => scrollToSection("servicios")} className="px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-gray-600 hover:text-[#003b72] hover:bg-gray-50" data-testid="nav-link-servicios">
            Servicios
          </button>
          <Link to="/equipo" className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${location.pathname === "/equipo" ? "text-[#003b72] bg-[#003b72]/5" : "text-gray-600 hover:text-[#003b72] hover:bg-gray-50"}`} data-testid="nav-link-equipo">
            Equipo
          </Link>
          {/* Productos — mega menu trigger */}
          <button
            onClick={() => setMegaOpen(!megaOpen)}
            className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${megaOpen ? "text-[#003b72] bg-[#003b72]/5" : "text-gray-600 hover:text-[#003b72] hover:bg-gray-50"}`}
            data-testid="nav-products-btn"
          >
            Productos <ChevronDown size={13} className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
          </button>
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

      {/* ---- MEGA MENU ---- */}
      {megaOpen && (
        <div className="hidden xl:block border-t border-gray-100 bg-white shadow-2xl" data-testid="mega-menu">
          <div className="max-w-7xl mx-auto flex relative">
            {/* Left: category list */}
            <div className="w-60 shrink-0 border-r border-gray-100 py-3">
              <p className="px-5 py-2 text-xs font-semibold uppercase tracking-widest text-gray-400">Categorías</p>
              {MEGA_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onMouseEnter={() => setActiveCategory(cat.id)}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-5 py-3.5 text-sm font-medium flex items-center justify-between transition-colors ${activeCategory === cat.id ? "bg-[#003b72] text-white" : "text-gray-700 hover:bg-gray-50"}`}
                  data-testid={`mega-cat-${cat.id}`}
                >
                  {cat.label}
                  {activeCategory === cat.id && <ChevronRight size={14} />}
                </button>
              ))}
            </div>

            {/* Right: product cards */}
            <div className="flex-1 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-[#003b72] text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>{currentCat?.label}</h3>
                  <Link to={currentCat?.viewAllLink || "/productos"} onClick={() => setMegaOpen(false)} className="text-sm text-[#009ee7] hover:underline mt-0.5 block" data-testid="mega-view-all">
                    {currentCat?.viewAllLabel} →
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {currentCat?.products.map((product) => (
                  <Link
                    key={product.name}
                    to={product.link}
                    onClick={() => setMegaOpen(false)}
                    className="group flex items-start gap-3 hover:bg-gray-50 rounded-xl p-3 transition-colors -mx-3"
                    data-testid={`mega-product-${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all group-hover:scale-110" style={{ color: product.color, background: `${product.color}15` }}>
                      {product.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-[#003b72] text-sm group-hover:text-[#fc5e5f] transition-colors">{product.name}</p>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">{product.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Close button */}
            <button onClick={() => setMegaOpen(false)} className="absolute top-3 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors" data-testid="mega-close-btn">
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-2" data-testid="mobile-menu">
          <Link to="/" className="px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors">Inicio</Link>
          <button onClick={() => scrollToSection("nosotros")} className="px-4 py-3 rounded-xl text-sm font-medium text-left text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors">Nosotros</button>
          <button onClick={() => scrollToSection("servicios")} className="px-4 py-3 rounded-xl text-sm font-medium text-left text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors">Servicios</button>
          <Link to="/equipo" className="px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors">Equipo</Link>
          <div className="px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gray-400">Productos Corporativos</div>
          {MEGA_CATEGORIES[0].products.map((p) => (
            <Link key={p.name} to={p.link} className="px-6 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors flex items-center gap-2">
              <span style={{ color: p.color }}>{p.icon}</span> {p.name}
            </Link>
          ))}
          <div className="px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gray-400 mt-1">Nuestras ED Tech</div>
          {MEGA_CATEGORIES[1].products.map((p) => (
            <Link key={p.name} to={p.link} className="px-6 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors flex items-center gap-2">
              <span style={{ color: p.color }}>{p.icon}</span> {p.name}
            </Link>
          ))}
          <button onClick={() => scrollToSection("quiz")} className="px-4 py-3 rounded-xl text-sm font-medium text-left text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors mt-1">¿Qué producto necesito?</button>
          <button onClick={() => { setMobileOpen(false); openDemo(); }} className="mt-2 w-full px-5 py-3 bg-[#fc5e5f] text-white rounded-full text-sm font-semibold hover:bg-[#e04e4f] transition-colors">
            Contáctanos
          </button>
        </div>
      )}
    </header>
  );
}
