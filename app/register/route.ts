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
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Create new user (in a real app, save to database)
    const newUser = {
      id: `${users.length + 1}`,
      email,
      password, // In production, hash the password
      name,
      role: "user" as const,
      subscription: "free" as const,
    }

    // Add to mock database
    users.push(newUser)

    // Create session token
    const token = await createSession({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      subscription: newUser.subscription,
    })

    // Create response
    const response = NextResponse.json(
      {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          subscription: newUser.subscription,
        },
      },
      { status: 201 },
    )

    // Set auth cookies
    return setAuthCookies(response, token, {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      subscription: newUser.subscription,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
