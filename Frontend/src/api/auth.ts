import axios from "axios";

const API = axios.create({
  baseURL: "https://excel-analytics-platform-mern.onrender.com/api", // 👈 backend server running here
});

export const loginUser = (
  email: string,
  password: string,
  role: "user" | "admin"
) => API.post("/login", { email, password, role });

export const createData = (data: any) => API.post("/create-data", data);
