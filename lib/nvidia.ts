const NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const DEFAULT_NVIDIA_MODEL = "nvidia/nemotron-3.5-lightning-30b-a3b";

export type NvidiaChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

interface NvidiaChatCompletionOptions {
  messages: NvidiaChatMessage[];
  temperature?: number;
  maxTokens?: number;
  responseFormat?: { type: "json_object" };
}

interface NvidiaChatResponse {
  choices?: Array<{
    message?: {
      content?: string | null;
      reasoning_content?: string | null;
    };
  }>;
  error?: {
    message?: string;
  };
  detail?: string;
}

export function getNvidiaApiKey(): string {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    throw new Error(
      "NVIDIA_API_KEY no está configurada en las variables de entorno.",
    );
  }
  return apiKey;
}

export async function callNvidiaChatCompletion({
  messages,
  temperature = 0.7,
  maxTokens = 1024,
  responseFormat,
}: NvidiaChatCompletionOptions): Promise<string> {
  const apiKey = getNvidiaApiKey();
  const model = process.env.NVIDIA_MODEL || DEFAULT_NVIDIA_MODEL;

  const response = await fetch(NVIDIA_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      chat_template_kwargs: { enable_thinking: false },
      ...(responseFormat ? { response_format: responseFormat } : {}),
    }),
  });

  const data = (await response.json()) as NvidiaChatResponse;

  if (!response.ok) {
    const detail =
      data?.detail ||
      data?.error?.message ||
      `NVIDIA NIM API respondió con estado ${response.status}`;
    throw new Error(detail);
  }

  const content = data?.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("NVIDIA NIM API devolvió una respuesta vacía.");
  }

  return content;
}
