"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, CheckCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { format } from "date-fns"
import Link from "next/link"

export function SubscriptionManagement() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  if (!user) {
    return null
  }

  const plan = user.subscription?.plan || "free"
  const expiresAt = user.subscription?.expiresAt ? new Date(user.subscription.expiresAt) : null

  const getPlanDetails = () => {
    switch (plan) {
      case "premium":
        return {
          name: "Premium",
          color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
          features: [
            "Unlimited access to all papers",
            "Unlimited downloads",
            "Advanced search filters",
            "High quality PDFs",
            "Comprehensive solution guides",
            "Priority support",
          ],
        }
      case "basic":
        return {
          name: "Basic",
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
          features: [
            "Access to all free papers",
            "Limited access to premium papers",
            "20 downloads per month",
            "Preview for all papers",
            "High quality PDFs",
            "Basic solution guides",
          ],
        }
      default:
        return {
          name: "Free",
          color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
          features: [
            "Access to free papers only",
            "Basic search functionality",
            "5 downloads per month",
            "No preview for premium papers",
            "Standard quality PDFs",
          ],
        }
    }
  }

  const planDetails = getPlanDetails()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Subscription</CardTitle>
          <Badge className={planDetails.color}>{planDetails.name}</Badge>
        </div>
        <CardDescription>Manage your subscription plan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {expiresAt && (
          <div className="flex items-center text-sm">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>{plan === "free" ? "Free plan - No expiration" : `Expires on ${format(expiresAt, "PPP")}`}</span>
          </div>
        )}

        <div className="rounded-md border p-4">
          <div className="font-medium">Current Plan Features:</div>
          <ul className="mt-2 space-y-2">
            {planDetails.features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {plan !== "premium" && (
          <div className="rounded-md bg-primary/5 p-4">
            <div className="flex items-start">
              <AlertCircle className="mr-2 h-5 w-5 text-primary shrink-0" />
              <div>
                <h4 className="font-medium">Upgrade to Premium</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Get unlimited access to all papers and premium features.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full space-y-2">
          {plan !== "premium" ? (
            <Button asChild>
              <Link href="/pricing">Upgrade Plan</Link>
            </Button>
          ) : (
            <Button variant="outline" disabled={loading}>
              {loading ? "Processing..." : "Manage Subscription"}
            </Button>
          )}
          {plan !== "free" && (
            <Button variant="outline" className="text-destructive hover:text-destructive" disabled={loading}>
              Cancel Subscription
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
