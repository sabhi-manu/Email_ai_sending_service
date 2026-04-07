import express from 'express';
import authRouter from "./routes/auth.routes.js"
import cookieParser from 'cookie-parser';
import interViewRoute from "./routes/interView.route.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true

}))

app.get("/test",(req,res)=>{
    console.log("application working...")
    res.status(200).json({
        message:"testing working..."
    })
})


app.use("/api/auth",authRouter)
app.use("/api/ai/interview",interViewRoute)

app.use((err,req,res,next)=>{
   let errorStatusCode = err.statusCode || 500
   let errorMessage = err.message || "internal Server Error."

   res.status(errorStatusCode).json({
    message:errorMessage
   })

})

export default app