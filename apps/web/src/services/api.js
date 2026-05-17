// API client untuk Klikly
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = localStorage.getItem("klikly_token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === "object") {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Terjadi kesalahan");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Auth
  async login(email, password) {
    return this.request("/auth/login", {
      method: "POST",
      body: { email, password },
    });
  }

  async register(email, name, password) {
    return this.request("/auth/register", {
      method: "POST",
      body: { email, name, password },
    });
  }

  async getMe() {
    return this.request("/auth/me");
  }

  // Links
  async getLinks() {
    return this.request("/links");
  }

  async createLink(data) {
    return this.request("/links", {
      method: "POST",
      body: data,
    });
  }

  async updateLink(id, data) {
    return this.request(`/links/${id}`, {
      method: "PATCH",
      body: data,
    });
  }

  async deleteLink(id) {
    return this.request(`/links/${id}`, {
      method: "DELETE",
    });
  }

  async getLinkAnalytics(id) {
    return this.request(`/links/${id}/analytics`);
  }

  // Dashboard
  async getDashboardStats() {
    return this.request("/dashboard/stats");
  }
}

export const api = new ApiClient();
export default api;
