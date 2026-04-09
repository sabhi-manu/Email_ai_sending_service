import { Queue } from "bullmq";
import { redisClient } from "../config/redis/redis.js";

const jobQueue = new Queue("apply-job", { connection: redisClient });

export default jobQueue;
