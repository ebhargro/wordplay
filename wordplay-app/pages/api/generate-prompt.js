import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: 'org-6GuHIK6WCXYqPzUj1yJdW2wP',
    project: 'proj_5s9pTOUeh3A3C5gO5xVFDk14',
});

export default async function handler(req, res) {
  const { length, pov, setting, tone, pacing } = req.body;

  if (!length || !pov || !setting || !tone || !pacing) {
    return res.status(400).json({ error: "All filters are required." });
  }

  const dynamicPrompt = `
    Generate a concise, engaging writing exercise prompt (1–3 sentences) with the following characteristics:
    - Perspective: ${pov}
    - Setting: ${setting}
    - Tone: ${tone}
    - Pacing: ${pacing}
The prompt should inspire the writer to build a story of ${length} length with these elements rather than fully develop the story itself. Focus on sparking creativity and curiosity. And the last sentence of the prompt should end with a trailing ellipsis.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: {
        type: "text",
      },
      messages: [
        { role: "user", content: [{ type: "text", text: dynamicPrompt }] },
      ],
    });

      const storyPrompt = completion.choices[0]?.message?.content;
    res.status(200).json({
      summary: `Here is a ${length}, ${pov} person POV writing exercise based in a ${setting} setting with a ${tone} tone and ${pacing} pacing.`,
      prompt: storyPrompt,
    });
  } catch (error) {
    console.error("Error calling OpenAI:", error.message);
    res.status(500).json({ error: "Failed to generate story prompt." });
  }
}
