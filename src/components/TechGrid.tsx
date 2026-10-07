import { useState, useEffect } from "react";
import { Terminal, Shield, Cpu, RefreshCw, Layers, CheckCircle2, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TechModule {
  id: string;
  name: string;
  title: string;
  category: string;
  iconName: "shield" | "cpu" | "layers" | "refresh";
  description: string;
  codeSnippet: string;
  consoleMock: string[];
}

const MODULES: TechModule[] = [
  {
    id: "m1",
    name: "CORE SHIELD V3",
    title: "Cifrado Elíptico de Doble Capa",
    category: "Ciberseguridad",
    iconName: "shield",
    description: "Algoritmo personalizado de criptografía sobre curvas elípticas para la protección mutua del estado de la sesión, asegurando inmunidad robusta frente a interceptaciones.",
    codeSnippet: `import { createECDH, createCipheriv } from 'crypto';

export function encryptPayload(data: object, remotePublicKey: string) {
  const ecdh = createECDH('secp256k1');
  ecdh.generateKeys();
  const sharedKey = ecdh.computeSecret(remotePublicKey, 'hex');
  const iv = randomBytes(16);
  
  const cipher = createCipheriv('aes-256-gcm', sharedKey, iv);
  return Buffer.concat([cipher.update(JSON.stringify(data)), cipher.final()]);
}`,
    consoleMock: [
      "[SYSTEM] SSH Handshake... CONECTADO",
      "[CYPHER] Computando curvas elípticas secp256k1...",
      "[SHARED_KEY] Secreto efímero binario generado.",
      "[ENCRYPT] AES-256-GCM clave simétrica inicializada.",
      "[CIPHERTEXT] Payload bloque cifrado exitosamente.",
      "[STATUS] ESTADO SEGURO - INTEGRIDAD COMPROBADA (100%)",
    ],
  },
  {
    id: "m2",
    name: "NEURAL GRAPH v9",
    title: "Conectores de Embedding Vectorial",
    category: "Inteligencia Artificial",
    iconName: "cpu",
    description: "Inyección automática de datos no estructurados en bases de datos vectoriales con filtrado híbrido semántico de alto rendimiento para IA conversacional.",
    codeSnippet: `import { GoogleGenAI } from '@google/genai';

async function generateVectors(text: string) {
  const ai = new GoogleGenAI({ apiKey });
  const embed = await ai.models.generateEmbeddings({
    model: 'gemini-embedding-2-preview',
    contents: text
  });
  return embed.values; // Dimensión 768
}`,
    consoleMock: [
      "[NEURAL_CORE] Inicializando gemini-embedding-2-preview...",
      "[INGEST] Analizando cadenas de texto plano entrantes.",
      "[MODEL] Computando pesos y distancias vectoriales (dim: 768)...",
      "[VECTOR_DB] Sincronizando con base de datos de grafos de alta velocidad.",
      "[MATCH_INFO] Similitud de coseno calculada a 0.98522",
      "[STATUS] EMBEDDING SINCRONIZADO EN TIEMPO REAL.",
    ],
  },
  {
    id: "m3",
    name: "IMMUTABLE LEDGER",
    title: "Motor de Event Sourcing Distribuido",
    category: "Arquitectura Cloud",
    iconName: "layers",
    description: "Bitácora cronológica inmitigable estructurada por hashes SHA-256 encadenados, resolviendo conflictos de concurrencia y garantizando auditorías infalibles.",
    codeSnippet: `interface LedgerBlock {
  index: number;
  hash: string;
  prevHash: string;
  txs: Transaction[];
}

export function appendTransaction(tx: Transaction) {
  const prevBlock = this.getLastBlock();
  const newIndex = prevBlock.index + 1;
  const hash = calculateHash(newIndex, prevBlock.hash, tx);
  this.chain.push({ index: newIndex, hash, prevHash: prevBlock.hash, txs: [tx] });
}`,
    consoleMock: [
      "[LEDGER] Solicitando nuevo registro cronológico...",
      "[MUTATOR] Generando firma criptográfica sha-256...",
      "[HASH_BLOCK] Encadenado con bloque previo: #ff891092a...",
      "[CONSENSUS] Estado de réplicas en clúster validado.",
      "[IMMUTABLE] Entrada agregada formalmente.",
      "[STATUS] CAMBIO CONSOLIDADO PARA SIEMPRE.",
    ],
  },
  {
    id: "m4",
    name: "SCORP_CICD",
    title: "Orquestación DevOps Multiproveedor",
    category: "Sistemas & Cloud",
    iconName: "refresh",
    description: "Arranque y empaquetamiento autogestionado con Terraform en Google Cloud, monitoreo distribuido y migración instantánea de tráfico cero caídas.",
    codeSnippet: `resource "google_cloud_run_service" "app" {
  name     = "scorpion-core-app"
  location = "us-west1"
  template {
    spec {
      containers {
        image = "gcr.io/scorpion-code/v2.1"
        resources { limits = { memory = "2G" } }
      }
    }
  }
}`,
    consoleMock: [
      "[DOCKER] Iniciando compilación de imagen v2.1.2...",
      "[LINT] Comprobando tipos estáticos en TypeScript... ÉXITO.",
      "[TEST] Ejecutando batería de pruebas unitarias... PASADAS.",
      "[TERRAFORM] Aplicando manifiesto en Google Cloud Run...",
      "[TRAFFIC] Enrutando 100% de peticiones a nuevo contenedor.",
      "[READY] Servicio online disponible en 2.3ms.",
    ],
  },
];

export default function TechGrid() {
  const [activeModule, setActiveModule] = useState<TechModule>(MODULES[0]);
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    // Populate console initially
    setConsoleLines(activeModule.consoleMock);
  }, [activeModule]);

  const runMockExecution = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setConsoleLines([]);

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < activeModule.consoleMock.length) {
        setConsoleLines((prev) => [...prev, activeModule.consoleMock[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setIsExecuting(false);
      }
    }, 380);
  };

  const getIcon = (shape: string) => {
    switch (shape) {
      case "shield":
        return <Shield className="w-5 h-5 text-amber-400" />;
      case "cpu":
        return <Cpu className="w-5 h-5 text-amber-400" />;
      case "layers":
        return <Layers className="w-5 h-5 text-amber-400" />;
      case "refresh":
        return <RefreshCw className="w-5 h-5 text-amber-400" />;
      default:
        return <Cpu className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div id="tech-grid-block" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2 font-sans select-none">
      {/* Selector Side */}
      <div className="col-span-1 lg:col-span-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">Tecnología de Élite</span>
          <h3 className="text-2xl font-bold tracking-tight text-zinc-100 font-mono">Caché Cibernética de Componentes</h3>
          <p className="text-zinc-400 text-xs mt-1">Sistemas robustos desarrollados a medida con protección robusta, rendimiento optimizado de almacenamiento y arquitectura limpia.</p>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-2">
          {MODULES.map((m) => (
            <button
              id={`btn-tech-${m.id}`}
              key={m.id}
              onClick={() => {
                if (!isExecuting) setActiveModule(m);
              }}
              disabled={isExecuting}
              className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer disabled:opacity-75 ${
                activeModule.id === m.id
                  ? "bg-[#121212] border-amber-500/40 shadow-[0_0_15px_rgba(212,175,55,0.12)]"
                  : "bg-[#121212]/30 border-zinc-900 hover:border-zinc-800 hover:bg-[#121212]/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg border transition-colors ${
                  activeModule.id === m.id ? "bg-amber-500/10 border-amber-500/30" : "bg-zinc-900 border-zinc-800"
                }`}>
                  {getIcon(m.iconName)}
                </div>
                <div>
                  <h4 className="font-mono text-xs font-semibold text-zinc-200 tracking-wide">{m.name}</h4>
                  <p className="text-[11px] text-zinc-400 font-light mt-0.5">{m.title}</p>
                </div>
              </div>
              <span className="font-mono text-[9px] text-amber-400/80 uppercase p-1 bg-amber-500/10 rounded">
                {m.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Code and Output terminal Side */}
      <div className="col-span-1 lg:col-span-7 bg-[#121212] border border-zinc-900/80 rounded-2xl p-5 flex flex-col justify-between shadow-inner">
        {/* Module detail tabs */}
        <div className="pb-4 border-b border-zinc-900 flex justify-between items-center bg-black/20 p-2.5 rounded-lg">
          <div>
            <h5 className="text-zinc-200 font-mono text-sm font-semibold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400 animate-pulse" />
              {activeModule.name} // {activeModule.title}
            </h5>
            <p className="text-[11px] text-zinc-400 mt-1 max-w-lg">{activeModule.description}</p>
          </div>
          <button
            onClick={runMockExecution}
            disabled={isExecuting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[10px] font-mono font-bold rounded hover:from-amber-300 hover:to-amber-400 transition-colors disabled:opacity-50 cursor-pointer shadow-[0_2px_8px_rgba(212,175,55,0.3)]"
          >
            <Play className="w-3 h-3 fill-current" />
            COMPILAR
          </button>
        </div>

        {/* Code Content display */}
        <div className="my-4 bg-zinc-900/40 p-4 rounded-xl border border-zinc-900/60 max-h-[170px] overflow-y-auto overflow-x-auto relative">
          <pre className="font-mono text-[10.5px] leading-relaxed text-amber-200/90 whitespace-pre">
            <code>{activeModule.codeSnippet}</code>
          </pre>
          <span className="absolute bottom-2 right-3 text-[8.5px] font-mono text-zinc-600 uppercase">TypeScript Entry</span>
        </div>

        {/* Terminal output box */}
        <div className="bg-black rounded-xl border border-zinc-900 p-4 font-mono text-[10px] min-h-[160px] flex flex-col justify-end">
          <div className="space-y-1 overflow-y-auto max-h-[140px] text-zinc-300">
            <AnimatePresence>
              {consoleLines.map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex gap-2 items-center ${
                    line.includes("[STATUS]")
                      ? "text-emerald-400 font-semibold"
                      : line.includes("[SYSTEM]")
                      ? "text-zinc-500"
                      : "text-amber-300/90"
                  }`}
                >
                  <span className="text-zinc-600 shrink-0 select-none">&gt;&gt;</span>
                  <span>{line}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {isExecuting && (
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="text-amber-400 inline-block font-mono mt-1"
              >
                PROCESANDO PAQUETES DE DATOS DE CLÚSTER...
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
