import { SuccessResponse } from "@/types/api"

import { http } from "./http"

export async function deleteApiKey(id: string): Promise<SuccessResponse> {
  return await http.delete(`/api-key/${id}`)
}
