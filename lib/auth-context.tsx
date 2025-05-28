"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Define types for user and auth context
type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin" | "moderator"
  subscription: "free" | "basic" | "premium"
  subscriptionExpiry?: string
  hasFullAccess?: boolean // Flag to indicate if user has full access regardless of subscription
}

type AuthContextType = {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  updateSubscription: (plan: "free" | "basic" | "premium", expiry?: string) => Promise<void>
  isAdmin: () => boolean
  hasPremiumAccess: () => boolean
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Fetch current user on mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/auth/me")

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error("Error fetching current user:", err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentUser()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Login failed")
      }

      const data = await response.json()
      setUser(data.user)

      // Redirect based on role
      if (data.user.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    try {
      setLoading(true)

      await fetch("/api/auth/logout", {
        method: "POST",
      })

      setUser(null)
      router.push("/login")
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      setLoading(false)
    }
  }

  // Update profile function
  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true)

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update profile")
      }

      const updatedUser = await response.json()
      setUser((prev) => (prev ? { ...prev, ...updatedUser } : null))
    } catch (err: any) {
      setError(err.message || "Failed to update profile")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Update subscription function
  const updateSubscription = async (plan: "free" | "basic" | "premium", expiry?: string) => {
    try {
      setLoading(true)

      const response = await fetch("/api/user/subscription", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, expiry }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update subscription")
      }

      const data = await response.json()
      setUser((prev) => (prev ? { ...prev, subscription: data.subscription, subscriptionExpiry: expiry } : null))
    } catch (err: any) {
      setError(err.message || "Failed to update subscription")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Helper functions
  const isAdmin = () => {
    return user?.role === "admin" || user?.role === "moderator"
  }

  const hasPremiumAccess = () => {
    return user?.subscription === "premium" || user?.hasFullAccess === true || user?.role === "admin"
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        updateProfile,
        updateSubscription,
        isAdmin,
        hasPremiumAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
