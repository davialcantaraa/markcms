import { ContentField } from "database"

export interface IContent {}

export interface IContentField {
  name: string
  type: ContentField
  defaultValue: string
}

export type EditorCodeType = {
  section: string
  section_id: number
  content: string
}

export type PrevCodeType = {
  section: string
  section_id: number
  content: string
}
