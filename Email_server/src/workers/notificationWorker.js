import { Worker } from "bullmq";
import { redisClient } from "../config/redis/redis.js";
import sendMail from "../utils/nodemailer.js";

console.log("notification worker running....")
const notificationWorker = new Worker(
    "notification",
    async(job)=>{
        console.log("email notification active....",job)
        await sendMail({
            to:job.data.email,
            subject:job.data.subject,
            text:job.data.text
        })

    },
    {connection:redisClient}
)



notificationWorker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

notificationWorker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});


export default notificationWorker