import api from "./api";
import { RegisterFormData } from "@/lib/validators/auth";
import { LoginFormData } from "@/lib/validators/auth";


export const register = async (data: RegisterFormData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
export const login = async (data: LoginFormData) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};
export const refresh = async () => {
  const response = await api.post("/auth/refresh");
  return response.data;
};
export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};