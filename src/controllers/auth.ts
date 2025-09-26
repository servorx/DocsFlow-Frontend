import { apiFetch } from "../utils/api";

export async function login(username: string, password: string) {
  const response = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }

  // devuelve { access_token, token_type }
  return response.json();
}

interface RegisterData {
  email: string;
  password: string;
  role: "operator" | "admin";
}

export async function registerUser(data: RegisterData) {
  return apiFetch("/users/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

