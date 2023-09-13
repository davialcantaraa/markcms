import { ControllerRenderProps, FieldValues } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input, InputProps } from "../ui/input"

interface Props extends InputProps {
  field: ControllerRenderProps<FieldValues, any>
}

export const ContentTextInput = ({ field, ...props }: Props) => {
  return (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input {...field} {...props} />
      </FormControl>
      <FormDescription>
        This is your public display name. It can be your real name or a
        pseudonym. You can only change this once every 30 days.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )
}
