import express from "express";
import cors from "cors";
import routes from "./routes";
import { config } from "./config/env.config";
import { notFoundMiddleware } from "./middleware/not-found404.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
import prisma from "./lib/prisma";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5000",
];

if (config.frontendUrl) {
  allowedOrigins.push(config.frontendUrl);
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(null, true); // Allow cross-origin API access for public endpoints
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Hub Backend is running 🚀",
  });
});

app.get("/api/debug-new", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT 1 AS test`;

    return res.status(200).json({
      success: true,
      message: "DATABASE CONNECTION WORKS",
      result,
    });
  } catch (error: any) {
    console.error("🔥 ACTUAL DATABASE ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error?.message,
      name: error?.name,
      code: error?.code,
      meta: error?.meta,
    });
  }
});
// Central API router
app.use("/api", routes);

// 404 handler for unmapped routes
app.use(notFoundMiddleware);

// Central error handler
app.use(errorMiddleware);

export default app;