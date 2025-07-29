import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 backend server running here
});

export const loginUser = (
  email: string,
  password: string,
  role: "user" | "admin"
) => API.post("/login", { email, password, role });
