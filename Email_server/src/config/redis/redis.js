import Redis from "ioredis";


console.log("redis running.....")

const redisClient = new Redis({

    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),

  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
   maxRetriesPerRequest: null
});

redisClient.on("connect", () => {
  console.log(" Redis connected successfully");
});

redisClient.on("error", (err) => {
  console.error(" Redis Client Error:", err);
});

async function connectRedis() {
  try {
    console.log("✅ Redis initialized (auto-connected by ioredis)");
  } catch (error) {
    console.error(" Redis connection failed:", error);
    process.exit(1);
  }
}

export { redisClient, connectRedis };