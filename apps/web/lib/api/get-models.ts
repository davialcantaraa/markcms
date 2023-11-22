import { AxiosResponse } from "axios"
import { ContentModel } from "database"


import { http } from "./http"

export async function getModels(): Promise<AxiosResponse<ContentModel[]>> {
  return await http.get("/model")
}
