
import { GoogleGenAI, Type } from "@google/genai";
import { LogicNode } from '../types';

/**
 * Explains a Talmudic concept using gemini-3-flash-preview.
 */
export const explainConcept = async (conceptName: string): Promise<string> => {
  // Always initialize GoogleGenAI with { apiKey: process.env.API_KEY } directly inside the function.
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
      
      Return JSON strictly matching this schema for a single root node with children.
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
                        type: { type: Type.STRING, enum: [
                            'STATEMENT', 'QUESTION', 'ANSWER', 'PROOF', 'REBUTTAL', 'PRINCIPLE', 'CASE', 'LAW', 'SOURCE', 'FACTOR'
                        ] },
                        speaker: { type: Type.STRING },
                        era: { type: Type.STRING, enum: ['TANNA', 'AMORA', 'RISHON', 'ACHRON', 'HALACHA'] },
                        hebrewText: { type: Type.STRING },
                        englishText: { type: Type.STRING },
                        concepts: { type: Type.ARRAY, items: { type: Type.STRING } },
                        children: { 
                            type: Type.ARRAY, 
                            items: { type: Type.OBJECT, description: "Recursive LogicNode structure" }
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
 * Compares two opinions on a topic.
 */
export const generateComparison = async (opinionA: string, opinionB: string, topic: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
      const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: `Compare the opinions of ${opinionA} and ${opinionB} regarding ${topic}.
          Explain the fundamental difference in logic (the 'Yesod').
          Format the output as a Markdown list of bullet points.`
      });
      return response.text || "No comparison available.";
  } catch (e) {
      return "Error generating comparison.";
  }
}

/**
 * Generates deep Sugya data for the dashboard.
 */
export const generateSugyaDeepData = async (title: string, mainText: string) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
        Analyze the Talmudic Sugya titled "${title}" with the following text summary/context: "${mainText}".
        
        Generate the following deep analysis components in JSON format:
        1. "visualFlow": A step-by-step flowchart of the logic. If there is a conditional divergence (e.g. Yes/No), use the 'branches' property.
        2. "modernAnalysis": Modern real-world applications of these principles.
        3. "logicSystem": A Ramchal-style logical breakdown (Statements and Syllogism).
        4. "analysisComponents": Key components (Case, Law, Factor, Source).
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
                        visualFlow: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.STRING },
                                    label: { type: Type.STRING },
                                    type: { type: Type.STRING, enum: ['ACTION', 'QUESTION', 'DECISION', 'RESULT'] },
                                    description: { type: Type.STRING },
                                    status: { type: Type.STRING, enum: ['VALID', 'INVALID', 'DISPUTED', 'NEUTRAL'] },
                                    branches: { 
                                        type: Type.ARRAY, 
                                        items: { type: Type.OBJECT, description: "Recursive VisualFlowStep structure for branching logic" }
                                    }
                                }
                            }
                        },
                        modernAnalysis: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.STRING },
                                    title: { type: Type.STRING },
                                    scenario: { type: Type.STRING },
                                    parallels: { type: Type.STRING },
                                    ruling: { type: Type.STRING }
                                }
                            }
                        },
                        logicSystem: {
                            type: Type.OBJECT,
                            properties: {
                                statements: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            text: { type: Type.STRING },
                                            type: { type: Type.STRING },
                                            color: { type: Type.STRING },
                                            analysis: {
                                                type: Type.OBJECT,
                                                properties: {
                                                    subject: { type: Type.STRING },
                                                    predicate: { type: Type.STRING },
                                                    statementType: { type: Type.STRING },
                                                    reason: { type: Type.STRING }
                                                }
                                            }
                                        }
                                    }
                                },
                                syllogism: {
                                    type: Type.OBJECT,
                                    properties: {
                                        premise1: { type: Type.STRING },
                                        premise2: { type: Type.STRING },
                                        conclusion: { type: Type.STRING }
                                    }
                                }
                            }
                        },
                        analysisComponents: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.STRING },
                                    category: { type: Type.STRING, enum: ['CASE', 'LAW', 'FACTOR', 'SOURCE'] },
                                    title: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                    refId: { type: Type.STRING }
                                }
                            }
                        }
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
