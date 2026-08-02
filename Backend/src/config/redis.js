import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("🟢 Redis Connected");
});

redisClient.on("error", (err) => {
  console.error("🔴 Redis Error:", err.message || err);
});

export async function connectRedis() {
  try {
    await redisClient.connect();
  } catch (err) {
    console.log(
      "⚠️ Redis unavailable. App will continue without cache."
    );
  }
}

export default redisClient;