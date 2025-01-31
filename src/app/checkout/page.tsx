'use client'

import { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import BeforeFooter from "../components/BeforeFooter";
import BillingForm from "../components/BillingForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageHero from "../components/Page-Hero";
import { useUser } from '@clerk/clerk-react';
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"
import Link from 'next/link';

export default function Checkout() {
  const [isShippingSame, setIsShippingSame] = useState(true);
  const { cartDetails, cartCount, totalPrice, removeItem, clearCart } = useShoppingCart();
  const [shippingRates, setShippingRates] = useState<any>([]); 

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
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    zipcode: '',
    phone: '',
    email: '',
  });

  const { user } = useUser();
  const cartItemCount = cartCount ?? 0;
  const { toast } = useToast();
  const totalPricewithTax = (totalPrice ?? 0) * 0.1 + (totalPrice ?? 0);
  const [selectedRate, setSelectedRate] = useState<any>(null);  


  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setShippingData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setBillingData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    if (!billingData.firstName || !billingData.lastName || !billingData.streetAddress || !billingData.city || !billingData.zipcode || !billingData.phone || !billingData.email) {
      toast({
        variant: 'destructive',
        title: `Something is Missing`,  
        description: "Please Fill out the complete form 😊",
        duration: 3000, 
      });
      return;
    }
  
    const cartItems = Object.values(cartDetails ?? {});
    if (cartItems.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Cart is Empty',
        description: 'Your cart is empty. Add some items to place an order.',
        action: (
          <div className="flex items-center">
            <ToastAction altText="Go To Shop">
              <Link href="/shop">Go To Shop</Link>
            </ToastAction>
          </div>
        ),
        duration: 3000,
      });
      return;
    }
  
    const preparedCartItems = cartItems.map((item) => ({
      _key: `${item.id}-${item.quantity}`,
      _type: 'cartItem',
      product: {
        _type: 'reference',
        _ref: item.id,
      },
      quantity: item.quantity,
    }));


  
    const hardcodedBillingDetails = {
      firstName: 'John',
      lastName: 'Doe',
      companyName: 'Company Inc.',
      country: 'US',
      streetAddress: '123 Main St',
      city: 'Austin',
      province: 'TX',
      zipcode: '73301',
      phone: '1234567890',
      email: 'john@example.com',
      additionalInfo: 'Please deliver during business hours.',
    };
    const shippingResponse = await fetch('/api/shipping-rates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shippingDetails: hardcodedBillingDetails,
        billingDetails: billingData,
      }),
    });
  
    const shippingResult = await shippingResponse.json();
    console.log(shippingResult); 

   if (shippingResult.rates.rate_response && shippingResult.rates.rate_response.rates) {
      setShippingRates(shippingResult.rates.rate_response.rates); 
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Fetching Rates',
        description: 'There was an issue fetching the shipping rates. Please try again later.',
        duration: 3000,
      });
    }

    if (!shippingResponse.ok || !shippingResult.rates || shippingResult.rates.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Shipping Rates Fetch Failed',
        description: 'We could not fetch available shipping rates. Please try again later.',
        duration: 3000,
      });
      return;
    }
  

  
    const orderData = {
      userId: user?.id,
      cartItems: preparedCartItems,
      billingDetails: billingData,
      totalPrice: totalPricewithTax,
      shippingDetails: isShippingSame ? billingData : shippingData,
      orderStatus: 'pending',
    };
  
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
  
    const result = await response.json();
    if (result.order) {
      // clearCart();
      toast({
        title: 'Order Placed Successfully!',
        description: 'Thank you for your order. You will receive a confirmation email shortly.',
        duration: 3000,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Failed to Place Order',
        description: 'There was an issue placing your order. Please try again later.',
        duration: 3000,
      });
    }
  };


  const handleGenerateLabel = async () => {
    if (!selectedRate) {
      toast({
        variant: 'destructive',
        title: 'No Shipping Option Selected',
        description: 'Please select a shipping option to proceed.',
        duration: 3000,
      });
      return;
    }
  
    const serviceCode = selectedRate.service_code;  
  
    const response = await fetch('/api/generate-label', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceCode,           
        shippingDetails: shippingData,  
        billingDetails: billingData,
      }),
    });
  
    const result = await response.json();
  
    if (result.success) {
      toast({
        title: 'Shipping Label Generated!',
        description: 'Your shipping label has been created successfully.',
        duration: 3000,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Generating Label',
        description: result.message,
        duration: 3000,
      });
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
          <BillingForm 
              onChange={handleBillingChange} 
              billingData={billingData} 
              shippingData={shippingData} 
              isShippingSame={isShippingSame} 
              setShippingData={setShippingData} 
              setIsShippingSame={setIsShippingSame}
            />
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
            <div>


            {shippingRates.length > 0 ? (
      <div>
        <h2>Available Shipping Rates</h2>
        <ul>
          {shippingRates.map((rate: any, index: number) => (
            <li key={index}>
              <input
                type="radio"
                id={`rate-${rate.rate_id}`}
                name="shippingRate"
                value={rate.rate_id}
                checked={selectedRate?.rate_id === rate.rate_id}
                onChange={() => setSelectedRate(rate)}  // Update selected rate
              />
              <label htmlFor={`rate-${rate.rate_id}`}>
                {rate.service_type} - ${rate.shipping_amount.amount} - Delivery in {rate.delivery_days} days
              </label>
              <br />
              <span>Estimated Delivery: {new Date(rate.estimated_delivery_date).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p>No shipping rates available.</p>
    )}


<button
                className="rounded-[10px] border-2 text-[20px] border-black text-black px-12 py-4"
                onClick={handleGenerateLabel}
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
