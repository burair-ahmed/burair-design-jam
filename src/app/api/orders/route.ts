import { NextRequest, NextResponse } from 'next/server';
import { client } from '../../../sanity/lib/client';  

export async function POST(req: NextRequest) {
  try {
    const { userId, cartItems, billingDetails, totalPrice, orderStatus } = await req.json();


    const now = new Date();
    const orderId = `${userId}-${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;


    const orderData = {
      _type: 'order',
      orderId,  
      userId,
      cartItems, 
      billingDetails,
      totalPrice,
      orderStatus,
    };


    const createdOrder = await client.create(orderData);

    return NextResponse.json({ message: 'Order created successfully', order: createdOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Error creating order', error }, { status: 500 });
  }
}
