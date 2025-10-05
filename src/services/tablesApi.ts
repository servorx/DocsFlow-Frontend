import { apiFetch } from "../utils/api";

export interface ExtractedTable {
  id: number;
  name: string;
  date: string;
  source: string;
}

export async function getExtractedTables(): Promise<ExtractedTable[]> {
  return apiFetch<ExtractedTable[]>("/admin/tables");
}

export async function deleteTable(id: number): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/admin/tables/${id}`, {
    method: "DELETE",
  });
}
