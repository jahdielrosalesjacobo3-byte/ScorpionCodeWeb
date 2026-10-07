import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateChatReply, type ChatMessage } from "../../lib/handlers/chat";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body as { messages?: ChatMessage[] };
    const text = await generateChatReply(messages ?? []);
    return res.json({ text });
  } catch (error: unknown) {
    console.error("Error in scorpion-chat:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Verify your GEMINI_API_KEY in the Secrets panel.";
    return res.status(500).json({
      error: "Failed to link to Scorpion neural core.",
      message,
    });
  }
}
