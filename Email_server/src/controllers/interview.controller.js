import InterviewReportModel from "../models/interviewReport.model.js";
import generateInterviewReport from "../services/ai.service.js";
import generateResumeAi from "../services/aiResume.service.js";
import AppErrorHandler from "../utils/errorHandler.js";
import { PDFParse } from "pdf-parse";

async function createInterviewController(req, res, next) {
  try {
    const userId = req.user.id;
    const resumefile = req.file;
    const { selfDescription, jobDescription } = req.body;

    if (!jobDescription) {
      throw new AppErrorHandler(400, "Job description is required.");
    }

    if (!resumefile) {
      throw new AppErrorHandler(400, "Resume file is required.");
    }

    const resumeContent = await new PDFParse(
      Uint8Array.from(resumefile.buffer),
    ).getText();

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });

    const parseArray = (arr) =>
      Array.isArray(arr)
        ? arr.map((item) => {
            if (typeof item !== "string") return item;
            try {
              return JSON.parse(item);
            } catch (error) {
              throw new AppErrorHandler(
                400,
                "Invalid JSON format in array item.",
              );
            }
          })
        : [];

    const interviewReport = await InterviewReportModel.create({
      user: userId,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      title: interviewReportByAi.title,

      technicalQuestions: parseArray(interviewReportByAi.technicalQuestions),
      behavioralQuestions: parseArray(interviewReportByAi.behavioralQuestions),

      skillGaps: parseArray(interviewReportByAi.skillGaps).map((gap) => ({
        skills: gap.skill,
        severity: gap.severity,
      })),

      preparationPlan: parseArray(interviewReportByAi.preparationPlan),
    });

    console.log("interviewReport ===>", interviewReport);
    res.status(200).json({
      message: "Interview report created successfully.",
      interviewReport,
    });
  } catch (error) {
    console.error("Error creating interview report:", error);
    next(error);
  }
}

async function getInterviewReportByIdController(req, res, next) {
  try {
    const { reportId } = req.params;
    const user = req.user.id;

    const interviewReport = await InterviewReportModel.findOne({
      _id: reportId,
      user,
    }).populate("user", "name email");

    if (!interviewReport) {
      throw new AppErrorHandler(404, "Interview report not found.");
    }

    res.status(200).json({
      message: "Interview report fetched successfully.",
      interviewReport,
    });
  } catch (error) {
    console.log("error get interview report  by id controller ==>:", error);
    next(error);
  }
}

const getAllInterviewReportController = async (req,res,next)=>{
  try {
    const interviewReport = await InterviewReportModel.find({user:req.user.id}).sort( {createdAt:-1} )

    res.status(200).json({
      message:"interview reports fetched successfully.",
      interviewReport
    })

  } catch (error) {
    console.log("Error get all report controller ==>",error)
    next(error)
  }
}


async function generateResumeController(req,res,next) {
  try {
    const resumefile = req.file;
    const { selfDescription, jobDescription } = req.body; 
    if (!jobDescription) {
      throw new AppErrorHandler(400, "Job description is required.");
    }
    const resumeContext = await new PDFParse(Uint8Array.from(resumefile.buffer)).getText();
    const pdfBuffer = await generateResumeAi({jobDescription, selfDescription, resume:resumeContext.text})

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="generated_resume.pdf"',
    });
    res.send(pdfBuffer);

  } catch (error) {
    console.error("Error generating resume:", error);
    next(error);
  }
}

export default { createInterviewController, getInterviewReportByIdController ,getAllInterviewReportController, generateResumeController};
