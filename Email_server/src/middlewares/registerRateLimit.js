import { redisClient } from "../config/redis/redis.js";
import AppErrorHandler from "../utils/errorHandler.js";

const registerRateLimit = async (req, res, next) => {
  console.log("rate liming running.....",req.body)
  try {
    const key = `rgRateLimit:${req.body.email}`;
    const MAX_ATTEMPTS = 30;
    const WINDOW = 60 * 60 * 12;

    let attempts = await redisClient.get(key);

    if (!attempts) {
      await redisClient.set(key, 1,  "EX", WINDOW );
      return next();
    }

    attempts = Number(attempts);

    if (attempts >= MAX_ATTEMPTS) {
      throw new AppErrorHandler(429, "Too many OTP requests. Try again later.");
    }

    await redisClient.incr(key);
console.log("rate limit call next ....")
    next();
  } catch (error) {
    console.log("error in rate limit middleware :",error)
    next(error);
  }
};

export default registerRateLimit;
