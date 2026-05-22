import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/error.js";
import authRoutes from "./routes/auth.js";
import linkRoutes from "./routes/links.js";
import redirectRoutes from "./routes/redirect.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = new Hono();
const PORT = parseInt(process.env.PORT || "3001");

// Middleware
app.use(logger());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(errorHandler);

// Health check
app.get("/health", (c) => c.json({ success: true, data: { status: "ok", timestamp: new Date().toISOString() } }));

// Routes
app.route("/auth", authRoutes);
app.route("/links", linkRoutes);
app.route("/dashboard", dashboardRoutes);
app.route("/", redirectRoutes); // Short URL redirects

// 404 handler
app.notFound((c) => c.json({ success: false, error: { code: "NOT_FOUND", message: "Endpoint tidak ditemukan" } }, 404));

console.log(`🚀 Klikly API running on http://localhost:${PORT}`);

serve({
  fetch: app.fetch,
  port: PORT,
});

export default app;
