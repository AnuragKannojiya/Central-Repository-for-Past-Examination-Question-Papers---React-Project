import { type NextRequest, NextResponse } from "next/server"
import { createSession, setAuthCookies } from "@/lib/auth-service"

// Mock user database - in production, use a real database
const users = [
  {
    id: "1",
    email: "user@example.com",
    password: "password", // In production, use hashed passwords
    name: "Regular User",
    role: "user",
    subscription: "free",
  },
  {
    id: "2",
    email: "admin@example.com",
    password: "password", // In production, use hashed passwords
    name: "Admin User",
    role: "admin",
    subscription: "premium",
    hasFullAccess: true,
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = users.find((u) => u.email === email)

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create session token
    const token = await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as any,
      subscription: user.subscription as any,
    })

    // Create response
    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          subscription: user.subscription,
        },
      },
      { status: 200 },
    )

    // Set auth cookies
    return setAuthCookies(response, token, {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as any,
      subscription: user.subscription as any,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
