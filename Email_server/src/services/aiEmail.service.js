import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const emailSchema = z.object({
  subject: z.string().describe("Email subject line for job application"),
  text: z.string().describe("Plain text version of the job application email"),
  html: z.string().describe("HTML formatted version of the job application email"),
});

async function generateEmailAi({
    jobDescription,
    selfDescription,
    resume,
    companyName,
    jobRole,
}) {
    // const trimmedResume = resume?.slice(0, 2000);
console.log("checking deails in ai email ==>", jobDescription, selfDescription, resume, companyName, jobRole)

const prompt = `
Write a professional job application email.

Details:
${companyName ? `- Company: ${companyName}` : ""}
- Role: ${jobRole}
- Job Description: ${jobDescription}
- Self Description: ${selfDescription}

Resume Content:
${resume}

Instructions:
1. From the resume, extract:
   - Candidate full name
   - Phone number (if available)
   - LinkedIn or portfolio (if available)

2. Use extracted details in the email signature.

3. Write a concise and professional email (5–7 lines)
4. ${companyName ? "Mention company name" : "Do NOT mention company name"}
5. Mention the role clearly
6. Mention attached resume
7. Be polite and confident

8. End the email with this format:

<Extracted Name>
<Phone if available>
<LinkedIn if available>

Return JSON:
{
  "subject": "",
  "text": "",
  "html": ""
}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(emailSchema),
        },
    });
    console.log("email ai response :=>", JSON.parse(response.text));
    let parsed;

    try {
        parsed = JSON.parse(response.text);
    } catch (err) {
        console.error("Invalid JSON from AI:", response.text);
        throw new Error("AI returned invalid JSON");
    }

    return emailSchema.parse(parsed);
}

export default generateEmailAi;
