import type { Context, Next } from "hono";
import { ZodError } from "zod";

export async function errorHandler(c: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    console.error("Error:", err);

    if (err instanceof ZodError) {
      const details: Record<string, string[]> = {};
      for (const issue of err.issues) {
        const path = issue.path.join(".");
        if (!details[path]) details[path] = [];
        details[path].push(issue.message);
      }

      return c.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Validasi gagal",
            details,
          },
        },
        400
      );
    }

    return c.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: err instanceof Error ? err.message : "Terjadi kesalahan server",
        },
      },
      500
    );
  }
}
