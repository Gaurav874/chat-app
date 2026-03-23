import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data.filteredUsered });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/message/msg/${userId}`);
      set({ messages: res.data });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      // API Call: Frontend se backend ko data bhej rahe hain
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData,);

      // Naya message jo backend se aaya hai, use purani list mein add karo
      set({ messages: [...messages, res.data] });
    } catch (error) {
      // Agar koi error aaye (jaise Cloudinary fail ho jaye)
      toast.error(error.response.data.message || "Failed to send message");
    }
  },


  // Real-time messages subscribe karne ka logic
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    // Listen for new messages
    socket.on("newMessage", (newMessage) => {
      // Check karna ki message usi user se aaya hai jo selected hai

    if (
        newMessage.senderId !== selectedUser._id &&
        newMessage.receiverId !== selectedUser._id
    ) return;
      
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  // Unsubscribe karna zaroori hai taaki duplicate listeners na banein
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
