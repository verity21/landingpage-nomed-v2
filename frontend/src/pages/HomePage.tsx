// @ts-nocheck
import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { motion, AnimatePresence } from "framer-motion";
import lottie from "lottie-web";
import ProductQuiz from "@/components/ProductQuiz";
import { AuroraText } from "@/registry/magicui/aurora-text";
import axios from "axios";
import {
  BrainCircuit, Package, GraduationCap, ArrowRight, Sparkles,
  CheckCircle, Target, Eye, Search, Layout, Code, Headphones,
  Bot, Award, PenSquare, BookOpen, Calculator, Trophy,
  Zap, Link2, Smartphone, BarChart3, TrendingUp, Layers, Plug,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const API = `/api`;

const ROCKET_VIEWBOX = { width: 360, height: 560 };
const ROCKET_PATH_D = "M 10 520 C 80 440, 120 350, 150 270 S 200 140, 252 30";
const ROCKET_DURATION = 4000;
const ROCKET_SIZE = 80;
const ROCKET_LOCAL_PATH = new URL("../../media/ejemplouykgk.json", import.meta.url).href;

const ROCKET_MILESTONES = [
  {
    t: 0.15,
    label: "EL DESPEGUE",
    word: "Sueña",
    desc: "Visualiza el futuro que quieres construir.",
    color: "#E8A54B",
  },
  {
    t: 0.5,
    label: "EL CAMINO",
    word: "Aprende",
    desc: "Convierte curiosidad en conocimiento aplicable.",
    color: "#378ADD",
  },
  {
    t: 0.88,
    label: "LA META",
    word: "Hazlo realidad",
    desc: "Lleva tus ideas a resultados concretos.",
    color: "#1D9E75",
  },
];

const SPARKLE_COLORS = ["#E8A54B", "#378ADD", "#1D9E75", "#DDE1E8"];
const TRAIL_COLORS = ["#E8A54B", "#378ADD", "#1D9E75"];

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function RocketJourney() {
  const containerRef = useRef(null);
  const svgPathRef = useRef(null);
  const trailPathRef = useRef(null);
  const rocketRef = useRef(null);
  const lottieRef = useRef(null);
  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const replayTimerRef = useRef(0);
  const lottieInstanceRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [clock, setClock] = useState(0);
  const [showReplay, setShowReplay] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 360, height: 440 });
  const [particles, setParticles] = useState([]);

  const sparkles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const seed = i * 37.17;
        return {
          id: i,
          left: 6 + ((Math.sin(seed) + 1) * 0.5) * 88,
          top: 4 + ((Math.cos(seed * 0.7) + 1) * 0.5) * 90,
          size: 2 + (i % 3),
          color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
          delay: -((i * 0.31) % 2.5),
          duration: 2.2 + ((i * 0.41) % 2.8),
        };
      }),
    []
  );

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const getPointOnPath = (t) => {
    const pathEl = svgPathRef.current;
    const host = containerRef.current;
    if (!pathEl || !host) {
      return { x: 0, y: 0 };
    }

    const totalLen = pathEl.getTotalLength();
    const pt = pathEl.getPointAtLength(clamp(t, 0, 1) * totalLen);
    const rect = host.getBoundingClientRect();

    return {
      x: (pt.x / ROCKET_VIEWBOX.width) * rect.width,
      y: (pt.y / ROCKET_VIEWBOX.height) * rect.height,
    };
  };

  const updateTrail = (t) => {
    const pathEl = svgPathRef.current;
    const trailEl = trailPathRef.current;
    if (!pathEl || !trailEl) {
      return;
    }
    const totalLen = pathEl.getTotalLength();
    trailEl.style.strokeDasharray = `${t * totalLen} ${totalLen}`;
  };

  const updateRocketTransform = (t) => {
    const rocketEl = rocketRef.current;
    if (!rocketEl) {
      return;
    }

    const ptCurrent = getPointOnPath(t);
    const ptNext = getPointOnPath(Math.min(t + 0.01, 1));
    const angle = (Math.atan2(ptNext.y - ptCurrent.y, ptNext.x - ptCurrent.x) * 180) / Math.PI;

    // The lottie rocket base orientation is vertical, so we offset +90deg
    // to match the tangent direction of the ascending path.
    rocketEl.style.transform = `translate(${ptCurrent.x - ROCKET_SIZE / 2}px, ${ptCurrent.y - ROCKET_SIZE / 2}px) rotate(${angle + 90}deg)`;
  };

  const emitParticle = (t, now) => {
    const phaseColor = t < 0.33 ? TRAIL_COLORS[0] : t < 0.66 ? TRAIL_COLORS[1] : TRAIL_COLORS[2];
    const point = getPointOnPath(t);
    const id = now + Math.random();

    setParticles((prev) => {
      const next = [
        ...prev,
        {
          id,
          x: point.x - 6 + Math.random() * 12,
          y: point.y - 6 + Math.random() * 12,
          color: phaseColor,
          bornAt: now,
          duration: 520 + Math.random() * 280,
          size: 3 + Math.random() * 3,
        },
      ];

      return next.slice(-55);
    });
  };

  const runRocketJourney = () => {
    const host = containerRef.current;
    if (!host || runningRef.current) {
      return;
    }

    runningRef.current = true;
    setShowReplay(false);
    setParticles([]);
    setProgress(0);
    updateRocketTransform(0);
    updateTrail(0);

    const startedAt = performance.now();

    const frame = (now) => {
      const elapsed = now - startedAt;
      const delayed = elapsed - 400;
      if (delayed < 0) {
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      const tRaw = clamp(delayed / ROCKET_DURATION, 0, 1);
      const eased = easeInOut(tRaw);

      setClock(now);
      setProgress(eased);
      updateRocketTransform(eased);
      updateTrail(eased);
      emitParticle(eased, now);

      setParticles((prev) => prev.filter((p) => now - p.bornAt < p.duration));

      if (tRaw < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        runningRef.current = false;
        replayTimerRef.current = window.setTimeout(() => {
          setShowReplay(true);
        }, 500);
      }
    };

    rafRef.current = requestAnimationFrame(frame);
  };

  const handleReplay = () => {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(replayTimerRef.current);
    runRocketJourney();
  };

  useEffect(() => {
    if (!lottieRef.current || lottieInstanceRef.current) {
      return;
    }

    lottieInstanceRef.current = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: ROCKET_LOCAL_PATH,
    });

    return () => {
      if (lottieInstanceRef.current) {
        lottieInstanceRef.current.destroy();
        lottieInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            runRocketJourney();
          }
        });
      },
      { threshold: [0, 0.3, 1] }
    );

    observer.observe(host);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) {
      return;
    }

    const updateSize = () => {
      const rect = host.getBoundingClientRect();
      setContainerSize({ width: rect.width || 360, height: rect.height || 440 });
      updateRocketTransform(progress);
      updateTrail(progress);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(host);

    return () => {
      observer.disconnect();
    };
  }, [progress]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(replayTimerRef.current);
    };
  }, []);

  const milestoneDots = ROCKET_MILESTONES.map((m) => ({ ...m, point: getPointOnPath(m.t) }));

  return (
    <div ref={containerRef} className="relative w-full h-[500px] overflow-hidden" style={{ isolation: "isolate" }}>
      <svg
        className="absolute inset-0 pointer-events-none"
        viewBox={`0 0 ${ROCKET_VIEWBOX.width} ${ROCKET_VIEWBOX.height}`}
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="nomedJourneyGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8A54B" />
            <stop offset="48%" stopColor="#378ADD" />
            <stop offset="100%" stopColor="#1D9E75" />
          </linearGradient>
        </defs>
        <path
          ref={svgPathRef}
          d={ROCKET_PATH_D}
          fill="none"
          stroke="#E8EDF2"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <path
          ref={trailPathRef}
          d={ROCKET_PATH_D}
          fill="none"
          stroke="url(#nomedJourneyGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0 9999"
          style={{ filter: "drop-shadow(0 0 4px rgba(55,138,221,0.35))" }}
        />
      </svg>

      {sparkles.map((s) => (
        <span
          key={s.id}
          className="rocket-sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            opacity: 0.35,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {particles.map((p) => {
        const life = clamp((clock - p.bornAt) / p.duration, 0, 1);
        return (
          <span
            key={p.id}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: "999px",
              pointerEvents: "none",
              background: p.color,
              opacity: (1 - life) * 0.46,
              transform: `scale(${1 + life * 0.8})`,
              filter: "blur(0.25px)",
            }}
          />
        );
      })}

      <div
        ref={rocketRef}
        style={{
          position: "absolute",
          width: ROCKET_SIZE,
          height: ROCKET_SIZE,
          left: 0,
          top: 0,
          transformOrigin: "50% 50%",
          pointerEvents: "none",
          zIndex: 4,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "999px",
            background: "radial-gradient(circle, rgba(55,138,221,0.26) 0%, rgba(55,138,221,0) 72%)",
            transform: "scale(1.28)",
            filter: "blur(4px)",
          }}
        />
        <div ref={lottieRef} style={{ width: "100%", height: "100%" }} />
      </div>

      {milestoneDots.map((m, i) => {
        const isVisible = progress >= m.t - 0.03;
        const dotX = m.point.x;
        const dotY = m.point.y;

        const phraseX = i === 2 ? dotX + 24 : dotX + 58;
        const phraseY = dotY - 10;
        const safeX = clamp(phraseX, 10, containerSize.width - 220);
        const safeY = clamp(phraseY, 10, containerSize.height - 110);
        const imageX = dotX - 28 - 60;
        const imageY = dotY - 30;

        return (
          <div key={m.word}>
            <div
              id={`img${i + 1}`}
              className="milestone-image"
              style={{
                position: "absolute",
                left: imageX,
                top: imageY,
                width: 60,
                height: 60,
                borderRadius: "50%",
                border: `2px solid ${m.color}`,
                background: `${m.color}14`,
                zIndex: 6,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1)" : "scale(0)",
                transition: "all 0.4s ease",
                pointerEvents: "none",
              }}
            />

            <span
              style={{
                position: "absolute",
                left: dotX - 7,
                top: dotY - 7,
                width: 14,
                height: 14,
                borderRadius: "999px",
                background: m.color,
                zIndex: 3,
                boxShadow: `0 0 0 6px ${m.color}33`,
              }}
            />
            <span
              className="rocket-milestone-ring"
              style={{
                left: dotX - 12,
                top: dotY - 12,
                borderColor: `${m.color}66`,
                opacity: isVisible ? 1 : 0,
              }}
            />

            <div
              style={{
                position: "absolute",
                left: safeX,
                top: safeY,
                maxWidth: 200,
                zIndex: 5,
                pointerEvents: "none",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0px)" : "translateY(12px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <div style={{ fontSize: 11, letterSpacing: "2px", fontWeight: 700, color: m.color, textTransform: "uppercase" }}>
                {m.label}
              </div>
              <div style={{ fontSize: 36, lineHeight: 1, letterSpacing: "-0.5px", fontWeight: 800, color: m.color, fontFamily: "Outfit, sans-serif", marginTop: 3 }}>
                {m.word}
              </div>
              <div style={{ fontSize: 13, color: "#6B7B8D", marginTop: 6, maxWidth: 200, lineHeight: 1.35 }}>
                {m.desc}
              </div>
            </div>
          </div>
        );
      })}

      {showReplay && (
        <button
          type="button"
          onClick={handleReplay}
          style={{
            position: "absolute",
            right: 8,
            bottom: 8,
            border: "1px solid #d7dee7",
            borderRadius: 16,
            padding: "6px 10px",
            fontSize: 11,
            color: "#35506e",
            background: "rgba(255,255,255,0.76)",
            backdropFilter: "blur(4px)",
            zIndex: 6,
          }}
        >
          ↻ Repetir
        </button>
      )}
    </div>
  );
}

