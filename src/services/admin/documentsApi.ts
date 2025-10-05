import { apiFetch } from "../../utils/api";

const API_URL = import.meta.env.VITE_URL_API;

export interface Document {
  id: number;
  title: string;
  department: string;
  owner: string;
  date: string;
  status: string;
}

// Obtener todos los documentos
export async function getDocuments(): Promise<Document[]> {
  return apiFetch<Document[]>("/admin/documents");
}

// Filtrar por departamento
export async function getDocumentsByDepartment(
  department: string
): Promise<Document[]> {
  return apiFetch<Document[]>(`/admin/documents?department=${department}`);
}

// Subir nuevo documento
export async function uploadDocument(data: FormData): Promise<Document> {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/admin/documents`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: data,
  });

  if (!response.ok) throw new Error("Error al subir documento");

  return response.json();
}

// Eliminar documento
export async function deleteDocument(id: number): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/admin/documents/${id}`, {
    method: "DELETE",
  });
}
