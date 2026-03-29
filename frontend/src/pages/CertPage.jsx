import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { ArrowLeft, Award, CheckCircle, ArrowRight, QrCode, Palette, Users, ShieldCheck } from "lucide-react";

const COLOR = "#009ee7";
const BG = "#009ee710";

const FEATURES = [
  { icon: <Award size={18} />, title: "Certificados y badges digitales", desc: "Crea diplomas institucionales y badges digitales con validez real. Diseño profesional personalizable con tu identidad visual." },
  { icon: <ShieldCheck size={18} />, title: "Protección antifalsificación", desc: "Tecnología de verificación que hace imposible alterar o falsificar los documentos emitidos." },
  { icon: <Users size={18} />, title: "Emisión masiva", desc: "Sistema rápido y eficiente para emitir grandes volúmenes de certificados para instituciones y empresas." },
  { icon: <QrCode size={18} />, title: "Verificación por QR", desc: "Cualquier persona puede validar la autenticidad del certificado al instante escaneando el código QR." },
  { icon: <Palette size={18} />, title: "Fidelidad de diseño PDF", desc: "El PDF descargado es idéntico al diseño configurado. Sin distorsiones ni errores de formato." },
];

const BENEFITS = [
  "Adaptable para instituciones académicas, empresas, emprendedores y docentes",
  "Distribución digital simplificada: comparte por link o email",
  "Personalización total: colores, logo e identidad visual propios",
  "Proceso seguro y confiable desde la emisión hasta la verificación",
  "Certificados con validez institucional real",
];

export default function CertPage() {
  const { openDemo } = useDemo();
  return (
    <div style={{ fontFamily: "IBM Plex Sans, sans-serif" }}>
      {/* Minimal top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 h-14 flex items-center justify-between px-6" data-testid="product-topbar">
        <Link to="/" className="flex items-center gap-0.5 font-bold text-xl" data-testid="product-logo">
          <span style={{ background: "linear-gradient(135deg, #fc5e5f, #e8902f, #009ee7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "Outfit, sans-serif" }}>N</span>
          <span style={{ color: "#003b72", fontFamily: "Outfit, sans-serif" }}>omed</span>
        </Link>
        <Link to="/productos" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#003b72] transition-colors" data-testid="product-back-btn">
          <ArrowLeft size={15} /> Volver a Productos
        </Link>
      </div>

      {/* Hero */}
      <section className="pt-28 pb-16 bg-white" data-testid="cert-hero">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold mb-8" style={{ background: BG, color: COLOR }}>
            <Award size={20} /> Cert
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#003b72] leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
            Logros auténticos, insignias y certificados <span style={{ color: COLOR }}>al instante</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
            Plataforma integral de certificación digital para generar diplomas e insignias con validez institucional. Para instituciones, empresas, emprendedores y docentes que quieren reconocer logros de manera profesional y segura.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={openDemo} className="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-full font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg" style={{ background: COLOR, boxShadow: `0 8px 24px ${COLOR}35` }} data-testid="cert-contact-btn">
              Solicitar demo <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#003b72] mb-10" style={{ fontFamily: "Outfit, sans-serif" }}>Funcionalidades de Cert</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm" data-testid={`cert-feature-${f.title.substring(0,5)}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: BG, color: COLOR }}>{f.icon}</div>
                <h3 className="font-bold text-[#003b72] text-base mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#003b72] mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>¿Para quién es Cert?</h2>
          <ul className="flex flex-col gap-4">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-gray-700">
                <CheckCircle size={20} style={{ color: COLOR, marginTop: "2px" }} className="shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: COLOR }} data-testid="cert-cta">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>¿Listo para emitir certificados profesionales?</h2>
          <p className="text-white/80 mb-7 text-lg">Hablemos sobre tus necesidades y te mostramos cómo Cert puede ayudarte.</p>
          <button onClick={openDemo} className="px-8 py-4 bg-white rounded-full font-semibold hover:bg-gray-100 transition-all hover:-translate-y-0.5 shadow-lg" style={{ color: COLOR }} data-testid="cert-cta-btn">
            Hablar con el equipo
          </button>
        </div>
      </section>
    </div>
  );
}
