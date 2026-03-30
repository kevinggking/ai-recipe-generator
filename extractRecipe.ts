import Anthropic from "@anthropic-ai/sdk";
import { Recipe } from "./types";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a professional culinary assistant specializing in extracting structured recipes from video transcripts or descriptions. 

Your task is to analyze the provided content and extract a complete, well-structured recipe. Always respond with valid JSON only — no markdown, no explanation, just the JSON object.

If the content doesn't contain a recipe or cooking instructions, return: {"error": "No recipe found in this video"}

Extract as much detail as possible, including:
- Precise ingredient amounts and units
- Clear, numbered steps with timing when mentioned
- Pro tips mentioned by the chef
- Cuisine type, difficulty, and time estimates`;

const USER_PROMPT = (transcript: string, videoTitle: string) => `
Video Title: "${videoTitle}"

Transcript/Content:
${transcript.slice(0, 12000)}

Extract the recipe from this cooking video and return ONLY a JSON object with this exact structure:
{
  "title": "Recipe name",
  "description": "2-3 sentence description",
  "cuisine": "e.g. Italian, Mexican, etc.",
  "difficulty": "Easy" | "Medium" | "Hard",
  "prepTime": "e.g. 15 minutes",
  "cookTime": "e.g. 30 minutes", 
  "totalTime": "e.g. 45 minutes",
  "servings": 4,
  "calories": 350,
  "ingredients": [
    {
      "amount": "2",
      "unit": "cups",
      "item": "all-purpose flour",
      "notes": "sifted"
    }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "title": "Prepare the dough",
      "description": "Detailed instructions...",
      "duration": "5 minutes",
      "tips": "Optional pro tip"
    }
  ],
  "tips": ["Overall tip 1", "Tip 2"],
  "tags": ["pasta", "quick", "vegetarian"]
}`;

export async function extractRecipeFromTranscript(
  transcript: string,
  videoTitle: string
): Promise<Recipe | { error: string }> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: USER_PROMPT(transcript, videoTitle),
      },
    ],
    system: SYSTEM_PROMPT,
  });

  const text = message.content
    .filter((block) => block.type === "text")
    .map((block) => (block as { type: "text"; text: string }).text)
    .join("");

  try {
    // Strip any accidental markdown fences
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return { error: "Failed to parse recipe from AI response" };
  }
}
