"use client"

import { Content, ContentField } from "database"
import { format } from "date-fns"

import { Badge } from "../ui/badge"
import { Checkbox } from "../ui/checkbox"
import { ContentMarkdownSheet } from "./content-markdown-sheet"

interface Props {
  type: ContentField
  value: any
  content: Content
}

export const TableField = ({ type, value, content }: Props) => {
  console.log(value)
  console.log(content)
  console.log(type)
  switch (type) {
    case ContentField.TEXT:
      return <span>{value}</span>
    case ContentField.CHECKBOX:
      return (
        <Checkbox checked={value} className="pointer-events-none select-none" />
      )
    case ContentField.NUMBER:
      return <span>{value}</span>
    case ContentField.EMAIL:
      return <a href={`mailto:${value}`}>{value}</a>
    case ContentField.PHONE:
      return <a href={`tel:${value}`}>{value}</a>
    case ContentField.URL:
      return (
        <a className="underline" target="_blank" href={value}>
          {value}
        </a>
      )
    case ContentField.DATE:
      return (
        <time>{!!value ? format(new Date(value), "dd/MM/yyyy") : value}</time>
      )
    case ContentField.MARKDOWN:
      return <ContentMarkdownSheet markdown={value} content={content} />
    case ContentField.SELECTION:
      return (
        <div className="flex flex-wrap gap-1 min-w-[200px]">
          {value.map((item: string) => (
            <Badge className="max-w-[100px] truncate">{item}</Badge>
          ))}
        </div>
      )
  }
}
