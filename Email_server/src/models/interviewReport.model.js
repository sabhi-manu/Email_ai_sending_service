import mongoose from "mongoose";

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question required."],
    },
    intention: {
      type: String,
      required: [true, "Technical question required."],
    },
    answer: {
      type: String,
      required: [true, "Technical question required."],
    },
  },
  {
    _id: false,
  },
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question required."],
    },
    intention: {
      type: String,
      required: [true, "Technical question required."],
    },
    answer: {
      type: String,
      required: [true, "Technical question required."],
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new mongoose.Schema({
  skills: {
    type: String,
    required: [true, "skill is required"],
  },
  severity: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
},{
  _id: false,
});

const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is required."],
  },
  focus: {
    type: String,
    required: [true, "Focus is required."],
  },
  tasks: [
    {
      type: String,
      required: [true, "Tasks is required."],
    },
  ],
},{
  _id: false,
});

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job Description is required."],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title:{
      type: String,
       required: [true, "Title is required."],
    }
  },
  { timestamps: true },
);

const InterviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);

export default InterviewReportModel;
