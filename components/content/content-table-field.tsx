'use client'

import { ContentField } from "@prisma/client"

import { Checkbox } from "../ui/checkbox"

interface Props {
  type: ContentField
  value: any
}

export const TableField = ({ type, value }: Props) => {
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
  }
}
