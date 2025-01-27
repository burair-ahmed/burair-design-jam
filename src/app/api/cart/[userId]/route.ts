// src/app/api/cart/[userId]/route.ts
import { NextResponse, NextRequest } from 'next/server'; // Import NextRequest
import { client } from '../../../../sanity/lib/client'; // Ensure this path is correct
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = getAuth(req); // Get userId from Clerk

  if (!userId || userId !== params.userId) {
    return NextResponse.json({ message: 'Unauthorized or user mismatch' }, { status: 401 });
  }

  try {
    // Query the cart for the logged-in user
    const cart = await client.fetch(`
      *[_type == "cart" && userId == $userId] {
        cartItems[]->{
          title,
          price,
          description,
          productImage,
        },
        totalPrice
      }
    `, { userId });

    if (!cart || cart.length === 0) {
      return NextResponse.json({ message: 'No cart found for this user' }, { status: 404 });
    }

    return NextResponse.json(cart[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch cart data' }, { status: 500 });
  }
}
