import { Queue } from "bullmq";
import { redisClient } from "../config/redis/redis.js";


const notificationQueue = new Queue(
    "notification",
    {connection:redisClient}
)


export default notificationQueue