import React, { useState, useEffect } from "react";
import {
  Shield,
  Cpu,
  Layers,
  Terminal,
  Code,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Star,
  Mail,
  Globe,
  BookOpen,
  Calculator,
  Award,
  MessageSquare,
  Menu,
  X,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import SeamlessLoopVideo from "./components/SeamlessLoopVideo";
import TechGrid from "./components/TechGrid";
import ServicesCatalog from "./components/ServicesCatalog";
import QuoteEstimator from "./components/QuoteEstimator";
import ConsultingChat from "./components/ConsultingChat";
import { useTypewriter } from "./hooks/useTypewriter";
import {
  SCORPION_SERVICES_CATALOG,
  SCORPION_CONTACT,
  GENERAL_WHATSAPP_MESSAGE,
  GENERAL_EMAIL_SUBJECT,
  GENERAL_EMAIL_BODY,
  buildWhatsAppUrl,
  buildGmailComposeUrl,
  buildMailtoUrl,
} from "./data/servicesCatalog";

const BRAND_LOGO_SRC = "/scorpion-logo.jpg";
const CYBER_SHIELD_VIDEO_SRC = "/cyber-shield-loop.mp4";

const HERO_SUBHEADLINE =
  "Forjamos soluciones digitales a medida y de extrema protección para empresas líderes. Integración nativa de inteligencia artificial con sistemas conversacionales inmitigables, diseños de vanguardia interactivos y bases de datos robustas redundantes.";

export type SectionId =
  | "inicio"
  | "garantias"
  | "catalogo"
  | "tecnologia"
  | "estimador"
  | "testimonios"
  | "contacto";

interface NavSectionItem {
  id: SectionId;
  label: string;
  shortLabel: string;
  domId: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
}

const NAV_SECTIONS: NavSectionItem[] = [
  {
    id: "inicio",
    label: "Inicio",
    shortLabel: "Inicio",
    domId: "hero-section",
    badge: "SEC_01 // CORE",
    description: "Manifiesto central, métricas operativas y acceso directo a todos los apartados.",
    icon: <Terminal className="w-4 h-4 text-amber-400" />,
  },
  {
    id: "garantias",
    label: "Garantías_",
    shortLabel: "Garantías",
    domId: "philosophy-section",
    badge: "SEC_02 // FILOSOFÍA",
    description: "Estándares de inmunidad criptográfica, código puro y arquitecturas de misión crítica.",
    icon: <Shield className="w-4 h-4 text-amber-400" />,
  },
  {
    id: "catalogo",
    label: "Catálogo_",
    shortLabel: "Catálogo de Servicios",
    domId: "services-catalog-section",
    badge: "SEC_03 // SERVICIOS",
    description: "Catálogo oficial de soluciones tecnológicas a medida con cotización directa por WhatsApp o correo.",
    icon: <BookOpen className="w-4 h-4 text-amber-400" />,
  },
  {
    id: "tecnologia",
    label: "Tecnología_",
    shortLabel: "Simulador Tecnológico",
    domId: "tech-simulator-section",
    badge: "SEC_04 // SIMULADOR",
    description: "Caché cibernética de componentes e inspección de módulos en consola interactiva.",
    icon: <Cpu className="w-4 h-4 text-amber-400" />,
  },
  {
    id: "estimador",
    label: "Cotizador AI",
    shortLabel: "Cotizador AI",
    domId: "estimator-section",
    badge: "SEC_05 // NEURAL QUOTE",
    description: "Calculadora neurológica de alcance técnico, stack recomendado e hitos de ingeniería.",
    icon: <Calculator className="w-4 h-4 text-amber-400" />,
  },
  {
    id: "testimonios",
    label: "Casos de Éxito",
    shortLabel: "Casos de Éxito",
    domId: "testimonials-section",
    badge: "SEC_06 // SOCIOS",
    description: "Reseñas verificadas y resultados operativos de nuestros socios estratégicos.",
    icon: <Award className="w-4 h-4 text-amber-400" />,
  },
  {
    id: "contacto",
    label: "Contacto_",
    shortLabel: "Contacto Corporativo",
    domId: "contact-section",
    badge: "SEC_07 // ENLACE",
    description: "Canal directo por WhatsApp, correo electrónico oficial y nodo de requerimiento.",
    icon: <MessageSquare className="w-4 h-4 text-amber-400" />,
  },
];

const BENEFITS = [
  {
    icon: <Lock className="w-5 h-5 text-amber-400" />,
    title: "Inmunidad Criptográfica",
    metric: "AES-256 / TLS 1.3",
    description:
      "Cada pieza de software es securizada contra amenazas modernas utilizando encriptación asimétrica, aislamiento de secretos y capas de firewall virtuales.",
  },
  {
    icon: <Code className="w-5 h-5 text-amber-400" />,
    title: "Arquitecturas en Estado Puro",
    metric: "100% Type-Safe",
    description:
      "Cero redundancias artificiales. Código limpio, tipado estricto en TypeScript y bases de datos estructuradas de alto rendimiento.",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    title: "Cores Cognitivos Autónomos",
    metric: "Agentes & RAG",
    description:
      "Integración nativa con modelos de lenguaje de última generación, optimizando el procesamiento analítico, la atención especializada y la automatización.",
  },
  {
    icon: <Layers className="w-5 h-5 text-amber-400" />,
    title: "Pipelines Continuos",
    metric: "< 50ms Latencia",
    description:
      "Tiempos de carga optimizados a milisegundos gracias al enrutamiento distribuido, contenedores inmunes y despliegues automatizados Zero-Downtime.",
  },
];

const REVIEWS = [
  {
    name: "Víctor Mendizábal",
    company: "Sistemas Financieros Nova",
    role: "Director de Innovación",
    text: "Solicitamos a Scorpion Code un clúster transaccional ultraseguro. La ejecución fue impecable, la arquitectura cifrada funciona de forma inmutable y las velocidades de consulta mejoraron en un 400%. Absolutamente recomendados.",
    stars: 5,
    tag: "FinTech",
    impact: "+400% Velocidad de Consulta",
  },
  {
    name: "Elena Rosales",
    company: "AeroAI Systems",
    role: "Co-Fundadora & CTO",
    text: "El equipo recreó nuestro sistema de telemetría de drones con React y animaciones cinéticas. No solo es visualmente impactante, sino que la integración neuronal con sus cores de IA automatiza el diagnóstico técnico de forma perfecta.",
    stars: 5,
    tag: "DeepTech",
    impact: "99.98% Precisión Diagnóstica",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<SectionId>("inicio");
  const [viewMode, setViewMode] = useState<"sections" | "all">("sections");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactService, setContactService] = useState(
    SCORPION_SERVICES_CATALOG[0]?.title || "Desarrollo de Software a Medida"
  );

  // Custom typewriter effect for real-time terminal hero sub-headline
  const { displayedText } = useTypewriter(HERO_SUBHEADLINE, {
    speed: 18,
    delay: 300,
  });

  // Sync initial URL hash & browser back/forward navigation
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "").trim() as SectionId;
      const found = NAV_SECTIONS.find(
        (s) => s.id === hash || s.domId === hash
      );
      if (found) {
        setActiveTab(found.id);
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  // Scroll-spy only when viewing all sections continuously
  useEffect(() => {
    if (viewMode !== "all") return;

    const handleScroll = () => {
      const offset = 180;
      let current: SectionId = "inicio";
      for (const sec of NAV_SECTIONS) {
        const el = document.getElementById(sec.domId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            current = sec.id;
          }
        }
      }
      setActiveTab(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [viewMode]);

  const navigateToSection = (sectionId: SectionId) => {
    setActiveTab(sectionId);
    setMobileMenuOpen(false);
    window.history.replaceState(null, "", `#${sectionId}`);

    if (viewMode === "sections") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = NAV_SECTIONS.find((s) => s.id === sectionId);
      if (target) {
        const el = document.getElementById(target.domId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  const currentSectionIndex = NAV_SECTIONS.findIndex((s) => s.id === activeTab);
  const prevSection =
    currentSectionIndex > 0 ? NAV_SECTIONS[currentSectionIndex - 1] : null;
  const nextSection =
    currentSectionIndex < NAV_SECTIONS.length - 1
      ? NAV_SECTIONS[currentSectionIndex + 1]
      : null;

  const shouldRenderSection = (sectionId: SectionId) =>
    viewMode === "all" || activeTab === sectionId;

  const selectedCatalogService = SCORPION_SERVICES_CATALOG.find(
    (s) => s.title === contactService
  );

  const getCustomContactEmailSubject = () => {
    if (selectedCatalogService) {
      return selectedCatalogService.emailSubject;
    }
    return GENERAL_EMAIL_SUBJECT;
  };

  const getCustomContactEmailBody = () => {
    if (contactName.trim() || contactMessage.trim() || contactEmail.trim()) {
      const codePrefix = selectedCatalogService
        ? `[${selectedCatalogService.code}] ${selectedCatalogService.title}`
        : contactService;
      return `Estimado equipo de Ingeniería de Scorpion Code,

Me pongo en contacto con ustedes para solicitar una cotización a medida referente al servicio:
${codePrefix}

DATOS DEL SOLICITANTE:
• Nombre / Representante: ${contactName.trim() || "Por definir"}
• Correo Electrónico: ${contactEmail.trim() || "Por definir"}
• Servicio de interés: ${codePrefix}

DETALLE DEL REQUERIMIENTO:
${contactMessage.trim() || "Solicito agendar una sesión de evaluación técnica para definir el alcance del proyecto."}

Quedo atento a su respuesta para coordinar una reunión técnica.

Atentamente,
${contactName.trim() || "Prospecto Corporativo"}`;
    }
    return selectedCatalogService
      ? selectedCatalogService.emailBody
      : GENERAL_EMAIL_BODY;
  };

  const getCustomContactWhatsAppMessage = () => {
    if (contactName.trim() || contactMessage.trim() || contactEmail.trim()) {
      const codePrefix = selectedCatalogService
        ? `[${selectedCatalogService.code}] ${selectedCatalogService.title}`
        : contactService;
      return `Hola equipo de *Scorpion Code*, deseo solicitar una cotización personalizada para el servicio *${codePrefix}*.

• *Nombre / Representante:* ${contactName.trim() || "Por definir"}
• *Correo Corporativo:* ${contactEmail.trim() || "Por definir"}
• *Detalle del Requerimiento:* ${contactMessage.trim() || "Evaluación técnica de proyecto."}

¿Tienen disponibilidad para revisar el alcance?`;
    }
    return selectedCatalogService
      ? selectedCatalogService.whatsappPrefill
      : GENERAL_WHATSAPP_MESSAGE;
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
    <div
      id="scorpion-code-app"
      className="relative min-h-screen bg-[#080808] text-zinc-100 overflow-x-hidden flex flex-col"
    >
      {/* Background Ambience Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* FIXED HEADER MENU */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-zinc-900/90 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-3">
          {/* Company Brand Logo and Title */}
          <div
            onClick={() => navigateToSection("inicio")}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <img
              src={BRAND_LOGO_SRC}
              alt="Scorpion Code"
              width={42}
              height={42}
              className="w-10 h-10 rounded-lg object-cover border border-amber-500/40 group-hover:border-amber-400 group-hover:shadow-[0_0_12px_rgba(212,175,55,0.35)] transition-all shrink-0"
            />
            <div>
              <span className="font-mono text-sm sm:text-base font-black tracking-widest text-[#F9F9F9] flex items-center gap-1 bg-gradient-to-r from-zinc-100 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                SCORPION CODE
              </span>
              <p className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase -mt-0.5">
                Elite Cybernetics_
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links — Every Section Accessible */}
          <nav
            aria-label="Navegación Principal"
            className="hidden lg:flex items-center gap-1 xl:gap-2 font-mono text-[11px] bg-zinc-950/90 border border-zinc-900 rounded-xl p-1"
          >
            {NAV_SECTIONS.map((sec) => {
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  id={`nav-btn-${sec.id}`}
                  onClick={() => navigateToSection(sec.id)}
                  className={`px-3 py-1.5 rounded-lg uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/40 font-bold shadow-[0_0_12px_rgba(212,175,55,0.15)]"
                      : "text-zinc-400 hover:text-amber-300 hover:bg-zinc-900/70 border border-transparent"
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Header Actions: View Mode, WhatsApp & Mobile Menu Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() =>
                setViewMode((prev) => (prev === "sections" ? "all" : "sections"))
              }
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 font-mono text-[10px] text-zinc-400 hover:text-amber-300 bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/30 rounded-lg transition-all cursor-pointer"
              title={
                viewMode === "sections"
                  ? "Cambiar a vista continua (todas las secciones en una página)"
                  : "Cambiar a navegación por secciones independientes"
              }
            >
              <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
              <span>{viewMode === "sections" ? "MODO: SECCIONES" : "MODO: COMPLETO"}</span>
            </button>

            <a
              href={`https://wa.me/${SCORPION_CONTACT.whatsappRaw}?text=${encodeURIComponent("Hola Scorpion Code, me gustaría cotizar un proyecto de desarrollo.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 font-mono text-[10px] font-bold tracking-wider text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 hover:border-emerald-400 rounded-lg transition-all cursor-pointer shadow-sm"
              title={`Chat directo por WhatsApp (${SCORPION_CONTACT.whatsappDisplay})`}
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.65L5.27 16.62L5.07 16.3C4.26 15 3.81 13.48 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.23 7.35C9.04 7.35 8.74 7.42 8.49 7.69C8.24 7.96 7.54 8.62 7.54 9.96C7.54 11.3 8.52 12.6 8.65 12.78C8.79 12.96 10.58 15.72 13.32 16.9C15.6 17.88 16.07 17.68 16.56 17.63C17.06 17.59 18.16 16.98 18.39 16.33C18.62 15.68 18.62 15.13 18.55 15.01C18.48 14.89 18.29 14.82 18.01 14.68C17.74 14.54 16.38 13.87 16.13 13.78C15.87 13.68 15.69 13.64 15.5 13.91C15.32 14.19 14.79 14.82 14.63 15.01C14.47 15.19 14.31 15.22 14.04 15.08C13.76 14.94 12.88 14.65 11.83 13.72C11.02 12.99 10.47 12.09 10.31 11.82C10.15 11.54 10.29 11.39 10.43 11.25C10.56 11.12 10.72 10.91 10.86 10.75C11 10.59 11.05 10.47 11.14 10.29C11.23 10.1 11.19 9.94 11.12 9.8C11.05 9.66 10.5 8.32 10.27 7.76C10.05 7.23 9.82 7.3 9.65 7.29C9.5 7.29 9.32 7.29 9.23 7.35Z" />
              </svg>
              <span>WHATSAPP</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 hover:border-amber-500/40 cursor-pointer"
              aria-label="Abrir menú de secciones"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Bar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-zinc-900 bg-[#0b0b0b] px-4 py-4 space-y-3 overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {NAV_SECTIONS.map((sec) => {
                  const isActive = activeTab === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => navigateToSection(sec.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl font-mono text-xs uppercase text-left transition-all cursor-pointer ${
                        isActive
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/40 font-bold"
                          : "bg-zinc-900/70 text-zinc-300 border border-zinc-800/80 hover:border-amber-500/30"
                      }`}
                    >
                      {sec.icon}
                      <span className="truncate">{sec.shortLabel}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-900 gap-2">
                <button
                  onClick={() => {
                    setViewMode((prev) => (prev === "sections" ? "all" : "sections"));
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 uppercase cursor-pointer"
                >
                  {viewMode === "sections"
                    ? "Cambiar a Vista Continua"
                    : "Cambiar a Vista por Secciones"}
                </button>
                <a
                  href={`https://wa.me/${SCORPION_CONTACT.whatsappRaw}?text=${encodeURIComponent("Hola Scorpion Code, me gustaría realizar una cotización.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-300 uppercase"
                >
                  WhatsApp Directo
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SUB-HEADER ACTIVE SECTION STATUS BAR (WHEN IN SECTION VIEW MODE) */}
      {viewMode === "sections" && (
        <div className="border-b border-zinc-900/70 bg-[#0b0b0b]/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 font-bold">
                {NAV_SECTIONS[currentSectionIndex]?.badge}
              </span>
              <span className="text-zinc-600">//</span>
              <span className="text-zinc-200 uppercase font-semibold">
                {NAV_SECTIONS[currentSectionIndex]?.shortLabel}
              </span>
              <span className="hidden md:inline text-zinc-500 font-sans text-xs ml-2">
                — {NAV_SECTIONS[currentSectionIndex]?.description}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
              <span>
                APARTADO {currentSectionIndex + 1} DE {NAV_SECTIONS.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT */}
      <main
        className={`max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex-1 ${
          viewMode === "all" ? "space-y-28" : "space-y-12"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode === "sections" ? activeTab : "all-sections-mode"}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className={viewMode === "all" ? "space-y-28" : "space-y-12"}
          >
            {/* =====================================================================
                SECTION 1: INICIO (CINEMATIC KINETIC HERO + SECTION DIRECTORY)
               ===================================================================== */}
            {shouldRenderSection("inicio") && (
              <section
                id="hero-section"
                className="scroll-mt-24 space-y-16 py-2"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-240px)]">
                  {/* Copywriter side */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-mono">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>SISTEMAS EXCLUSIVOS SOBERANOS</span>
                    </div>

                    <div className="space-y-4">
                      <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-zinc-100 font-mono uppercase leading-[0.88] mb-6">
                        Desarrollo de{" "}
                        <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                          Software de Élite
                        </span>{" "}
                        &amp;
                        <br />
                        Arquitecturas Cyber
                      </h1>

                      {/* Real-time Terminal Typewriter Sub-headline */}
                      <div className="relative font-mono text-xs sm:text-[13px] text-zinc-300 max-w-2xl leading-relaxed bg-[#0b0b0b]/90 border border-zinc-900 rounded-xl p-3.5 sm:p-4 shadow-inner min-h-[5.5rem] flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[9px] text-zinc-500 pb-2 mb-2 border-b border-zinc-900/80 uppercase tracking-widest select-none">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-amber-400 font-bold">
                              TERMINAL_STDOUT &gt; MANIFIESTO_CORE
                            </span>
                          </div>
                          <span className="text-zinc-600 font-mono">[SYS_STABLE]</span>
                        </div>
                        <p className="font-mono text-zinc-300 leading-relaxed">
                          <span className="text-amber-400 font-bold mr-1.5 select-none">
                            &gt;&gt;
                          </span>
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
                        <span className="block text-3xl sm:text-4xl font-light italic text-amber-400 font-sans">
                          0.05s
                        </span>
                        <p className="text-[9px] uppercase tracking-widest opacity-50 mt-1">
                          Latencia Máxima_
                        </p>
                      </div>
                      <div>
                        <span className="block text-3xl sm:text-4xl font-light italic text-amber-400 font-sans">
                          100%
                        </span>
                        <p className="text-[9px] uppercase tracking-widest opacity-50 mt-1">
                          Código Securizado_
                        </p>
                      </div>
                      <div>
                        <span className="block text-3xl sm:text-4xl font-light italic text-amber-400 font-sans">
                          A+ VIP
                        </span>
                        <p className="text-[9px] uppercase tracking-widest opacity-50 mt-1">
                          Rendimiento Cloud_
                        </p>
                      </div>
                    </div>

                    {/* CTA Triggers */}
                    <div className="flex flex-wrap gap-3.5 pt-2">
                      <button
                        onClick={() => navigateToSection("catalogo")}
                        className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold font-mono text-xs tracking-wider rounded-xl cursor-pointer shadow-[0_5px_22px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 group transition-all uppercase"
                      >
                        EXPLORAR CATÁLOGO DE SERVICIOS
                        <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={() => navigateToSection("estimador")}
                        className="px-5 py-3.5 bg-zinc-900/90 hover:bg-zinc-800 border border-amber-500/40 text-amber-300 font-mono text-xs rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 uppercase"
                      >
                        COTIZADOR AI
                      </button>
                      <button
                        onClick={() => navigateToSection("tecnologia")}
                        className="px-5 py-3.5 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/30 text-zinc-300 hover:text-amber-400 font-mono text-xs rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 uppercase"
                      >
                        SIMULADOR CORE
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
                </div>

                {/* Quick Navigation Grid to all Independent Sections */}
                <div className="pt-8 border-t border-zinc-900/80 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                        Arquitectura Modular del Portal
                      </span>
                      <h2 className="text-xl font-bold font-mono text-zinc-100 uppercase">
                        Explora Nuestros Apartados Especializados
                      </h2>
                    </div>
                    <p className="text-xs text-zinc-400 font-sans">
                      Selecciona cualquier apartado aquí o desde la barra de navegación superior.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {NAV_SECTIONS.filter((s) => s.id !== "inicio").map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => navigateToSection(sec.id)}
                        className="p-5 rounded-2xl bg-[#121212]/90 hover:bg-[#161616] border border-zinc-900 hover:border-amber-500/40 text-left transition-all group cursor-pointer flex flex-col justify-between gap-4 shadow-sm"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-amber-500/40 transition-colors">
                              {sec.icon}
                            </div>
                            <span className="font-mono text-[10px] text-zinc-500 group-hover:text-amber-400 transition-colors">
                              {sec.badge}
                            </span>
                          </div>
                          <h3 className="font-mono text-sm font-bold text-zinc-100 group-hover:text-amber-300 uppercase transition-colors">
                            {sec.shortLabel}
                          </h3>
                          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                            {sec.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 font-bold uppercase pt-2 border-t border-zinc-900/80">
                          <span>Ir a la sección</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* =====================================================================
                SECTION 2: GARANTÍAS DE INGENIERÍA & FILOSOFÍA
               ===================================================================== */}
            {shouldRenderSection("garantias") && (
              <section
                id="philosophy-section"
                className="scroll-mt-24 space-y-12 py-4"
              >
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">
                    Garantías de Ingeniería
                  </span>
                  <h2 className="text-3xl font-black font-mono tracking-tight text-zinc-100 uppercase sm:text-4xl">
                    Nuestra Filosofía de Desarrollo Silencioso y Preciso
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    No nos limitamos a programar aplicaciones. Construimos fortificaciones de software optimizadas bajo estándares de seguridad de grado bancario y arquitecturas de diseño vanguardistas.
                  </p>
                </div>

                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {BENEFITS.map((b, idx) => (
                    <motion.div
                      id={`benefit-card-${idx}`}
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      whileHover={{ y: -4 }}
                      className="p-6 bg-[#121212] border-l-4 border-zinc-800 hover:border-amber-500 transition-all duration-300 rounded-r-2xl space-y-4 shadow-sm group flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-center transition-colors group-hover:bg-amber-500/10 group-hover:border-amber-500/30">
                            {b.icon}
                          </div>
                          <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 font-mono text-[10px] text-amber-400">
                            {b.metric}
                          </span>
                        </div>
                        <h3 className="font-mono text-sm font-bold text-zinc-200 tracking-wide group-hover:text-amber-400 transition-colors uppercase">
                          {b.title}
                        </h3>
                        <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                          {b.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Protocol Summary Banner */}
                <div className="bg-[#111111] border border-zinc-900 rounded-2xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8 space-y-2">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                      Estándar de Ejecución Scorpion Code
                    </span>
                    <h3 className="text-lg font-mono font-bold text-zinc-100 uppercase">
                      Auditoría Shift-Left y Despliegue de Misión Crítica
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      Cada línea de código pasa por validación estática, pruebas de contratos API, control de secretos y perfilado de rendimiento antes de llegar a producción. Explora nuestro catálogo de servicios para conocer cómo aplicamos esta filosofía a tu proyecto.
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:justify-end gap-3">
                    <button
                      onClick={() => navigateToSection("catalogo")}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <span>Ver Catálogo de Servicios</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* =====================================================================
                SECTION 3: CATÁLOGO OFICIAL DE SERVICIOS (SIN PRECIOS)
               ===================================================================== */}
            {shouldRenderSection("catalogo") && (
              <div className="scroll-mt-24 py-4">
                <ServicesCatalog />
              </div>
            )}

            {/* =====================================================================
                SECTION 4: SIMULADOR TECNOLÓGICO (TECH GRID)
               ===================================================================== */}
            {shouldRenderSection("tecnologia") && (
              <section
                id="tech-simulator-section"
                className="scroll-mt-24 space-y-10 py-4"
              >
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">
                    Laboratorio de Ingeniería Interactiva
                  </span>
                  <h2 className="text-3xl font-black font-mono tracking-tight text-zinc-100 uppercase sm:text-4xl">
                    Simulador Core &amp; Caché de Componentes
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    Inspecciona nuestros módulos de cifrado elíptico, conectores vectoriales de IA, bitácoras inmutables SHA-256 y orquestación Cloud ejecutando una compilación simulada en tiempo real.
                  </p>
                </div>

                <TechGrid />
              </section>
            )}

            {/* =====================================================================
                SECTION 5: COTIZADOR AI (SMART PROJECT ESTIMATOR)
               ===================================================================== */}
            {shouldRenderSection("estimador") && (
              <section
                id="estimator-section"
                className="scroll-mt-24 space-y-12 py-4"
              >
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">
                    Inteligencia Artificial Sincronizada
                  </span>
                  <h2 className="text-3xl font-black font-mono tracking-tight text-zinc-100 uppercase sm:text-4xl">
                    Calculadora Neurológica de Alcance
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    Describe los objetivos técnicos de tu software y nuestro núcleo de IA estructurará un blueprint arquitectónico con stack recomendado e hitos de ingeniería en segundos.
                  </p>
                </div>

                <div id="quote-wrapper" className="max-w-4xl mx-auto">
                  <QuoteEstimator />
                </div>
              </section>
            )}

            {/* =====================================================================
                SECTION 6: CASOS DE ÉXITO / SOCIOS ESTRATÉGICOS
               ===================================================================== */}
            {shouldRenderSection("testimonios") && (
              <section
                id="testimonials-section"
                className="scroll-mt-24 space-y-12 py-4"
              >
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">
                    Socios Estratégicos
                  </span>
                  <h2 className="text-3xl font-black font-mono tracking-tight text-zinc-100 uppercase sm:text-4xl">
                    Nuestros Códigos Hablan Por Sí Mismos
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    Organizaciones de alto perfil técnico confían en Scorpion Code para construir y blindar sus plataformas críticas.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {REVIEWS.map((r, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: idx * 0.12 }}
                      whileHover={{ y: -4 }}
                      className="bg-[#121212]/95 border border-zinc-900 rounded-2xl p-6 sm:p-8 space-y-5 hover:border-amber-500/35 transition-all shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/25 rounded text-[10px] font-mono text-amber-400 uppercase">
                              {r.tag}
                            </span>
                            <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/25 rounded text-[10px] font-mono text-emerald-400">
                              {r.impact}
                            </span>
                          </div>
                          <div className="flex text-amber-400">
                            {[...Array(r.stars)].map((_, sIdx) => (
                              <Star key={sIdx} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-300 italic font-sans leading-relaxed">
                          &ldquo;{r.text}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center gap-3.5 border-t border-zinc-900/60 pt-4 mt-2">
                        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 font-mono font-bold text-xs text-amber-400 flex items-center justify-center uppercase shadow-inner">
                          {r.name.substring(0, 2)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-zinc-200 font-mono">
                            {r.name}
                          </h4>
                          <p className="text-[11px] text-zinc-500 font-sans">
                            {r.role},{" "}
                            <strong className="text-zinc-400">{r.company}</strong>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA inside Testimonials */}
                <div className="max-w-5xl mx-auto bg-[#111111] border border-zinc-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h3 className="font-mono text-sm font-bold text-zinc-100 uppercase">
                      ¿Listo para convertir tu arquitectura en nuestro próximo caso de éxito?
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans">
                      Agenda una sesión técnica directa con nuestros arquitectos por WhatsApp o correo electrónico.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => navigateToSection("contacto")}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase cursor-pointer transition-colors"
                    >
                      Ir a Contacto_
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* =====================================================================
                SECTION 7: CONTACTO CORPORATIVO
               ===================================================================== */}
            {shouldRenderSection("contacto") && (
              <section
                id="contact-section"
                className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start py-4"
              >
                {/* Info Side */}
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-amber-400 font-mono text-xs tracking-widest uppercase block">
                    Enlace Corporativo
                  </span>
                  <h2 className="text-3xl font-black font-mono tracking-tight text-zinc-100 uppercase">
                    Hablemos De Tu Próxima Solución
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    ¿Listo para dar el gran salto tecnológico? Contáctanos por WhatsApp o correo electrónico para recibir una cotización personalizada, o completa nuestro nodo de requerimiento corporativo.
                  </p>

                  <div className="space-y-4 pt-2">
                    <div className="flex gap-3 items-center">
                      <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[10px] text-zinc-500 uppercase font-mono">
                          Correo Electrónico Oficial
                        </span>
                        <a
                          href={buildGmailComposeUrl(
                            getCustomContactEmailSubject(),
                            getCustomContactEmailBody()
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-zinc-200 font-mono hover:text-amber-400 transition-colors"
                          title="Redactar correo personalizado en Gmail"
                        >
                          {SCORPION_CONTACT.email}
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
                        <span className="block text-[10px] text-zinc-500 uppercase font-mono">
                          Línea Directa / WhatsApp
                        </span>
                        <a
                          href={buildWhatsAppUrl(getCustomContactWhatsAppMessage())}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-zinc-200 font-mono hover:text-emerald-400 transition-colors flex items-center gap-2"
                        >
                          {SCORPION_CONTACT.whatsappDisplay}
                          <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded uppercase font-bold">
                            Activo
                          </span>
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-[10px] text-zinc-500 uppercase font-mono">
                          Sede Operativa
                        </span>
                        <p className="text-xs text-zinc-200 font-mono">
                          Cloud Sandbox Environment / Operaciones Globales
                        </p>
                      </div>
                    </div>

                    {/* Botones Principales Destacados: WhatsApp & Correo */}
                    <div className="pt-3 space-y-2.5">
                      <a
                        href={buildWhatsAppUrl(getCustomContactWhatsAppMessage())}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-mono font-bold text-xs tracking-wider uppercase cursor-pointer shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-0.5"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 fill-current shrink-0"
                        >
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.65L5.27 16.62L5.07 16.3C4.26 15 3.81 13.48 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.23 7.35C9.04 7.35 8.74 7.42 8.49 7.69C8.24 7.96 7.54 8.62 7.54 9.96C7.54 11.3 8.52 12.6 8.65 12.78C8.79 12.96 10.58 15.72 13.32 16.9C15.6 17.88 16.07 17.68 16.56 17.63C17.06 17.59 18.16 16.98 18.39 16.33C18.62 15.68 18.62 15.13 18.55 15.01C18.48 14.89 18.29 14.82 18.01 14.68C17.74 14.54 16.38 13.87 16.13 13.78C15.87 13.68 15.69 13.64 15.5 13.91C15.32 14.19 14.79 14.82 14.63 15.01C14.47 15.19 14.31 15.22 14.04 15.08C13.76 14.94 12.88 14.65 11.83 13.72C11.02 12.99 10.47 12.09 10.31 11.82C10.15 11.54 10.29 11.39 10.43 11.25C10.56 11.12 10.72 10.91 10.86 10.75C11 10.59 11.05 10.47 11.14 10.29C11.23 10.1 11.19 9.94 11.12 9.8C11.05 9.66 10.5 8.32 10.27 7.76C10.05 7.23 9.82 7.3 9.65 7.29C9.5 7.29 9.32 7.29 9.23 7.35Z" />
                        </svg>
                        <span>Chatear por WhatsApp Ahora</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </a>

                      <a
                        href={buildGmailComposeUrl(
                          getCustomContactEmailSubject(),
                          getCustomContactEmailBody()
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-mono font-bold text-xs tracking-wider uppercase cursor-pointer transition-all"
                      >
                        <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Redactar Correo Personalizado</span>
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
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase">
                          Tu Nombre / Representante
                        </label>
                        <input
                          required
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Ej: Jahdiel Rosales"
                          className="w-full bg-black/60 text-xs text-zinc-100 placeholder:text-zinc-600 rounded-xl border border-zinc-800 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono text-zinc-500 uppercase">
                          Correo Electrónico Corporativo
                        </label>
                        <input
                          required
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="Ej: contacto@empresa.com"
                          className="w-full bg-black/60 text-xs text-zinc-100 placeholder:text-zinc-600 rounded-xl border border-zinc-800 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase">
                        Servicio del Catálogo de Interés
                      </label>
                      <select
                        value={contactService}
                        onChange={(e) => setContactService(e.target.value)}
                        className="w-full bg-black text-xs text-zinc-300 rounded-xl border border-zinc-800 p-3 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                      >
                        {SCORPION_SERVICES_CATALOG.map((srv) => (
                          <option key={srv.id} value={srv.title}>
                            [{srv.code}] {srv.title}
                          </option>
                        ))}
                        <option value="Proyecto Integral / A Medida">
                          Proyecto Integral / Arquitectura a Medida
                        </option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase">
                        Detalle Adicional del Requerimiento
                      </label>
                      <textarea
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Describe brevemente los entregables esperados..."
                        rows={4}
                        className="w-full bg-black/60 text-xs text-zinc-100 placeholder:text-zinc-600 rounded-xl border border-zinc-800 p-4 focus:outline-none focus:ring-1 focus:ring-amber-500/30 resize-none font-sans leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-zinc-900 hover:bg-amber-950/20 text-zinc-300 hover:text-amber-400 border border-zinc-800 hover:border-amber-500/40 font-bold tracking-wide rounded-xl py-3 text-xs flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                    >
                      DECLARAR REQUERIMIENTO CORPORATIVO_
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>

                    <div className="pt-3 border-t border-zinc-900/80 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <a
                        href={buildWhatsAppUrl(getCustomContactWhatsAppMessage())}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/35 hover:border-emerald-400 text-emerald-300 font-mono text-[10px] font-bold uppercase transition-colors"
                      >
                        <span>Enviar por WhatsApp ({selectedCatalogService?.code || "WA"})</span>
                      </a>

                      <a
                        href={buildGmailComposeUrl(
                          getCustomContactEmailSubject(),
                          getCustomContactEmailBody()
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 hover:border-amber-400 text-amber-300 font-mono text-[10px] font-bold uppercase transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-amber-400" />
                        <span>Enviar por Correo ({selectedCatalogService?.code || "MAIL"})</span>
                      </a>
                    </div>
                  </form>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>

        {/* SECTION PAGINATION BAR (IN INDEPENDENT SECTION VIEW MODE) */}
        {viewMode === "sections" && (
          <div className="pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevSection ? (
              <button
                onClick={() => navigateToSection(prevSection.id)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 text-zinc-300 hover:text-amber-300 font-mono text-xs flex items-center justify-center sm:justify-start gap-2.5 cursor-pointer transition-all"
              >
                <ArrowLeft className="w-4 h-4 text-amber-400" />
                <div className="text-left">
                  <span className="block text-[9px] text-zinc-500 uppercase">
                    Apartado Anterior
                  </span>
                  <span className="font-bold uppercase">{prevSection.shortLabel}</span>
                </div>
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            <div className="flex items-center gap-1.5">
              {NAV_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => navigateToSection(sec.id)}
                  title={sec.shortLabel}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeTab === sec.id
                      ? "w-7 bg-amber-400"
                      : "w-2 bg-zinc-800 hover:bg-zinc-600"
                  }`}
                />
              ))}
            </div>

            {nextSection ? (
              <button
                onClick={() => navigateToSection(nextSection.id)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/60 text-amber-300 font-mono text-xs flex items-center justify-center sm:justify-end gap-2.5 cursor-pointer transition-all"
              >
                <div className="text-right">
                  <span className="block text-[9px] text-amber-400/70 uppercase">
                    Siguiente Apartado
                  </span>
                  <span className="font-bold uppercase">{nextSection.shortLabel}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            ) : (
              <button
                onClick={() => navigateToSection("inicio")}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 text-zinc-300 hover:text-amber-300 font-mono text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Volver a Inicio</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            )}
          </div>
        )}
      </main>

      {/* FOOTER TERMINAL CREDITS */}
      <footer className="border-t border-zinc-900/60 bg-black py-10 text-zinc-500 font-sans mt-16">
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
              <span className="font-mono text-sm font-bold text-zinc-200 tracking-wider">
                SCORPION CODE
              </span>
            </div>
            <p className="text-[11px] text-zinc-500">
              &copy; {new Date().getFullYear()} Scorpion Code. Todos los derechos reservados.
            </p>
          </div>

          {/* Quick legal compliance or technology label */}
          <div className="flex flex-col items-center md:items-start font-mono text-[10px] space-y-1">
            <span className="text-zinc-500">ESTADO RED: ONLINE (SSL V3 ACTIVE)</span>
            <span className="text-amber-500/70">COMPILACIÓN CLIENTE: v2.4.0_MODULAR</span>
          </div>

          {/* Sede Operativa */}
          <div className="text-center md:text-right font-mono text-[10px]">
            <div className="text-amber-400 font-bold uppercase tracking-widest">
              Navegación Rápida
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-2 mt-1.5">
              {NAV_SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => navigateToSection(s.id)}
                  className="text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer uppercase"
                >
                  {s.shortLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Contacto Directo & WhatsApp */}
          <div className="text-center md:text-right font-mono text-[10px] space-y-1">
            <div className="text-amber-400 font-bold uppercase tracking-widest">
              Contacto Directo
            </div>
            <div>
              <a
                href={buildGmailComposeUrl(GENERAL_EMAIL_SUBJECT, GENERAL_EMAIL_BODY)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-amber-400 transition-colors"
              >
                {SCORPION_CONTACT.email}
              </a>
            </div>
            <div>
              <a
                href={buildWhatsAppUrl(GENERAL_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
              >
                <span>WhatsApp: {SCORPION_CONTACT.whatsappDisplay}</span>
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
              className="w-full max-w-md bg-zinc-950 border border-amber-500/30 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-center font-sans space-y-4"
            >
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-mono text-sm font-bold text-zinc-100 uppercase tracking-wide">
                  Requerimiento Listo Para Envío
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Hola <strong className="text-amber-300">{contactName}</strong>, hemos
                  generado la redacción personalizada para{" "}
                  <strong className="text-zinc-200">{contactService}</strong>. Elige el
                  canal por el cual deseas enviar tu solicitud ahora mismo:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <a
                  href={buildGmailComposeUrl(
                    getCustomContactEmailSubject(),
                    getCustomContactEmailBody()
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-mono font-bold uppercase rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Enviar por Gmail</span>
                </a>

                <a
                  href={buildWhatsAppUrl(getCustomContactWhatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black text-xs font-mono font-bold uppercase rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Enviar por WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-900 text-[11px] font-mono">
                <a
                  href={buildMailtoUrl(
                    getCustomContactEmailSubject(),
                    getCustomContactEmailBody()
                  )}
                  className="text-zinc-400 hover:text-amber-300 transition-colors"
                >
                  Abrir en App de Correo del Sistema
                </a>
                <button
                  onClick={closeFormModal}
                  className="text-zinc-500 hover:text-zinc-200 cursor-pointer"
                >
                  Cerrar ventana
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
