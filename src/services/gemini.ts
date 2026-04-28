import { GoogleGenAI } from "@google/genai";
import { Detection } from "../types";

// Always use frontend env for Gemini API key as per guidelines
const API_KEY = process.env.GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export async function detectWildlife(base64Image: string): Promise<Partial<Detection>> {
  if (!ai) {
    throw new Error("Gemini API key not configured");
  }

  const prompt = `Analyze this image for wildlife. If an animal is found:
  1. Identify the species.
  2. Estimate the risk level (Low, Medium, High, Critical) based on potential for human conflict.
  3. Provide a brief description of the activity.
  Return the result in JSON format: { "label": "Tiger", "confidence": 0.95, "risk": "Critical", "description": "Tiger moving towards village" }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { text: prompt },
            { inlineData: { mimeType: "image/jpeg", data: base64Image } }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      type: result.label,
      label: result.label,
      confidence: result.confidence,
      risk: result.risk,
      location: "Detected Area", // Mock or from EXIF
      timestamp: new Date().toISOString(),
      status: "Active"
    };
  } catch (err) {
    console.error("Gemini Detection Error:", err);
    throw err;
  }
}
