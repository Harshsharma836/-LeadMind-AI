import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getAIIntent = async (lead, offer) => {
  try {
    const prompt = `
You are a lead scoring assistant.
Analyze the following lead and offer, then estimate:
1. Intent level: High / Medium / Low
2. AI points (0–50)
3. Reasoning (brief summary why)

Lead:
${JSON.stringify(lead, null, 2)}

Offer:
${JSON.stringify(offer, null, 2)}

Return JSON like:
{
  "intent": "...",
  "ai_points": number,
  "reasoning": "..."
}
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: prompt }
      ],
      model: "openai/gpt-oss-20b",
      temperature: 0.7,
    });

    const output = chatCompletion.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(output);

    return {
      intent: parsed.intent || "Low",
      ai_points: parsed.ai_points || 10,
      reasoning: parsed.reasoning || "Basic relevance.",
    };
  } catch (error) {
    console.error("Error in getAIIntent:", error);
    return { intent: "Low", ai_points: 10, reasoning: "Error processing AI intent." };
  }
};
