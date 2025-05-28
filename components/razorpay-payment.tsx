"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { createOrder, verifyPayment } from "@/lib/razorpay"

interface RazorpayPaymentProps {
  planName: string
  amount: number
  interval: "monthly" | "yearly"
}

export function RazorpayPayment({ planName, amount, interval }: RazorpayPaymentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { updateSubscription } = useAuth()

  const handlePayment = async () => {
    try {
      setIsLoading(true)

      // Create an order on the server
      const order = await createOrder(amount)

      if (!order || !order.id) {
        throw new Error("Failed to create order")
      }

      // Fetch the key from the server
      const configResponse = await fetch("/api/razorpay/config")
      const config = await configResponse.json()

      if (!config || !config.key) {
        throw new Error("Failed to get Razorpay configuration")
      }

      const options = {
        key: config.key,
        amount: amount * 100, // Amount in paise
        currency: "INR",
        name: "EduArchive",
        description: `${planName} Plan - ${interval}`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            // Verify the payment on the server
            const verification = await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            })

            if (verification.success) {
              // Update the user's subscription
              await updateSubscription(planName.toLowerCase())

              toast({
                title: "Payment successful",
                description: `You have successfully subscribed to the ${planName} plan.`,
              })

              // Redirect to success page
              window.location.href = "/payment/success"
            } else {
              throw new Error("Payment verification failed")
            }
          } catch (error) {
            console.error("Payment verification error:", error)
            toast({
              title: "Payment verification failed",
              description: "There was an issue verifying your payment. Please contact support.",
              variant: "destructive",
            })
            window.location.href = "/payment/failure"
          }
        },
        prefill: {
          name: "Student Name",
          email: "student@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#6366F1",
        },
      }

      // Initialize Razorpay
      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handlePayment} disabled={isLoading} className="w-full">
      {isLoading ? "Processing..." : `Subscribe - ₹${amount}`}
    </Button>
  )
}
