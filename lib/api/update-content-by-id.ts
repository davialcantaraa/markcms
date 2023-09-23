import { z } from "zod"

import { SuccessResponse } from "@/types/api"

import { http } from "./http"

const schema = z.object({
  content_id: z.string().uuid(),
  raw_data: z.record(z.any()),
})

export async function updateContentById(
  data: z.infer<typeof schema>
): Promise<SuccessResponse> {
  return await http.put(`/content/${data.content_id}/update`, data)
}
