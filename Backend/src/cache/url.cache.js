import redisClient from "../config/redis.js";

class UrlCache {
  async get(shortCode) {
    try {
      return await redisClient.get(shortCode);
    } catch {
      return null;
    }
  }

  async set(shortCode, originalUrl) {
    try {
      await redisClient.set(shortCode, originalUrl, {
        EX: 3600, // Cache for 1 hour
      });
    } catch {}
  }

  async delete(shortCode) {
    try {
      await redisClient.del(shortCode);
    } catch {}
  }
}

export default new UrlCache();