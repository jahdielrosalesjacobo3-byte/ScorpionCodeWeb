import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const PORT = 3000;

// Lazy initialization of GoogleGenAI to ensure the app server boots even if API key is temporarily absent
let aiInstance: GoogleGenAI | null = null;
function getAIInstance() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing in your Secrets. Please add it via the Settings menu.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API HEALTH CHECK
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // End Point: Elite Project Auto-Estimator / Quote Generator
  app.post("/api/scorpion/quote", async (req, res) => {
    try {
      const { description, budgetRange, timeline, complexity } = req.body;
      const ai = getAIInstance();

      const prompt = `
        You are the Head of Cybernetic Architecture at SCORPION CODE, an elite software engineering agency.
        We build highly polished full-stack applications, advanced automations, modern vector design systems, and robust cyber-secure backends.
        
        Analyze the following project idea submitted by a potential client and generate an elite technical blueprint estimate.
        
        Client Project Description: "${description || "A custom corporate app with nice charts"}"
        Budget Indicator: "${budgetRange || "Flexible"}"
        Desired Timeline: "${timeline || "Standard"}"
        Stated Complexity: "${complexity || "Medium"}"
        
        Generate the technical architecture, recommended technology stack, estimated engineering hours, proposed pricing, phases, and an advanced security advice.
        Return your answer as a JSON object matching the requested schema.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are the automated Scorpion Code blueprint generator. Always return clean, professional Spanish technical responses as a JSON object.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              projectName: { type: Type.STRING, description: "Futuristic brand name or code-name for the project (e.g. Project Onyx, CyberLink)." },
              recommendedStack: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING }, 
                description: "Array of exactly 4-6 specific libraries, databases, frameworks or hosting tools (e.g. TailwindCSS, FastAPI, PostgreSQL, Upstash, Docker)."
              },
              architectureOverview: { type: Type.STRING, description: "2-3 sentences explaining the elite architectural design (C4, serverless, microservices or SPA)." },
              estimatedHours: { type: Type.INTEGER, description: "Estimated professional engineering hours to complete this project to production quality." },
              estimatedCostRange: { type: Type.STRING, description: "Price range estimation in USD, matching the timeline and hours requested (e.g., $4,200 - $6,500)." },
              deliverables: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Exactly 3 distinct milestones with high-tech titles (e.g., 'Fase 1: Cyber-Cores & Integración de API', 'Fase 2: Interfaz React & Animaciones Cinéticas')"
              },
              scorpionTacticalAdvice: { type: Type.STRING, description: "A highly specific, advanced cybersecurity, performance, or UI advice that Scorpion Code is giving them for free." }
            },
            required: ["projectName", "recommendedStack", "architectureOverview", "estimatedHours", "estimatedCostRange", "deliverables", "scorpionTacticalAdvice"]
          }
        }
      });

      const responseText = response.text || "{}";
      const projectBlueprint = JSON.parse(responseText.trim());
      res.json(projectBlueprint);
    } catch (error: any) {
      console.error("Error generating quote:", error);
      res.status(500).json({ 
        error: "Failed to estimate blueprint.", 
        message: error.message || "Ensure GEMINI_API_KEY is configured in Settings." 
      });
    }
  });

  // End Point: Scorpion Code Digital Assistant Chat
  app.post("/api/scorpion/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      const ai = getAIInstance();

      // Formulate formatted history for Gemini
      const formattedHistory = messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));

      const systemPrompt = `
        You are SCORP_A_900 - the digital elite cybernetic AI guide for the company SCORPION CODE (Spanish: CÓDIGO ESCORPIÓN).
        SCORPION CODE is a world-class premium software boutique specializing in:
        1. High-Performance Frontends (React, Motion-UI, gorgeous Dark themes, absolute visual polish)
        2. High-Tech Backend Engineering & APIs (Fast, clean Node, Go, secure Python, serverless scaling, Cloud Architecture)
        3. Cybersecurity & Systems Integrity (Data encryption, penetration auditing, rigid secure protocols)
        4. Intelligent Automations & Custom AI Cores (Integrating advanced models, text-to-speech, custom classifiers)
        
        Our aesthetic is "Premium cybernetic obsidian-black and metallic-gold luxury tech".
        We treat client projects like masterworks of engineering.
        
        Official Contact Channels:
        - Correo oficial: scorpioncode2025@gmail.com
        - WhatsApp directo: +52 5610142522
        If the user asks for contact methods or wants to hire us, warmly invite them to write directly to scorpioncode2025@gmail.com or via WhatsApp at +52 5610142522.
        
        Your tone is confident, professional, tech-fluent, welcoming, and slightly futuristic. Always answer in premium Spanish unless they speak English.
        Explain how SCORPION CODE can build their wildest developer dreams. Keep your responses concise (under 120 words), well-formatted with markdown and clear bullet points where helpful.
      `;

      const contents = [
        ...formattedHistory
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.75,
        }
      });

      res.json({ text: response.text || "No response received." });
    } catch (error: any) {
      console.error("Error in scorpion-chat:", error);
      res.status(500).json({ 
        error: "Failed to link to Scorpion neural core.", 
        message: error.message || "Verify your GEMINI_API_KEY in the Secrets panel." 
      });
    }
  });

  // Vite integration as middleware in development; Static Server in Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SCORPION CODE Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
