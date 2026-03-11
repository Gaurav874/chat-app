import axios from "axios";

// Yahan 'export' keyword hona bahut zaroori hai
export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true
});