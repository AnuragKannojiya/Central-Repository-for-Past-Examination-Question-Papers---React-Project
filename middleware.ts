import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path === "/login" ||
    path === "/register" ||
    path === "/forgot-password" ||
    path === "/contact" ||
    path.startsWith("/api/public")

  // Get the token from the cookies
  const token = request.cookies.get("auth-token")?.value || ""

  // Get user role from a secure HTTP-only cookie
  const role = request.cookies.get("user-role")?.value || ""

  // Redirect logic for authentication
  if (!isPublicPath && !token) {
    // If trying to access protected route without being logged in
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Admin route protection
  if (path.startsWith("/admin") && role !== "admin") {
    // If trying to access admin routes without admin role
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // User is logged in and trying to access login/register page
  if ((path === "/login" || path === "/register") && token) {
    // Redirect to appropriate dashboard based on role
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}
