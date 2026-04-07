import { redisClient } from "../config/redis/redis.js";
import AppErrorHandler from "../utils/errorHandler.js"
import jwt from "jsonwebtoken"

async function authMiddleware(req,res,next) {
    try {
        // const token = req.cookies.token
   const token = req.cookies.token;
        if(!token){
            throw new AppErrorHandler(403,"UnAuthorized user .")
        }

        const key = `bl:${token}`;
        const isBlackList = await redisClient.get(key)
        if(isBlackList){
            throw new AppErrorHandler(404,"invalid Token.")
        }

        const decodeToken =  jwt.verify(token,process.env.JWT_SECRET)
        if(!decodeToken){
             throw new AppErrorHandler(404,"invalid  user token .")
        }
console.log("decode token in auth middleware :",decodeToken)
        req.user= decodeToken
        next()
    } catch (error) {
        console.log("error in auth.",error)
        next(error)
    }
    
}

export default authMiddleware