import { Field } from "@prisma/client"
import { AxiosResponse } from "axios"

import { http } from "./http"

export async function getFieldsByModelId(
  id: string
): Promise<AxiosResponse<Field[]>> {
  return await http.get(`/model/${id}/field`)
}
