"use client";  

import { useShoppingCart } from 'use-shopping-cart';
import BeforeFooter from "../components/BeforeFooter";
import BillingForm from "../components/BillingForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageHero from "../components/Page-Hero";

export default function Checkout() {
  const { cartDetails, cartCount, totalPrice, removeItem, clearCart } = useShoppingCart();
  const cartItemCount = cartCount ?? 0;
  const handlePlaceOrder = () => {
    // Here you can call your backend to create the order and handle payment
    // For now, we can just clear the cart after placing an order
    clearCart();
    alert("Order placed successfully!");
  };

  return (
    <div>
      <Header />
      <PageHero title="Checkout" />
      <div className="grid grid-cols-12 md:w-[75%] mx-auto md:gap-12">
        <div className="md:col-span-6 col-span-12 px-4 mt-12">
          <h1 className="text-center text-4xl font-semibold">Billing Details</h1>
          <div className="mt-8">
            <BillingForm />
          </div>
        </div>

        <div className="md:col-span-6 col-span-12 px-4 mt-8 md:mt-20">
          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <h1 className="text-left text-2xl font-semibold">Products</h1>
              <div className=" mt-6">
              {cartItemCount > 0 ? (
  Object.values(cartDetails ?? {}).map((item: any) => (
    <div key={item.id} className="flex justify-between">
      <h1 className="text-left text-sm font-medium text-[#9F9F9F]">
        {item.name} <span className="text-black">x {item.quantity}</span>
      </h1>
      <h1 className="text-left text-sm font-medium text-black">
        Rs. {item.formattedValue}
      </h1>
      <button
        className="text-red-500"
        onClick={() => removeItem(item.id)}
      >
        Remove
      </button>
    </div>
  ))
) : (
  <p className="text-gray-500">Your cart is empty</p>
)}

              </div>
            </div>

            <div className="col-span-6">
              <h1 className="text-right text-2xl font-semibold">Summary</h1>
            </div>
          </div>
          <div className='grid grid-cols-12'>
            <div className='col-span-12'>
              <div className="mt-6">
                <h1 className="text-right text-sm font-medium text-black">
                  Subtotal: Rs. {totalPrice}
                </h1>
                <h1 className="text-right text-sm font-medium text-black">
                  Tax: Rs. 0 (You can add tax calculations here)
                </h1>
                <h1 className="text-right text-xl font-semibold text-[#B88E2F] mt-4">
                  Total: Rs. {totalPrice}
                </h1>
              </div>
            </div>
          </div>

          <hr className="mt-8" />

          <div className="mt-8">
            <div className="flex">
              <div className="flex items-center h-5">
                <input
                  id="helper-radio1"
                  aria-describedby="helper-radio-text"
                  type="radio"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="ms-2 text-sm">
                <label className="font-medium text-black">Direct Bank Transfer</label>
                <p id="helper-radio-text" className="text-xs font-normal text-gray-500 dark:text-gray-300">
                  Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                  Your order will not be shipped until the funds have cleared in our account.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center h-5">
                <input
                  id="helper-radio2"
                  aria-describedby="helper-radio-text"
                  type="radio"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="ms-2 text-sm">
                <label className="font-medium text-black">Cash On Delivery</label>
                <p id="helper-radio-text" className="text-xs font-normal text-gray-500 dark:text-gray-300">
                  Pay with cash upon delivery. Please ensure the exact amount is available as change may not be provided
                  by the delivery personnel.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm">
              Your personal data will be used to support your experience throughout this website, to manage access to
              your account, and for other purposes described in our <b>privacy policy.</b>
            </p>
          </div>

          <div className="flex justify-center mt-10">
            <button
              className="rounded-[10px] border-2 text-[20px] border-black text-black px-12 py-4"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <BeforeFooter />
      <Footer />
    </div>
  );
}
