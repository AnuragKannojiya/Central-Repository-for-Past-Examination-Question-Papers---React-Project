"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export function UserSubscriptionStatus() {
  const { user, hasPremiumAccess } = useAuth()

  if (!user) return null

  const getSubscriptionDetails = () => {
    switch (user.subscription) {
      case "premium":
        return {
          name: "Premium",
          description: "Full access to all examination papers",
          badge: <Badge className="bg-primary">Premium</Badge>,
          icon: <CheckCircle className="h-5 w-5 text-primary" />,
          features: [
            "Unlimited access to all papers",
            "Unlimited downloads",
            "Advanced search filters",
            "High quality PDFs",
            "Comprehensive solution guides",
          ],
        }
      case "basic":
        return {
          name: "Basic",
          description: "Enhanced access with more features",
          badge: <Badge variant="secondary">Basic</Badge>,
          icon: <CheckCircle className="h-5 w-5 text-secondary" />,
          features: [
            "Access to all free papers",
            "Limited access to premium papers",
            "20 downloads per month",
            "Preview for all papers",
            "High quality PDFs",
          ],
        }
      default:
        return {
          name: "Free",
          description: "Basic access to examination papers",
          badge: <Badge variant="outline">Free</Badge>,
          icon: <AlertCircle className="h-5 w-5 text-muted-foreground" />,
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

  const subscriptionDetails = getSubscriptionDetails()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Your Subscription</CardTitle>
            <CardDescription>Current plan and benefits</CardDescription>
          </div>
          {subscriptionDetails.badge}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          {subscriptionDetails.icon}
          <div>
            <h3 className="font-medium">{subscriptionDetails.name} Plan</h3>
            <p className="text-sm text-muted-foreground">{subscriptionDetails.description}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Included Features:</h4>
          <ul className="space-y-1">
            {subscriptionDetails.features.map((feature, index) => (
              <li key={index} className="text-sm flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {user.hasFullAccess && (
          <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md text-sm">
            <p className="font-medium">Admin Access</p>
            <p>As an admin, you have full access to all features regardless of your subscription plan.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!hasPremiumAccess() && (
          <Button asChild className="w-full">
            <Link href="/pricing">Upgrade Your Plan</Link>
          </Button>
        )}
        {hasPremiumAccess() && !user.hasFullAccess && (
          <Button variant="outline" asChild className="w-full">
            <Link href="/pricing">Manage Subscription</Link>
          </Button>
        )}
        {user.hasFullAccess && (
          <Button variant="outline" asChild className="w-full">
            <Link href="/dashboard/subscriptions">Manage All Subscriptions</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
