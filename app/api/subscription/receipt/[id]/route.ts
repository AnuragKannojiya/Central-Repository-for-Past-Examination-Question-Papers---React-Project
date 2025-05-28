import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const paymentId = params.id

    // In a real implementation, you would fetch the payment details from your database
    // For example:
    // const payment = await db.payment.findUnique({
    //   where: { id: paymentId },
    //   include: { user: true, plan: true }
    // })

    // For demo purposes, we'll just return a mock receipt
    const receipt = {
      id: paymentId,
      date: new Date().toISOString(),
      amount: 499,
      currency: "INR",
      plan: "Basic",
      billingPeriod: "monthly",
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
      company: {
        name: "EduArchive",
        address: "123 Education Street, Knowledge City",
        email: "support@eduarchive.com",
      },
    }

    return NextResponse.json({ receipt })
  } catch (error) {
    console.error("Error generating receipt:", error)
    return NextResponse.json({ error: "Failed to generate receipt" }, { status: 500 })
  }
}
