// ========================
// User Types
// ========================

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  avatar?: string;
}

// ========================
// Auth Types
// ========================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  user: User;
}

// ========================
// Link Types
// ========================

export interface Link {
  id: string;
  shortCode: string;
  originalUrl: string;
  title?: string;
  clicks: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  isActive: boolean;
}

export interface CreateLinkRequest {
  originalUrl: string;
  title?: string;
  customShortCode?: string;
  expiresAt?: string;
}

export interface UpdateLinkRequest {
  title?: string;
  originalUrl?: string;
  isActive?: boolean;
}

// ========================
// Click/Analytics Types
// ========================

export interface Click {
  id: string;
  linkId: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  os?: string;
  createdAt: string;
}

export interface LinkAnalytics {
  linkId: string;
  totalClicks: number;
  uniqueClicks: number;
  clicksByDay: ClicksByDay[];
  topReferrers: ReferrerStat[];
  topCountries: CountryStat[];
  topDevices: DeviceStat[];
  topBrowsers: BrowserStat[];
}

export interface ClicksByDay {
  date: string;
  count: number;
}

export interface ReferrerStat {
  referrer: string;
  count: number;
}

export interface CountryStat {
  country: string;
  count: number;
}

export interface DeviceStat {
  device: string;
  count: number;
}

export interface BrowserStat {
  browser: string;
  count: number;
}

// ========================
// API Response Types
// ========================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: PaginationMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ========================
// Dashboard Types
// ========================

export interface DashboardStats {
  totalLinks: number;
  totalClicks: number;
  activeLinks: number;
  avgClicksPerLink: number;
  recentLinks: Link[];
  topPerformingLinks: Link[];
}

// ========================
// Settings Types
// ========================

export interface UserSettings {
  darkMode: boolean;
  language: "id" | "en";
  emailNotifications: boolean;
  weeklyReport: boolean;
}
