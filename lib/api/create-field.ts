import { ContentField } from "@prisma/client"
import { z } from "zod"

import { SuccessResponse } from "@/types/api"

import { http } from "./http"

const schema = z.object({
  name: z.string().min(2).max(50),
  model_id: z.string().uuid(),
  type: z.nativeEnum(ContentField),
})

export async function createField(
  data: z.infer<typeof schema>
): Promise<SuccessResponse> {
  return await http.post("/content/model/field/create", data)
}
