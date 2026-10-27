import { Type } from "@google/genai";
import { getAIInstance } from "../gemini.js";
import { callNvidiaChatCompletion } from "../nvidia.js";

export type QuoteRequestBody = {
  description?: string;
  budgetRange?: string;
  timeline?: string;
  complexity?: string;
};

export async function generateQuoteBlueprint(body: QuoteRequestBody) {
  const { description, budgetRange, timeline, complexity } = body;

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

  if (process.env.NVIDIA_API_KEY && !process.env.GEMINI_API_KEY) {
    const rawJson = await callNvidiaChatCompletion({
      messages: [
        {
          role: "system",
          content:
            'You are the automated Scorpion Code blueprint generator. Return ONLY a valid JSON object in Spanish with keys: "projectName" (string), "recommendedStack" (array of 4-6 strings), "architectureOverview" (string, 2-3 sentences), "estimatedHours" (integer), "estimatedCostRange" (string in USD), "deliverables" (array of 3 milestone strings), "scorpionTacticalAdvice" (string). Do not wrap in markdown code fences.',
        },
        { role: "user", content: prompt.trim() },
      ],
      temperature: 0.6,
      maxTokens: 900,
      responseFormat: { type: "json_object" },
    });
    const cleaned = rawJson
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();
    return JSON.parse(cleaned);
  }

  const ai = getAIInstance();

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      systemInstruction:
        "You are the automated Scorpion Code blueprint generator. Always return clean, professional Spanish technical responses as a JSON object.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          projectName: {
            type: Type.STRING,
            description:
              "Futuristic brand name or code-name for the project (e.g. Project Onyx, CyberLink).",
          },
          recommendedStack: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description:
              "Array of exactly 4-6 specific libraries, databases, frameworks or hosting tools (e.g. TailwindCSS, FastAPI, PostgreSQL, Upstash, Docker).",
          },
          architectureOverview: {
            type: Type.STRING,
            description:
              "2-3 sentences explaining the elite architectural design (C4, serverless, microservices or SPA).",
          },
          estimatedHours: {
            type: Type.INTEGER,
            description:
              "Estimated professional engineering hours to complete this project to production quality.",
          },
          estimatedCostRange: {
            type: Type.STRING,
            description:
              "Price range estimation in USD, matching the timeline and hours requested (e.g., $4,200 - $6,500).",
          },
          deliverables: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description:
              "Exactly 3 distinct milestones with high-tech titles (e.g., 'Fase 1: Cyber-Cores & Integración de API', 'Fase 2: Interfaz React & Animaciones Cinéticas')",
          },
          scorpionTacticalAdvice: {
            type: Type.STRING,
            description:
              "A highly specific, advanced cybersecurity, performance, or UI advice that Scorpion Code is giving them for free.",
          },
        },
        required: [
          "projectName",
          "recommendedStack",
          "architectureOverview",
          "estimatedHours",
          "estimatedCostRange",
          "deliverables",
          "scorpionTacticalAdvice",
        ],
      },
    },
  });

  const responseText = response.text || "{}";
  return JSON.parse(responseText.trim());
}
