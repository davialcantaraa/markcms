import { z } from "zod"

import { SuccessResponse } from "@/types/api"

import { http } from "./http"

const schema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  model_id: z.string().uuid(),
})

export async function updateModelById(
  data: z.infer<typeof schema>
): Promise<SuccessResponse> {
  return await http.put(`/model/${data.model_id}`, data)
}
