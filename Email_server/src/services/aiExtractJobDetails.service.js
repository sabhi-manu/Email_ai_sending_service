import { GoogleGenAI } from "@google/genai";
import { z } from "zod"
import { zodToJsonSchema } from "zod-to-json-schema"


const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY })

const jobExtractSchema = z.object({
  companyName: z.string().nullable().describe("Name of the hiring company"),
  jobRole: z.string().nullable().describe("Job position or role"),
  email: z.string().nullable().describe("HR or recruiter email address"),
  location: z.string().nullable().describe("Job location if mentioned"),
});


async function extractJobDetailsAi(jobDescription) {


    const prompt = `
You are an intelligent job parser.

Extract the following details from the job description:

- companyName
- jobRole
- location
- Email 

Rules:
- If something is missing, return null
- Return ONLY JSON

Job Description:
${jobDescription}

Output:
{
  "companyName": "",
  "jobRole": "",
  "location": "",
  "email": ""
}
`;


    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(jobExtractSchema)
        }
    })

    console.log("ai extract data job details :=>", JSON.parse(response.text))
    let parsed;

    try {
        parsed = JSON.parse(response.text);
    } catch (err) {
        console.error("Invalid JSON from AI:", response.text);
        throw new Error("AI returned invalid JSON");
    }

   const normalized = {
  companyName: parsed.companyName ?? null,
  jobRole: parsed.jobRole ?? null,
  location: parsed.location ?? null,
  email: parsed.email ?? parsed.Email ?? null,
};

return jobExtractSchema.parse(normalized);

}

export default extractJobDetailsAi