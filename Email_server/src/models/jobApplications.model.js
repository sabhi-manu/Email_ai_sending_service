import mongoose  from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
    companyName: String,
  jobRole: String,
  location: String,
  hrEmail: String,

  status: {
    type: String,
    enum: ["pending", "processing", "sent", "failed"],
    default: "pending"
  },

  appliedAt: Date,

  error: String
},{timestamps:true})

jobApplicationSchema.index({ hrEmail: 1, jobRole: 1 }, { unique: true } )

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema)
export default JobApplication
