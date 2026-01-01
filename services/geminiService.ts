
import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";
import { MODELS } from "../constants";

export class GeminiService {
  // Initialize without a default empty string to ensure it relies on the environment variable
  private getClient() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async enhancePrompt(prompt: string): Promise<string> {
    try {
      const ai = this.getClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a professional prompt engineer for AI image generation. 
        Expand the following simple prompt into a highly detailed, descriptive version that includes 
        lighting, texture, mood, and artistic style. 
        Keep it to 2-3 sentences. 
        Prompt: "${prompt}"`,
        config: {
          temperature: 0.7,
          maxOutputTokens: 150,
        }
      });

      return response.text?.trim() || prompt;
    } catch (error) {
      console.error("Prompt Enhancement Error:", error);
      return prompt; // Fallback to original
    }
  }

  async generateImage(prompt: string, aspectRatio: AspectRatio = "1:1"): Promise<string> {
    try {
      const ai = this.getClient();
      const response = await ai.models.generateContent({
        model: MODELS.DEFAULT,
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio
          }
        }
      });

      if (!response.candidates?.[0]?.content?.parts) {
        throw new Error("Invalid response from API");
      }

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }

      throw new Error("No image data found in response.");
    } catch (error: any) {
      console.error("Gemini Image Generation Error:", error);
      throw new Error(error.message || "Failed to generate image.");
    }
  }
}

export const geminiService = new GeminiService();
