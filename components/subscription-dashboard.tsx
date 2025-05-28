"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, AlertCircle } from "lucide-react"
import { RazorpayPayment } from "@/components/razorpay-payment"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function SubscriptionDashboard() {
  const { user, updateSubscription } = useAuth()
  const { toast } = useToast()
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)

  // Get subscription safely with fallback to "free"
  const subscription = user?.subscription || "free"

  // Format subscription name with first letter capitalized
  const formatSubscription = (sub: string) => {
    return sub.charAt(0).toUpperCase() + sub.slice(1)
  }

  const plans = {
    monthly: [
      {
        name: "Free",
        price: 0,
        description: "Basic access to exam papers",
        features: ["Access to free papers", "Basic search functionality", "Limited downloads (5/month)"],
        limitations: ["No premium papers", "No advanced search", "No bulk downloads"],
      },
      {
        name: "Basic",
        price: 199,
        description: "Enhanced access to exam papers",
        features: [
          "All free features",
          "Access to premium papers",
          "Advanced search functionality",
          "Increased downloads (20/month)",
        ],
        limitations: ["No bulk downloads", "No priority support"],
      },
      {
        name: "Premium",
        price: 499,
        description: "Complete access to all features",
        features: [
          "All basic features",
          "Unlimited downloads",
          "Bulk download functionality",
          "Priority support",
          "Early access to new papers",
        ],
        limitations: [],
      },
    ],
    yearly: [
      {
        name: "Free",
        price: 0,
        description: "Basic access to exam papers",
        features: ["Access to free papers", "Basic search functionality", "Limited downloads (5/month)"],
        limitations: ["No premium papers", "No advanced search", "No bulk downloads"],
      },
      {
        name: "Basic",
        price: 1999,
        description: "Enhanced access to exam papers",
        features: [
          "All free features",
          "Access to premium papers",
          "Advanced search functionality",
          "Increased downloads (20/month)",
          "15% discount vs monthly",
        ],
        limitations: ["No bulk downloads", "No priority support"],
      },
      {
        name: "Premium",
        price: 4999,
        description: "Complete access to all features",
        features: [
          "All basic features",
          "Unlimited downloads",
          "Bulk download functionality",
          "Priority support",
          "Early access to new papers",
          "15% discount vs monthly",
        ],
        limitations: [],
      },
    ],
  }

  const handleCancelSubscription = async () => {
    try {
      await updateSubscription("free")
      toast({
        title: "Subscription cancelled",
        description: "Your subscription has been cancelled successfully.",
      })
      setCancelDialogOpen(false)
    } catch (error) {
      console.error("Error cancelling subscription:", error)
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Mock payment history data
  const paymentHistory = [
    {
      id: "pay_123456789",
      date: "2023-04-15",
      amount: "₹499",
      plan: "Premium (Monthly)",
      status: "Successful",
    },
    {
      id: "pay_987654321",
      date: "2023-03-15",
      amount: "₹199",
      plan: "Basic (Monthly)",
      status: "Successful",
    },
  ]

  // If user is not loaded yet, show loading state
  if (!user) {
    return (
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <div className="h-6 w-48 animate-pulse rounded-md bg-muted"></div>
            <div className="h-4 w-32 animate-pulse rounded-md bg-muted"></div>
          </CardHeader>
          <CardContent>
            <div className="h-4 w-full animate-pulse rounded-md bg-muted"></div>
            <div className="mt-2 h-4 w-3/4 animate-pulse rounded-md bg-muted"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Current Subscription</h2>
        <div className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{formatSubscription(subscription)} Plan</CardTitle>
                  <CardDescription>
                    {subscription === "free"
                      ? "Basic access to exam papers"
                      : subscription === "basic"
                        ? "Enhanced access to exam papers"
                        : "Complete access to all features"}
                  </CardDescription>
                </div>
                <Badge
                  variant={subscription === "free" ? "outline" : subscription === "basic" ? "secondary" : "default"}
                >
                  {formatSubscription(subscription)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  {user?.subscriptionExpiry
                    ? `Your subscription is valid until ${new Date(user.subscriptionExpiry).toLocaleDateString()}`
                    : "You are on the free plan"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {subscription === "free" ? (
                    <>
                      <Badge variant="outline" className="bg-muted/50">
                        5 Downloads/month
                      </Badge>
                      <Badge variant="outline" className="bg-muted/50">
                        Basic Search
                      </Badge>
                    </>
                  ) : subscription === "basic" ? (
                    <>
                      <Badge variant="outline" className="bg-muted/50">
                        20 Downloads/month
                      </Badge>
                      <Badge variant="outline" className="bg-muted/50">
                        Premium Papers
                      </Badge>
                      <Badge variant="outline" className="bg-muted/50">
                        Advanced Search
                      </Badge>
                    </>
                  ) : (
                    <>
                      <Badge variant="outline" className="bg-muted/50">
                        Unlimited Downloads
                      </Badge>
                      <Badge variant="outline" className="bg-muted/50">
                        Bulk Downloads
                      </Badge>
                      <Badge variant="outline" className="bg-muted/50">
                        Priority Support
                      </Badge>
                      <Badge variant="outline" className="bg-muted/50">
                        Early Access
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
            {subscription !== "free" && (
              <CardFooter>
                <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-destructive">
                      Cancel Subscription
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will cancel your subscription immediately. You will lose access to premium features.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancelSubscription}>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>

      {subscription !== "premium" && (
        <div>
          <h2 className="text-2xl font-bold">Upgrade Your Plan</h2>
          <div className="mt-4">
            <Tabs defaultValue="monthly">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly (Save 15%)</TabsTrigger>
              </TabsList>
              <TabsContent value="monthly" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {plans.monthly
                    .filter((plan) => plan.name.toLowerCase() !== subscription)
                    .map((plan) => (
                      <Card key={plan.name} className={plan.name === "Premium" ? "border-primary" : ""}>
                        <CardHeader>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                          <div className="mt-2 text-3xl font-bold">
                            ₹{plan.price}
                            <span className="text-sm font-normal text-muted-foreground">/month</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium">Features</h4>
                              <ul className="mt-2 space-y-2">
                                {plan.features.map((feature, i) => (
                                  <li key={i} className="flex items-center text-sm">
                                    <Check className="mr-2 h-4 w-4 text-green-500" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {plan.limitations.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium">Limitations</h4>
                                <ul className="mt-2 space-y-2">
                                  {plan.limitations.map((limitation, i) => (
                                    <li key={i} className="flex items-center text-sm">
                                      <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                                      {limitation}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <RazorpayPayment planName={plan.name} amount={plan.price} interval="monthly" />
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="yearly" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {plans.yearly
                    .filter((plan) => plan.name.toLowerCase() !== subscription)
                    .map((plan) => (
                      <Card key={plan.name} className={plan.name === "Premium" ? "border-primary" : ""}>
                        <CardHeader>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                          <div className="mt-2 text-3xl font-bold">
                            ₹{plan.price}
                            <span className="text-sm font-normal text-muted-foreground">/year</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium">Features</h4>
                              <ul className="mt-2 space-y-2">
                                {plan.features.map((feature, i) => (
                                  <li key={i} className="flex items-center text-sm">
                                    <Check className="mr-2 h-4 w-4 text-green-500" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {plan.limitations.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium">Limitations</h4>
                                <ul className="mt-2 space-y-2">
                                  {plan.limitations.map((limitation, i) => (
                                    <li key={i} className="flex items-center text-sm">
                                      <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                                      {limitation}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <RazorpayPayment planName={plan.name} amount={plan.price} interval="yearly" />
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold">Payment History</h2>
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              {paymentHistory.length > 0 ? (
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{payment.plan}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{payment.amount}</p>
                        <p className="text-sm text-green-600">{payment.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No payment history available</p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Download Invoice
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
