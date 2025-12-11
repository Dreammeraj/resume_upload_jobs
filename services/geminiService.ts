import { GoogleGenAI, Type } from "@google/genai";
import { ResumeAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeResumeAndFindJobs = async (
  fileBase64: string,
  mimeType: string
): Promise<ResumeAnalysis> => {
  try {
    const modelId = "gemini-2.5-flash"; // Efficient for text/document analysis
    
    // Define the schema for the structured response we want
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        candidateName: { type: Type.STRING, description: "The name of the candidate found in the resume." },
        professionalSummary: { type: Type.STRING, description: "A brief 2-3 sentence professional summary based on the resume." },
        extractedSkills: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "List of top 10-15 key technical and soft skills extracted from the resume."
        },
        recommendedJobs: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              company: { type: Type.STRING },
              location: { type: Type.STRING },
              type: { type: Type.STRING },
              workMode: { type: Type.STRING },
              salary: { type: Type.STRING },
              matchScore: { type: Type.INTEGER, description: "Match percentage from 0 to 100 based on skills." },
              matchReason: { type: Type.STRING, description: "A short explanation of why this job fits the candidate's profile." },
              postedAt: { type: Type.STRING, description: "Relative time, e.g., '2 days ago'" }
            }
          },
          description: "A list of 6 to 8 hypothetical but realistic job listings that perfectly match the candidate's skills."
        }
      },
      required: ["candidateName", "professionalSummary", "extractedSkills", "recommendedJobs"]
    };

    const prompt = `
      You are an expert technical recruiter and AI job matching engine.
      
      Task:
      1. Analyze the attached resume document carefully.
      2. Extract the candidate's name, a professional summary, and their key skills.
      3. Based on their specific skills and experience level, generate a list of relevant job openings. 
         Imagine you are searching a live global database of high-quality jobs.
         Ensure the jobs vary slightly in nature (e.g., startups vs corporate, remote vs onsite) but are all relevant.
      4. Calculate a match score (0-100%) for each job based on the resume content.
      5. Provide a specific reason why each job is a match.

      Return the result strictly in JSON format matching the provided schema.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              data: fileBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.4, // Lower temperature for more factual extraction and consistent JSON
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as ResumeAnalysis;
    } else {
      throw new Error("No response text generated from Gemini.");
    }
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
};
