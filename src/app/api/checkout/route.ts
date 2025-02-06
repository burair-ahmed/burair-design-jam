import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with secret key from environment variable
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Handle POST requests for creating a Stripe session
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the JSON body
    const { lineItems } = body; // Extract line items from the request body

    // Create a new checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems, // Use the line items passed from the frontend
      mode: "payment", // Set payment mode to "payment"
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`, // Redirect URL after successful payment
      cancel_url: `${req.headers.get("origin")}/cancel`, // Redirect URL if payment is canceled
    });

    return NextResponse.json({ url: session.url }); // Return the checkout session URL
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 }); // Return error if something goes wrong
  }
}

// Handle unsupported HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405 }
  );
}
