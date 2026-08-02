import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/url.routes.js";
import urlController from "./controllers/url.controller.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "URL Shortener API is running 🚀",
  });
});

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/urls", urlRoutes);

// Public Redirect Route
app.get("/:shortCode", urlController.redirect);

// Error Handler (ALWAYS LAST)
app.use(errorMiddleware);

export default app;