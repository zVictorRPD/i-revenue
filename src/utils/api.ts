import axios, { AxiosError } from "axios";
import { type ErrorResponse, type Response } from "@/types/api";
import type { User } from "@/types/user";

type zustandUserStore = {
  state: {
    user: User | null;
  };
};
export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL || "http://localhost:3000",
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const userStore = localStorage.getItem("i-revenue-user") as string | null;
  const user: zustandUserStore | null = userStore ? JSON.parse(userStore) : null;
  const path = config.url || "";
  console.log(path);
  console.log(path.includes("/login"));

  if (path.includes("/login") || path.includes("/register")) {
    config.baseURL = config.baseURL?.replace("/api", "");
    return config;
  }
  console.log(user);

  if (user) {
    config.headers["Authorization"] = `Bearer ${user.state.user?.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: ErrorResponse): Promise<ErrorResponse> => {
    const userStore = localStorage.getItem("i-revenue-user") as string | null;
    const user: zustandUserStore | null = userStore ? JSON.parse(userStore) : null;
    if (error && error.status === 401 && user?.state.user?.token) {
      localStorage.removeItem("i-revenue-user");
      window.location.href = "/login";
    }
    throw error;
  }

);

// Funções auxiliares tipadas
export async function get<T>(url: string): Promise<Response<T>> {
  const response = await api.get<Response<T>>(url);
  return response.data;
}

export async function post<T>(url: string, data?: unknown): Promise<Response<T>> {
  const response = await api.post<Response<T>>(url, data);
  console.log(response);

  return response.data;
}

export async function put<T>(url: string, data?: unknown): Promise<Response<T>> {
  const response = await api.put<Response<T>>(url, data);
  return response.data;
}

export async function patch<T>(url: string, data?: unknown): Promise<Response<T>> {
  const response = await api.patch<Response<T>>(url, data);
  return response.data;
}

export async function del<T>(url: string): Promise<Response<T>> {
  const response = await api.delete<Response<T>>(url);
  return response.data;
}

export const handleMutationError = (e: AxiosError<ErrorResponse>): string => {
  const errors = e.response?.data?.errors;
  const message =
    errors?.map((apiError) => apiError.message).join(", ") ||
    "Ocorreu um erro.";
  return message;
};