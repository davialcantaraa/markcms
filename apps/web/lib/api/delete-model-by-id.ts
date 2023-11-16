import { SuccessResponse } from "@/types/api"

import { http } from "./http"

export async function deleteModel(id: string): Promise<SuccessResponse> {
  return await http.delete(`/model/${id}`)
}
