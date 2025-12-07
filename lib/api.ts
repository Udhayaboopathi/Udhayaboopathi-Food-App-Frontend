/**
 * Axios API client configuration
 * Centralized HTTP client with interceptors and mock data fallback
 */
import axios from "axios";
import Cookies from "js-cookie";
import { mockAPI } from "./mockData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors and fallback to mock data
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If using mock data or backend is unavailable, try mock API
    if (
      USE_MOCK ||
      error.code === "ERR_NETWORK" ||
      error.response?.status === 404
    ) {
      const url = error.config?.url || "";
      const method = error.config?.method || "get";

      try {
        const mockData = await handleMockRequest(
          url,
          method,
          error.config?.data
        );
        return {
          data: mockData,
          status: 200,
          statusText: "OK (Mock)",
          headers: {},
          config: error.config,
        };
      } catch (mockError) {
        console.warn("Mock API also failed:", mockError);
      }
    }

    if (error.response?.status === 401) {
      // Token expired, clear cookies and redirect to login
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Handle mock API requests
async function handleMockRequest(url: string, method: string, data?: any) {
  console.log(`🎭 Mock API: ${method.toUpperCase()} ${url}`);

  // Restaurants
  if (url === "/restaurants" || url === "/admin/restaurants") {
    return await mockAPI.getRestaurants();
  }

  // Menu items for specific restaurant
  if (url.match(/\/restaurants\/(\d+)\/menu/)) {
    const restaurantId = url.match(/\/restaurants\/(\d+)\/menu/)?.[1];
    return await mockAPI.getMenuItems(restaurantId!);
  }

  // All menu items
  if (url === "/menu") {
    return await mockAPI.getAllMenuItems();
  }

  // Auth
  if (url === "/auth/login" && method === "post") {
    return await mockAPI.login(data.email, data.password);
  }

  if (url === "/auth/register" && method === "post") {
    return await mockAPI.register(data.name, data.email, data.password);
  }

  // Orders
  if (url === "/orders" && method === "post") {
    return await mockAPI.createOrder(data);
  }

  if (url.match(/\/orders\/user\/(.+)/)) {
    const userId = url.match(/\/orders\/user\/(.+)/)?.[1];
    return await mockAPI.getUserOrders(userId!);
  }

  // Admin routes
  if (url === "/admin/users") {
    return await mockAPI.getAdminUsers();
  }

  if (url === "/admin/orders") {
    return await mockAPI.getAllOrders();
  }

  throw new Error(`Mock API route not found: ${url}`);
}

export default apiClient;
