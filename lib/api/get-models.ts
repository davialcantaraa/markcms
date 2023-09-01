import { ContentModel } from "@prisma/client"
import { AxiosResponse } from "axios"


import { http } from "./http"

export async function getModels(): Promise<AxiosResponse<ContentModel[]>> {
  return await http.get("/content/model")
}
