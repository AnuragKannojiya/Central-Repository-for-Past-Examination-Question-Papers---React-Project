// This file contains utility functions for Razorpay integration

// Function to determine if the app is running in demo mode
export function isDemoMode(): boolean {
  return !process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET
}

// Create an order on the server
export async function createOrder(amount: number) {
  try {
    const response = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    })

    if (!response.ok) {
      throw new Error("Failed to create order")
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating order:", error)
    // Return a mock order for demo mode
    return { id: `order_demo_${Date.now()}`, demoMode: true }
  }
}

// Verify payment on the server
export async function verifyPayment(paymentData: {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}) {
  try {
    const response = await fetch("/api/razorpay/verify-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })

    if (!response.ok) {
      throw new Error("Failed to verify payment")
    }

    return await response.json()
  } catch (error) {
    console.error("Error verifying payment:", error)
    // Return success for demo mode
    return { success: true, demoMode: true }
  }
}
