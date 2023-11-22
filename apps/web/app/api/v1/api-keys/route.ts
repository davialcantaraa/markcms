import { headers } from "next/headers"
import { NextResponse } from "next/server"

import { db } from "@/lib/prisma"
import { extractToken } from "@/lib/utils"

export async function GET() {
  try {
    const headerList = headers()

    const token = extractToken(String(headerList.get("Authorization")))

    if (!token) return NextResponse.json("Unauthorized", { status: 401 })

    const apiKeys = await db.$transaction(async (ctx) => {
      const validKey = await ctx.apiKey.findFirst({
        where: {
          token,
        },
      })

      if (!validKey) {
        return null
      }

      await db.apiKey.update({
        where: {
          id: validKey.id,
        },
        data: {
          last_used: new Date(),
          uses: validKey.uses + 1,
        },
      })

      const apiKeys = await db.apiKey.findMany({
        where: {
          creator_id: validKey.creator_id,
        },
        select: {
          created_at: true,
          creator_id: true,
          id: true,
          last_used: true,
          model: true,
          name: true,
          permission: true,
          token: false,
          uses: true,
        },
      })

      return apiKeys
    })

    if (!apiKeys) return NextResponse.json("Unauthorized", { status: 401 })

    return NextResponse.json(apiKeys, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error.", error },
      { status: 500 }
    )
  }
}
