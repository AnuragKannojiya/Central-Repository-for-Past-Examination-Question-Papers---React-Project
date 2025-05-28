import { NextResponse } from "next/server"
import { clearAuthCookies } from "@/lib/auth-service"

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 })

  return clearAuthCookies(response)
}
