"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const paymentId = searchParams.get("razorpay_payment_id")
  const orderId = searchParams.get("razorpay_order_id")

  useEffect(() => {
    // In a real app, you might want to verify the payment status again here
    if (paymentId && orderId) {
      toast({
        title: "Payment successful",
        description: "Your subscription has been activated successfully",
      })
    }
  }, [paymentId, orderId, toast])

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>Your subscription has been activated successfully</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-t border-b py-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-muted-foreground">Payment ID:</div>
              <div className="text-sm font-medium text-right">{paymentId || "N/A"}</div>
              <div className="text-sm text-muted-foreground">Order ID:</div>
              <div className="text-sm font-medium text-right">{orderId || "N/A"}</div>
            </div>
          </div>
          <p className="text-center text-muted-foreground">
            Thank you for subscribing to EduArchive. You now have access to premium features.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/papers">Browse Papers</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
