import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;

// ✅ Original: Keep this for dashboard stats (unchanged)
export const getAllUsers = () => API.get("/users");

// ✅ NEW: Use this only in users.tsx for .map()
export const fetchAllUsersArray = () =>
  API.get("/users").then((res) => res.data);

// ✅ Other routes (unchanged)
export const getUserStats = () => API.get("/users/stats");
export const deleteUser = (id: string) => API.delete(`/users/${id}`);
export const getUploadCount = () => API.get("/uploads-count");
