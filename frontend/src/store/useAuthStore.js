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
}));
