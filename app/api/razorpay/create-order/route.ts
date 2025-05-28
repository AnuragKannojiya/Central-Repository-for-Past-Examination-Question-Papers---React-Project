import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { amount, currency = "INR", receipt, notes } = await request.json()

    // Validate required fields
    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 })
    }

    // Check if Razorpay keys are configured
    const isDemo = !process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET

    // Always use demo mode in this implementation to avoid require() issues
    // In a production environment, you would integrate with the actual Razorpay SDK
    console.log("Running in demo mode")

    // For demo purposes, return a mock order
    return NextResponse.json({
      order: {
        id: `order_demo_${Date.now()}`,
        entity: "order",
        amount,
        amount_paid: 0,
        amount_due: amount,
        currency,
        receipt,
        status: "created",
        notes,
        created_at: new Date().toISOString(),
      },
    })

    /* 
    // This code would be used in production with real Razorpay integration
    // You would need to set up a server-side API route using Node.js or use Edge Runtime
    // For Next.js App Router, you might need to use the Edge Runtime or a separate API
    
    // Example of how this would be implemented in a Node.js environment:
    // import Razorpay from 'razorpay';
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // });
    // const order = await razorpay.orders.create({
    //   amount,
    //   currency,
    //   receipt,
    //   notes,
    // });
    // return NextResponse.json({ order });
    */
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      {
        error: "Failed to create order",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
