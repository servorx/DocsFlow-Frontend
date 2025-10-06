import { apiFetch } from "../../utils/api";

export type Department = {
  id_department: number;
  name_department: string;
};

// obtiene todos los departamentos
export async function getAllDepartments(): Promise<Department[]> {
  return apiFetch<Department[]>("/departments/all");
}
