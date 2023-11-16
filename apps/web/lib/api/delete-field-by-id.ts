import { SuccessResponse } from "@/types/api"

import { http } from "./http"

export async function deleteField(id: string): Promise<SuccessResponse> {
  return await http.delete(`/field/${id}`)
}
