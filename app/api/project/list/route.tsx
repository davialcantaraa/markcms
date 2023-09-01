import { NextResponse } from "next/server"

import { db } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  if (!userId) {
    return NextResponse.json({ message: "User id required" }, { status: 400 })
  }

  const projects = await db.project.findMany({
    where: {
      userId,
    },
  })

  return NextResponse.json(projects)
}
