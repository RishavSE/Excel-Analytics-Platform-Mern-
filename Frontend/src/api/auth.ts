import axios from "axios";

const API = axios.create({
  baseURL:import.meta.env.VITE_API_BASE_URL, // 👈 backend server running here
});

export const loginUser = (
  email: string,
  password: string,
  role: "user" | "admin"
) => API.post("/login", { email, password, role });

export const registerUser = (
  email: string,
  password: string,
  role: "user" | "admin"
) => API.post("/register", { email, password, role });

export const createData = (data: any) => API.post("/create-data", data);
