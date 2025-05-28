"use client"

import Link from "next/link"
import { CreditCard, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export function SubscriptionCard() {
  const { user } = useAuth()
  const subscription = user?.subscription || "free"

  // Subscription plan details
  const subscriptionDetails = {
    free: {
      name: "Free Plan",
      description: "Basic access to papers",
      badge: { text: "Free", variant: "outline" as const },
    },
    basic: {
      name: "Basic Plan",
      description: "Full access to papers with limited downloads",
      badge: { text: "Active", variant: "default" as const },
    },
    premium: {
      name: "Premium Plan",
      description: "Unlimited access and downloads",
      badge: { text: "Premium", variant: "default" as const },
    },
  }

  const planDetails = subscriptionDetails[subscription as keyof typeof subscriptionDetails]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium">Subscription</CardTitle>
          <CardDescription>Manage your subscription plan</CardDescription>
        </div>
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {planDetails.name}
              <Badge variant={planDetails.badge.variant} className="ml-2">
                {planDetails.badge.text}
              </Badge>
            </p>
            <p className="text-sm text-muted-foreground">{planDetails.description}</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/subscription">
              Manage
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
