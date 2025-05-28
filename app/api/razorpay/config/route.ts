import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Only return the public key, never return the secret key
    return NextResponse.json({
      key: process.env.RAZORPAY_KEY_ID || "rzp_test_demo_key_for_development",
      demoMode: !process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error("Error fetching Razorpay config:", error)
    return NextResponse.json({ error: "Failed to fetch Razorpay configuration" }, { status: 500 })
  }
}
