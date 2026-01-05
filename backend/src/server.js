import "dotenv/config";
import express from "express";
import path from "path";
import { ENV } from "./config/env.js";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";

const app = express();
app.use(express.json());

// Apply Clerk middleware only to API routes
app.use("/api", clerkMiddleware());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Inngest webhook endpoint
app.use("/api/inngest", serve({ client: inngest, functions }));

// Serve frontend in production
if (ENV.NODE_ENV === "production") {
  const __dirname = path.resolve();
  const frontendPath = path.join(__dirname, "../../admin/dist");

  app.use(express.static(frontendPath));

  // SPA catch-all
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(ENV.PORT, () => {
      console.log(`Server running on port ${ENV.PORT}!`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
