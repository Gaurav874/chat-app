import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  // Check if user is already logged in
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuthiiii:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

// Signup function
  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/signup", data);

      // Yahan par 'res.data.user' karna zaroori hai
      set({ authUser: res.data.user });

      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      set({ isSigningUp: false });
    }
  },
  
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/signin", data);
      set({ authUser: res.data.user });
      toast.success("Logged in successfully");
      
      // Optional: Login ke baad socket connect karne ka logic yahan aayega
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/logout");
      set({ authUser: null }); // State clear karna zaroori hai
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  updateProfile: async (data) => {
  set({ isUpdatingProfile: true });
  try {
    const res = await axiosInstance.put("/updateprofile", data);
    set({ authUser: res.data });
    toast.success("Profile updated successfully");
  } catch (error) {
    console.log("error in update profile:", error);
    toast.error(error.response.data.message);
  } finally {
    set({ isUpdatingProfile: false });
  }
},
}));