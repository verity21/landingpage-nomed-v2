// @ts-nocheck
import { useDemo } from "@/contexts/DemoContext";
import { Heart, Globe, BookOpen, Users, Laptop, Building2, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const PROGRAMS = [
  { icon: <Laptop size={22} />, title: "Educación Digital", color: "#009ee7", desc: "Implementan soluciones tecnológicas para mejorar el acceso a educación de calidad en comunidades vulnerables de Perú." },
  { icon: <Users size={22} />, title: "Capacitación Docente", color: "#fc5e5f", desc: "Forman educadores con las herramientas del siglo XXI, empoderandolos para liderar el cambio en sus aulas." },
  { icon: <Building2 size={22} />, title: "Infraestructura Educativa", color: "#e8902f", desc: "Desarrollan espacios de aprendizaje modernos y equipados para comunidades sin acceso a tecnología." },
];

const SUPPORT = [
  { icon: <Laptop size={20} />, title: "Soporte tecnológico", desc: "Nomed brinda asesoría técnica y desarrollo de herramientas digitales para potenciar los programas de CREAD." },
  { icon: <BookOpen size={20} />, title: "Soluciones educativas", desc: "Ponemos a disposición de CREAD nuestras plataformas EdTech para facilitar el acceso a educación digital de calidad." },
  { icon: <Heart size={20} />, title: "Compromiso social", desc: "Destinamos parte de nuestros recursos a financiar y escalar el impacto de CREAD en las comunidades que más lo necesitan." },
];

export default function ResponsabilidadSocialPage() {
  const { openDemo } = useDemo();

  return (
    <>
      {/* Hero */}
      <motion.section
        className="pt-28 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #003b72 0%, #005c8a 50%, #00a66d 100%)" }}
        initial="hidden" animate="visible" variants={stagger}
        data-testid="rsc-hero"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 80% at 80% 50%, #00e5a0, transparent)" }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20">
              <Heart size={20} className="text-white" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-widest text-white/70">Responsabilidad Social</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
            Tecnología con <br /><span className="text-green-300">propósito social</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
            Nomed colabora con <strong className="text-white">CREAD</strong>, ONG peruana líder en educación digital, para transformar vidas en comunidades vulnerables de Latinoamérica a través de la tecnología.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <a href="https://cread.org.pe/" target="_blank" rel="noopener noreferrer"
              className="btn-aurora inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#003b72] rounded-full font-semibold hover:opacity-90 transition-all"
              data-testid="rsc-visit-cread">
              Visitar CREAD <ExternalLink size={15} />
            </a>
            <button onClick={openDemo}
              className="btn-aurora px-7 py-3.5 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#003b72] transition-all"
              data-testid="rsc-contact-btn">
              Contáctanos
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* About CREAD */}
      <motion.section className="py-20 bg-white"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp}>
              <p className="text-xs uppercase tracking-[0.2em] text-[#00a66d] font-medium mb-3">Quiénes son</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#003b72] mb-5 leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
                ¿Qué es CREAD?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                <strong>CREAD</strong> es una ONG peruana líder en educación digital que impulsa el desarrollo educativo a través de la innovación y la tecnología. Su misión es transformar la educación en el Perú, brindando acceso a herramientas digitales a comunidades que normalmente no tendrían esta oportunidad.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                A través de sus programas, CREAD conecta a docentes, estudiantes e infraestructuras educativas con el mundo digital, cerrando la brecha tecnológica en las regiones más desconectadas del país.
              </p>
              <a href="https://cread.org.pe/" target="_blank" rel="noopener noreferrer"
                className="btn-aurora inline-flex items-center gap-2 px-6 py-3 border-2 border-[#003b72] text-[#003b72] rounded-full font-semibold text-sm hover:bg-[#003b72] hover:text-white transition-all">
                Conoce más sobre CREAD <ArrowRight size={15} />
              </a>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {[
                { n: "3", label: "programas activos", color: "#009ee7" },
                { n: "Perú", label: "foco de impacto", color: "#fc5e5f" },
                { n: "∞", label: "compromiso", color: "#e8902f" },
                { n: "2024+", label: "alianza con Nomed", color: "#00a66d" },
              ].map((stat) => (
                <div key={stat.label} className="card-lift bg-gray-50 rounded-2xl p-6 text-center border border-gray-100" data-testid={`rsc-stat-${stat.label.substring(0,5)}`}>
                  <div className="text-4xl font-bold mb-1" style={{ fontFamily: "Outfit, sans-serif", color: stat.color }}>{stat.n}</div>
                  <div className="text-gray-500 text-sm capitalize">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CREAD Programs */}
      <motion.section className="py-20 bg-gray-50"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#00a66d] font-medium mb-3">Lo que hacen</p>
            <h2 className="text-4xl font-bold text-[#003b72]" style={{ fontFamily: "Outfit, sans-serif" }}>Programas de CREAD</h2>
          </motion.div>
          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
            {PROGRAMS.map((p) => (
              <motion.div key={p.title} variants={fadeUp}
                className="card-lift bg-white rounded-2xl p-7 border border-gray-100 shadow-sm" data-testid={`rsc-program-${p.title.substring(0,5)}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${p.color}15`, color: p.color }}>{p.icon}</div>
                <h3 className="font-bold text-[#003b72] text-xl mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* How Nomed supports CREAD */}
      <motion.section className="py-20 bg-white"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#fc5e5f] font-medium mb-3">Nuestro aporte</p>
            <h2 className="text-4xl font-bold text-[#003b72]" style={{ fontFamily: "Outfit, sans-serif" }}>Cómo apoya Nomed a CREAD</h2>
          </motion.div>
          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
            {SUPPORT.map((s) => (
              <motion.div key={s.title} variants={fadeUp}
                className="card-lift flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[#003b72]/10 text-[#003b72]">{s.icon}</div>
                <div>
                  <h3 className="font-bold text-[#003b72] text-base mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section className="py-16 text-center"
        style={{ background: "linear-gradient(135deg, #003b72, #00a66d)" }}
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        data-testid="rsc-cta">
        <div className="max-w-5xl mx-auto px-6">
          <Globe size={40} className="text-white/60 mx-auto mb-5" />
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
            Juntos, tecnología que transforma vidas
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Si quieres saber más sobre nuestra iniciativa social o unirte como aliado, contáctate con el equipo de Nomed.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://cread.org.pe/" target="_blank" rel="noopener noreferrer"
              className="btn-aurora inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#003b72] rounded-full font-semibold hover:bg-gray-100 transition-all"
              data-testid="rsc-cta-cread">
              Visitar CREAD <ExternalLink size={15} />
            </a>
            <button onClick={openDemo}
              className="btn-aurora px-7 py-3.5 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#003b72] transition-all"
              data-testid="rsc-cta-contact">
              Contáctanos
            </button>
          </div>
        </div>
      </motion.section>
    </>
  );
}
