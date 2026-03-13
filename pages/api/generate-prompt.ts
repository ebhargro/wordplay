import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// Initialize OpenAI with env vars only (no hardcoded secrets)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
  project: process.env.OPENAI_PROJECT_ID,
});

// Simple in-memory rate limiter (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// Allowed values for each filter (whitelist validation)
const ALLOWED_VALUES: Record<string, string[]> = {
  length: ["short", "medium", "long"],
  pov: ["first", "second", "third"],
  setting: ["urban", "rural", "futuristic", "historical", "fantasy"],
  tone: ["joyful", "suspenseful", "sorrowful"],
  pacing: ["slow", "fast", "dynamic"],
};

function sanitizeInput(value: string, field: string): string | null {
  const allowed = ALLOWED_VALUES[field];
  if (!allowed) return null;
  const cleaned = value.trim().toLowerCase();
  return allowed.includes(cleaned) ? cleaned : null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  // Rate limiting
  const clientIp =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown";

  if (!checkRateLimit(clientIp)) {
    return res
      .status(429)
      .json({ error: "Too many requests. Please try again in a minute." });
  }

  const { length, pov, setting, tone, pacing } = req.body;

  // Validate all required fields exist
  if (!length || !pov || !setting || !tone || !pacing) {
    return res.status(400).json({ error: "All filters are required." });
  }

  // Sanitize and validate against whitelist
  const cleanLength = sanitizeInput(length, "length");
  const cleanPov = sanitizeInput(pov, "pov");
  const cleanSetting = sanitizeInput(setting, "setting");
  const cleanTone = sanitizeInput(tone, "tone");
  const cleanPacing = sanitizeInput(pacing, "pacing");

  if (!cleanLength || !cleanPov || !cleanSetting || !cleanTone || !cleanPacing) {
    return res.status(400).json({ error: "Invalid filter values provided." });
  }

  const dynamicPrompt = `
    Generate a concise, engaging writing exercise prompt (1-3 sentences) with the following characteristics:
    - Perspective: ${cleanPov}
    - Setting: ${cleanSetting}
    - Tone: ${cleanTone}
    - Pacing: ${cleanPacing}
    The prompt should inspire the writer to build a story of ${cleanLength} length with these elements rather than fully develop the story itself. Focus on sparking creativity and curiosity. And the last sentence of the prompt should end with a trailing ellipsis.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "text" },
      messages: [
        { role: "user", content: [{ type: "text", text: dynamicPrompt }] },
      ],
    });

    const storyPrompt = completion.choices[0]?.message?.content;

    if (!storyPrompt) {
      return res
        .status(500)
        .json({ error: "No response received from AI. Please try again." });
    }

    res.status(200).json({
      summary: `Here is a ${cleanLength}, ${cleanPov} person POV writing exercise based in a ${cleanSetting} setting with a ${cleanTone} tone and ${cleanPacing} pacing.`,
      prompt: storyPrompt,
    });
  } catch (error: any) {
    console.error("Error calling OpenAI:", error.message);

    if (error?.status === 429) {
      return res
        .status(503)
        .json({ error: "Service temporarily busy. Please try again shortly." });
    }

    res.status(500).json({ error: "Failed to generate story prompt." });
  }
}
