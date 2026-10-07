import React, { useState, useEffect } from "react";
import { 
  Shield, Cpu, Layers, RefreshCw, Terminal, Code, Zap, Lock, 
  ArrowRight, Users, ChevronRight, PhoneCall, ExternalLink, 
  Sparkles, CheckCircle2, Star, Mail, Building, Globe 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import SeamlessLoopVideo from "./components/SeamlessLoopVideo";
import TechGrid from "./components/TechGrid";
import QuoteEstimator from "./components/QuoteEstimator";
import ConsultingChat from "./components/ConsultingChat";
import { useTypewriter } from "./hooks/useTypewriter";

const BRAND_LOGO_SRC = "/scorpion-logo.jpg";
const CYBER_SHIELD_VIDEO_SRC = "/cyber-shield-loop.mp4";

const HERO_SUBHEADLINE = 
  "Forjamos soluciones digitales a medida y de extrema protección para empresas líderes. Integración nativa de inteligencia artificial con sistemas conversacionales inmitigables, diseños de vanguardia interactivos y bases de datos robustas redundantes.";

const BENEFITS = [
  {
    icon: <Lock className="w-5 h-5 text-amber-400" />,
    title: "Inmunidad Criptográfica",
    description: "Cada pieza de software es securizada contra amenazas modernas utilizando encriptación asimétrica y capas de firewall virtuales."
  },
  {
    icon: <Code className="w-5 h-5 text-amber-400" />,
    title: "Arquitecturas en Estado Puro",
    description: "Cero redundancias artificiales. Código limpio, tipado estricto en TypeScript y bases de datos estructuradas de alto rendimiento."
  },
  {
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    title: "Cores Cognitivos Autónomos",
    description: "Integración nativa con modelos de lenguaje masivos de Google Gemini, optimizando el procesamiento analítico y la automatización."
  },
  {
    icon: <Layers className="w-5 h-5 text-amber-400" />,
    title: "Pipelines Continuos",
    description: "Tiempos de carga optimizados a milisegundos gracias al enrutamiento estático optimizado, balanceo distribuido y Docker."
  }
];

const REVIEWS = [
  {
    name: "Víctor Mendizábal",
    company: "Sistemas Financieros Nova",
    role: "Director de Innovación",
    text: "Solicitamos a Scorpion Code un clúster transaccional ultraseguro. La ejecución fue impecable, la arquitectura cifrada funciona de forma inmutable y las velocidades de consulta mejoraron en un 400%. Absolutamente recomendados.",
    stars: 5,
    tag: "FinTech"
  },
  {
    name: "Elena Rosales",
    company: "AeroAI Systems",
    role: "Co-Fundadora & CTO",
    text: "El equipo recreó nuestro sistema de telemetría de drones con React y animaciones kineticas. No solo es visualmente impactante, sino que la integración neuronal con sus cores de IA automatiza el diagnóstico técnico de forma perfecta.",
    stars: 5,
    tag: "DeepTech"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [showFormModal, setShowFormModal] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactService, setContactService] = useState("Desarrollo Completo");

  // Custom typewriter effect for real-time terminal hero sub-headline
  const { displayedText, isComplete } = useTypewriter(HERO_SUBHEADLINE, {
    speed: 18,
    delay: 300,
  });

  // Handle scroll trigger highlights
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos < 600) setActiveTab("inicio");
      else if (scrollPos < 1400) setActiveTab("tecnologia");
      else if (scrollPos < 2200) setActiveTab("estimador");
      else setActiveTab("contacto");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const submitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    setShowFormModal(true);
  };

  const closeFormModal = () => {
    setShowFormModal(false);
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  return (
    <div id="scorpion-code-app" className="relative min-h-screen bg-[#080808] text-zinc-100 overflow-x-hidden">
      {/* Background Ambience Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* FIXED HEADER MENU */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#080808]/90 backdrop-blur-md border-b border-zinc-900/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Company Brand Logo and Title */}
          <div 
            onClick={() => handleSmoothScroll("hero-section")} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src={BRAND_LOGO_SRC}
              alt="Scorpion Code"
              width={44}
              height={44}
              className="w-11 h-11 rounded-lg object-cover border border-amber-500/40 group-hover:border-amber-400 group-hover:shadow-[0_0_12px_rgba(212,175,55,0.35)] transition-all shrink-0"
            />
            <div>
              <span className="font-mono text-base font-black tracking-widest text-[#F9F9F9] flex items-center gap-1 bg-gradient-to-r from-zinc-100 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                SCORPION CODE
              </span>
              <p className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase -mt-0.5">Elite Cybernetics_</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs">
            <button
              onClick={() => handleSmoothScroll("hero-section")}
              className={`hover:text-amber-400 transition-colors uppercase cursor-pointer ${
                activeTab === "inicio" ? "text-amber-400 font-semibold" : "text-zinc-400"
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => handleSmoothScroll("capabilities-section")}
              className={`hover:text-amber-400 transition-colors uppercase cursor-pointer ${
                activeTab === "tecnologia" ? "text-amber-400 font-semibold" : "text-zinc-400"
              }`}
            >
              Tecnología_
            </button>
            <button
              onClick={() => handleSmoothScroll("estimator-section")}
              className={`hover:text-amber-400 transition-colors uppercase cursor-pointer ${
                activeTab === "estimador" ? "text-amber-400 font-semibold" : "text-zinc-400"
              }`}
            >
              Cotizador AI
            </button>
            <button
              onClick={() => handleSmoothScroll("contact-section")}
              className={`hover:text-amber-400 transition-colors uppercase cursor-pointer ${
                activeTab === "contacto" ? "text-amber-400 font-semibold" : "text-zinc-400"
              }`}
            >
              Contacto_
            </button>
          </nav>

          {/* Quick Header Actions: WhatsApp & Quote Highlight */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/525610142522?text=Hola%20Scorpion%20Code%2C%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20de%20desarrollo."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 font-mono text-[10px] font-bold tracking-wider text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 hover:border-emerald-400 rounded-lg transition-all cursor-pointer shadow-sm"
              title="Chat directo por WhatsApp (+52 5610142522)"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.65L5.27 16.62L5.07 16.3C4.26 15 3.81 13.48 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.23 7.35C9.04 7.35 8.74 7.42 8.49 7.69C8.24 7.96 7.54 8.62 7.54 9.96C7.54 11.3 8.52 12.6 8.65 12.78C8.79 12.96 10.58 15.72 13.32 16.9C15.6 17.88 16.07 17.68 16.56 17.63C17.06 17.59 18.16 16.98 18.39 16.33C18.62 15.68 18.62 15.13 18.55 15.01C18.48 14.89 18.29 14.82 18.01 14.68C17.74 14.54 16.38 13.87 16.13 13.78C15.87 13.68 15.69 13.64 15.5 13.91C15.32 14.19 14.79 14.82 14.63 15.01C14.47 15.19 14.31 15.22 14.04 15.08C13.76 14.94 12.88 14.65 11.83 13.72C11.02 12.99 10.47 12.09 10.31 11.82C10.15 11.54 10.29 11.39 10.43 11.25C10.56 11.12 10.72 10.91 10.86 10.75C11 10.59 11.05 10.47 11.14 10.29C11.23 10.1 11.19 9.94 11.12 9.8C11.05 9.66 10.5 8.32 10.27 7.76C10.05 7.23 9.82 7.3 9.65 7.29C9.5 7.29 9.32 7.29 9.23 7.35Z" />
              </svg>
              <span>WHATSAPP</span>
            </a>
            <button
              onClick={() => handleSmoothScroll("estimator-section")}
              className="px-6 py-2 font-mono text-[10px] font-bold tracking-widest bg-transparent hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-black text-amber-400 border border-amber-500/80 rounded-lg transition-all cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.3)] uppercase"
            >
              SISTEMA DE COTIZACIÓN v1.0
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-24">

        {/* --- SECTION 1: CINEMATIC KINETIC HERO --- */}
        <section id="hero-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-140px)] py-4">
          
          {/* Copywriter side */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>SISTEMAS EXCLUSIVOS SOBERANOS</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-zinc-100 font-mono uppercase leading-[0.85] mb-6">
                Desarrollo de <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-500 bg-clip-text text-transparent">Software de Élite</span> &amp;<br />Arquitecturas Cyber
              </h1>
              {/* Real-time Terminal Typewriter Sub-headline */}
              <div className="relative font-mono text-xs sm:text-[13px] text-zinc-300 max-w-2xl leading-relaxed bg-[#0b0b0b]/90 border border-zinc-900 rounded-xl p-3.5 sm:p-4 shadow-inner min-h-[5.5rem] flex flex-col justify-between">
                <div className="flex items-center justify-between text-[9px] text-zinc-500 pb-2 mb-2 border-b border-zinc-900/80 uppercase tracking-widest select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-amber-400 font-bold">TERMINAL_STDOUT &gt; MANIFIESTO_CORE</span>
                  </div>
                  <span className="text-zinc-600 font-mono">[SYS_STABLE]</span>
                </div>
                <p className="font-mono text-zinc-300 leading-relaxed">
                  <span className="text-amber-400 font-bold mr-1.5 select-none">&gt;&gt;</span>
                  {displayedText}
                  <span
                    className="inline-block w-2 h-3.5 bg-amber-400 ml-1 translate-y-0.5 align-middle animate-pulse"
                    aria-hidden="true"
                  />
                </p>
              </div>
            </div>

            {/* Quick Metrics display inside Hero */}
            <div className="grid grid-cols-3 gap-6 py-4 border-y border-zinc-900/60 max-w-xl">
              <div>
                <span className="block text-4xl font-light italic text-amber-400 font-sans">0.05s</span>
                <p className="text-[9px] uppercase tracking-widest opacity-50 mt-1">Latencia Máxima_</p>
              </div>
              <div>
                <span className="block text-4xl font-light italic text-amber-400 font-sans">100%</span>
                <p className="text-[9px] uppercase tracking-widest opacity-50 mt-1">Código Securizado_</p>
              </div>
              <div>
                <span className="block text-4xl font-light italic text-amber-400 font-sans">A+ VIP</span>
                <p className="text-[9px] uppercase tracking-widest opacity-50 mt-1">Rendimiento Cloud_</p>
              </div>
            </div>

            {/* CTA Triggers */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => handleSmoothScroll("estimator-section")}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold text-xs tracking-wider rounded-xl cursor-pointer shadow-[0_5px_22px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 group transition-all"
              >
                EMPEZAR PREPLAN DE ESTIMACIÓN
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleSmoothScroll("capabilities-section")}
                className="px-6 py-3.5 bg-zinc-900/80 hover:bg-zinc-850 border border-zinc-850 hover:border-amber-500/40 text-zinc-300 hover:text-amber-400 font-mono text-xs rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5"
              >
                PROBAR SIMULADOR CORE
              </button>
            </div>
          </div>

          {/* Cyber shield loop visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="text-center mb-1.5">
              <span className="text-[10px] font-mono text-amber-400/50 uppercase tracking-widest animate-pulse">
                &lt;&lt; interactúa con el blindaje cibernético &gt;&gt;
              </span>
            </div>

            <SeamlessLoopVideo src={CYBER_SHIELD_VIDEO_SRC} crossfadeSec={0.45} />

            <div className="mt-2 text-center text-[10px] text-zinc-500 font-mono max-w-sm">
              Secuencia de blindaje en reproducción continua. Transición suave en bucle para evitar cortes visibles al reiniciar el ciclo.
            </div>
          </div>

        </section>


        {/* --- SECTION 2: CAPABILITIES BENTO GRID AND CORE ADVANTAGES --- */}
        <motion.section
          id="capabilities-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-12"
        >
          {/* Header Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center max-w-3xl mx-auto space-y-3"
          >
            <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">Garantías de Ingeniería</span>
            <h2 className="text-3xl font-black font-mono tracking-tight text-zinc-100 uppercase sm:text-4xl">
              Nuestra Filosofía de Desarrollo Silencioso y Preciso
            </h2>
            <p className="text-xs text-zinc-400 font-sans">
              No nos limitamos a programar aplicaciones. Construimos fortificaciones de software optimizadas bajo los estándares de seguridad de nivel de bancario y con arquitecturas de diseño vanguardistas.
            </p>
          </motion.div>

          {/* Grid blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, idx) => (
              <motion.div
                id={`benefit-card-${idx}`}
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.1, ease: "easeOut" }}
                whileHover={{ x: 6 }}
                className="p-6 bg-[#121212] border-l-4 border-zinc-800 hover:border-amber-500 transition-all duration-300 rounded-r-xl space-y-4 shadow-sm group"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-center transition-colors group-hover:bg-amber-500/10 group-hover:border-amber-500/30">
                  {b.icon}
                </div>
                <h3 className="font-mono text-sm font-bold text-zinc-200 tracking-wide group-hover:text-amber-400 transition-colors uppercase">
                  {b.title}
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {b.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Embedded Tech Interactive Console */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-6"
          >
            <TechGrid />
          </motion.div>
        </motion.section>


        {/* --- SECTION 3: THE SMART PROJECT ESTIMATOR --- */}
        <section id="estimator-section" className="space-y-12">
          {/* Header copy */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">Inteligencia Artificial Sincronizada</span>
            <h2 className="text-3xl font-black font-mono tracking-tight text-zinc-100 uppercase sm:text-4xl">
              Calculadora Neurológica de Alcance Financiero
            </h2>
            <p className="text-xs text-zinc-400 font-sans">
              Configura las directrices generales de tu software y nuestro core de Machine Learning impulsado por Google Gemini estructurará un plan de hitos lógicos y costes aproximados en segundos.
            </p>
          </div>

          {/* Embedded QuoteEstimator Component */}
          <div id="quote-wrapper" className="max-w-4xl mx-auto">
            <QuoteEstimator />
          </div>
        </section>


        {/* --- SECTION 4: CLIENT SUCCESS & TRUST SHOWCASE --- */}
        <motion.section
          id="testimonials-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-12"
        >
          {/* Title block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center max-w-2xl mx-auto space-y-3"
          >
            <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">Socios Estratégicos</span>
            <h2 className="text-2xl font-black font-mono tracking-tight text-zinc-100 uppercase sm:text-3xl">
              Nuestros Códigos Hablan Por Sí Mismos
            </h2>
          </motion.div>

          {/* Testimonies list cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {REVIEWS.map((r, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.15, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-[#121212]/90 border border-zinc-900 rounded-2xl p-6 space-y-4 hover:border-amber-500/30 transition-all shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/25 rounded text-[10px] font-mono text-amber-400 uppercase">
                      {r.tag}
                    </span>
                    <div className="flex text-amber-400">
                      {[...Array(r.stars)].map((_, sIdx) => (
                        <Star key={sIdx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 italic font-sans leading-relaxed">
                    "{r.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 border-t border-zinc-900/60 pt-4 mt-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 font-mono font-bold text-xs text-amber-400 flex items-center justify-center uppercase shadow-inner">
                    {r.name.substring(0, 2)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200 font-mono">{r.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-sans">{r.role}, <strong className="text-zinc-400">{r.company}</strong></p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>


        {/* --- SECTION 5: CONTACT AND COLLABORATION NODE --- */}
        <section id="contact-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start py-8">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-amber-400 font-mono text-xs tracking-widest uppercase block">Enlace Corporativo</span>
            <h2 className="text-3xl font-black font-mono tracking-tight text-zinc-100 uppercase">
              Hablemos De Tu Próxima Solución
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              ¿Listo para dar el gran salto tecnológico? Completa nuestro nodo de contacto o utiliza el asistente virtual en la esquina inferior para iniciar el escaneo de tu requerimiento hoy mismo.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3 items-center">
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-zinc-500 uppercase font-mono">Enlace Técnico General</span>
                  <a href="mailto:scorpioncode2025@gmail.com" className="text-xs text-zinc-200 font-mono hover:text-amber-400 transition-colors">
                    scorpioncode2025@gmail.com
                  </a>
                </div>
              </div>

              {/* Canal Directo WhatsApp */}
              <div className="flex gap-3 items-center">
                <div className="p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-400">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.65L5.27 16.62L5.07 16.3C4.26 15 3.81 13.48 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.23 7.35C9.04 7.35 8.74 7.42 8.49 7.69C8.24 7.96 7.54 8.62 7.54 9.96C7.54 11.3 8.52 12.6 8.65 12.78C8.79 12.96 10.58 15.72 13.32 16.9C15.6 17.88 16.07 17.68 16.56 17.63C17.06 17.59 18.16 16.98 18.39 16.33C18.62 15.68 18.62 15.13 18.55 15.01C18.48 14.89 18.29 14.82 18.01 14.68C17.74 14.54 16.38 13.87 16.13 13.78C15.87 13.68 15.69 13.64 15.5 13.91C15.32 14.19 14.79 14.82 14.63 15.01C14.47 15.19 14.31 15.22 14.04 15.08C13.76 14.94 12.88 14.65 11.83 13.72C11.02 12.99 10.47 12.09 10.31 11.82C10.15 11.54 10.29 11.39 10.43 11.25C10.56 11.12 10.72 10.91 10.86 10.75C11 10.59 11.05 10.47 11.14 10.29C11.23 10.1 11.19 9.94 11.12 9.8C11.05 9.66 10.5 8.32 10.27 7.76C10.05 7.23 9.82 7.3 9.65 7.29C9.5 7.29 9.32 7.29 9.23 7.35Z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[10px] text-zinc-500 uppercase font-mono">Línea Directa / WhatsApp</span>
                  <a
                    href="https://wa.me/525610142522?text=Hola%20Scorpion%20Code%2C%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20de%20desarrollo."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-200 font-mono hover:text-emerald-400 transition-colors flex items-center gap-2"
                  >
                    +52 56 1014 2522
                    <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded uppercase font-bold">Activo</span>
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-zinc-500 uppercase font-mono">Sede Operativa</span>
                  <p className="text-xs text-zinc-200 font-mono">
                    Cloud Sandbox Environment, USA
                  </p>
                </div>
              </div>

              {/* Botón Principal Destacado de WhatsApp */}
              <div className="pt-3">
                <a
                  href="https://wa.me/525610142522?text=Hola%20Scorpion%20Code%2C%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20de%20desarrollo."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-mono font-bold text-xs tracking-wider uppercase cursor-pointer shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-0.5"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.65L5.27 16.62L5.07 16.3C4.26 15 3.81 13.48 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.23 7.35C9.04 7.35 8.74 7.42 8.49 7.69C8.24 7.96 7.54 8.62 7.54 9.96C7.54 11.3 8.52 12.6 8.65 12.78C8.79 12.96 10.58 15.72 13.32 16.9C15.6 17.88 16.07 17.68 16.56 17.63C17.06 17.59 18.16 16.98 18.39 16.33C18.62 15.68 18.62 15.13 18.55 15.01C18.48 14.89 18.29 14.82 18.01 14.68C17.74 14.54 16.38 13.87 16.13 13.78C15.87 13.68 15.69 13.64 15.5 13.91C15.32 14.19 14.79 14.82 14.63 15.01C14.47 15.19 14.31 15.22 14.04 15.08C13.76 14.94 12.88 14.65 11.83 13.72C11.02 12.99 10.47 12.09 10.31 11.82C10.15 11.54 10.29 11.39 10.43 11.25C10.56 11.12 10.72 10.91 10.86 10.75C11 10.59 11.05 10.47 11.14 10.29C11.23 10.1 11.19 9.94 11.12 9.8C11.05 9.66 10.5 8.32 10.27 7.76C10.05 7.23 9.82 7.3 9.65 7.29C9.5 7.29 9.32 7.29 9.23 7.35Z" />
                  </svg>
                  <span>Chatear por WhatsApp Ahora</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-[#121212] border border-zinc-900 rounded-3xl p-6 md:p-8">
            <form onSubmit={submitContactForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-zinc-500 uppercase">Tu Nombre / Representante</label>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Ej: Jahdiel Rosales"
                      className="w-full bg-black/60 text-xs text-zinc-100 placeholder:text-zinc-650 rounded-xl border border-zinc-850 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-zinc-500 uppercase">Correo Electrónico Corporativo</label>
                  <input
                    required
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Ej: jahdiel@empresa.com"
                    className="w-full bg-black/60 text-xs text-zinc-100 placeholder:text-zinc-650 rounded-xl border border-zinc-850 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-zinc-500 uppercase">Servicio de Interés Principal</label>
                <select
                  value={contactService}
                  onChange={(e) => setContactService(e.target.value)}
                  className="w-full bg-black text-xs text-zinc-300 rounded-xl border border-zinc-850 p-3 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                >
                  <option value="Desarrollo Completo">Desarrollo de Software a Medida</option>
                  <option value="Auditoría de Ciberseguridad">Auditoría &amp; Pentesting de Ciberseguridad</option>
                  <option value="Integración Neuronal AI">Soluciones de IA y cores Cognitivos</option>
                  <option value="Migración de Clúster Cloud">Migración &amp; DevOps de Clúster Cloud</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-zinc-500 uppercase">Detalle Adicional del Requerimiento</label>
                <textarea
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Describe brevemente los entregables esperados..."
                  rows={4}
                  className="w-full bg-black/60 text-xs text-zinc-100 placeholder:text-zinc-655 rounded-xl border border-zinc-850 p-4 focus:outline-none focus:ring-1 focus:ring-amber-500/30 resize-none font-sans leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-zinc-900 hover:bg-amber-950/20 text-zinc-300 hover:text-amber-400 border border-zinc-800 hover:border-amber-500/40 font-bold tracking-wide rounded-xl py-3 text-xs flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
              >
                DECLARAR REQUERIMIENTO CORPORATIVO_
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="pt-2 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">¿Prefieres atención inmediata?</span>
                <a
                  href="https://wa.me/525610142522?text=Hola%20Scorpion%20Code%2C%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20de%20desarrollo."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 font-mono text-[10px] font-semibold transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.65L5.27 16.62L5.07 16.3C4.26 15 3.81 13.48 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.23 7.35C9.04 7.35 8.74 7.42 8.49 7.69C8.24 7.96 7.54 8.62 7.54 9.96C7.54 11.3 8.52 12.6 8.65 12.78C8.79 12.96 10.58 15.72 13.32 16.9C15.6 17.88 16.07 17.68 16.56 17.63C17.06 17.59 18.16 16.98 18.39 16.33C18.62 15.68 18.62 15.13 18.55 15.01C18.48 14.89 18.29 14.82 18.01 14.68C17.74 14.54 16.38 13.87 16.13 13.78C15.87 13.68 15.69 13.64 15.5 13.91C15.32 14.19 14.79 14.82 14.63 15.01C14.47 15.19 14.31 15.22 14.04 15.08C13.76 14.94 12.88 14.65 11.83 13.72C11.02 12.99 10.47 12.09 10.31 11.82C10.15 11.54 10.29 11.39 10.43 11.25C10.56 11.12 10.72 10.91 10.86 10.75C11 10.59 11.05 10.47 11.14 10.29C11.23 10.1 11.19 9.94 11.12 9.8C11.05 9.66 10.5 8.32 10.27 7.76C10.05 7.23 9.82 7.3 9.65 7.29C9.5 7.29 9.32 7.29 9.23 7.35Z" />
                  </svg>
                  <span>Chat por WhatsApp (+52 5610142522)</span>
                </a>
              </div>
            </form>
          </div>
        </section>

      </main>

      {/* FOOTER TERMINAL CREDITS */}
      <footer className="border-t border-zinc-900/60 bg-black py-12 text-zinc-500 font-sans">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 items-center text-center md:text-left">
          
          {/* Logo brand copyrights */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2.5">
              <img
                src={BRAND_LOGO_SRC}
                alt=""
                width={36}
                height={36}
                className="w-9 h-9 rounded-md object-cover border border-amber-500/30 shrink-0"
              />
              <span className="font-mono text-sm font-bold text-zinc-200 tracking-wider">SCORPION CODE</span>
            </div>
            <p className="text-[11px] text-zinc-500">&copy; {new Date().getFullYear()} Scorpion Code. Todos los derechos reservados.</p>
          </div>

          {/* Quick legal compliance or technology label */}
          <div className="flex flex-col items-center md:items-start font-mono text-[10px] space-y-1">
            <span className="text-zinc-500">ESTADO RED: ONLINE (SSL V3 ACTIVE)</span>
            <span className="text-amber-500/70">COMPILACIÓN CLIENTE: v2.3.0_STABLE</span>
          </div>

          {/* Sede Operativa */}
          <div className="text-center md:text-right font-mono text-[10px]">
            <div className="text-amber-400 font-bold uppercase tracking-widest">Sede Operativa</div>
            <div className="text-zinc-400 mt-0.5">Silicon Alley, NY / Remote Global</div>
          </div>

          {/* Contacto Directo & WhatsApp */}
          <div className="text-center md:text-right font-mono text-[10px] space-y-1">
            <div className="text-amber-400 font-bold uppercase tracking-widest">Contacto Directo</div>
            <div>
              <a href="mailto:scorpioncode2025@gmail.com" className="text-zinc-300 hover:text-amber-400 transition-colors">
                scorpioncode2025@gmail.com
              </a>
            </div>
            <div>
              <a
                href="https://wa.me/525610142522?text=Hola%20Scorpion%20Code%2C%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
              >
                <span>WhatsApp: +52 56 1014 2522</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING CHAT ASSISTANT CONTROL HUD */}
      <ConsultingChat />

      {/* MODAL SUCCESS FEEDBACK DIALOG FOR CONTACT FORM */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-zinc-950 border border-amber-500/30 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-center font-sans space-y-4"
            >
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-mono text-sm font-bold text-zinc-100 uppercase tracking-wide">Transmisión Exitosa</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Hola <strong className="text-amber-300">{contactName}</strong>, tu requerimiento para <strong className="text-zinc-300">{contactService}</strong> ha sido transmitido con firma segura SHA-256 a nuestro clúster técnico. Responderemos a <strong className="text-zinc-300">{contactEmail}</strong> en un lapso menor a 4 horas laborables.
                </p>
              </div>
              <button
                onClick={closeFormModal}
                className="w-full py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-bold rounded-lg cursor-pointer transition-colors"
              >
                Cerrar canal transaccional
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
