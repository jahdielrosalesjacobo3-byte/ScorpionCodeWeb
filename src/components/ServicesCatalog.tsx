import React, { useState } from "react";
import {
  Code,
  Cpu,
  Shield,
  Sparkles,
  Layers,
  RefreshCw,
  CheckCircle2,
  Mail,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  FileText,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  SCORPION_SERVICES_CATALOG,
  SCORPION_CONTACT,
  GENERAL_WHATSAPP_MESSAGE,
  GENERAL_EMAIL_SUBJECT,
  GENERAL_EMAIL_BODY,
  buildWhatsAppUrl,
  buildGmailComposeUrl,
  buildMailtoUrl,
  type ScorpionServiceItem,
} from "../data/servicesCatalog";

function getServiceIcon(id: string) {
  switch (id) {
    case "frontend-elite":
      return <Code className="w-5 h-5 text-amber-400" />;
    case "backend-cloud-apis":
      return <Layers className="w-5 h-5 text-amber-400" />;
    case "cybersecurity-shield":
      return <Shield className="w-5 h-5 text-amber-400" />;
    case "ai-cognitive-cores":
      return <Sparkles className="w-5 h-5 text-amber-400" />;
    case "cloud-devops-cicd":
      return <Cpu className="w-5 h-5 text-amber-400" />;
    case "software-modernization":
      return <RefreshCw className="w-5 h-5 text-amber-400" />;
    default:
      return <Code className="w-5 h-5 text-amber-400" />;
  }
}

