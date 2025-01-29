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

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setBillingData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const totalPricewithTax = (totalPrice ?? 0) * 0.1 + (totalPrice ?? 0);

  const handlePlaceOrder = async () => {
    
    const cartItems = Object.values(cartDetails ?? {}).map((item) => ({
        _key: `${item.id}-${item.quantity}`,
        _type: 'cartItem',
        product: {
          _type: 'reference',
          _ref: item.id, 
        },
        quantity: item.quantity,
      }));
      
  
    const orderData = {
      userId: user?.id, 
      cartItems: cartItems,
      billingDetails: billingData,
      totalPrice: totalPricewithTax,
      orderStatus: 'pending',
    };
  
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
  
    const result = await response.json();
    if (result.order) {
      clearCart();
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
       
          <div className="grid grid-cols-12">
            <div className="md:col-span-6 col-span-12">
              <h1 className="text-left text-2xl font-semibold">Products</h1>
              <div className="mt-6">
                {cartItemCount > 0 ? (
                  Object.values(cartDetails ?? {}).map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
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
              <h1 className="text-right text-2xl font-semibold hidden md:block">Summary</h1>
            </div>
          </div>

          <div className='grid grid-cols-12'>
            <div className='col-span-12'>
              <h1 className="md:hidden text-left text-2xl font-semibold mt-4">Summary</h1>

              <div className="mt-2">
                <h1 className="text-left md:text-right text-sm font-medium text-black">
                  Subtotal: Rs. {totalPrice}
                </h1>
                <h1 className="text-left md:text-right text-sm font-medium text-black">
                Tax: Rs. {(totalPrice ?? 0) * 0.1}
                </h1>
                <h1 className="text-left md:text-right text-xl font-semibold text-[#B88E2F] mt-4">
                  Total: Rs. {totalPricewithTax}
                </h1>
              </div>
            </div>
          </div>

          <hr className="mt-8" />
          <div className="mt-8">
          
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
