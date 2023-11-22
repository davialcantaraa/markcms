import { z } from "zod"

import { SuccessResponse } from "@/types/api"

import { http } from "./http"

const schema = z.object({
  name: z.string().min(2).max(50),
  api_key_id: z.string().uuid(),
})

export async function updateApiKeyById(
  data: z.infer<typeof schema>
): Promise<SuccessResponse> {
  return await http.put(`/api-key/${data.api_key_id}`, data)
}
