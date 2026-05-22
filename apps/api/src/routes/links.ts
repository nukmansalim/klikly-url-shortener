import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { nanoid } from "nanoid";
import { db } from "../db/index.js";
import { links, clicks } from "../db/schema.js";
import { eq, desc, sql, and, gte } from "drizzle-orm";
import { authMiddleware, type JWTPayload } from "../middleware/auth.js";
import { success, error } from "../utils/response.js";
import type { Link, CreateLinkRequest, UpdateLinkRequest, LinkAnalytics } from "@klikly/shared-types";

const linkRoutes = new Hono<{ Variables: { user: JWTPayload } }>();

const mapLink = (l: any): Link => ({
  ...l,
  title: l.title ?? undefined,
  expiresAt: l.expiresAt ?? undefined,
});

const createLinkSchema = z.object({
  originalUrl: z.string().url("URL tidak valid"),
  title: z.string().optional(),
  customShortCode: z.string().min(3).max(20).optional(),
  expiresAt: z.string().datetime().optional(),
});

const updateLinkSchema = z.object({
  title: z.string().optional(),
  originalUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
});

// Apply auth middleware to all routes
linkRoutes.use("*", authMiddleware);

// GET /links - List all links for current user
linkRoutes.get("/", async (c) => {
  const user = c.get("user");

  const userLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, user.sub))
    .orderBy(desc(links.createdAt));

  return c.json(success(userLinks.map(mapLink)));
});

// POST /links - Create new link
linkRoutes.post("/", zValidator("json", createLinkSchema), async (c) => {
  const user = c.get("user");
  const data = c.req.valid("json");

  const shortCode = data.customShortCode || nanoid(6);

  // Check if short code already exists
  const [existing] = await db.select().from(links).where(eq(links.shortCode, shortCode));
  if (existing) {
    return c.json(error("SHORTCODE_EXISTS", "Short code sudah digunakan"), 409);
  }

  const linkId = nanoid();
  await db.insert(links).values({
    id: linkId,
    shortCode,
    originalUrl: data.originalUrl,
    title: data.title,
    userId: user.sub,
    expiresAt: data.expiresAt,
    isActive: true,
  });

  const [newLink] = await db.select().from(links).where(eq(links.id, linkId));
  if (!newLink) {
    return c.json(error("INTERNAL_ERROR", "Gagal mengambil link"), 500);
  }
  return c.json(success(mapLink(newLink)), 201);
});

// GET /links/:id - Get single link
linkRoutes.get("/:id", async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");

  const [link] = await db.select().from(links).where(eq(links.id, id));
  if (!link || link.userId !== user.sub) {
    return c.json(error("NOT_FOUND", "Link tidak ditemukan"), 404);
  }

  return c.json(success(mapLink(link)));
});

// PATCH /links/:id - Update link
linkRoutes.patch("/:id", zValidator("json", updateLinkSchema), async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");
  const data = c.req.valid("json");

  const [link] = await db.select().from(links).where(eq(links.id, id));
  if (!link || link.userId !== user.sub) {
    return c.json(error("NOT_FOUND", "Link tidak ditemukan"), 404);
  }

  await db
    .update(links)
    .set({
      ...data,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(links.id, id));

  const [updated] = await db.select().from(links).where(eq(links.id, id));
  if (!updated) {
    return c.json(error("NOT_FOUND", "Link tidak ditemukan"), 404);
  }
  return c.json(success(mapLink(updated)));
});

// DELETE /links/:id - Delete link
linkRoutes.delete("/:id", async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");

  const [link] = await db.select().from(links).where(eq(links.id, id));
  if (!link || link.userId !== user.sub) {
    return c.json(error("NOT_FOUND", "Link tidak ditemukan"), 404);
  }

  await db.delete(links).where(eq(links.id, id));
  return c.json(success({ message: "Link berhasil dihapus" }));
});

// GET /links/:id/analytics - Get link analytics
linkRoutes.get("/:id/analytics", async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");

  const [link] = await db.select().from(links).where(eq(links.id, id));
  if (!link || link.userId !== user.sub) {
    return c.json(error("NOT_FOUND", "Link tidak ditemukan"), 404);
  }

  const linkClicks = await db
    .select()
    .from(clicks)
    .where(eq(clicks.linkId, id))
    .orderBy(desc(clicks.createdAt));

  // Group clicks by day (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentClicks = linkClicks.filter(
    (c) => new Date(c.createdAt) >= thirtyDaysAgo
  );

  const clicksByDay: Record<string, number> = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    clicksByDay[dateStr] = 0;
  }

  for (const click of recentClicks) {
    const dateStr = click.createdAt.split("T")[0];
    if (clicksByDay[dateStr] !== undefined) {
      clicksByDay[dateStr]++;
    }
  }

  // Top referrers
  const referrerCounts: Record<string, number> = {};
  for (const click of linkClicks) {
    const ref = click.referrer || "Direct";
    referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
  }

  // Top countries
  const countryCounts: Record<string, number> = {};
  for (const click of linkClicks) {
    const country = click.country || "Unknown";
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  }

  // Top devices
  const deviceCounts: Record<string, number> = {};
  for (const click of linkClicks) {
    const device = click.device || "Unknown";
    deviceCounts[device] = (deviceCounts[device] || 0) + 1;
  }

  // Top browsers
  const browserCounts: Record<string, number> = {};
  for (const click of linkClicks) {
    const browser = click.browser || "Unknown";
    browserCounts[browser] = (browserCounts[browser] || 0) + 1;
  }

  const analytics: LinkAnalytics = {
    linkId: id,
    totalClicks: link.clicks,
    uniqueClicks: new Set(linkClicks.map((c) => c.ipAddress)).size,
    clicksByDay: Object.entries(clicksByDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date)),
    topReferrers: Object.entries(referrerCounts)
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
    topCountries: Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
    topDevices: Object.entries(deviceCounts)
      .map(([device, count]) => ({ device, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
    topBrowsers: Object.entries(browserCounts)
      .map(([browser, count]) => ({ browser, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
  };

  return c.json(success(analytics));
});

export default linkRoutes;
