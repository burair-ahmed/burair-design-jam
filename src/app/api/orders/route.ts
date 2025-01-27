// src/app/api/orders/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { client } from '../../../sanity/lib/client';  // Make sure this path is correct

export async function POST(req: NextRequest) {
  try {
    const { userId, cartItems, billingDetails, totalPrice, orderStatus } = await req.json();


    const now = new Date();
    const orderId = `${userId}-${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;


    // Prepare the order data to be inserted into Sanity
    const orderData = {
      _type: 'order',
      orderId,  
      userId,
      cartItems,  // Make sure these are valid product references (use references to product documents)
      billingDetails,
      totalPrice,
      orderStatus,
    };

    // Create a new order in Sanity
    const createdOrder = await client.create(orderData);

    // Return the response
    return NextResponse.json({ message: 'Order created successfully', order: createdOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Error creating order', error }, { status: 500 });
  }
}
