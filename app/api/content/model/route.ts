import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import { db } from "@/lib/prisma"

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
