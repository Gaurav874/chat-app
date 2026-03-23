import axios from "axios";

// Yahan 'export' keyword hona bahut zaroori hai
export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/api",
  withCredentials: true
});