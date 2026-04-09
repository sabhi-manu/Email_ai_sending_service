
import express from "express"
import applyJobController from "../controllers/jobApplication.controller.js"
import upload from "../middlewares/multer.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/",authMiddleware,upload.single("resume"),applyJobController)

export default router