import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.js"
import interviewController from "../controllers/interview.controller.js"

const interviewRouter = express.Router()


interviewRouter.post("/", authMiddleware, upload.single("resume"), interviewController.createInterviewController)

interviewRouter.get("/report/:reportId", authMiddleware, interviewController.getInterviewReportByIdController)




export default interviewRouter