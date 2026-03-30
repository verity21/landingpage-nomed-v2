import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, Bot, Award, PenSquare, Trophy, BookOpen, Calculator, BrainCircuit, Zap, Link2, Smartphone, BarChart3, TrendingUp } from "lucide-react";
import { useDemo } from "@/contexts/DemoContext";
import { AnimatedThemeToggler } from "@/registry/magicui/animated-theme-toggler";
import type { NavCategory } from "@/types";

const PRODUCTOS_CATS: NavCategory[] = [
  {
    id: "corporativos", label: "Productos Corporativos",
    viewAllLink: "/productos", viewAllLabel: "Ver todos los productos",
    products: [
      { name: "Botbee", desc: "Asistente virtual inteligente entrenado con los documentos de tu empresa.", link: "/productos/botbee", color: "#fc5e5f", icon: <Bot size={18} /> },
      { name: "Cert", desc: "Emite certificados digitales con validez institucional y verificación QR.", link: "/productos/cert", color: "#009ee7", icon: <Award size={18} /> },
      { name: "Blog IA", desc: "Convierte tus ideas en artículos profesionales para web y redes sociales.", link: "/productos/blog-ia", color: "#e8902f", icon: <PenSquare size={18} /> },
    ],
  },
  {
    id: "ed-tech", label: "Nuestras ED Tech",
    viewAllLink: "/estudiantes-digitales", viewAllLabel: "Ver Estudiantes Digitales",
    products: [
      { name: "ED Master", desc: "Plataforma de entrenamiento académico con bancos de preguntas y simulaciones.", link: "/estudiantes-digitales/ed-master", color: "#FF7878", icon: <Trophy size={18} /> },
      { name: "ED Teach", desc: "Genera materiales didácticos, juegos y evaluaciones con IA en segundos.", link: "/estudiantes-digitales/ed-teach", color: "#65B4B8", icon: <BookOpen size={18} /> },
      { name: "ED Math", desc: "LMS especializado en matemáticas con seguimiento de progreso en tiempo real.", link: "/estudiantes-digitales/ed-math", color: "#2B7F87", icon: <Calculator size={18} /> },
    ],
  },
];

const SERVICIOS_CATS: NavCategory[] = [
  {
    id: "desarrollo", label: "Desarrollo & Conexión",
    viewAllLink: "/#servicios", viewAllLabel: "Ver sección servicios",
    products: [
      { name: "Web & Mobile", desc: "Apps web y móviles de alta performance con React, Next.js y React Native.", link: "/servicios/web-mobile", color: "#009ee7", icon: <Smartphone size={18} /> },
      { name: "Integraciones", desc: "Conectamos tus sistemas con APIs REST, webhooks y conectores personalizados.", link: "/servicios/integraciones", color: "#e8902f", icon: <Link2 size={18} /> },
      { name: "Automatización", desc: "Eliminamos tareas repetitivas con flujos inteligentes y RPA.", link: "/servicios/automatizacion", color: "#fc5e5f", icon: <Zap size={18} /> },
    ],
  },
  {
    id: "ia-datos", label: "IA & Estrategia",
    viewAllLink: "/#servicios", viewAllLabel: "Ver sección servicios",
    products: [
      { name: "IA Aplicada", desc: "Integramos modelos de lenguaje, visión y predicción en tus procesos.", link: "/servicios/ia-aplicada", color: "#003b72", icon: <BrainCircuit size={18} /> },
      { name: "Data & Analytics", desc: "Tus datos en dashboards accionables y modelos predictivos.", link: "/servicios/data-analytics", color: "#2B7F87", icon: <BarChart3 size={18} /> },
      { name: "Transformación Digital", desc: "Diagnóstico, roadmap e implementación completa de tu digitalización.", link: "/servicios/transformacion-digital", color: "#65B4B8", icon: <TrendingUp size={18} /> },
    ],
  },
];

