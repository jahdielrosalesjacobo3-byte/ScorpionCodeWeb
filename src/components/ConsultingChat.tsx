import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Terminal, Cpu, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ChatMessage {
  role: "user" | "model";
  text: string;
  time: string;
}

const PRESETS = [
  "¿Cuáles son las especialidades de Scorpion Code?",
  "¿Cómo garantizan la ciberseguridad en el código?",
  "¿Qué tecnologías recomiendan para escalar?",
  "Necesito una auditoría de software",
];

export default function ConsultingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Bienvenido al nodo neuronal de **SCORPION CODE**. Soy el agente **SCORP_A_900**. ¿Qué arquitectura de software o solución cibernética tienes en mente hoy?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorStatus(null);
    const userMessage: ChatMessage = {
      role: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const payloadMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch("/api/scorpion/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (!response.ok) {
        throw new Error("Conexión interrumpida con el núcleo AI.");
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: data.text || "Disculpas, mi enlace a la red Scorpion experimentó una fluctuación.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(
        "Fallo de enlace. Configura tu GEMINI_API_KEY en la pestaña Secrets de AI Studio para activar la IA en vivo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Dynamic Floating Trigger Button */}
      <motion.button
        id="chat-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 bg-radial from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black p-4 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center cursor-pointer transition-all border border-amber-200/50"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X key="close" className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <div key="chat" className="relative">
              <MessageSquare className="w-6 h-6 stroke-[2.5]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full" />
            </div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Chat Container Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-container-floating"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-full max-w-[440px] md:max-w-[480px] h-[600px] bg-zinc-950 border border-amber-500/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 overflow-hidden flex flex-col font-sans"
          >
            {/* Elegant Tech Header */}
            <div className="p-4 bg-zinc-900 border-b border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Cpu className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-200 text-sm tracking-wide font-mono flex items-center gap-1.5">
                    AGENTE SCORP_A_900 <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-mono">SCORPION COGNITIVE SHELL v9.1</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/525610142522?text=Hola%20Scorpion%20Code%2C%20estaba%20en%20el%20asistente%20virtual%20y%20deseo%20atenci%C3%B3n%20humana%20por%20WhatsApp."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 text-[10px] bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-400 rounded-lg flex items-center gap-1 font-mono transition-colors"
                  title="Hablar con un ingeniero humano por WhatsApp (+52 5610142522)"
                >
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.65L5.27 16.62L5.07 16.3C4.26 15 3.81 13.48 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.23 7.35C9.04 7.35 8.74 7.42 8.49 7.69C8.24 7.96 7.54 8.62 7.54 9.96C7.54 11.3 8.52 12.6 8.65 12.78C8.79 12.96 10.58 15.72 13.32 16.9C15.6 17.88 16.07 17.68 16.56 17.63C17.06 17.59 18.16 16.98 18.39 16.33C18.62 15.68 18.62 15.13 18.55 15.01C18.48 14.89 18.29 14.82 18.01 14.68C17.74 14.54 16.38 13.87 16.13 13.78C15.87 13.68 15.69 13.64 15.5 13.91C15.32 14.19 14.79 14.82 14.63 15.01C14.47 15.19 14.31 15.22 14.04 15.08C13.76 14.94 12.88 14.65 11.83 13.72C11.02 12.99 10.47 12.09 10.31 11.82C10.15 11.54 10.29 11.39 10.43 11.25C10.56 11.12 10.72 10.91 10.86 10.75C11 10.59 11.05 10.47 11.14 10.29C11.23 10.1 11.19 9.94 11.12 9.8C11.05 9.66 10.5 8.32 10.27 7.76C10.05 7.23 9.82 7.3 9.65 7.29C9.5 7.29 9.32 7.29 9.23 7.35Z" />
                  </svg>
                  <span>WA</span>
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-amber-300 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Error Notification Bar */}
            {errorStatus && (
              <div className="px-4 py-2.5 bg-red-950/40 border-b border-red-500/20 text-red-300 text-xs flex items-start gap-2 animate-fadeIn font-mono">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span>{errorStatus}</span>
              </div>
            )}

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
                      m.role === "user"
                        ? "bg-amber-600/20 text-amber-100 border border-amber-500/30"
                        : "bg-zinc-900/90 text-zinc-200 border border-zinc-800"
                    }`}
                  >
                    {/* Render message formatting simplified Markdown */}
                    <div className="space-y-1.5">
                      {m.text.split("\n").map((line, lIdx) => {
                        let parsedLine = line;
                        // Simple Bold support
                        if (parsedLine.includes("**")) {
                          const parts = parsedLine.split("**");
                          return (
                            <p key={lIdx}>
                              {parts.map((p, pIdx) =>
                                pIdx % 2 === 1 ? <strong key={pIdx} className="text-amber-300 font-semibold">{p}</strong> : p
                              )}
                            </p>
                          );
                        }
                        return <p key={lIdx}>{parsedLine}</p>;
                      })}
                    </div>
                    <div className={`mt-1.5 font-mono text-[9px] text-right ${m.role === "user" ? "text-amber-500/60" : "text-zinc-500"}`}>
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-[10px] font-mono text-amber-500/70">PROCESANDO_</span>
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Presets and Suggestion Badges */}
            <div className="px-4 py-2 bg-black border-t border-zinc-900/60 flex flex-wrap gap-1.5">
              {PRESETS.map((p, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendMessage(p)}
                  className="px-2.5 py-1 text-[10px] bg-zinc-900 hover:bg-amber-950/30 text-zinc-300 hover:text-amber-300 border border-zinc-800 hover:border-amber-500/20 rounded-full transition-all duration-200 cursor-pointer text-left whitespace-nowrap"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputMessage);
              }}
              className="p-4 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu consulta tecnológica..."
                className="flex-1 bg-black text-xs text-zinc-100 placeholder:text-zinc-500 rounded-xl border border-zinc-800 px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 font-mono"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="bg-amber-500 text-black font-semibold rounded-xl p-2.5 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all disabled:opacity-50 disabled:hover:bg-amber-500 cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
