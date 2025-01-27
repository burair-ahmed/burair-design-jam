'use client'

import { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import BeforeFooter from "../components/BeforeFooter";
import BillingForm from "../components/BillingForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageHero from "../components/Page-Hero";
import { useUser } from '@clerk/clerk-react';

export default function Checkout() {
  const { cartDetails, cartCount, totalPrice, removeItem, clearCart } = useShoppingCart();
  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    streetAddress: '',
    city: '',
    province: '',
    zipcode: '',
    phone: '',
    email: '',
    additionalInfo: ''
  });
  const { user } = useUser();
  const cartItemCount = cartCount ?? 0;

  // Handle billing form change
  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setBillingData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    // Get cart items from use-shopping-cart
    const cartItems = Object.values(cartDetails ?? {}).map((item: any) => ({
      _type: 'reference',
      _ref: item.id,  // Assuming 'id' corresponds to the Sanity product's document ID
      _key: item.id,  
    }));

    const orderData = {
      userId: user?.id || '',  // This should come from Clerk or your user session
      cartItems: cartItems,
      billingDetails: billingData,
      totalPrice: totalPrice,
      orderStatus: 'pending',
    };

    // Send the order data to your API route
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    if (result.order) {
      clearCart();  // Clear the cart after a successful order
      alert("Order placed successfully!");
    } else {
      alert("Failed to place order");
    }
  };

  return (
    <div>
      <Header />
      <PageHero title="Checkout" />
      <div className="grid grid-cols-12 md:w-[75%] mx-auto md:gap-12">
        <div className="md:col-span-6 col-span-12 px-4 mt-12">
          <h1 className="text-center text-4xl font-semibold">Billing Details</h1>
          <div className="mt-8">
            <BillingForm onChange={handleBillingChange} />
          </div>
        </div>

        <div className="md:col-span-6 col-span-12 px-4 mt-8 md:mt-20">
          {/* Product and Summary Display */}
          <div className="grid grid-cols-12">
            <div className="col-span-6">
              <h1 className="text-left text-2xl font-semibold">Products</h1>
              <div className="mt-6">
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
            {/* Payment Methods */}
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
      </div>
      <BeforeFooter />
      <Footer />
    </div>
  );
}
