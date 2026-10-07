import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateQuoteBlueprint } from "../../lib/handlers/quote";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const blueprint = await generateQuoteBlueprint(req.body ?? {});
    return res.json(blueprint);
  } catch (error: unknown) {
    console.error("Error generating quote:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Ensure GEMINI_API_KEY is configured in Settings.";
    return res.status(500).json({
      error: "Failed to estimate blueprint.",
      message,
    });
  }
}
