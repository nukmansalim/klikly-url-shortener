import { Hono } from "hono";
import { db } from "../db/index.js";
import { links, clicks } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { success, error } from "../utils/response.js";

const redirect = new Hono();

// GET /:shortCode - Redirect to original URL
redirect.get("/:shortCode", async (c) => {
  const shortCode = c.req.param("shortCode");

  const [link] = await db.select().from(links).where(eq(links.shortCode, shortCode));

  if (!link) {
    return c.json(error("NOT_FOUND", "Link tidak ditemukan"), 404);
  }

  if (!link.isActive) {
    return c.json(error("INACTIVE", "Link tidak aktif"), 410);
  }

  if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
    return c.json(error("EXPIRED", "Link sudah expired"), 410);
  }

  // Record click analytics
  const userAgent = c.req.header("user-agent") || "";
  const referrer = c.req.header("referer") || "";
  const ipAddress = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "unknown";

  // Simple device/browser detection
  const device = /Mobile|Android|iPhone|iPad/i.test(userAgent) ? "Mobile" : "Desktop";
  const browser = userAgent.includes("Chrome")
    ? "Chrome"
    : userAgent.includes("Safari")
    ? "Safari"
    : userAgent.includes("Firefox")
    ? "Firefox"
    : "Other";
  const os = userAgent.includes("Windows")
    ? "Windows"
    : userAgent.includes("Mac")
    ? "macOS"
    : userAgent.includes("Linux")
    ? "Linux"
    : "Other";

  await db.insert(clicks).values({
    id: nanoid(),
    linkId: link.id,
    ipAddress: typeof ipAddress === "string" ? ipAddress.split(",")[0].trim() : ipAddress,
    userAgent,
    referrer,
    device,
    browser,
    os,
  });

  // Increment click count
  await db
    .update(links)
    .set({ clicks: link.clicks + 1 })
    .where(eq(links.id, link.id));

  return c.redirect(link.originalUrl, 302);
});

export default redirect;
