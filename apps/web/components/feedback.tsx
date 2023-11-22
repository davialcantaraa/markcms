"use client"

import { useUser } from "@clerk/nextjs"
import { ChatBubbleIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { sendEmail } from "@/lib/api/send-email"

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

export const Feedback = () => {
  const { user } = useUser()
  const pathname = usePathname()
  const form = useForm()

  const content = useWatch({ control: form.control, name: "content" })

  async function onSubmit(data: any) {
    const { error } = await sendEmail({
      subject: "Improvements to page" + pathname,
      to: ["dxvialcantara@gmail.com"],
      html: `<p>From ${user?.primaryEmailAddress?.toString()}: ${
        data.content
      }</p>`,
    })

    if (error) {
      return toast.error(error.message)
    }

    toast.success("Feedback sent")
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" className="flex items-center gap-2">
          <ChatBubbleIcon width={16} />
          Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Ideas to improve this page..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="flex">
                    <span>
                      Need help?{" "}
                      <Link
                        href="https://github.com/davialcantaraa"
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        Contact us
                      </Link>{" "}
                      or{" "}
                      <Link
                        href="/docs"
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        see docs
                      </Link>
                      .
                    </span>
                    <Button disabled={!content} type="submit">
                      Send
                    </Button>
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
