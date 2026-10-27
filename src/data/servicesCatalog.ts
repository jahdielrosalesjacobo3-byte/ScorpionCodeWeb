export interface ScorpionServiceItem {
  id: string;
  code: string;
  tag: string;
  title: string;
  shortDescription: string;
  highlights: string[];
  whatsappPrefill: string;
  emailSubject: string;
  emailBody: string;
}

export const SCORPION_CONTACT = {
  email: "scorpioncode2025@gmail.com",
  whatsappDisplay: "+52 56 1014 2522",
  whatsappRaw: "525610142522",
  whatsappNumeric: "+52 5610142522",
} as const;

/**
 * Construye el enlace directo de WhatsApp con mensaje personalizado pre-cargado.
 */
export function buildWhatsAppUrl(customMessage: string): string {
  return `https://wa.me/${SCORPION_CONTACT.whatsappRaw}?text=${encodeURIComponent(
    customMessage
  )}`;
}

/**
 * Construye el enlace funcional de redacción en Gmail Web (abre en nueva pestaña en cualquier navegador)
 * con destinatario, asunto y cuerpo personalizados.
 */
export function buildGmailComposeUrl(subject: string, body: string): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    SCORPION_CONTACT.email
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Construye el enlace mailto: nativo como alternativa para clientes de escritorio (Apple Mail / Outlook).
 */
