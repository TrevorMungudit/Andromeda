import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBlogOutline = async (topic: string): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a structured blog post outline for a nutrition education platform. 
      Topic: "${topic}".
      The audience is health-conscious individuals.
      Include sections for Introduction, Key Nutritional Facts, Practical Tips, and Conclusion.
      Format the output in Markdown.`,
      config: {
        thinkingConfig: { thinkingBudget: 1024 }
      }
    });

    return response.text || "No content generated.";
  } catch (error) {
    console.error("Error generating outline:", error);
    throw error;
  }
};

export const analyzeTrend = async (): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Briefly summarize 3 current trending topics in nutritional science for 2026. Keep it concise (under 100 words).",
    });
    return response.text || "Unable to fetch trends.";
  } catch (error) {
    console.error("Error fetching trends:", error);
    return "AI service unavailable. Please check configuration.";
  }
};