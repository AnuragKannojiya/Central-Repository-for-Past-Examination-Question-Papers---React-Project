import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import type { NextRequest, NextResponse } from "next/server"

// Types
export type UserRole = "user" | "admin" | "moderator"

export interface UserSession {
  id: string
  email: string
  name: string
  role: UserRole
  subscription: "free" | "basic" | "premium"
  subscriptionExpiry?: string
}

// Secret key for JWT signing - in production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-at-least-32-chars-long"
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET)

// Token expiration time
const TOKEN_EXPIRY = "7d" // 7 days

// Create a session token
export async function createSession(user: UserSession): Promise<string> {
  try {
    const token = await new SignJWT({ ...user })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(TOKEN_EXPIRY)
      .sign(SECRET_KEY)

    return token
  } catch (error) {
    console.error("Error creating session:", error)
    throw new Error("Failed to create session")
  }
}

// Verify and decode a session token
export async function verifySession(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload as unknown as UserSession
  } catch (error) {
    console.error("Error verifying session:", error)
    return null
  }
}

// Set authentication cookies
export function setAuthCookies(response: NextResponse, token: string, user: UserSession): NextResponse {
  // Set the auth token as an HTTP-only cookie
  response.cookies.set({
    name: "auth-token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })

  // Set user role as a separate HTTP-only cookie for middleware
  response.cookies.set({
    name: "user-role",
    value: user.role,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })

  return response
}

// Clear authentication cookies
export function clearAuthCookies(response: NextResponse): NextResponse {
  response.cookies.set({
    name: "auth-token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  })

  response.cookies.set({
    name: "user-role",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  })

  return response
}

// Get the current user session from cookies
export async function getCurrentUser(req?: NextRequest): Promise<UserSession | null> {
  try {
    // For server components/actions
    if (!req) {
      const cookieStore = cookies()
      const token = cookieStore.get("auth-token")?.value

      if (!token) return null

      return await verifySession(token)
    }

    // For middleware
    const token = req.cookies.get("auth-token")?.value

    if (!token) return null

    return await verifySession(token)
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Check if user has admin privileges
export function isAdmin(user: UserSession | null): boolean {
  return user?.role === "admin" || user?.role === "moderator"
}

// Check if user has premium access
export function hasPremiumAccess(user: UserSession | null): boolean {
  if (!user) return false
  return user.subscription === "premium" || user.role === "admin"
}
