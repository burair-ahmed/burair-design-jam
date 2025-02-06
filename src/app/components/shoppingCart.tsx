"use client";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ShoppingCartPopover() {
  const {
    cartCount,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    incrementItem,
    decrementItem,
  } = useShoppingCart();

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Cart Items */}
      <div className="mt-4 flex-1 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {cartCount === 0 ? (
            <h1 className="text-xl font-semibold py-6 text-center">Your cart is empty</h1>
          ) : (
            <>
              {Object.values(cartDetails ?? {}).map((entry) => (
                <li key={entry.id} className="flex py-4">
                  {/* Product Image */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={entry.image as string}
                      alt={entry.name}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="ml-4 flex flex-col flex-1">
                    <div>
                      <div className="flex justify-between text-base font-semibold text-gray-900">
                        <h3>{entry.name}</h3>
                        <p>Rs {entry.price * entry.quantity}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500 flex gap-2 items-center">Qty: <span className="font-black text-lg p-0"><button onClick={() => decrementItem(entry.id)}>-</button></span>{entry.quantity}<span className="font-black text-lg p-0"><button onClick={() => incrementItem(entry.id)}>+</button></span></p>
                      <button
                        type="button"
                        className="font-medium text-red-500 hover:text-red-600"
                        onClick={() => removeItem(entry.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

      {/* Subtotal & Checkout Button */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal:</p>
          <p>Rs {totalPrice}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">Shipping is calculated at checkout</p>
        <Link href="/checkout" className="mt-6">
          <Button
            onClick={() => handleCartClick()}
            variant="default"
            className="w-full mt-4"
          >
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
