import "dotenv/config";
import express from "express";
import path from "path";
import { ENV } from "./config/env.js";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import adminRoutes from "./routes/admin.route.js"
import userRoutes from "./routes/user.route.js"
import orderRoutes from "./routes/order.route.js"
import productRoutes from "./routes/product.route.js";
import reviewRoutes from "./routes/review.route.js";
import cartRoutes from "./routes/cart.route.js";

const app = express();

// 👇 this matches HIS setup exactly
const __dirname = path.resolve();

// global middleware
app.use(express.json());
app.use(cors({
      origin: ENV.CLIENT_URL,
      credentials: true,
    }
));
// Clerk applies only to API routes
app.use("/api", clerkMiddleware());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Inngest endpoint (no auth issues)
app.use("/api/inngest", serve({ client: inngest, functions }));

app.use('/api/admin',adminRoutes)
app.use('/api/user',userRoutes);
app.use('/api/order',orderRoutes);
app.use('/api/product',productRoutes);
app.use('/api/review',reviewRoutes);
app.use('/api/cart',cartRoutes);

// Production: serve frontend
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}

// Start server AFTER DB connection
const startServer = async () => {
  try {
    await connectDB();

    app.listen(ENV.PORT, () => {
      console.log(`Server running on port ${ENV.PORT}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err);
    process.exit(1);
  }
};

startServer();
