import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth-service"

// Mock database for demonstration
const users = [
  {
    id: "1",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
    subscription: "free",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    subscription: "premium",
    hasFullAccess: true,
  },
]

export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const currentUser = await getCurrentUser(request)

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get request body
    const data = await request.json()

    // Find user in mock database
    const userIndex = users.findIndex((u) => u.id === currentUser.id)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update allowed fields only
    const allowedFields = ["name", "email"]
    const updatedUser = { ...users[userIndex] }

    for (const field of allowedFields) {
      if (data[field]) {
        updatedUser[field as keyof typeof updatedUser] = data[field]
      }
    }

    // Update in mock database
    users[userIndex] = updatedUser

    // Return updated user (without sensitive info)
    return NextResponse.json(
      {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        subscription: updatedUser.subscription,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