export function buildMailtoUrl(subject: string, body: string): string {
  return `mailto:${SCORPION_CONTACT.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export const GENERAL_WHATSAPP_MESSAGE = `Hola equipo de *Scorpion Code*, visité su portal web y me gustaría recibir asesoría y una cotización a medida para un proyecto tecnológico.

• *Nombre / Empresa:* 
• *Tipo de solución que busco:* 
• *Objetivo principal:* 

¿Tienen disponibilidad para agendar una breve llamada técnica?`;

export const GENERAL_EMAIL_SUBJECT =
  "Solicitud de Cotización Corporativa — Proyecto de Software a Medida | Scorpion Code";

export const GENERAL_EMAIL_BODY = `Estimado equipo de Ingeniería de Scorpion Code,

Me pongo en contacto con ustedes tras revisar su portal oficial para solicitar una evaluación técnica y cotización a medida para un nuevo requerimiento tecnológico.

DATOS DEL PROYECTO:
• Nombre / Representante: 
• Empresa / Organización: 
• Teléfono / WhatsApp de contacto: 
• Servicio o arquitectura de interés: 
• Descripción general del proyecto y objetivos: 
• Plazo estimado deseado: 

Quedo atento a su respuesta para coordinar una sesión de descubrimiento técnico.

Saludos cordiales.`;

export const SCORPION_SERVICES_CATALOG: ScorpionServiceItem[] = [
  {
    id: "frontend-elite",
    code: "SRV_01",
    tag: "UI / UX & Web Apps",
    title: "Desarrollo Web & Aplicaciones Interactivas de Élite",
    shortDescription:
      "Plataformas web corporativas, aplicaciones progresivas y dashboards ejecutivos en tiempo real con estética vanguardista, animaciones cinéticas y tiempos de respuesta en milisegundos.",
    highlights: [
      "Arquitecturas modernas en React 19, Next.js y TypeScript de tipado estricto",
      "Diseño de interfaces de lujo (Dark & Gold UI), micro-interacciones y fluidez visual",
      "Paneles administrativos, visualización de datos complejos y telemetría en vivo",
      "Optimización extrema de rendimiento, SEO técnico y adaptabilidad móvil total",
    ],
    whatsappPrefill: `Hola equipo de *Scorpion Code*, me interesa cotizar el servicio *[SRV_01] Desarrollo Web & Aplicaciones Interactivas de Élite*.

Busco desarrollar una plataforma web / aplicación interactiva con arquitectura moderna en React & TypeScript, diseño UI/UX de alto impacto y rendimiento optimizado.

• *Nombre / Empresa:* 
• *Tipo de plataforma (Landing corporativa, Web App, Dashboard):* 
• *Funcionalidades clave requeridas:* 

¿Podemos agendar una breve sesión para evaluar el alcance y cotización?`,
    emailSubject:
      "[Cotización SRV_01] Desarrollo Web & Aplicaciones Interactivas de Élite — Scorpion Code",
    emailBody: `Estimado equipo de Ingeniería de Scorpion Code,

Estoy interesado en solicitar una propuesta técnica y cotización a medida para su línea de servicio:
[SRV_01] DESARROLLO WEB & APLICACIONES INTERACTIVAS DE ÉLITE (UI/UX & Web Apps).

Nos interesa implementar una solución con arquitectura en React 19 / Next.js y TypeScript, diseño de interfaz vanguardista, micro-interacciones fluidas y tiempos de respuesta de alto rendimiento.

DETALLES INICIALES DE NUESTRO REQUERIMIENTO:
• Nombre / Contacto: 
• Empresa / Proyecto: 
• WhatsApp / Teléfono: 
• Tipo de solución requerida (Plataforma corporativa / SaaS / Dashboard ejecutivo / PWA): 
• Módulos o vistas principales que necesitamos: 
• ¿Cuentan con diseño previo o requieren diseño UI/UX desde cero?: 
• Plazo estimado de lanzamiento: 

Agradezco de antemano su atención para coordinar una reunión de levantamiento técnico.

Atentamente,`,
  },
  {
    id: "backend-cloud-apis",
    code: "SRV_02",
    tag: "Backend & Sistemas",
    title: "Arquitectura Backend, APIs de Alto Rendimiento & Bases de Datos",
    shortDescription:
      "Ingeniería de núcleos transaccionales robustos, microservicios y APIs de alta disponibilidad diseñados para soportar cargas intensivas sin cuellos de botella.",
    highlights: [
      "Desarrollo de APIs REST, GraphQL y servicios en Node.js, Go y Python (FastAPI)",
      "Modelado de bases de datos relacionales (PostgreSQL / Supabase) y caché en Redis",
      "Bitácoras inmutables (SHA-256), procesamiento asíncrono y tolerancia a fallos",
      "Integración de pasarelas de pago (Stripe, PayPal, FinTech), CRMs y ERPs",
    ],
    whatsappPrefill: `Hola equipo de *Scorpion Code*, me interesa cotizar el servicio *[SRV_02] Arquitectura Backend, APIs de Alto Rendimiento & Bases de Datos*.

Requiero construir o escalar un núcleo transaccional seguro con bases de datos estructuradas (PostgreSQL / Supabase), APIs de baja latencia e integración de servicios.

• *Nombre / Empresa:* 
• *Sistema o integraciones requeridas (Pagos, ERP, CRM, API propia):* 
• *Volumen estimado de operaciones / usuarios:* 

Me gustaría conversar sobre los detalles técnicos para realizar una cotización.`,
    emailSubject:
      "[Cotización SRV_02] Arquitectura Backend, APIs de Alto Rendimiento & BD — Scorpion Code",
    emailBody: `Estimado equipo de Ingeniería de Scorpion Code,

Por medio del presente correo solicito una evaluación técnica y cotización a medida para su servicio:
[SRV_02] ARQUITECTURA BACKEND, APIS DE ALTO RENDIMIENTO & BASES DE DATOS.

Requerimos diseñar e implementar un núcleo backend robusto y escalable (APIs REST/GraphQL, modelado relacional en PostgreSQL/Supabase, manejo de caché e integraciones transaccionales seguras).

ESPECIFICACIONES PRELIMINARES DEL SISTEMA:
• Nombre / Contacto: 
• Empresa / Organización: 
• WhatsApp / Teléfono: 
• Objetivo principal del Backend / API: 
• Integraciones externas necesarias (Stripe, PayPal, Bancos, ERP, CRM, Webhooks): 
• Base de datos actual o requerida: 
• Nivel esperado de concurrencia / transacciones: 

Quedo atento para agendar una llamada con su equipo de arquitectura.

Saludos cordiales,`,
  },
  {
    id: "cybersecurity-shield",
    code: "SRV_03",
    tag: "Cyber Defense",
    title: "Ciberseguridad, Blindaje Criptográfico & Auditoría de Código",
    shortDescription:
      "Fortificación integral de software e infraestructura mediante encriptación avanzada, pruebas de penetración y protocolos de seguridad de grado financiero.",
    highlights: [
      "Cifrado de extremo a extremo (AES-256-GCM, curvas elípticas) y arquitectura Zero-Trust",
      "Auditorías de seguridad en código (SAST/DAST), Pentesting web/API y mitigación de riesgos",
      "Autenticación robusta (OAuth2, MFA, JWT seguros) y control de acceso granular (RBAC/RLS)",
      "Protección contra inyecciones, fugas de datos y endurecimiento de servidores",
    ],
    whatsappPrefill: `Hola equipo de *Scorpion Code*, me interesa cotizar el servicio *[SRV_03] Ciberseguridad, Blindaje Criptográfico & Auditoría de Código*.

Buscamos fortalecer la seguridad de nuestra plataforma mediante auditoría técnica (SAST/Pentesting), cifrado avanzado y blindaje de accesos y datos sensibles.

• *Nombre / Empresa:* 
• *Tipo de activo a proteger (Aplicación Web, API, Base de Datos, Infraestructura):* 
• *Necesidad principal (Auditoría, Pentesting, Blindaje criptográfico, Remedición):* 

¿Podemos coordinar una sesión confidencial para evaluar el alcance?`,
    emailSubject:
      "[Cotización SRV_03] Ciberseguridad, Blindaje Criptográfico & Auditoría de Código — Scorpion Code",
    emailBody: `Estimado equipo de Ciberseguridad de Scorpion Code,

Me dirijo a ustedes para solicitar una propuesta confidencial y cotización a medida correspondiente al servicio:
[SRV_03] CIBERSEGURIDAD, BLINDAJE CRIPTOGRÁFICO & AUDITORÍA DE CÓDIGO.

Necesitamos evaluar y fortalecer la postura de seguridad de nuestra infraestructura/software (auditoría de vulnerabilidades SAST/DAST, pruebas de penetración en APIs/Web, cifrado de datos sensibles y esquemas Zero-Trust / RBAC).

INFORMACIÓN DEL ACTIVO A EVALUAR:
• Nombre / Responsable de TI o Seguridad: 
• Empresa / Organización: 
• WhatsApp / Teléfono: 
• Activos tecnológicos a auditar o blindar (Web App, APIs, Servidores, Bases de Datos): 
• Alcance requerido (Auditoría de código / Pentesting / Implementación de cifrado y autenticación MFA-RBAC): 
• ¿Existe algún requerimiento normativo o fecha crítica de cumplimiento?: 

Agradezco su pronta respuesta para establecer contacto técnico bajo confidencialidad.

Atentamente,`,
  },
  {
    id: "ai-cognitive-cores",
    code: "SRV_04",
    tag: "AI & Automation",
    title: "Núcleos de Inteligencia Artificial & Automatización Cognitiva",
    shortDescription:
      "Implementación de agentes inteligentes a medida, asistentes conversacionales corporativos y flujos automatizados conectados a los procesos reales de tu empresa.",
    highlights: [
      "Agentes conversacionales especializados entrenados exclusivamente con datos de tu negocio",
      "Arquitecturas RAG, embeddings vectoriales y búsqueda semántica de alta velocidad",
      "Automatización de cotizaciones, atención a prospectos, análisis y clasificación documental",
      "Integración segura con motores LLM empresariales (NVIDIA NIM, Gemini y modelos dedicados)",
    ],
    whatsappPrefill: `Hola equipo de *Scorpion Code*, me interesa cotizar el servicio *[SRV_04] Núcleos de Inteligencia Artificial & Automatización Cognitiva*.

Queremos integrar agentes de IA personalizados / arquitectura RAG entrenados con la información de nuestro negocio para automatizar atención, análisis o procesos internos.

• *Nombre / Empresa:* 
• *Caso de uso de IA (Agente conversacional, RAG documental, Automatización de flujos):* 
• *Canales o sistemas donde se integrará (Web, WhatsApp, CRM, Interno):* 

¿Me apoyan con información para agendar una demostración y cotización a medida?`,
    emailSubject:
      "[Cotización SRV_04] Núcleos de Inteligencia Artificial & Automatización Cognitiva — Scorpion Code",
    emailBody: `Estimado equipo de Inteligencia Artificial de Scorpion Code,

Les escribo con el propósito de solicitar una cotización personalizada para el servicio:
[SRV_04] NÚCLEOS DE INTELIGENCIA ARTIFICIAL & AUTOMATIZACIÓN COGNITIVA.

Estamos interesados en diseñar e integrar soluciones de IA empresarial (agentes conversacionales acotados a nuestro dominio corporativo, arquitecturas RAG con bases vectoriales y automatización inteligente de flujos operativos).

PERFIL DEL PROYECTO DE IA:
• Nombre / Contacto: 
• Empresa / Giro de negocio: 
• WhatsApp / Teléfono: 
• Proceso que deseamos potenciar o automatizar con IA: 
• Fuentes de datos disponibles (Catálogos, PDFs, Base de datos, APIs internas): 
• Canales de despliegue deseados (Portal Web, WhatsApp, Panel interno, CRM): 

Quedo a la espera de sus comentarios para agendar una sesión de evaluación técnica.

Saludos cordiales,`,
  },
  {
    id: "cloud-devops-cicd",
    code: "SRV_05",
    tag: "Cloud & DevOps",
    title: "Infraestructura Cloud, DevOps & Pipelines Continuos",
    shortDescription:
      "Despliegue, escalamiento y orquestación en la nube con contenedores asegurados, integración continua y disponibilidad garantizada sin caídas de servicio.",
    highlights: [
      "Infraestructura como Código (Terraform), contenedores Docker y clústeres Kubernetes",
      "Arquitecturas en AWS, Google Cloud, Azure y despliegues Edge/Serverless en Vercel",
      "Pipelines CI/CD automatizados con validación de calidad y escaneo previo a producción",
      "Monitoreo proactivo, observabilidad, respaldos redundantes y optimización de costos cloud",
    ],
    whatsappPrefill: `Hola equipo de *Scorpion Code*, me interesa cotizar el servicio *[SRV_05] Infraestructura Cloud, DevOps & Pipelines Continuos*.

Necesitamos optimizar nuestros despliegues en la nube (AWS / GCP / Azure / Vercel), contenedorización con Docker/Terraform y automatización de pipelines CI/CD sin caídas.

• *Nombre / Empresa:* 
• *Proveedor Cloud actual o deseado:* 
• *Objetivo principal (Migración cloud, CI/CD, Alta disponibilidad, Optimización de costos):* 

¿Podemos revisar los requerimientos para una cotización personalizada?`,
    emailSubject:
      "[Cotización SRV_05] Infraestructura Cloud, DevOps & Pipelines Continuos — Scorpion Code",
    emailBody: `Estimado equipo de Cloud & DevOps de Scorpion Code,

Me pongo en contacto con ustedes para solicitar una cotización a medida referente a su servicio:
[SRV_05] INFRAESTRUCTURA CLOUD, DEVOPS & PIPELINES CONTINUOS.

Buscamos profesionalizar nuestra infraestructura en la nube mediante automatización CI/CD, contenedores Docker, Infraestructura como Código (Terraform), alta disponibilidad y monitoreo proactivo.

ESTADO ACTUAL Y OBJETIVOS CLOUD:
• Nombre / Contacto: 
• Empresa / Organización: 
• WhatsApp / Teléfono: 
• Entorno Cloud actual o preferido (AWS, Google Cloud, Azure, Vercel, Híbrido): 
• Necesidad prioritaria (Migración / Automatización CI-CD / Escalabilidad / Reducción de costos): 
• Descripción breve de las aplicaciones alojadas actualmente: 

Quedo atento para coordinar una llamada de diagnóstico técnico.

Atentamente,`,
  },
  {
    id: "software-modernization",
    code: "SRV_06",
    tag: "Advisory & Refactor",
    title: "Modernización de Sistemas Legacy & Consultoría de Arquitectura",
    shortDescription:
      "Rescate, refactorización y evolución tecnológica de plataformas existentes para eliminar deuda técnica, acelerar tiempos de respuesta y escalar tu operación.",
    highlights: [
      "Diagnóstico profundo de arquitectura, rendimiento de base de datos y seguridad",
      "Migración sin fricción de sistemas heredados hacia stacks modernos y mantenibles",
      "Estandarización en TypeScript, limpieza de código y pruebas automatizadas",
      "Acompañamiento técnico estratégico para empresas en crecimiento y lanzamientos críticos",
    ],
    whatsappPrefill: `Hola equipo de *Scorpion Code*, me interesa cotizar el servicio *[SRV_06] Modernización de Sistemas Legacy & Consultoría de Arquitectura*.

Contamos con una plataforma en operación que requiere diagnóstico arquitectónico, optimización de rendimiento, eliminación de deuda técnica o migración a tecnologías modernas.

• *Nombre / Empresa:* 
• *Tecnología actual del sistema:* 
• *Principal reto o cuello de botella actual:* 

Me gustaría agendar una sesión de diagnóstico para cotizar el proyecto.`,
    emailSubject:
      "[Cotización SRV_06] Modernización de Sistemas Legacy & Consultoría — Scorpion Code",
    emailBody: `Estimado equipo de Arquitectura de Scorpion Code,

Solicito por este medio una evaluación técnica y cotización a medida para su servicio:
[SRV_06] MODERNIZACIÓN DE SISTEMAS LEGACY & CONSULTORÍA DE ARQUITECTURA.

Actualmente operamos un sistema existente que requiere refactorización estructural, mejora de tiempos de respuesta, actualización tecnológica a un stack moderno (TypeScript / React / Cloud) y aseguramiento de calidad sin detener nuestra operación.

CONTEXTO DEL SISTEMA ACTUAL:
• Nombre / Contacto: 
• Empresa / Organización: 
• WhatsApp / Teléfono: 
• Stack o tecnologías en las que está construido el sistema actual: 
• Principales problemas detectados (Lentitud, errores en producción, dificultad para escalar, deuda técnica): 
• Objetivo esperado tras la modernización: 

Agradezco su atención para programar una sesión de revisión arquitectónica.

Saludos cordiales,`,
  },
];

export function buildCatalogPromptSummary(): string {
  return SCORPION_SERVICES_CATALOG.map(
    (s, idx) =>
      `${idx + 1}. **${s.title}** (${s.tag}): ${s.shortDescription}\n   - Incluye: ${s.highlights.join("; ")}.`
  ).join("\n");
}
