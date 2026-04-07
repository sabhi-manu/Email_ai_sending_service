import express from "express"
import authController from "../controllers/auth.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import registerRateLimit from "../middlewares/registerRateLimit.js"


const authRoute = express.Router()


authRoute.post("/register" ,registerRateLimit , authController.userRegisterController)
authRoute.post("/login" , authController.userLoginController)
authRoute.post("/logout" , authController.userLogoutController)
authRoute.post("/verify-otp" , authController.verifyOtp)
authRoute.get("/me" , authMiddleware , authController.currentUserController)






export default authRoute