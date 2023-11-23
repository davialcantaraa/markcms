"use client"

import { useUser } from "@clerk/nextjs"
import { ChatBubbleIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTransition } from "react"
import { useForm, useWatch } from "react-hook-form"
import { useToggle } from "react-use"
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

import { Icons } from "./icons"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

export const Feedback = () => {
  const { user } = useUser()
  const pathname = usePathname()
  const form = useForm()
  const [open, toggle] = useToggle(false)
  const [pending, startTransition] = useTransition()

  const content = useWatch({ control: form.control, name: "content" })

  async function onSubmit(data: any) {
    startTransition(() => {
      sendEmail({
        subject: "Improvements to page" + pathname,
        to: ["dxvialcantara@gmail.com"],
        html: `<p>From ${user?.primaryEmailAddress?.toString()}: ${
          data.content
        }</p>`,
      }).then(({ error }) => {
        if (error) {
          return toast.error(error.message)
        }

        toggle()
        form.reset()
        toast.success("Feedback sent")
      })
    })
  }

  return (
    <Popover open={open} onOpenChange={toggle}>
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
                    <Button disabled={pending || !content} type="submit">
                      {pending && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      )}
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
