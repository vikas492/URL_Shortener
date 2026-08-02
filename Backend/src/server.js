import "./config/env.js";

import app from "./app.js";
import { connectRedis } from "./config/redis.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectRedis();

  app.listen(PORT, () => {
    console.log(
      `🚀 Server is running on http://localhost:${PORT}`
    );
  });
}

startServer();