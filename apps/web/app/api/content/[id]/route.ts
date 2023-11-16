import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/prisma"

interface Params {
  params: {
    id: string
  }
}

const updateContentSchema = z.object({
  id: z.string().uuid(),
  raw_data: z.record(z.any()),
})

export async function GET(_: Request, { params }: Params) {
  try {
    const isIdValid = z.string().uuid().safeParse(params.id)
    if (!isIdValid.success)
      return NextResponse.json("Invalid id", { status: 400 })

    const { userId } = auth()
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    const content = await db.content.findFirst({
      where: {
        creator_id: userId,
        id: params.id,
      },
      include: {
        model: {
          select: {
            name: true,
            fields: true,
          },
        },
      },
    })
    if (!content) {
      return NextResponse.json("Content not found", { status: 400 })
    }

    return NextResponse.json(content, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const isIdValid = z.string().uuid().safeParse(params.id)
    if (!isIdValid.success)
      return NextResponse.json("Invalid id", { status: 400 })

    const body = await request.json()
    const validation = updateContentSchema.safeParse(body)

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
      data: { raw_data },
    } = validation

    await db.content.update({
      where: {
        id: params.id,
      },
      data: {
        raw_data,
      },
    })

    return NextResponse.json(
      { message: "Content updated successfully." },
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

    const content = await db.content.delete({
      where: {
        id: params.id,
        creator_id: userId,
      },
    })
    if (!content) {
      return NextResponse.json("Couldn't delete content", { status: 400 })
    }

    return NextResponse.json(
      { message: "Content deleted successfully" },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
