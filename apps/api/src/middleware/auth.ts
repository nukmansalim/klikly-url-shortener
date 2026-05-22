import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import type { Context, Next } from "hono";

export interface JWTPayload {
  sub: string;
  email: string;
  role: string;
}

export interface Variables {
  user: JWTPayload;
}

export const authMiddleware = createMiddleware(async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Token tidak ditemukan" } },
      401
    );
  }

  const token = authHeader.substring(7);

  try {
    const payload = await verify(token, process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production", "HS256");
    c.set("user", payload as unknown as JWTPayload);
    await next();
  } catch {
    return c.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Token tidak valid" } },
      401
    );
  }
});