export default function ServicesCatalog() {
  const [selectedServiceForPreview, setSelectedServiceForPreview] =
    useState<ScorpionServiceItem | null>(null);
  const [previewChannel, setPreviewChannel] = useState<"email" | "whatsapp">("email");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Fallback silent
    }
  };

  return (
    <motion.section
      id="services-catalog-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-12"
    >
      {/* Header Copy */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">
          Catálogo Oficial de Soluciones
        </span>
        <h2 className="text-3xl font-black font-mono tracking-tight text-zinc-100 uppercase sm:text-4xl">
          Catálogo de Servicios Scorpion Code
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
          Cada arquitectura que diseñamos se construye a la medida de los objetivos técnicos, operativos y de seguridad de tu organización. Selecciona el servicio de tu interés para iniciar una cotización personalizada por WhatsApp o Correo Electrónico con redacción técnica pre-cargada.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SCORPION_SERVICES_CATALOG.map((service: ScorpionServiceItem, idx: number) => {
          const waUrl = buildWhatsAppUrl(service.whatsappPrefill);
          const gmailUrl = buildGmailComposeUrl(
            service.emailSubject,
            service.emailBody
          );
          const mailtoUrl = buildMailtoUrl(
            service.emailSubject,
            service.emailBody
          );

          return (
            <motion.div
              key={service.id}
              id={`service-catalog-card-${service.id}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06 * idx, ease: "easeOut" }}
              whileHover={{ y: -5 }}
              className="bg-[#121212]/95 border border-zinc-900 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.45)] group"
            >
              <div className="space-y-4">
                {/* Top badge & icon */}
                <div className="flex items-center justify-between gap-2">
                  <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-colors">
                    {getServiceIcon(service.id)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 font-mono text-[10px] text-amber-400 uppercase tracking-wider">
                      {service.tag}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">
                      [{service.code}]
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="font-mono text-sm font-bold text-zinc-100 group-hover:text-amber-300 transition-colors uppercase leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Deliverables / Highlights */}
                <ul className="space-y-2 pt-2 border-t border-zinc-900/80">
                  {service.highlights.map((item, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-2 text-[11px] text-zinc-300 font-sans leading-relaxed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Footer: Quote via WhatsApp or Email (NO PRICES) */}
              <div className="pt-4 border-t border-zinc-900/90 space-y-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase">
                  <span>Modalidad</span>
                  <span className="text-amber-400 font-semibold">
                    Cotización a Medida
                  </span>
                </div>

                {/* Primary Functional CTA Buttons: WhatsApp & Gmail Web */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                    title={`Enviar mensaje personalizado por WhatsApp para ${service.title}`}
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.65L5.27 16.62L5.07 16.3C4.26 15 3.81 13.48 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.23 7.35C9.04 7.35 8.74 7.42 8.49 7.69C8.24 7.96 7.54 8.62 7.54 9.96C7.54 11.3 8.52 12.6 8.65 12.78C8.79 12.96 10.58 15.72 13.32 16.9C15.6 17.88 16.07 17.68 16.56 17.63C17.06 17.59 18.16 16.98 18.39 16.33C18.62 15.68 18.62 15.13 18.55 15.01C18.48 14.89 18.29 14.82 18.01 14.68C17.74 14.54 16.38 13.87 16.13 13.78C15.87 13.68 15.69 13.64 15.5 13.91C15.32 14.19 14.79 14.82 14.63 15.01C14.47 15.19 14.31 15.22 14.04 15.08C13.76 14.94 12.88 14.65 11.83 13.72C11.02 12.99 10.47 12.09 10.31 11.82C10.15 11.54 10.29 11.39 10.43 11.25C10.56 11.12 10.72 10.91 10.86 10.75C11 10.59 11.05 10.47 11.14 10.29C11.23 10.1 11.19 9.94 11.12 9.8C11.05 9.66 10.5 8.32 10.27 7.76C10.05 7.23 9.82 7.3 9.65 7.29C9.5 7.29 9.32 7.29 9.23 7.35Z" />
                    </svg>
                    <span>Cotizar por WA</span>
                  </a>

                  <a
                    href={gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                    title={`Redactar correo personalizado para ${service.title} (${SCORPION_CONTACT.email})`}
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Cotizar Correo</span>
                  </a>
                </div>

                {/* Secondary Action Row: View Custom Redaction or Open Native Mail App */}
                <div className="flex items-center justify-between pt-1 text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedServiceForPreview(service);
                      setPreviewChannel("email");
                    }}
                    className="text-zinc-400 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3 h-3 text-amber-400/80" />
                    <span>Ver redacción personalizada</span>
                  </button>

                  <a
                    href={mailtoUrl}
                    className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
                    title="Abrir en aplicación de correo nativa del sistema (Apple Mail / Outlook)"
                  >
                    <span>App Correo</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Banner Inviting Direct Contact for Custom Quotes */}
      <div className="bg-gradient-to-r from-zinc-950 via-[#121212] to-zinc-950 border border-amber-500/30 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_0_35px_rgba(212,175,55,0.08)]">
        <div className="space-y-2 text-center lg:text-left max-w-2xl">
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
            Atención Corporativa Personalizada
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-mono text-zinc-100 uppercase">
            ¿Listo para cotizar un proyecto integral con Scorpion Code?
          </h3>
          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
            No manejamos tarifas genéricas: evaluamos la arquitectura y alcance exacto de tu requerimiento sin compromiso. Contáctanos directamente por WhatsApp al{" "}
            <strong className="text-emerald-400 font-mono">
              {SCORPION_CONTACT.whatsappDisplay}
            </strong>{" "}
            o envíanos un correo pre-redactado a{" "}
            <strong className="text-amber-300 font-mono">
              {SCORPION_CONTACT.email}
            </strong>
            .
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
          <a
            href={buildWhatsAppUrl(GENERAL_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(16,185,129,0.25)] transition-all cursor-pointer"
          >
            <span>Cotizar por WhatsApp</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </a>
          <a
            href={buildGmailComposeUrl(GENERAL_EMAIL_SUBJECT, GENERAL_EMAIL_BODY)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Redactar Correo ({SCORPION_CONTACT.email})</span>
          </a>
        </div>
      </div>

      {/* MODAL DE PREVISUALIZACIÓN Y ENVÍO DE REDACCIÓN PERSONALIZADA POR SERVICIO */}
      <AnimatePresence>
        {selectedServiceForPreview && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-[#0e0e0e] border border-amber-500/35 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.95)] space-y-5 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-zinc-900 pb-4">
                <div>
                  <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest">
                    [{selectedServiceForPreview.code}] Redacción Personalizada de Cotización
                  </span>
                  <h4 className="font-mono text-base font-bold text-zinc-100 uppercase mt-1">
                    {selectedServiceForPreview.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedServiceForPreview(null)}
                  className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 border border-zinc-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Channel Switcher Tabs */}
              <div className="grid grid-cols-2 gap-2 bg-zinc-950 p-1 rounded-xl border border-zinc-900 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewChannel("email")}
                  className={`py-2 px-3 rounded-lg uppercase font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    previewChannel === "email"
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/40"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Plantilla de Correo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewChannel("whatsapp")}
                  className={`py-2 px-3 rounded-lg uppercase font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    previewChannel === "whatsapp"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/40"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <span>Plantilla de WhatsApp</span>
                </button>
              </div>

              {previewChannel === "email" ? (
                <div className="space-y-3 text-left">
                  <div className="bg-black/70 border border-zinc-900 rounded-xl p-3.5 space-y-1.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-zinc-500">PARA:</span>
                      <span className="text-amber-300 font-bold">
                        {SCORPION_CONTACT.email}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] border-t border-zinc-900/80 pt-1.5">
                      <span className="text-zinc-500 shrink-0">ASUNTO:</span>
                      <span className="text-zinc-200 font-semibold text-right">
                        {selectedServiceForPreview.emailSubject}
                      </span>
                    </div>
                  </div>

                  <div className="bg-black/80 border border-zinc-900 rounded-xl p-4">
                    <pre className="text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed">
                      {selectedServiceForPreview.emailBody}
                    </pre>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                    <a
                      href={buildGmailComposeUrl(
                        selectedServiceForPreview.emailSubject,
                        selectedServiceForPreview.emailBody
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-mono font-bold text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Abrir en Gmail</span>
                    </a>

                    <a
                      href={buildMailtoUrl(
                        selectedServiceForPreview.emailSubject,
                        selectedServiceForPreview.emailBody
                      )}
                      className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/40 text-zinc-200 font-mono font-bold text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                      <span>App de Correo</span>
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          `Asunto: ${selectedServiceForPreview.emailSubject}\n\n${selectedServiceForPreview.emailBody}`,
                          "email"
                        )
                      }
                      className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-mono text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copiedField === "email" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-amber-400" />
                          <span>Copiar Correo</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-left">
                  <div className="bg-black/70 border border-zinc-900 rounded-xl p-3.5 flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-500">DESTINO WHATSAPP:</span>
                    <span className="text-emerald-400 font-bold">
                      {SCORPION_CONTACT.whatsappDisplay}
                    </span>
                  </div>

                  <div className="bg-black/80 border border-zinc-900 rounded-xl p-4">
                    <pre className="text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed">
                      {selectedServiceForPreview.whatsappPrefill}
                    </pre>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    <a
                      href={buildWhatsAppUrl(
                        selectedServiceForPreview.whatsappPrefill
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-mono font-bold text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Abrir en WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          selectedServiceForPreview.whatsappPrefill,
                          "wa"
                        )
                      }
                      className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-mono text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copiedField === "wa" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copiar Mensaje WA</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
