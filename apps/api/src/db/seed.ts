import { db } from "./index.js";
import { users, links, clicks } from "./schema.js";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("🌱 Seeding database...");

  // Create demo user
  const userId = nanoid();
  const passwordHash = await bcrypt.hash("demo123", 10);

  await db.insert(users).values({
    id: userId,
    email: "demo@klikly.id",
    name: "Demo User",
    passwordHash,
    role: "user",
  });

  // Create demo links
  const linkData = [
    {
      originalUrl: "https://github.com",
      title: "GitHub",
      shortCode: "gh",
      clicks: 1250,
    },
    {
      originalUrl: "https://google.com",
      title: "Google Search",
      shortCode: "ggl",
      clicks: 3420,
    },
    {
      originalUrl: "https://youtube.com",
      title: "YouTube",
      shortCode: "yt",
      clicks: 890,
    },
    {
      originalUrl: "https://stackoverflow.com",
      title: "Stack Overflow",
      shortCode: "so",
      clicks: 567,
    },
    {
      originalUrl: "https://vercel.com",
      title: "Vercel",
      shortCode: "vc",
      clicks: 210,
    },
  ];

  for (const data of linkData) {
    const linkId = nanoid();
    await db.insert(links).values({
      id: linkId,
      shortCode: data.shortCode,
      originalUrl: data.originalUrl,
      title: data.title,
      clicks: data.clicks,
      userId,
      isActive: true,
    });

    // Add some click records
    const clickCount = Math.min(data.clicks, 10);
    for (let i = 0; i < clickCount; i++) {
      await db.insert(clicks).values({
        id: nanoid(),
        linkId,
        ipAddress: "127.0.0.1",
        userAgent: "Mozilla/5.0",
        referrer: i % 2 === 0 ? "https://google.com" : "https://twitter.com",
        country: ["Indonesia", "United States", "Singapore"][i % 3],
        device: ["Desktop", "Mobile"][i % 2],
        browser: ["Chrome", "Safari", "Firefox"][i % 3],
        os: ["Windows", "macOS", "Linux"][i % 3],
      });
    }
  }

  console.log("✅ Seeding complete!");
  console.log("   Demo user: demo@klikly.id / demo123");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