/* ---- HERO IMAGE WITH THOUGHT BUBBLE ---- */
const HERO_IMAGE_PATH = new URL("../../media/Untitled design.png", import.meta.url).href;

const BUBBLE_PHRASES = [
  { text: "Sueña", color: "#E8A54B" },
  { text: "Aprende", color: "#378ADD" },
  { text: "Hazlo realidad", color: "#1D9E75" },
];

function HeroImageWithBubble() {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % BUBBLE_PHRASES.length);
      setAnimKey((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = BUBBLE_PHRASES[index];
  const words = current.text.split(" ");

  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      {/* Thought bubble — top-right of image */}
      <div className="absolute z-10" style={{ top: -46, right: 14, width: 210, height: 135 }}>
        {/* SVG cloud shape */}
        <svg
          viewBox="0 0 210 135"
          className="absolute inset-0 w-full h-full"
          style={{ filter: "drop-shadow(0 6px 18px rgba(0,59,114,0.13))" }}
        >
          <defs>
            <linearGradient id="bubbleGradHero" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f4f8fd" />
            </linearGradient>
            <filter id="bubbleInnerGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Cloud body — bumpy cloud path */}
          <path
            d="M 22 82
               C 8 82 4 70 4 62
               C 4 52 10 46 20 44
               C 16 35 20 27 28 22
               C 34 14 46 12 58 16
               C 62 7 72 2 84 4
               C 96 2 106 8 110 18
               C 118 10 130 6 142 8
               C 158 8 168 18 170 32
               C 180 32 190 40 192 52
               C 198 56 200 64 198 72
               C 196 82 188 88 178 88
               L 36 88
               C 28 88 22 86 22 82 Z"
            fill="url(#bubbleGradHero)"
            stroke="#dde4ef"
            strokeWidth="1.5"
          />

          {/* Colored accent bar at bottom edge of cloud */}
          <motion.line
            x1="36" y1="86" x2="178" y2="86"
            stroke={current.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.5"
            key={`line-${index}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Corner sparkle dots */}
          <circle cx="50" cy="18" r="2.5" fill={current.color} opacity="0.35" />
          <circle cx="160" cy="22" r="2" fill={current.color} opacity="0.25" />
          <circle cx="170" cy="60" r="1.5" fill={current.color} opacity="0.2" />

          {/* Tail bubbles */}
          <circle cx="52" cy="100" r="7.5" fill="url(#bubbleGradHero)" stroke="#dde4ef" strokeWidth="1.5" />
          <circle cx="42" cy="113" r="5" fill="url(#bubbleGradHero)" stroke="#dde4ef" strokeWidth="1.5" />
          <circle cx="34" cy="123" r="3.5" fill="url(#bubbleGradHero)" stroke="#dde4ef" strokeWidth="1.5" />
          <circle cx="27" cy="130" r="2.5" fill="url(#bubbleGradHero)" stroke="#dde4ef" strokeWidth="1.5" />
        </svg>

        {/* Animated text inside cloud */}
        <div
          className="absolute flex items-center justify-center"
          style={{ top: 8, left: 10, right: 10, bottom: 36 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={animKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.18 } }}
              className="flex flex-wrap gap-x-2 justify-center items-center"
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 18, scale: 0.85, filter: "blur(4px)" }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: {
                      delay: i * 0.22,
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    },
                  }}
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 800,
                    fontSize: words.length === 1 ? 30 : 23,
                    color: current.color,
                    letterSpacing: "-0.4px",
                    lineHeight: 1.1,
                    textShadow: `0 2px 12px ${current.color}30`,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phrase indicator dots */}
        <div className="absolute flex gap-1 justify-center" style={{ bottom: 4, left: 0, right: 0 }}>
          {BUBBLE_PHRASES.map((p, i) => (
            <motion.span
              key={i}
              animate={{ scale: i === index ? 1.3 : 1, opacity: i === index ? 1 : 0.35 }}
              transition={{ duration: 0.25 }}
              style={{
                width: 6,
                height: 6,
                borderRadius: "999px",
                background: p.color,
                display: "inline-block",
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero image */}
      <img
        src={HERO_IMAGE_PATH}
        alt="Equipo Nomed"
        className="w-full object-contain"
        style={{ borderRadius: "1.5rem", marginBottom: -6 }}
        draggable={false}
      />
    </div>
  );
}

/* ---- HERO ---- */
function HeroSection({ openDemo }) {
  return (
    <section className="pt-28 pb-20 bg-white overflow-hidden relative" id="inicio">
      <div className="absolute top-0 right-0 w-2/3 h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.04]" style={{ background: "radial-gradient(ellipse 80% 80% at 100% 10%, #009ee7, transparent)" }} />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-[0.06]" style={{ background: "#fc5e5f", filter: "blur(60px)" }} />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-left">

            <motion.h1 variants={fadeUp} className="text-5xl lg:text-6xl font-bold text-[#003b72] leading-tight mb-6 text-left" style={{ fontFamily: "Outfit, sans-serif" }}>
              Construimos tecnología con <AuroraText>inteligencia artificial</AuroraText> para empresas y educación
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl text-left">
              Software a medida, productos corporativos con IA y EdTech. Transformación real en Latinoamérica.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10 justify-start">
              <button onClick={openDemo} className="hero-cta-btn hero-cta-btn-primary" data-testid="hero-contact-btn">
                <span className="hero-cta-btn-label">Contáctanos</span>
                <span className="hero-cta-btn-icon"><ArrowRight size={15} /></span>
              </button>
              <button onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })} className="hero-cta-btn hero-cta-btn-ghost" data-testid="hero-services-btn">
                <span className="hero-cta-btn-label">Ver servicios</span>
                <span className="hero-cta-btn-icon"><ArrowRight size={15} /></span>
              </button>
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-3 text-sm text-gray-400 flex-wrap justify-start">
              <span>Presencia en</span>
              {[
                { country: "Chile", flagSrc: "https://flagcdn.com/w40/cl.png" },
                { country: "México", flagSrc: "https://flagcdn.com/w40/mx.png" },
                { country: "Perú", flagSrc: "https://flagcdn.com/w40/pe.png" },
                { country: "Argentina", flagSrc: "https://flagcdn.com/w40/ar.png" },
              ].map((c) => (
                <span key={c.country} className="flex items-center gap-1 text-[#003b72] font-medium">
                  <img src={c.flagSrc} alt={`Bandera de ${c.country}`} className="w-4 h-4 rounded-sm object-cover" loading="lazy" /> {c.country}
                </span>
              ))}
            </motion.div>
          </motion.div>
          {/* Hero image with animated thought bubble */}
          <div className="hidden lg:flex justify-center items-end self-stretch">
            <div className="w-full max-w-lg h-full flex items-end">
              <HeroImageWithBubble />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- PARTNERS ---- */
const PARTNERS = ["SPDA", "DICAPI", "Estudiantes Digitales", "SPDA", "DICAPI", "Estudiantes Digitales"];
function PartnersSection() {
  return (
    <section className="py-10 bg-gray-50 border-y border-gray-100" data-testid="partners-section">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-6">Partners</p>
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span key={i} className="text-lg font-bold text-gray-300 uppercase tracking-widest mx-12 whitespace-nowrap hover:text-[#003b72] transition-colors" style={{ fontFamily: "IBM Plex Mono, monospace" }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- NOSOTROS ---- */
const PROCESO = [
  { num: "01", icon: <Search size={18} />, title: "Entendemos el problema", desc: "Nos sumergimos en tu negocio para entender el desafío real antes de proponer cualquier solución." },
  { num: "02", icon: <Layout size={18} />, title: "Definimos la solución", desc: "Co-diseñamos contigo la arquitectura, tecnología y roadmap exactos para tu necesidad." },
  { num: "03", icon: <Code size={18} />, title: "Desarrollamos con agilidad", desc: "Iteraciones rápidas, entregas frecuentes y total transparencia durante todo el proceso." },
  { num: "04", icon: <Headphones size={18} />, title: "Acompañamos el crecimiento", desc: "Soporte, mejoras y escalabilidad continua. No terminamos en la entrega, crecemos contigo." },
];

function NosotrosSection() {
  return (
    <section className="py-20 bg-white" id="nosotros">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#003b72] mb-4 leading-tight text-center" style={{ fontFamily: "Outfit, sans-serif" }}>
            Nosotros
          </h2>
          <p className="text-2xl lg:text-3xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Empresa especializada en desarrollo de software a medida
          </p>
          <p className="text-xl lg:text-3xl font-semibold gradient-text mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
            IA Powered
          </p>
          <p className="text-gray-500 text-base leading-relaxed max-w-3xl mx-auto mt-3">
            Resolvemos problemas de forma innovadora. Equipos especializados, entregas ágiles y total transparencia en cada etapa del proyecto.
          </p>
        </div>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <div className="bg-[#f8fafc] rounded-2xl p-7 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#fc5e5f]/10 flex items-center justify-center"><Target size={17} color="#fc5e5f" /></div>
              <h3 className="font-bold text-[#003b72] text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>Misión</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">Mejorar la calidad educativa y el desarrollo empresarial mediante tecnología de IA, creando soluciones accesibles que transformen organizaciones en Latinoamérica.</p>
          </div>
          <div className="bg-[#003b72]/3 rounded-2xl p-7 border border-[#003b72]/8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#009ee7]/10 flex items-center justify-center"><Eye size={17} color="#009ee7" /></div>
              <h3 className="font-bold text-[#003b72] text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>Visión</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">Ser el principal partner tecnológico en IA para empresas y organizaciones en Latinoamérica, liderando la transformación digital con soluciones de impacto real.</p>
          </div>
        </div>

        {/* Presence with flags */}
        <div className="bg-[#003b72] text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-5 mb-14">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Presencia regional</p>
            <h3 className="text-xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>4 países, 1 visión</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {[{ country: "Chile", flagSrc: "https://flagcdn.com/w40/cl.png", note: "Sede central" }, { country: "México", flagSrc: "https://flagcdn.com/w40/mx.png" }, { country: "Perú", flagSrc: "https://flagcdn.com/w40/pe.png" }, { country: "Argentina", flagSrc: "https://flagcdn.com/w40/ar.png" }].map((c) => (
              <div key={c.country} className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5">
                <img src={c.flagSrc} alt={`Bandera de ${c.country}`} className="w-5 h-5 rounded-sm object-cover" loading="lazy" />
                <span className="font-medium text-sm">{c.country}</span>
                {c.note && <span className="text-xs text-white/50">{c.note}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#003b72] text-center" style={{ fontFamily: "Outfit, sans-serif" }}>¿Cómo trabajamos?</h2>
        </div>

        {/* Desktop timeline */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute h-0.5 bg-gradient-to-r from-[#fc5e5f] via-[#009ee7] to-[#e8902f] top-5 z-0" style={{ left: "12.5%", right: "12.5%" }} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4">
            {PROCESO.map((step, idx) => (
              <div key={step.num} className="flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0 relative">
                {/* Mobile vertical connector */}
                {idx < PROCESO.length - 1 && (
                  <div className="lg:hidden absolute left-5 w-0.5 bg-gray-200 z-0" style={{ top: "42px", height: "calc(100% + 24px)" }} />
                )}
                {/* Number circle */}
                <div className="w-10 h-10 rounded-full bg-[#003b72] text-white flex items-center justify-center font-bold text-sm z-10 relative shrink-0 lg:mb-5 shadow-lg shadow-[#003b72]/20">
                  {idx + 1}
                </div>
                <div className="lg:text-center pb-4 lg:pb-0 lg:px-2">
                  <div className="flex lg:justify-center mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#009ee7]/10 flex items-center justify-center text-[#009ee7]">{step.icon}</div>
                  </div>
                  <h4 className="font-bold text-[#003b72] mb-1 text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>{step.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/equipo" className="inline-flex items-center gap-2 px-8 py-4 bg-[#003b72] text-white rounded-full font-semibold text-base hover:bg-[#002a55] transition-all hover:-translate-y-0.5 shadow-md shadow-[#003b72]/20" data-testid="equipo-link">
            Conoce a nuestro equipo <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---- SERVICIOS ---- */
const SERVICIOS_CAPS = [
  { icon: <BrainCircuit size={16} />, label: "IA Aplicada" },
  { icon: <Zap size={16} />, label: "Automatización" },
  { icon: <Link2 size={16} />, label: "Integraciones" },
  { icon: <Smartphone size={16} />, label: "Web & Mobile" },
  { icon: <BarChart3 size={16} />, label: "Data & Analytics" },
  { icon: <TrendingUp size={16} />, label: "Transformación Digital" },
];
const SERVICE_CARDS = [
  { icon: <BrainCircuit size={28} />, color: "#003b72", bg: "#003b7210", label: "IA", sub: "Integrada en todo" },
  { icon: <Layers size={28} />, color: "#fc5e5f", bg: "#fc5e5f10", label: "Agile", sub: "Metodología ágil" },
  { icon: <Plug size={28} />, color: "#e8902f", bg: "#e8902f10", label: "APIs", sub: "Integraciones" },
  { icon: <BarChart3 size={28} />, color: "#009ee7", bg: "#009ee710", label: "Data", sub: "Analytics" },
];
function ServiciosSection({ openDemo }) {
  return (
    <section className="py-20 bg-white" id="servicios">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="grid lg:grid-cols-2 gap-14 items-center"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          {/* Left column */}
          <div>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-widest bg-[#009ee7]/10 text-[#009ee7] px-4 py-2 rounded-full mb-5">Servicios</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-[#003b72] mb-3 leading-tight text-center" style={{ fontFamily: "Outfit, sans-serif" }}>
              Desarrollo de software a medida
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg font-semibold text-[#fc5e5f] mb-4">IA Powered</motion.p>
            <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-8">
              Nos apasiona resolver problemas de forma innovadora. Trabajamos con agilidad y equipos especializados para garantizar el avance sin contratiempos de tu proyecto tecnológico.
            </motion.p>
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
              {SERVICIOS_CAPS.map((cap) => (
                <div key={cap.label} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <span className="text-[#003b72]">{cap.icon}</span>
                  <span>{cap.label}</span>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp}>
              <button onClick={openDemo} className="btn-aurora inline-flex items-center gap-2 px-7 py-3.5 bg-[#003b72] text-white rounded-full font-semibold shadow-lg shadow-[#003b72]/20" data-testid="servicios-contact-btn">
                Contáctanos <ArrowRight size={15} />
              </button>
            </motion.div>
          </div>
          {/* Right column — 2x2 cards */}
          <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
            {SERVICE_CARDS.map((card) => (
              <motion.div key={card.label} variants={fadeUp}
                className="card-lift bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all" data-testid={`service-card-${card.label.toLowerCase()}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: card.bg, color: card.color }}>
                  {card.icon}
                </div>
                <h4 className="font-bold text-[#003b72] text-xl mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{card.label}</h4>
                <p className="text-gray-400 text-sm">{card.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- PRODUCTOS ---- */
const CORP_PRODUCTS = [
  { id: "botbee", icon: <Bot size={22} />, color: "#fc5e5f", bg: "#fc5e5f12", name: "Botbee", tagline: "El experto de tu empresa, disponible 24/7.", desc: "Asistente virtual inteligente entrenado con la información de tu negocio.", href: "/productos/botbee" },
  { id: "cert", icon: <Award size={22} />, color: "#009ee7", bg: "#009ee712", name: "Cert", tagline: "Certificados e insignias al instante.", desc: "Plataforma de certificación digital con validez institucional.", href: "/productos/cert" },
  { id: "blog", icon: <PenSquare size={22} />, color: "#e8902f", bg: "#e8902f12", name: "Blog IA", tagline: "Tu voz experta, impulsada por IA.", desc: "Convierte tus ideas en artículos profesionales para web y redes.", href: "/productos/blog-ia" },
];
const ED_PRODUCTS = [
  { id: "ed-master", icon: <Trophy size={22} />, color: "#FF7878", bg: "#FF787812", name: "ED Master", tagline: "Entrena y llega preparado a tu examen.", desc: "Plataforma de entrenamiento con bancos de preguntas y simulaciones.", href: "/estudiantes-digitales/ed-master" },
  { id: "ed-teach", icon: <BookOpen size={22} />, color: "#65B4B8", bg: "#65B4B812", name: "ED Teach", tagline: "Crea materiales didácticos en segundos.", desc: "Genera recursos educativos con IA para docentes.", href: "/estudiantes-digitales/ed-teach" },
  { id: "ed-math", icon: <Calculator size={22} />, color: "#2B7F87", bg: "#2B7F8712", name: "ED Math", tagline: "Domina las matemáticas paso a paso.", desc: "LMS especializado en matemáticas con seguimiento en tiempo real.", href: "/estudiantes-digitales/ed-math" },
];

function ProductCard({ product }) {
  return (
    <a href={product.href} className="card-lift bg-white border border-gray-100 rounded-2xl p-6 group block" data-testid={`product-card-${product.id}`}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: product.bg, color: product.color }}>{product.icon}</div>
      <h4 className="font-bold text-[#003b72] text-lg mb-1 group-hover:text-[#009ee7] transition-colors" style={{ fontFamily: "Outfit, sans-serif" }}>{product.name}</h4>
      <p className="text-xs font-medium mb-2" style={{ color: product.color }}>{product.tagline}</p>
      <p className="text-gray-500 text-sm leading-relaxed">{product.desc}</p>
      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-gray-400 group-hover:text-[#009ee7] group-hover:gap-2.5 transition-all">
        Ver más <ArrowRight size={12} />
      </div>
    </a>
  );
}

function ProductosSection() {
  const [tab, setTab] = useState("corp");
  return (
    <section className="py-20 bg-gray-50" id="productos">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
          <div>
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-[#fc5e5f] font-medium mb-3">Nuestros productos</motion.p>
            <motion.h2 variants={fadeUp} className="text-5xl font-bold text-[#003b72] text-center" style={{ fontFamily: "Outfit, sans-serif" }}>Herramientas listas para usar</motion.h2>
          </div>
          <motion.div variants={fadeUp} className="flex gap-2 bg-white border border-gray-200 rounded-full p-1">
            <button onClick={() => setTab("corp")} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${tab === "corp" ? "bg-[#003b72] text-white" : "text-gray-500 hover:text-[#003b72]"}`} data-testid="tab-corporativos">Corporativos</button>
            <button onClick={() => setTab("ed")} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${tab === "ed" ? "bg-[#2B7F87] text-white" : "text-gray-500 hover:text-[#2B7F87]"}`} data-testid="tab-estudiantes">Estudiantes Digitales</button>
          </motion.div>
        </motion.div>
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid={tab === "corp" ? "corp-products-grid" : "ed-products-grid"}>
          {(tab === "corp" ? CORP_PRODUCTS : ED_PRODUCTS).map((p) => <ProductCard key={p.id} product={p} />)}
        </motion.div>
        <div className="mt-8 text-center">
          <a href={tab === "corp" ? "/productos" : "/estudiantes-digitales"} className="inline-flex items-center gap-2 text-[#009ee7] font-medium text-sm hover:gap-3 transition-all" data-testid="products-more-link">
            Ver todos los productos <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---- QUIZ ---- */
function QuizSection({ openDemo }) {
  return (
    <section className="py-20 bg-white" id="quiz">
      <motion.div className="max-w-4xl mx-auto px-6"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
        <motion.div variants={fadeUp} className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#fc5e5f] font-medium mb-3">Encuentra tu producto ideal</p>
          <h2 className="text-4xl font-bold text-[#003b72] mb-3 text-center" style={{ fontFamily: "Outfit, sans-serif" }}>¿Qué producto necesito?</h2>
          <p className="text-gray-500">Responde 3 preguntas y te recomendamos el producto ideal. <span className="text-gray-400 text-sm">(opcional)</span></p>
        </motion.div>
        <motion.div variants={fadeUp}>
          <ProductQuiz onContact={openDemo} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---- CONTACTO ---- */
const PRODUCTOS_LIST = ["Botbee", "Cert", "Blog IA", "ED Master", "ED Teach", "ED Math", "Desarrollo a Medida"];
function ContactoSection() {
  const [form, setForm] = useState({ nombre: "", apellido: "", email: "", empresa: "", producto: "", desafio: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      await axios.post(`${API}/demo`, { ...form, tipo: "formulario" });
      setSuccess(true);
    } catch { setError("Ocurrió un error. Intenta de nuevo."); }
    setLoading(false);
  };

  return (
    <section className="py-20 bg-[#f8fafc]" id="contacto" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#fc5e5f] font-medium mb-4">Contáctanos</p>
            <h2 className="text-4xl font-bold text-[#003b72] mb-5 leading-tight text-center" style={{ fontFamily: "Outfit, sans-serif" }}>Hablemos sobre tu proyecto</h2>
            <p className="text-gray-600 leading-relaxed mb-8">Nuestro equipo responde en menos de 24 horas. Cuéntanos tu desafío y juntos encontramos la mejor solución.</p>
            <ul className="flex flex-col gap-3 mb-10">
              {["Respuesta en menos de 24 horas", "Demo personalizada según tu industria", "Sin compromisos", "Propuesta inicial sin costo"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700 text-sm">
                  <CheckCircle size={17} className="text-[#009ee7] shrink-0" />{item}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-3 gap-4">
              {[{ value: "4", label: "países" }, { value: "6", label: "productos activos" }, { value: "<24h", label: "tiempo de respuesta" }].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-[#003b72]" style={{ fontFamily: "Outfit, sans-serif" }}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {success ? (
              <div className="text-center py-8" data-testid="contact-success">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={30} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#003b72] mb-2">¡Mensaje recibido!</h3>
                <p className="text-gray-500 text-sm">Nuestro equipo se pondrá en contacto en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" data-testid="contact-form">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                    <input required className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7]" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} data-testid="contact-input-nombre" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
                    <input required className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7]" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} data-testid="contact-input-apellido" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input required type="email" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7]" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} data-testid="contact-input-email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                  <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7]" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} data-testid="contact-input-empresa" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">¿Qué producto te interesa?</label>
                  <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7] bg-white" value={form.producto} onChange={(e) => setForm({ ...form, producto: e.target.value })} data-testid="contact-select-producto">
                    <option value="">Seleccionar...</option>
                    {PRODUCTOS_LIST.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">¿Cuál es tu principal desafío?</label>
                  <textarea rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7] resize-none" value={form.desafio} onChange={(e) => setForm({ ...form, desafio: e.target.value })} placeholder="Cuéntanos sobre tu necesidad..." data-testid="contact-textarea-desafio" />
                </div>
                {error && <p className="text-red-500 text-sm" data-testid="contact-error">{error}</p>}
                <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#fc5e5f] text-white rounded-full font-semibold hover:bg-[#e04e4f] transition-colors disabled:opacity-60 shadow-lg shadow-[#fc5e5f]/20" data-testid="contact-submit-btn">
                  {loading ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- MAIN ---- */
export default function HomePage() {
  const { openDemo } = useDemo();
  const location = useLocation();

  // Handle scroll-to-quiz from nav or redirect
  useEffect(() => {
    if (location.state?.scrollTo === "quiz") {
      setTimeout(() => {
        const el = document.getElementById("quiz");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  }, [location.state]);

  return (
    <>
      <HeroSection openDemo={openDemo} />
      <PartnersSection />
      <NosotrosSection />
      <ServiciosSection openDemo={openDemo} />
      <ProductosSection />
      <QuizSection openDemo={openDemo} />
      <ContactoSection />
    </>
  );
}
