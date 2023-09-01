import { ContentField } from "@prisma/client"

export interface IContent {}

export interface IContentField {
  name: string
  type: ContentField
  defaultValue: string
}
