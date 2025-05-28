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
    const { plan, expiry } = await request.json()

    if (!plan || !["free", "basic", "premium"].includes(plan)) {
      return NextResponse.json({ error: "Invalid subscription plan" }, { status: 400 })
    }

    // Find user in mock database
    const userIndex = users.findIndex((u) => u.id === currentUser.id)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update subscription
    users[userIndex].subscription = plan as "free" | "basic" | "premium"

    if (expiry) {
      users[userIndex].subscriptionExpiry = expiry
    }

    // Return updated subscription info
    return NextResponse.json(
      {
        subscription: users[userIndex].subscription,
        subscriptionExpiry: users[userIndex].subscriptionExpiry,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error updating subscription:", error)
    return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
  }
}
