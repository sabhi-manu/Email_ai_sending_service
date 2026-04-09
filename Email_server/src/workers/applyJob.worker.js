import { Worker } from "bullmq";
import { redisClient } from "../config/redis/redis.js";
import { PDFParse } from "pdf-parse";
import extractJobDetailsAi from "../services/aiExtractJobDetails.service.js";
import JobApplication from "../models/jobApplications.model.js";
import generateResumeAi from "../services/aiResume.service.js";
import generateEmailAi from "../services/aiEmail.service.js";
import sendMail from "../utils/nodemailer.js";

const applyJobWorker = new Worker(
  "apply-job",

  async (job) => {
    const { jobDescription, selfDescription, resume, generatedResume } =
      job.data;

    try {
      let finalResumeBuffer;
      let resumeText = "";

      if (generatedResume) {
        resumeText = resume
          ? await new PDFParse(
            new Uint8Array(Buffer.from(resume.buffer, "base64"))
          ).getText()
          : "";

        finalResumeBuffer = await generateResumeAi({
          jobDescription,
          resume: resumeText,
          selfDescription,
        });
      } else {
        const pdfUint8 = new Uint8Array(
          Buffer.from(resume.buffer, "base64")
        );

        finalResumeBuffer = Buffer.from(resume.buffer, "base64");
        resumeText = await new PDFParse(pdfUint8).getText();
      }
      console.log("pdf create resume:")
      const jobDetails = await extractJobDetailsAi(jobDescription);
      console.log("job detals create : ", jobDetails)
      if (!jobDetails?.email) {
        throw new Error("HR email not found");
      }

      const existing = await JobApplication.findOne({
        email: jobDetails.email,
        jobRole: jobDetails.jobRole,
      });

      if (existing) {
        console.log("Already applied, skipping...");
        return;
      }

      const emailData = await generateEmailAi({
        jobDescription,
        selfDescription,
        resume: resumeText,
        ...jobDetails,
      });
      console.log("email ai worker ==>", emailData)
      await sendMail({
        to: jobDetails.email,
        subject: `Application for ${emailData.subject}`,
        text: emailData.text,
        html: emailData.html,
        attachments: [
          {
            filename: "resume.pdf",
            content: finalResumeBuffer,
          },
        ],
      });

      await JobApplication.create({
        ...jobDetails,
        status: "sent",
        appliedAt: new Date(),
      });
    } catch (err) {
      console.error("Worker error:", err);
      throw err;
    }
  },
  {
    connection: redisClient,
  },
);

applyJobWorker.on("completed", (job) => {
  console.log(`${job.id} has completed!`);
});

applyJobWorker.on("failed", (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});


export default applyJobWorker