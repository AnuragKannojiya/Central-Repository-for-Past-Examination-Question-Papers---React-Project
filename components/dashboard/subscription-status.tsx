"use client"

import Link from "next/link"
import { CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { UserSession } from "@/lib/auth-service"

interface SubscriptionStatusProps {
  user: UserSession
}

export function SubscriptionStatus({ user }: SubscriptionStatusProps) {
  const isPremium = user.subscription === "premium"
  const isBasic = user.subscription === "basic"
  const isFree = user.subscription === "free"

  // Calculate days remaining if subscription expiry exists
  const daysRemaining = user.subscriptionExpiry
    ? Math.max(0, Math.ceil((new Date(user.subscriptionExpiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null

  // Calculate progress percentage
  const progressPercentage = daysRemaining !== null ? (daysRemaining / 30) * 100 : null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium capitalize">{user.subscription} Plan</span>
          {isPremium && <CheckCircle className="h-5 w-5 text-green-500" />}
        </div>
        {!isPremium && (
          <Button size="sm" asChild>
            <Link href="/dashboard/subscription">Upgrade</Link>
          </Button>
        )}
      </div>

      {(isPremium || isBasic) && daysRemaining !== null && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Subscription expires in {daysRemaining} days</span>
            <span>{daysRemaining <= 7 && <AlertCircle className="h-4 w-4 text-amber-500" />}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      )}

      <div className="space-y-2">
        <h4 className="font-medium">Features included:</h4>
        <ul className="space-y-1 text-sm">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Access to all public papers</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Download papers in PDF format</span>
          </li>
          {(isPremium || isBasic) && (
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Access to department-specific papers</span>
            </li>
          )}
          {isPremium && (
            <>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Access to premium papers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Unlimited downloads</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Priority support</span>
              </li>
            </>
          )}
        </ul>
      </div>

      {isFree && (
        <div className="rounded-md bg-muted p-3 text-sm">
          <p>
            Upgrade to Premium for unlimited access to all papers and features.{" "}
            <Link href="/dashboard/subscription" className="font-medium text-primary hover:underline">
              View plans
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
