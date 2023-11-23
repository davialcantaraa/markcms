"use client"

import { X } from "lucide-react"
import { useState } from "react"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

import { capitalizeFirstLetter } from "@/lib/utils"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

interface Props {
  field: ControllerRenderProps<FieldValues, string>
}

export const ContentFormSelection = ({ field }: Props) => {
  const [inputValue, setInputValue] = useState("")

  function updateSelection(selected: string) {
    const alreadyHasSelected = field.value.find(
      (item: string) => item === selected
    )
    if (alreadyHasSelected)
      return field.onChange(
        field.value.filter((item: string) => item !== selected)
      )

    field.onChange([...field.value, selected])
  }

  function removeSelection(selected: string) {
    field.onChange(field.value.filter((item: string) => item !== selected))
  }

  const tagsMarkup = field.value.length ? (
    <div className="flex flex-wrap gap-4 pb-6">
      {field.value.map((item: string) => (
        <Badge className="max-w-[200px] truncate">
          {item}
          <Button
            type="button"
            variant="link"
            onClick={() => removeSelection(item)}
            className="p-1 h-fit"
          >
            <X size={14} className="text-secondary" />
          </Button>
        </Badge>
      ))}
    </div>
  ) : null

  return (
    <FormItem>
      <FormLabel>{capitalizeFirstLetter(field.name)}</FormLabel>
      <FormControl>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Type to add"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                console.log(inputValue)
                updateSelection(inputValue)
                setInputValue("")
              }
            }}
          />
          <Button
            type="button"
            onClick={() => {
              updateSelection(inputValue)
              setInputValue("")
            }}
          >
            Add
          </Button>
        </div>
      </FormControl>
      <FormMessage />
      {tagsMarkup}
    </FormItem>
  )
}
