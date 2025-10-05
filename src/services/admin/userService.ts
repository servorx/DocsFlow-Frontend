import { apiFetch } from "../../utils/api";

export type User = {
  id_user: number;
  name: string;
  email: string;
  role?: string;
  created_at?: string;
  is_active?: boolean;
}

export async function getAllUsers(): Promise<User[]> {
  return apiFetch<User[]>("/users");
}

export async function getUserById(id: number): Promise<User> {
  return apiFetch<User>(`/users/${id}`);
}

export async function getUsersByDepartment(department: string): Promise<User[]> {
  return apiFetch<User[]>(`/admin/users?department=${department}`);
}

export async function createUser(data: Partial<User>): Promise<User> {
  return apiFetch<User>("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateUser(id: number, data: Partial<User>): Promise<User> {
  return apiFetch<User>(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteUser(id: number): Promise<void> {
  await apiFetch(`/users/${id}`, { method: "DELETE" });
}
export async function deactivateUser(id: number): Promise<void> {
  await apiFetch(`/users/${id}/deactivate`, { method: "PUT" });
}