const NomedLogo = () => (
  <Link to="/" className="flex items-center gap-0.5 font-bold text-2xl" data-testid="nav-logo">
    <span style={{ background: "linear-gradient(135deg, #fc5e5f, #e8902f, #009ee7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "Outfit, sans-serif" }}>N</span>
    <span style={{ color: "#003b72", fontFamily: "Outfit, sans-serif" }}>omed</span>
  </Link>
);

interface MegaPanelProps {
  categories: NavCategory[];
  defaultCat: string;
  onClose: () => void;
}

function MegaPanel({ categories, defaultCat, onClose }: MegaPanelProps) {
  const [activeCat, setActiveCat] = useState(defaultCat);
  const current = categories.find((c) => c.id === activeCat);
  return (
    <div className="border-t border-gray-100 bg-white shadow-2xl" data-testid="mega-menu">
      <div className="max-w-7xl mx-auto flex relative">
        <div className="w-60 shrink-0 border-r border-gray-100 py-3">
          <p className="px-5 py-2 text-xs font-semibold uppercase tracking-widest text-gray-400">Categorías</p>
          {categories.map((cat) => (
            <button key={cat.id} onMouseEnter={() => setActiveCat(cat.id)} onClick={() => setActiveCat(cat.id)}
              className={`w-full text-left px-5 py-3.5 text-sm font-medium flex items-center justify-between transition-colors ${activeCat === cat.id ? "bg-[#003b72] text-white" : "text-gray-700 hover:bg-gray-50"}`}
              data-testid={`mega-cat-${cat.id}`}>
              {cat.label}{activeCat === cat.id && <ChevronRight size={14} />}
            </button>
          ))}
        </div>
        <div className="flex-1 p-8">
          <div className="mb-5">
            <h3 className="font-bold text-[#003b72] text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>{current?.label}</h3>
            <Link to={current?.viewAllLink || "/"} onClick={onClose} className="text-sm text-[#009ee7] hover:underline mt-0.5 block" data-testid="mega-view-all">
              {current?.viewAllLabel} →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {current?.products.map((product) => (
              <Link key={product.name} to={product.link} onClick={onClose}
                className="group flex items-start gap-3 hover:bg-gray-50 rounded-xl p-3 transition-colors -mx-3"
                data-testid={`mega-item-${product.name.toLowerCase().replace(/\s+/g, "-")}`}>
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
        <button onClick={onClose} className="absolute top-3 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors" data-testid="mega-close-btn">
          <X size={15} />
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { openDemo } = useDemo();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<"productos" | "servicios" | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpenMenu(null); }, [location]);

  useEffect(() => {
    if (!openMenu) return;
    const handle = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [openMenu]);

  const scrollToSection = (sectionId: string) => {
    setMobileOpen(false); setOpenMenu(null);
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => { const el = document.getElementById(sectionId); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 350);
    }
  };

  const toggle = (menu: "productos" | "servicios") => setOpenMenu((prev) => (prev === menu ? null : menu));

  return (
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || openMenu ? "bg-white shadow-sm border-b border-gray-100" : "bg-white/95 border-b border-gray-100 backdrop-blur-xl"}`} data-testid="navbar">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <NomedLogo />

        <nav className="hidden xl:flex items-center gap-0.5" data-testid="desktop-nav">
          <Link to="/" className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${location.pathname === "/" && !openMenu ? "text-[#003b72] bg-[#003b72]/5" : "text-gray-600 hover:text-[#003b72] hover:bg-gray-50"}`} data-testid="nav-link-inicio">Inicio</Link>
          <button onClick={() => scrollToSection("nosotros")} className="px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-gray-600 hover:text-[#003b72] hover:bg-gray-50" data-testid="nav-link-nosotros">Nosotros</button>
          <button onClick={() => toggle("servicios")} className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${openMenu === "servicios" ? "text-[#003b72] bg-[#003b72]/5" : "text-gray-600 hover:text-[#003b72] hover:bg-gray-50"}`} data-testid="nav-servicios-btn">
            Servicios <ChevronDown size={13} className={`transition-transform duration-200 ${openMenu === "servicios" ? "rotate-180" : ""}`} />
          </button>
          <Link to="/equipo" className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${location.pathname === "/equipo" ? "text-[#003b72] bg-[#003b72]/5" : "text-gray-600 hover:text-[#003b72] hover:bg-gray-50"}`} data-testid="nav-link-equipo">Equipo</Link>
          <button onClick={() => toggle("productos")} className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${openMenu === "productos" ? "text-[#003b72] bg-[#003b72]/5" : "text-gray-600 hover:text-[#003b72] hover:bg-gray-50"}`} data-testid="nav-products-btn">
            Productos <ChevronDown size={13} className={`transition-transform duration-200 ${openMenu === "productos" ? "rotate-180" : ""}`} />
          </button>
          <Link to="/responsabilidad-social" className={`px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${location.pathname === "/responsabilidad-social" ? "text-[#003b72] bg-[#003b72]/5" : "text-gray-600 hover:text-[#003b72] hover:bg-gray-50"}`} data-testid="nav-link-rsc">
            Resp. Social
          </Link>
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <AnimatedThemeToggler />
          <button onClick={openDemo} className="btn-nav-aurora px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap" data-testid="nav-contact-btn">Contáctanos</button>
        </div>
        <button className="xl:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors" onClick={() => setMobileOpen(!mobileOpen)} data-testid="mobile-menu-btn">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className="hidden xl:block">
        {openMenu === "productos" && <MegaPanel categories={PRODUCTOS_CATS} defaultCat="corporativos" onClose={() => setOpenMenu(null)} />}
        {openMenu === "servicios" && <MegaPanel categories={SERVICIOS_CATS} defaultCat="desarrollo" onClose={() => setOpenMenu(null)} />}
      </div>

      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto" data-testid="mobile-menu">
          <Link to="/" className="px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors">Inicio</Link>
          <button onClick={() => scrollToSection("nosotros")} className="px-4 py-3 rounded-xl text-sm font-medium text-left text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors">Nosotros</button>
          <div className="px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gray-400 mt-1">Servicios — Desarrollo</div>
          {SERVICIOS_CATS[0].products.map((p) => (
            <Link key={p.name} to={p.link} className="px-6 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors flex items-center gap-2">
              <span style={{ color: p.color }}>{p.icon}</span> {p.name}
            </Link>
          ))}
          <div className="px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gray-400 mt-1">Servicios — IA & Estrategia</div>
          {SERVICIOS_CATS[1].products.map((p) => (
            <Link key={p.name} to={p.link} className="px-6 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors flex items-center gap-2">
              <span style={{ color: p.color }}>{p.icon}</span> {p.name}
            </Link>
          ))}
          <Link to="/equipo" className="px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors mt-1">Equipo</Link>
          <div className="px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gray-400 mt-1">Productos Corporativos</div>
          {PRODUCTOS_CATS[0].products.map((p) => (
            <Link key={p.name} to={p.link} className="px-6 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors flex items-center gap-2">
              <span style={{ color: p.color }}>{p.icon}</span> {p.name}
            </Link>
          ))}
          <div className="px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gray-400 mt-1">Nuestras ED Tech</div>
          {PRODUCTOS_CATS[1].products.map((p) => (
            <Link key={p.name} to={p.link} className="px-6 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors flex items-center gap-2">
              <span style={{ color: p.color }}>{p.icon}</span> {p.name}
            </Link>
          ))}
          <button onClick={() => scrollToSection("quiz")} className="px-4 py-3 rounded-xl text-sm font-medium text-left text-gray-700 hover:bg-gray-50 hover:text-[#003b72] transition-colors mt-1">¿Qué producto necesito?</button>
          <div className="mt-2 px-1">
            <AnimatedThemeToggler />
          </div>
          <button onClick={() => { setMobileOpen(false); openDemo(); }} className="mt-2 w-full px-5 py-3 bg-[#fc5e5f] text-white rounded-full text-sm font-semibold hover:bg-[#e04e4f] transition-colors">Contáctanos</button>
        </div>
      )}
    </header>
  );
}
