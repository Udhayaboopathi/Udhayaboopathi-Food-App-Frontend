/**
 * Authentication state management using Zustand
 * Handles user login, logout, and authentication state
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import apiClient from "./api";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  role: string;
  profile_image?: string;
  is_active?: boolean;
  restaurant_id?: string;
  created_at?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set: any) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const formData = new FormData();
        formData.append("username", email);
        formData.append("password", password);

        const response = await apiClient.post("/auth/login", formData, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const { access_token, refresh_token } = response.data;

        Cookies.set("access_token", access_token, { expires: 1 });
        Cookies.set("refresh_token", refresh_token, { expires: 7 });

        // Fetch user data
        const userResponse = await apiClient.get("/auth/me");
        set({ user: userResponse.data, isAuthenticated: true });
      },

      register: async (data: any) => {
        const response = await apiClient.post("/auth/register", data);

        // Auto login after registration
        const formData = new FormData();
        formData.append("username", data.email);
        formData.append("password", data.password);

        const loginResponse = await apiClient.post("/auth/login", formData, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const { access_token, refresh_token } = loginResponse.data;

        Cookies.set("access_token", access_token, { expires: 1 });
        Cookies.set("refresh_token", refresh_token, { expires: 7 });

        set({ user: response.data, isAuthenticated: true });
      },

      logout: () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        set({ user: null, isAuthenticated: false });
      },

      fetchUser: async () => {
        try {
          const response = await apiClient.get("/auth/me");
          set({ user: response.data, isAuthenticated: true });
        } catch (error) {
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
