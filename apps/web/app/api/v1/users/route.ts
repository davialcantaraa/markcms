import { headers } from "next/headers"
import { NextResponse } from "next/server"

import { db } from "@/lib/prisma"
import { extractToken } from "@/lib/utils"

export async function PUT(request: Request) {
  try {
    const headerList = headers()

    const token = extractToken(String(headerList.get("Authorization")))

    if (!token) return NextResponse.json("Unauthorized", { status: 401 })

    const body = await request.json()

    const { data } = body

    const deleted = data.deleted
    const userId = data.id

    if (deleted) {
      await db.$transaction(async (ctx) => {
        await ctx.contentModel.deleteMany({
          where: {
            creator_id: userId,
          },
        })

        await ctx.content.deleteMany({
          where: {
            creator_id: userId,
          },
        })

        await ctx.field.deleteMany({
          where: {
            creator_id: userId,
          },
        })

        await ctx.apiKey.deleteMany({
          where: {
            creator_id: userId,
          },
        })
      })
    }

    return NextResponse.json(
      { message: "User content deleted successfully" },
      { status: 202 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
