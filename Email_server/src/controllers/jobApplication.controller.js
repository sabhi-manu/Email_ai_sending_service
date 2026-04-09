
import jobQueue from "../queues/job.queue.js"
import AppErrorHandler from "../utils/errorHandler.js"




async function applyJobController(req,res,next) {
    console.log("job controller running....")
    try {
        console.log("checking the file in controller ==>", req.body, "check the file ==>",req.file)
        const {jobDescription,selfDescription,generateResume } = req.body
        const resumeFile = req.file

        if(!jobDescription){
            throw new AppErrorHandler(400,"job Description requied.")
        }

        if(!resumeFile && ! generateResume ){
            throw new AppErrorHandler(400,"Resume required if not generating one.")
        }
       
       const data = {
      jobDescription,
      selfDescription,
      generateResume,
      resume: resumeFile?{
        buffer: resumeFile.buffer.toString("base64"),
        mimetype: resumeFile.mimetype,
        originalname: resumeFile.originalname,
      }:null,
    };

        await jobQueue.add("applyJob",data,{
            attempts:2,
            backoff:{
                type:"exponential",
                delay:5000
            }
        })
        
        res.status(200).json({
      success: true,
      message: "Job added to queue successfully",
    });


    } catch (error) {
        console.log("error in apply job controller :",error)
        next(error)
    }
    
}

export default applyJobController