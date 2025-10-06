import { apiFetch } from "../../utils/api";

export type User = {
  id_user: number;
  name: string;
  email: string;
  role?: string;
  created_at?: string;
  is_active?: boolean;
  id_department?: number;
}

// obtiene el usuario actual, osea, yo mismo
export async function getMe(): Promise<User> {
  return apiFetch<User>("/users/me");
}

// obtiene todos los usuarios
export async function getAllUsers(): Promise<User[]> {
  return apiFetch<User[]>("/users/all");
}

// obtiene un usuario por id
export async function getUserById(id: number): Promise<User> {
  return apiFetch<User>(`/users/${id}`);
}

// obtiene todos los usuarios de un departamento
export async function getUsersByDepartment(departmentId: number): Promise<User[]> {
  return apiFetch<User[]>(`/users/department/${departmentId}`);
}

// crea un usuario
export async function createUser(data: Partial<User>): Promise<User> {
  return apiFetch<User>("/users/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// actualiza un usuario
export async function updateUser(id: number, data: Partial<User>): Promise<User> {
  return apiFetch<User>(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// elimina un usuario
export async function deleteUser(id: number): Promise<void> {
  await apiFetch(`/users/${id}`, { method: "DELETE" });
}