import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/prisma"

const createModelschema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
})

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const models = await db.contentModel.findMany({
      where: {
        creator_id: userId,
      },
    })

    return NextResponse.json(models, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error.", error },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = createModelschema.safeParse(body)

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
      data: { name, description },
    } = validation

    await db.contentModel.create({
      data: {
        creator_id: userId,
        description,
        name,
      },
    })

    return NextResponse.json(
      { message: "Model created successfully." },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    )
  }
}
