import "./src/config/env.js"

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { connectRedis } from "./src/config/redis/redis.js";

// worker import .
import notificationWorker from "./src/workers/notificationWorker.js";



const PORT =process.env.PORT || 8000

 async function main() {
    try {
     await  connectRedis()
       await connectDB()
       
        app.listen(PORT)
       console.log("server running on port ",PORT)

    } catch (error) {
        console.log("error occure in Running server.", error)
    }
    
 }

 main()