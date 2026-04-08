import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.js"
import interviewController from "../controllers/interview.controller.js"

const interviewRouter = express.Router()


interviewRouter.post("/interview/", authMiddleware, upload.single("resume"), interviewController.createInterviewController)

interviewRouter.get("/interview/report/:reportId", authMiddleware, interviewController.getInterviewReportByIdController)

interviewRouter.get("/interview/reports", authMiddleware, interviewController.getAllInterviewReportController)

interviewRouter.post("/resume", authMiddleware, upload.single("resume"), interviewController.generateResumeController)

export default interviewRouter