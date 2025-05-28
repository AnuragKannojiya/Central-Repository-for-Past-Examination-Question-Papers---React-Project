"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { RazorpayPayment } from "@/components/razorpay-payment"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { isDemoMode } from "@/lib/razorpay"

const pricingPlans = [
  {
    id: "free",
    name: "Free",
    description: "Basic access to examination papers",
    price: 0,
    inrPrice: 0,
    period: "forever",
    features: [
      "Access to free papers only",
      "Basic search functionality",
      "5 downloads per month",
      "No preview for premium papers",
      "Standard quality PDFs",
    ],
    limitations: ["No access to premium papers", "Limited search filters", "No solution guides", "No priority support"],
    buttonText: "Current Plan",
    recommended: false,
  },
  {
    id: "basic",
    name: "Basic",
    description: "Enhanced access with more features",
    price: 9.99,
    inrPrice: 799,
    period: "per month",
    features: [
      "Access to all free papers",
      "Limited access to premium papers",
      "20 downloads per month",
      "Preview for all papers",
      "High quality PDFs",
      "Basic solution guides",
      "Email support",
    ],
    limitations: ["Limited premium paper access", "No priority support"],
    buttonText: "Upgrade to Basic",
    recommended: false,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Full access to all examination papers",
    price: 19.99,
    inrPrice: 1499,
    period: "per month",
    features: [
      "Unlimited access to all papers",
      "Unlimited downloads",
      "Advanced search filters",
      "High quality PDFs",
      "Comprehensive solution guides",
      "Priority support",
      "Offline access",
      "Early access to new papers",
    ],
    limitations: [],
    buttonText: "Upgrade to Premium",
    recommended: true,
  },
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")
  const { user, isAdmin, hasPremiumAccess } = useAuth()
  const { toast } = useToast()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<(typeof pricingPlans)[0] | null>(null)

  const handleUpgrade = (plan: (typeof pricingPlans)[0]) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login or register to upgrade your subscription",
        variant: "destructive",
      })
      return
    }

    setSelectedPlan(plan)
    setShowPaymentModal(true)
  }

  const getUserPlan = () => {
    if (!user) return null
    return user.subscription || "free"
  }

  const currentPlan = getUserPlan()

  const handlePaymentSuccess = (data: any) => {
    toast({
      title: "Subscription upgraded",
      description: `You have successfully upgraded to the ${selectedPlan?.name} plan`,
    })
    setShowPaymentModal(false)
  }

  const handlePaymentError = (error: any) => {
    console.error("Payment error:", error)
    toast({
      title: "Payment failed",
      description: "We encountered an issue processing your payment. Please try again.",
      variant: "destructive",
    })
    setShowPaymentModal(false)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select the perfect plan to enhance your exam preparation with our comprehensive collection of past papers
        </p>

        {isAdmin() && (
          <Alert className="mt-4 max-w-2xl mx-auto bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Admin Access</AlertTitle>
            <AlertDescription className="text-blue-700">
              As an admin, you have full access to all features regardless of subscription plan. You can still change
              plans for demonstration purposes.
            </AlertDescription>
          </Alert>
        )}

        {isDemoMode() && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md max-w-2xl mx-auto">
            <p className="text-yellow-800 text-sm">
              <strong>Demo Mode:</strong> This is a demonstration of the payment flow. No actual payments will be
              processed. In a real application, you would need to configure Razorpay with valid API keys.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-muted inline-flex p-1 rounded-lg">
          <Button
            variant={billingPeriod === "monthly" ? "default" : "ghost"}
            onClick={() => setBillingPeriod("monthly")}
            className="rounded-md"
          >
            Monthly
          </Button>
          <Button
            variant={billingPeriod === "yearly" ? "default" : "ghost"}
            onClick={() => setBillingPeriod("yearly")}
            className="rounded-md"
          >
            Yearly{" "}
            <span className="ml-1 text-xs bg-primary-foreground text-primary px-2 py-0.5 rounded-full">Save 20%</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => {
          const isCurrentPlan = currentPlan === plan.id
          const yearlyPrice = plan.inrPrice * 0.8 * 12
          const displayPrice = billingPeriod === "monthly" ? plan.inrPrice : yearlyPrice

          return (
            <Card key={plan.id} className={`flex flex-col ${plan.recommended ? "border-primary shadow-lg" : ""}`}>
              {plan.recommended && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Recommended
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">₹{displayPrice}</span>
                  <span className="text-muted-foreground ml-2">
                    {billingPeriod === "monthly" ? "per month" : "per year"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <h4 className="font-medium">What&apos;s included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <>
                      <h4 className="font-medium mt-6">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start">
                            <X className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                {isCurrentPlan ? (
                  <Button className="w-full" variant="outline" disabled>
                    Current Plan
                  </Button>
                ) : plan.id === "free" ? (
                  <Button className="w-full" variant="outline" onClick={() => handleUpgrade(plan)}>
                    Downgrade to Free
                  </Button>
                ) : (
                  <RazorpayPayment
                    planId={plan.id as "basic" | "premium"}
                    planName={plan.name}
                    amount={displayPrice}
                    billingPeriod={billingPeriod}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6 mt-8">
          {[
            {
              question: "Can I cancel my subscription at any time?",
              answer:
                "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.",
            },
            {
              question: "How do I upgrade or downgrade my plan?",
              answer:
                "You can upgrade or downgrade your plan from your account settings. Changes will take effect at the start of your next billing cycle.",
            },
            {
              question: "Is there a limit to how many papers I can download?",
              answer:
                "Free and Basic plans have monthly download limits. Premium plan users enjoy unlimited downloads.",
            },
            {
              question: "Do you offer discounts for students?",
              answer:
                "Yes, we offer special discounts for students with a valid student ID. Contact our support team for more information.",
            },
            {
              question: "What payment methods do you accept?",
              answer:
                "We accept all major credit/debit cards, UPI, net banking, and wallets through our secure Razorpay payment gateway.",
            },
          ].map((faq, index) => (
            <div key={index} className="bg-muted p-6 rounded-lg text-left">
              <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center bg-primary/5 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our team is ready to help you select the best plan for your academic needs. Contact us for personalized
          assistance.
        </p>
        <Button asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}
