import { ContentModel } from "@prisma/client"
import { AxiosResponse } from "axios"

import { http } from "./http"

export async function getModelById(
  id: string
): Promise<AxiosResponse<ContentModel>> {
  return await http.get(`/content/model/${id}`)
}
