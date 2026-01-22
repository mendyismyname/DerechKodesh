
import { GoogleGenAI, Type } from "@google/genai";
import { LogicNode } from '../types';

/**
 * Explains a Talmudic concept using gemini-3-flash-preview.
 */
export const explainConcept = async (conceptName: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explain the Talmudic concept "${conceptName}" concisely in English, suitable for a student. Include its Hebrew spelling if possible.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "Could not retrieve explanation.";
  } catch (error) {
    console.error("Error explaining concept:", error);
    return "Error connecting to AI service.";
  }
};

/**
 * Analyzes the logical structure of a Hebrew Talmudic text.
 */
export const analyzeTextStructure = async (hebrewText: string): Promise<LogicNode | null> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
      Analyze the following Talmudic text (Hebrew). Break it down into a logical tree structure.
      Identify the speaker, the type of logic (Statement, Question, Answer, Proof, Rebuttal), and the Era (Tanna, Amora).
      Translate each part to English.
      
      Text: "${hebrewText}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        type: { type: Type.STRING },
                        speaker: { type: Type.STRING },
                        era: { type: Type.STRING },
                        hebrewText: { type: Type.STRING },
                        englishText: { type: Type.STRING },
                        concepts: { type: Type.ARRAY, items: { type: Type.STRING } },
                        children: { 
                            type: Type.ARRAY, 
                            items: { type: Type.OBJECT }
                        },
                    },
                    required: ['id', 'type', 'hebrewText', 'englishText', 'era']
                }
            }
        });
        
        const jsonText = response.text;
        if (!jsonText) return null;
        return JSON.parse(jsonText) as LogicNode;

    } catch (e) {
        console.error("Analysis failed", e);
        return null;
    }
};

/**
 * Generates deep Sugya data for the dashboard.
 */
export const generateSugyaDeepData = async (title: string, mainText: string) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
        Analyze the Talmudic Sugya titled "${title}" with the following text: "${mainText}".
        Generate visualFlow, modernAnalysis, logicSystem, and analysisComponents in JSON.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        visualFlow: { type: Type.ARRAY, items: { type: Type.OBJECT } },
                        modernAnalysis: { type: Type.ARRAY, items: { type: Type.OBJECT } },
                        logicSystem: { type: Type.OBJECT },
                        analysisComponents: { type: Type.ARRAY, items: { type: Type.OBJECT } }
                    }
                }
            }
        });

        const text = response.text;
        if (!text) return null;
        return JSON.parse(text);

    } catch (e) {
        console.error("Sugya Deep Data Generation Failed", e);
        return null;
    }
}
