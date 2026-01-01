
import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";
import { MODELS } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateImage(prompt: string, aspectRatio: AspectRatio = "1:1"): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: MODELS.DEFAULT,
        contents: {
          parts: [
            { text: prompt }
          ]
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio
          }
        }
      });

      if (!response || !response.candidates || response.candidates.length === 0) {
        throw new Error("No candidates returned from AI model.");
      }

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }

      throw new Error("No image data found in response.");
    } catch (error: any) {
      console.error("Gemini Image Generation Error:", error);
      throw new Error(error.message || "Failed to generate image. Please try again.");
    }
  }
}

export const geminiService = new GeminiService();
