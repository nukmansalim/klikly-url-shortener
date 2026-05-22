import type { ApiResponse, ApiError, PaginationMeta } from "@klikly/shared-types";

export function success<T>(data: T, meta?: PaginationMeta): ApiResponse<T> {
  return {
    success: true,
    data,
    meta,
  };
}

export function error(code: string, message: string, details?: Record<string, string[]>): ApiResponse {
  const err: ApiError = { code, message };
  if (details) err.details = details;
  return {
    success: false,
    error: err,
  };
}
