import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { generateQuoteBlueprint } from "./lib/handlers/quote";
import { generateChatReply, type ChatMessage } from "./lib/handlers/chat";

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  app.post("/api/scorpion/quote", async (req, res) => {
    try {
      const projectBlueprint = await generateQuoteBlueprint(req.body);
      res.json(projectBlueprint);
    } catch (error: unknown) {
      console.error("Error generating quote:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Ensure GEMINI_API_KEY is configured in Settings.";
      res.status(500).json({
        error: "Failed to estimate blueprint.",
        message,
      });
    }
  });

  app.post("/api/scorpion/chat", async (req, res) => {
    try {
      const { messages } = req.body as { messages?: ChatMessage[] };
      const text = await generateChatReply(messages ?? []);
      res.json({ text });
    } catch (error: unknown) {
      console.error("Error in scorpion-chat:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Verify your GEMINI_API_KEY in the Secrets panel.";
      res.status(500).json({
        error: "Failed to link to Scorpion neural core.",
        message,
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SCORPION CODE Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
