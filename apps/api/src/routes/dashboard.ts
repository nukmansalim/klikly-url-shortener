import { Hono } from "hono";
import { db } from "../db/index.js";
import { links, clicks } from "../db/schema.js";
import { eq, desc, sql } from "drizzle-orm";
import { authMiddleware, type JWTPayload } from "../middleware/auth.js";
import { success } from "../utils/response.js";
import type { DashboardStats, Link } from "@klikly/shared-types";

const dashboard = new Hono<{ Variables: { user: JWTPayload } }>();

dashboard.use("*", authMiddleware);

// GET /dashboard/stats
 dashboard.get("/stats", async (c) => {
  const user = c.get("user");

  const userLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, user.sub));

  const totalLinks = userLinks.length;
  const totalClicks = userLinks.reduce((sum, link) => sum + link.clicks, 0);
  const activeLinks = userLinks.filter((link) => link.isActive).length;
  const avgClicksPerLink = totalLinks > 0 ? Math.round(totalClicks / totalLinks) : 0;

  const recentLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, user.sub))
    .orderBy(desc(links.createdAt))
    .limit(5);

  const topPerformingLinks = [...userLinks]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5);

  const mapLink = (l: any): Link => ({
    ...l,
    title: l.title ?? undefined,
    expiresAt: l.expiresAt ?? undefined,
  });

  const stats: DashboardStats = {
    totalLinks,
    totalClicks,
    activeLinks,
    avgClicksPerLink,
    recentLinks: recentLinks.map(mapLink),
    topPerformingLinks: topPerformingLinks.map(mapLink),
  };

  return c.json(success(stats));
});

export default dashboard;
