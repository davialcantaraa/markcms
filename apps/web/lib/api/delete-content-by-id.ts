import { SuccessResponse } from "@/types/api"

import { http } from "./http"

export async function deleteContent(id: string): Promise<SuccessResponse> {
  return await http.delete(`/content/${id}`)
}
