import { pgTable, text, integer, timestamp, boolean, varchar, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("user_role", ["user", "admin"]);

export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  avatar: text("avatar"),
  role: roleEnum("role").notNull().default("user"),
  createdAt: timestamp("created_at", { mode: "string" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .defaultNow(),
});

export const links = pgTable("links", {
  id: varchar("id", { length: 255 }).primaryKey(),
  shortCode: varchar("short_code", { length: 50 }).notNull().unique(),
  originalUrl: text("original_url").notNull(),
  title: varchar("title", { length: 255 }),
  clicks: integer("clicks").notNull().default(0),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "string" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .defaultNow(),
  expiresAt: timestamp("expires_at", { mode: "string" }),
  isActive: boolean("is_active").notNull().default(true),
});

export const clicks = pgTable("clicks", {
  id: varchar("id", { length: 255 }).primaryKey(),
  linkId: varchar("link_id", { length: 255 })
    .notNull()
    .references(() => links.id, { onDelete: "cascade" }),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  country: varchar("country", { length: 100 }),
  city: varchar("city", { length: 100 }),
  device: varchar("device", { length: 100 }),
  browser: varchar("browser", { length: 100 }),
  os: varchar("os", { length: 100 }),
  createdAt: timestamp("created_at", { mode: "string" })
    .notNull()
    .defaultNow(),
});
