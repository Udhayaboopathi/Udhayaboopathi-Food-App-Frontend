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
          error.config?.data,
          error.config
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
async function handleMockRequest(
  url: string,
  method: string,
  data?: any,
  config?: any
) {
  console.log(`🎭 Mock API: ${method.toUpperCase()} ${url}`);

  // Strip query parameters for routing
  const cleanUrl = url.split("?")[0];

  // Restaurants
  if (cleanUrl === "/restaurants" || cleanUrl === "/admin/restaurants") {
    // Parse query parameters from original URL
    const urlObj = new URL(url, "http://localhost");
    const filters: any = {};

    if (urlObj.searchParams.get("city")) {
      filters.city = urlObj.searchParams.get("city");
    }
    if (urlObj.searchParams.get("cuisine")) {
      filters.cuisine = urlObj.searchParams.get("cuisine");
    }
    if (urlObj.searchParams.get("search")) {
      filters.search = urlObj.searchParams.get("search");
    }

    return await mockAPI.getRestaurants(filters);
  }

  // Single restaurant by ID
  if (cleanUrl.match(/\/restaurants\/(\d+)$/)) {
    const restaurantId = cleanUrl.match(/\/restaurants\/(\d+)$/)?.[1];
    return await mockAPI.getRestaurant(restaurantId!);
  }

  // Menu items for specific restaurant
  if (cleanUrl.match(/\/restaurants\/(\d+)\/menu/)) {
    const restaurantId = cleanUrl.match(/\/restaurants\/(\d+)\/menu/)?.[1];
    return await mockAPI.getMenuItems(restaurantId!);
  }

  // Menu items by restaurant ID (alternative route)
  if (cleanUrl.match(/\/menu\/restaurant\/(\d+)/)) {
    const restaurantId = cleanUrl.match(/\/menu\/restaurant\/(\d+)/)?.[1];
    return await mockAPI.getMenuItems(restaurantId!);
  }

  // All menu items
  if (cleanUrl === "/menu") {
    return await mockAPI.getAllMenuItems();
  }

  // Auth
  if (cleanUrl === "/auth/login" && method === "post") {
    // Handle FormData from login
    const email = data.get ? data.get("username") : data.email;
    const password = data.get ? data.get("password") : data.password;
    return await mockAPI.login(email, password);
  }

  if (cleanUrl === "/auth/me" && method === "get") {
    // Get token from config headers
    const token = config?.headers?.Authorization?.replace("Bearer ", "");
    if (!token) {
      throw new Error("No token provided");
    }
    return await mockAPI.getCurrentUser(token);
  }

  if (cleanUrl === "/auth/register" && method === "post") {
    return await mockAPI.register(data);
  }

  // Orders
  if (cleanUrl === "/orders" && method === "post") {
    return await mockAPI.createOrder(data);
  }

  if (cleanUrl.match(/\/orders\/user\/(.+)/)) {
    const userId = cleanUrl.match(/\/orders\/user\/(.+)/)?.[1];
    return await mockAPI.getUserOrders(userId!);
  }

  // Admin routes
  if (cleanUrl === "/admin/users") {
    return await mockAPI.getAdminUsers();
  }

  if (cleanUrl === "/admin/orders") {
    return await mockAPI.getAllOrders();
  }

  // Owner routes
  if (cleanUrl === "/owner/stats") {
    // Get restaurant_id from user token
    const token = config?.headers?.Authorization?.replace("Bearer ", "");
    const userId = token?.replace("mock_token_", "");

    // Get user to find restaurant_id
    const users = await mockAPI.getCurrentUser(token || "");
    const restaurantId = users.restaurant_id;

    if (!restaurantId) {
      throw new Error("Owner has no restaurant assigned");
    }

    return await mockAPI.getOwnerStats(restaurantId);
  }

  if (cleanUrl === "/owner/restaurant") {
    const token = config?.headers?.Authorization?.replace("Bearer ", "");
    const userId = token?.replace("mock_token_", "");
    const users = await mockAPI.getCurrentUser(token || "");
    const restaurantId = users.restaurant_id;

    return await mockAPI.getOwnerRestaurant(restaurantId!);
  }

  if (cleanUrl === "/owner/orders") {
    const token = config?.headers?.Authorization?.replace("Bearer ", "");
    const userId = token?.replace("mock_token_", "");
    const users = await mockAPI.getCurrentUser(token || "");
    const restaurantId = users.restaurant_id;

    return await mockAPI.getOwnerOrders(restaurantId!);
  }

  if (cleanUrl.match(/\/owner\/menu/)) {
    const token = config?.headers?.Authorization?.replace("Bearer ", "");
    const userId = token?.replace("mock_token_", "");
    const users = await mockAPI.getCurrentUser(token || "");
    const restaurantId = users.restaurant_id;

    return await mockAPI.getMenuItems(restaurantId!);
  }

  throw new Error(`Mock API route not found: ${cleanUrl}`);
}

export default apiClient;
