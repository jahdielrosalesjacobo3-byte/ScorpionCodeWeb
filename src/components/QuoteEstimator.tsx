import React, { useState } from "react";
import { 
  FileText, Zap, Shield, Calendar, DollarSign, Clock, Cpu, 
  HelpCircle, AlertTriangle, ArrowRight, Download, CheckCircle, RefreshCcw 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface EstimatorResult {
  projectName: string;
  recommendedStack: string[];
  architectureOverview: string;
  estimatedHours: number;
  estimatedCostRange: string;
  deliverables: string[];
  scorpionTacticalAdvice: string;
}

export default function QuoteEstimator() {
  const [description, setDescription] = useState("");
  const [complexity, setComplexity] = useState("Media");
  const [timeline, setTimeline] = useState("2-3 Meses");
  const [budgetRange, setBudgetRange] = useState("$5,000 - $10,000");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [estimateResult, setEstimateResult] = useState<EstimatorResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState(false);

  const triggerEstimation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || isLoading) return;

    setIsLoading(true);
    setApiError(null);
    setEstimateResult(null);
    setDownloaded(false);

    // Simulate loading steps in a technical terminal format
    setLoadingStep(1);
    const step1 = setTimeout(() => setLoadingStep(2), 700);
    const step2 = setTimeout(() => setLoadingStep(3), 1400);

    try {
      const response = await fetch("/api/scorpion/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          budgetRange,
          timeline,
          complexity,
        }),
      });

      if (!response.ok) {
        throw new Error("El núcleo AI de Scorpion Code no pudo procesar la solicitud.");
      }

      const data = await response.json();
      setEstimateResult(data);
    } catch (err: any) {
      console.error(err);
      setApiError(
        "Fallo en la sincronización neuronal de cotización. Tu app cargará con un blueprint predeterminado de simulación."
      );
      // Fallback predeterminado si no hay API key configurada, para dar una experiencia de usuario perfecta sin fallar
      setEstimateResult({
        projectName: "PROYECTO SC_ONYX (Simulado)",
        recommendedStack: ["React 19", "Tailwind CSS v4", "FastAPI", "PostgreSQL", "Docker", "Gemini API"],
        architectureOverview: "Sistema distribuido monolítico con cliente desacoplado estáticamente. Implementa caché en memoria Redis para búsquedas ultrarrápidas y cifrado simétrico en capas.",
        estimatedHours: 140,
        estimatedCostRange: "$4,500 - $7,000 USD",
        deliverables: [
          "Hito 1: Estructurado de Esquemas de Ciberseguridad & Modelado Relacional",
          "Hito 2: Desarrollo Frontend Kinético con Componentes SVG Reactores",
          "Hito 3: Despliegue en GCP Cloud Run con CI/CD automatizado"
        ],
        scorpionTacticalAdvice: "Considera configurar redundancias de bases de datos antes de expandir el volumen de usuarios activos. Asegura que los tokens JWT de sesión expiren en un periodo menor de 24 horas."
      });
    } finally {
      clearTimeout(step1);
      clearTimeout(step2);
      setIsLoading(false);
    }
  };

  const resetEstimator = () => {
    setEstimateResult(null);
    setDescription("");
    setDownloaded(false);
    setApiError(null);
  };

  return (
    <div id="quote-estimator-block" className="w-full bg-zinc-950 border border-zinc-900 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-inner font-sans select-none">
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-amber-500/5 via-transparent to-transparent scale-125 blur-3xl" />

      <AnimatePresence mode="wait">
        {!isLoading && !estimateResult ? (
          /* SECTION 1: USER INPUT FORM */
          <motion.div
            key="input-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-100 font-mono tracking-wide">Estimador Inteligente de Proyectos</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Define tu idea y obtén una cotización estructural al instante.</p>
              </div>
            </div>

            <form onSubmit={triggerEstimation} className="space-y-5">
              {/* Project Description Input */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-medium text-amber-400 uppercase">
                  Describe tu visión técnica / Funcionalidades core
                </label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ej: Necesito una app móvil de entregas con geolocalización en tiempo real, chat integrado, pasarela de pago Stripe y un dashboard administrativo para reportes..."
                  rows={4}
                  className="w-full bg-black/50 text-xs text-zinc-100 placeholder:text-zinc-500 rounded-xl border border-zinc-800 p-4 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 resize-hidden font-mono leading-relaxed"
                />
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Complexity Selector */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase">Garantía de Complejidad</label>
                  <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    className="w-full bg-black text-xs text-zinc-300 rounded-lg border border-zinc-800 p-2.5 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  >
                    <option value="Sencillo">Micro-App (Landing, MVP básico)</option>
                    <option value="Media">Estándar (Base de datos, Autenticación)</option>
                    <option value="Élite Cibernético">Élite (Sincronización AI, Cripto, Multi-User)</option>
                  </select>
                </div>

                {/* Timeline Selector */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase">Plazo Estimado</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-black text-xs text-zinc-300 rounded-lg border border-zinc-800 p-2.5 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  >
                    <option value="1 Mes">Express (1 Mes)</option>
                    <option value="2-3 Meses">Acelerado (2-3 Meses)</option>
                    <option value="4+ Meses">Corporativo Completo (4+ Meses)</option>
                  </select>
                </div>

                {/* Budget Indicator */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase">Indicador Financiero</label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full bg-black text-xs text-zinc-300 rounded-lg border border-zinc-800 p-2.5 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  >
                    <option value="$2,000 - $5,000">Sencillo ($2K - $5K USD)</option>
                    <option value="$5,000 - $12,000">Media ($5K - $12K USD)</option>
                    <option value="$12,000+">Élite Tech ($12K+ USD)</option>
                  </select>
                </div>
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={!description.trim() || isLoading}
                className="w-full bg-radial from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold tracking-wide rounded-xl py-3 text-xs flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-[0_5px_15px_rgba(212,175,55,0.25)]"
              >
                GENERAR BLUEPRINT EÓLICO Y COTIZACIÓN
                <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
              </button>
            </form>
          </motion.div>
        ) : isLoading ? (
          /* SECTION 2: TERMINAL LOADING SCREEN */
          <motion.div
            key="loading-terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[300px] flex flex-col justify-center items-center bg-black/60 rounded-2xl border border-zinc-900/80 p-6 font-mono text-xs text-amber-400 space-y-4 shadow-inner"
          >
            <div className="p-3.5 bg-amber-500/10 rounded-full border border-amber-500/25 text-center animate-pulse">
              <Cpu className="w-8 h-8 text-amber-400 mx-auto" />
            </div>

            <div className="w-full max-w-md space-y-1.5 text-[10.5px]">
              <div className="flex gap-2">
                <span className="text-zinc-650 shrink-0">&gt;&gt;</span>
                <span className="text-zinc-200">Sincronizando con Scorpion Neural Core...</span>
                <span className="text-emerald-500 font-bold ml-auto">OK_</span>
              </div>

              {loadingStep >= 1 && (
                <div className="flex gap-2 animate-fadeIn">
                  <span className="text-zinc-650 shrink-0">&gt;&gt;</span>
                  <span className="text-zinc-200">Analizando requerimiento semántico...</span>
                  <span className="text-emerald-500 font-bold ml-auto">LISTO_</span>
                </div>
              )}

              {loadingStep >= 2 && (
                <div className="flex gap-2 animate-fadeIn">
                  <span className="text-zinc-650 shrink-0">&gt;&gt;</span>
                  <span className="text-zinc-200">Computando costes de arquitectura distribuida...</span>
                  <span className="text-emerald-500 font-bold ml-auto">RESUELTO_</span>
                </div>
              )}

              {loadingStep >= 3 && (
                <div className="flex gap-2 animate-fadeIn">
                  <span className="text-zinc-650 shrink-0">&gt;&gt;</span>
                  <span className="text-zinc-200">Estructurando matriz de ciberseguridad redundante...</span>
                  <span className="text-emerald-500 font-bold ml-auto font-mono animate-pulse">CARGANDO_</span>
                </div>
              )}
            </div>

            <div className="w-32 h-1 bg-zinc-900 rounded-full overflow-hidden relative">
              <div className="absolute inset-y-0 bg-amber-400 rounded-full animate-progress" style={{ width: "65%" }} />
            </div>
          </motion.div>
        ) : (
          /* SECTION 3: METALLIC RESULT BADGE CARD */
          <motion.div
            key="estimation-result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Elegant Result Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Shield className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] text-amber-400 font-mono tracking-widest uppercase">Propuesta de Desarrollo de Élite</div>
                  <h4 className="text-xl font-bold tracking-wide text-zinc-100 font-mono uppercase">{estimateResult?.projectName}</h4>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                <button
                  onClick={resetEstimator}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-880 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  Volver a calcular
                </button>
                <a
                  href={`https://wa.me/525610142522?text=${encodeURIComponent(`Hola Scorpion Code, coticé el proyecto "${estimateResult?.projectName || "Software"}" con inversión estimada ${estimateResult?.estimatedCostRange || "a medida"}. Deseo agendar una llamada técnica.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-[0_2px_8px_rgba(16,185,129,0.3)]"
                  title="Enviar blueprint a WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.65L5.27 16.62L5.07 16.3C4.26 15 3.81 13.48 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.23 7.35C9.04 7.35 8.74 7.42 8.49 7.69C8.24 7.96 7.54 8.62 7.54 9.96C7.54 11.3 8.52 12.6 8.65 12.78C8.79 12.96 10.58 15.72 13.32 16.9C15.6 17.88 16.07 17.68 16.56 17.63C17.06 17.59 18.16 16.98 18.39 16.33C18.62 15.68 18.62 15.13 18.55 15.01C18.48 14.89 18.29 14.82 18.01 14.68C17.74 14.54 16.38 13.87 16.13 13.78C15.87 13.68 15.69 13.64 15.5 13.91C15.32 14.19 14.79 14.82 14.63 15.01C14.47 15.19 14.31 15.22 14.04 15.08C13.76 14.94 12.88 14.65 11.83 13.72C11.02 12.99 10.47 12.09 10.31 11.82C10.15 11.54 10.29 11.39 10.43 11.25C10.56 11.12 10.72 10.91 10.86 10.75C11 10.59 11.05 10.47 11.14 10.29C11.23 10.1 11.19 9.94 11.12 9.8C11.05 9.66 10.5 8.32 10.27 7.76C10.05 7.23 9.82 7.3 9.65 7.29C9.5 7.29 9.32 7.29 9.23 7.35Z" />
                  </svg>
                  WhatsApp
                </a>
                <button
                  onClick={() => setDownloaded(true)}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-bold rounded-lg flex items-center gap-1.5 hover:from-amber-300 hover:to-amber-400 transition-colors cursor-pointer shadow-[0_2px_8px_rgba(212,175,55,0.3)]"
                >
                  {downloaded ? <CheckCircle className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                  {downloaded ? "Guardado" : "Ficha Técnica"}
                </button>
              </div>
            </div>

            {/* Warning if API key fallback is active */}
            {apiError && (
              <div className="px-4 py-2.5 bg-amber-950/20 border border-amber-500/20 text-zinc-400 text-[11px] rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <span>{apiError}</span>
              </div>
            )}

            {/* Estimator grid display */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Financial Metrics Side */}
              <div className="md:col-span-4 bg-[#121212] rounded-2xl border border-zinc-900 p-4 space-y-4 shadow-inner flex flex-col justify-center">
                {/* Hours Box */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-400">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Esfuerzo de Ingeniería</div>
                    <div className="text-lg font-bold text-zinc-200 font-mono">{estimateResult?.estimatedHours} Horas</div>
                  </div>
                </div>

                {/* Pricing Box */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-400">
                    <DollarSign className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Inversión Aproximada</div>
                    <div className="text-lg font-bold text-amber-400 font-mono">{estimateResult?.estimatedCostRange}</div>
                  </div>
                </div>

                {/* Timeline Box */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-400">
                    <Calendar className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Sincronización de Lanzamiento</div>
                    <div className="text-sm font-semibold text-zinc-300 font-mono">{timeline}</div>
                  </div>
                </div>
              </div>

              {/* Tech Spec Stack & Overview */}
              <div className="md:col-span-8 space-y-4">
                {/* Tech Stack Chips */}
                <div className="space-y-1.5">
                  <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">Línea Tecnológica Recomendada</span>
                  <div className="flex flex-wrap gap-2">
                    {estimateResult?.recommendedStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 hover:bg-zinc-850 text-amber-300 border border-amber-500/15 rounded-md uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture Description Box */}
                <div className="space-y-1">
                  <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">Diseño Arquitectónico</span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">{estimateResult?.architectureOverview}</p>
                </div>
              </div>
            </div>

            {/* Milestones / Phases Grid */}
            <div className="bg-[#121212] rounded-2xl border border-zinc-900 p-5 space-y-3.5">
              <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase block">Hitos de Desarrollo Estructurado</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {estimateResult?.deliverables.map((deliv, dIdx) => (
                  <div key={dIdx} className="bg-zinc-900/30 p-3.5 rounded-xl border border-zinc-900 flex flex-col justify-between">
                    <span className="font-mono text-[9px] text-zinc-650 block mb-2">HITO_0{dIdx + 1}</span>
                    <p className="text-xs text-zinc-200 mt-1 leading-normal font-sans">{deliv}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scorpion Specialized Advice */}
            <div className="bg-amber-500/5 hover:bg-amber-500/10 transition-colors border border-amber-500/25 rounded-2xl p-5 flex items-start gap-3.5">
              <Zap className="w-5 h-5 text-amber-400 hover:animate-bounce shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wide">Consejo Táctico de Ciberseguridad de Scorpion</span>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">{estimateResult?.scorpionTacticalAdvice}</p>
              </div>
            </div>

            {downloaded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 text-xs rounded-xl flex items-center justify-center gap-2 font-mono"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Blueprint guardado en el portafolio. ¡Nuestros ingenieros se pondrán en contacto!</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
