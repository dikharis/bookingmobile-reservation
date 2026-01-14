import { GoogleGenAI, Type } from "@google/genai";
import { ParsedReservationIntent } from "../types";

// Note: In a real app, ensure this is handled securely. 
// The prompt instructions assume the key is in process.env.API_KEY
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const parseReservationText = async (text: string): Promise<ParsedReservationIntent | null> => {
  if (!text || !text.trim()) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Extract reservation details from the following text into a JSON object.
      
      Text: "${text}"
      
      If a category isn't clear, guess based on keywords (e.g. "boat" -> FAST_BOAT, "airport" -> TRANSFER, "tour" -> TOUR).
      Date should be YYYY-MM-DD if possible, or ISO string.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, enum: ['TOUR', 'TRANSFER', 'FAST_BOAT', 'CHARTER'] },
            guestName: { type: Type.STRING },
            contactNumber: { type: Type.STRING },
            pax: { type: Type.NUMBER },
            date: { type: Type.STRING },
            time: { type: Type.STRING },
            notes: { type: Type.STRING },
          }
        }
      }
    });

    const result = response.text;
    if (!result) return null;
    return JSON.parse(result) as ParsedReservationIntent;
  } catch (error) {
    console.error("Gemini parse error:", error);
    return null;
  }
};