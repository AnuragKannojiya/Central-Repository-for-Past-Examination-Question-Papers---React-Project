import { NextResponse } from "next/server"

export function GET() {
  // This is just to ensure the route exists
  return NextResponse.json({ message: "Add new paper route" })
}
