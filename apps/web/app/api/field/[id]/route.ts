import { auth } from "@clerk/nextjs"
import { ContentField } from "@prisma/client"
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/prisma"

interface Params {
  params: {
    id: string
  }
}

const updateFieldSchema = z.object({
  name: z.string().min(2).max(50),
  id: z.string().uuid(),
  type: z.nativeEnum(ContentField),
})

export async function GET(_: Request, { params }: any) {
  return NextResponse.json(params, { status: 200 })
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const isIdValid = z.string().uuid().safeParse(params.id)
    if (!isIdValid.success)
      return NextResponse.json("Invalid id", { status: 400 })

    const body = await request.json()
    const validation = updateFieldSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          message: `Field ${validation.error.issues[0].path}: ${validation.error.issues[0].message}`,
        },
        { status: 400 }
      )
    }

    const { userId } = auth()
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    const {
      data: { type, name },
    } = validation

    await db.field.update({
      where: {
        id: params.id,
      },
      data: {
        type,
        name,
      },
    })

    return NextResponse.json(
      { message: "Field updated successfully." },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error.", error },
      { status: 500 }
    )
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const isIdValid = z.string().uuid().safeParse(params.id)
    if (!isIdValid.success)
      return NextResponse.json("Invalid id", { status: 400 })

    const { userId } = auth()
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    const field = await db.$transaction(async (ctx) => {
      const field = await ctx.field.delete({
        where: {
          id: params.id,
          creator_id: userId,
        },
      })

      await ctx.content.updateMany({
        where: {
          model: {
            fields: {
              some: {
                id: params.id,
              },
            },
          },
        },
        data: {
          raw_data: {
            [field.name]: "delete",
          },
        },
      })

      return field
    })

    if (!field) {
      return NextResponse.json("Couldn't delete field", { status: 400 })
    }

    return NextResponse.json(
      { message: "Field deleted successfully" },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
