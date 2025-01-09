import { create } from "zustand";
import axios from "axios";

// Use the VITE_API_URL environment variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensure cookies are included
});

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  register: async (name, email, password, password2) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("auth/register", {
        name,
        email,
        password,
        password2,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error in registration",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("auth/verify-email", { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error in email verification",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("auth/login", { email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await api.post("auth/logout");
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: "Error logging out",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await api.get("auth/check-auth");
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("checkAuth error:", error);
      const isTokenExpired = error.response?.status === 401;
      set({
        error: isTokenExpired
          ? "Session expired. Please log in again."
          : error.response?.data?.message || "Failed to check authentication",
        isAuthenticated: false,
        user: null,
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("auth/forgot-password", { email });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error sending reset email",
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(`auth/reset-password/${token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error resetting password",
        isLoading: false,
      });
      throw error;
    }
  },
}));

export default useAuthStore;
