import { AxiosResponse } from "axios"
import { ContentModel } from "database"

import { http } from "./http"

export async function getModelById(
  id: string
): Promise<AxiosResponse<ContentModel>> {
  return await http.get(`/model/${id}`)
}
