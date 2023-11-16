"use client"

import { Content, ContentField } from "@prisma/client"

import { Checkbox } from "../ui/checkbox"
import { ContentMarkdownSheet } from "./content-markdown-sheet"

interface Props {
  type: ContentField
  value: any
  content: Content
}

export const TableField = ({ type, value, content }: Props) => {
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
      return <a href={value}>{value}</a>
    case ContentField.DATE:
      return <time>{value}</time>
    case ContentField.MARKDOWN:
      return <ContentMarkdownSheet markdown={value} content={content} />
  }
}
