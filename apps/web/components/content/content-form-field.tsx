"use client"

import { ContentField } from "@prisma/client"
import { format } from "date-fns"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

import { capitalizeFirstLetter, cn } from "@/lib/utils"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Switch } from "../ui/switch"
import { ContentFormMarkdown } from "./content-form-markdown"

interface Props {
  type: ContentField
  field: ControllerRenderProps<FieldValues, string>
}

export const FormField = ({ type, field }: Props) => {
  switch (type) {
    case ContentField.TEXT:
      return (
        <FormItem>
          <FormLabel>{capitalizeFirstLetter(field.name)}</FormLabel>
          <FormControl>
            <Input type="text" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )
    case ContentField.CHECKBOX:
      return (
        <FormItem>
          <FormLabel>{field.name}</FormLabel>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              className="block"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )
    case ContentField.NUMBER:
      return (
        <FormItem>
          <FormLabel>{field.name}</FormLabel>
          <FormControl>
            <Input type="number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )

    case ContentField.EMAIL:
      return (
        <FormItem>
          <FormLabel>{field.name}</FormLabel>
          <FormControl>
            <Input type="email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )
    case ContentField.PHONE:
      return (
        <FormItem>
          <FormLabel>{field.name}</FormLabel>
          <FormControl>
            <Input type="tel" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )
    case ContentField.URL:
      return (
        <FormItem>
          <FormLabel>{field.name}</FormLabel>
          <FormControl>
            <Input type="url" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )
    case ContentField.MARKDOWN:
      return <ContentFormMarkdown field={field} />
    case ContentField.DATE:
      return (
        <FormItem>
          <FormLabel>{field.name}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )
  }
}
