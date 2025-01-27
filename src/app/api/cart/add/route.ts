import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { client } from '../../../../sanity/lib/client'; // Sanity client setup

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req); // Get userId from Clerk

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  let cartItems = [];
  let totalPrice = 0;

  try {
    const data = await req.json();
    cartItems = data.cartItems || [];
    totalPrice = data.totalPrice || 0;
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  try {
    // Create or update cart items in Sanity
    const cartItemDocs = await Promise.all(
      cartItems.map(async (item: { id: string, quantity: number, price: number }) => {
        // Check if the cart already contains this product for the user
        const existingCartItem = await client.fetch(`
          *[_type == "cartItem" && product._ref == $productId] {
            _id,
            quantity
          }
        `, { productId: item.id });

        let cartItem;

        if (existingCartItem.length > 0) {
          // If the product already exists in the cart, update the quantity and totalPrice
          const updatedQuantity = existingCartItem[0].quantity + item.quantity;
          const updatedTotalPrice = item.price * updatedQuantity;

          cartItem = await client.patch(existingCartItem[0]._id)
            .set({
              quantity: updatedQuantity,
              totalPrice: updatedTotalPrice,
            })
            .commit();
        } else {
          // If the product doesn't exist in the cart, create a new cart item
          cartItem = await client.create({
            _type: 'cartItem',
            product: { _type: 'reference', _ref: item.id },
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
          });
        }

        return cartItem._id;
      })
    );

    // Check if the user already has a cart
    const existingCart = await client.fetch(`
      *[_type == "cart" && userId == $userId] {
        _id,
        cartItem[] {
          _ref
        }
      }
    `, { userId });

    let cart;

    if (existingCart.length > 0) {
      // Update the existing cart if it exists
      cart = await client.patch(existingCart[0]._id)
        .set({
          cartItem: [
            ...existingCart[0].cartItem,
            ...cartItemDocs.map((id: string, index: number) => ({
              _type: 'reference',
              _ref: id, // Reference to cartItem document IDs
              _key: `${existingCart[0].id}-${index}`, // Add a unique key for each item in the list
            })),
          ],
          totalPrice,
        })
        .commit();
    } else {
      // Create a new cart if it doesn't exist
      cart = await client.create({
        _type: 'cart',
        userId,
        cartItem: cartItemDocs.map((id: string, index: number) => ({
          _type: 'reference',
          _ref: id, // Reference to cartItem document IDs
          _key: `${userId}-${id}-${index}`, // Add a unique key for each item in the list
        })),
        totalPrice,
      });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Error during Sanity query:", error);
    return NextResponse.json({ message: 'Failed to add cart data' }, { status: 500 });
  }
}
