import express from "express";
import cors from "cors";
import routes from "./routes";

import { notFoundMiddleware } from "./middleware/not-found404.middleware";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Central router
app.use("/api", routes);


// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Hub Backend is running 🚀",
  });
});

app.get("/api/debug-new", (req, res) => {
  console.log("🔥 NEW APP.TS DEBUG ROUTE HIT");

  res.json({
    message: "THIS IS THE NEW BACKEND",
  });
});

// 404 middleware
app.use(notFoundMiddleware);

// Error middleware
app.use(errorMiddleware);

export default app;