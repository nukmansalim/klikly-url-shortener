import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { success, error } from "../utils/response.js";
import type { ApiResponse, LoginResponse, RegisterResponse } from "@klikly/shared-types";
import type { JWTPayload } from "../middleware/auth.js";

const auth = new Hono<{ Variables: { user: JWTPayload } }>();

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

const registerSchema = z.object({
  email: z.string().email("Email tidak valid"),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

// POST /auth/login
auth.post("/login", zValidator("json", loginSchema), async (c) => {
  const { email, password } = c.req.valid("json");

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return c.json(error("INVALID_CREDENTIALS", "Email atau password salah"), 401);
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    return c.json(error("INVALID_CREDENTIALS", "Email atau password salah"), 401);
  }

  const token = await sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 hari
    },
    process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production"
  );

  const response: LoginResponse = {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar || undefined,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };

  return c.json(success(response));
});

// POST /auth/register
auth.post("/register", zValidator("json", registerSchema), async (c) => {
  const { email, name, password } = c.req.valid("json");

  const [existingUser] = await db.select().from(users).where(eq(users.email, email));
  if (existingUser) {
    return c.json(error("EMAIL_EXISTS", "Email sudah terdaftar"), 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = nanoid();

  await db.insert(users).values({
    id: userId,
    email,
    name,
    passwordHash,
    role: "user",
  });

  const token = await sign(
    {
      sub: userId,
      email,
      role: "user",
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    },
    process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production"
  );

  const [newUser] = await db.select().from(users).where(eq(users.id, userId));
  if (!newUser) {
    return c.json(error("INTERNAL_ERROR", "Gagal membuat user"), 500);
  }

  const response: RegisterResponse = {
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      avatar: newUser.avatar || undefined,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    },
  };

  return c.json(success(response), 201);
});

// GET /auth/me
auth.get("/me", async (c) => {
  const userPayload = c.get("user");
  if (!userPayload) {
    return c.json(error("UNAUTHORIZED", "Token tidak ditemukan"), 401);
  }

  const [user] = await db.select().from(users).where(eq(users.id, userPayload.sub));
  if (!user) {
    return c.json(error("NOT_FOUND", "User tidak ditemukan"), 404);
  }

  return c.json(success({
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar || undefined,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));
});

export default auth;
