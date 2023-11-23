import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/prisma"

interface Params {
  params: {
    id: string
  }
}

const updateModelschema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
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

    const model = await db.contentModel.findFirst({
      where: {
        creator_id: userId,
        id: params.id,
      },
    })
    if (!model) {
      return NextResponse.json("Model not found", { status: 400 })
    }

    return NextResponse.json(model, { status: 200 })
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
    const validation = updateModelschema.safeParse(body)

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
      data: { description, name },
    } = validation

    await db.contentModel.update({
      where: {
        id: params.id,
      },
      data: {
        description,
        name,
      },
    })

    return NextResponse.json(
      { message: "Model updated successfully." },
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

    const model = await db.contentModel.delete({
      where: {
        id: params.id,
        creator_id: userId,
      },
    })
    if (!model) {
      return NextResponse.json("Couldn't delete model", { status: 400 })
    }

    return NextResponse.json(
      { message: "Model deleted successfully" },
      { status: 202 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
