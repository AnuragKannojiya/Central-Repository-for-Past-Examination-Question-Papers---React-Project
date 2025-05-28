"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function PaymentFailurePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const errorCode = searchParams.get("error_code")
  const errorDescription = searchParams.get("error_description")

  useEffect(() => {
    toast({
      title: "Payment failed",
      description: errorDescription || "Your payment could not be processed. Please try again.",
      variant: "destructive",
    })
  }, [errorDescription, toast])

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl">Payment Failed</CardTitle>
          <CardDescription>We couldn't process your payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(errorCode || errorDescription) && (
            <div className="border-t border-b py-4">
              <div className="grid grid-cols-2 gap-2">
                {errorCode && (
                  <>
                    <div className="text-sm text-muted-foreground">Error Code:</div>
                    <div className="text-sm font-medium text-right">{errorCode}</div>
                  </>
                )}
                {errorDescription && (
                  <>
                    <div className="text-sm text-muted-foreground">Error:</div>
                    <div className="text-sm font-medium text-right">{errorDescription}</div>
                  </>
                )}
              </div>
            </div>
          )}
          <p className="text-center text-muted-foreground">
            Your payment could not be processed. Please try again or contact our support team for assistance.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/pricing">Try Again</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
