import { apiFetch } from "../../utils/api";

export interface TableInfo {
  name: string;
  rows: number;
  last_updated: string;
}

export async function getAllTables(): Promise<TableInfo[]> {
  return apiFetch<TableInfo[]>("/admin/tables");
}
