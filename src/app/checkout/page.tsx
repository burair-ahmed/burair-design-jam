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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
// import { CloudLightning } from 'lucide-react';
import { Loader2 } from "lucide-react"; 


interface ShippingRate {
  rate_id: string;
  service_code: string;
  service_type: string;
  shipping_amount: {
    amount: number;
    currency: string;
  };
  delivery_days: number;
  estimated_delivery_date: string;
}

interface ShipmentAmount {
  amount: number;
  currency: string;
}


export default function Checkout() {
  const [isShippingSame, setIsShippingSame] = useState(true);
  const { cartDetails, cartCount, totalPrice, removeItem, clearCart } = useShoppingCart();
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]); 
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [shipmentAmount, setShipmentAmount] = useState<ShipmentAmount | null>(null);  
  const { user } = useUser();
  const cartItemCount = cartCount ?? 0;
  const { toast } = useToast();
  const totalPricewithTax = (totalPrice ?? 0) * 0.1 + (totalPrice ?? 0);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);    
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [paymentMethod, setPaymentMethod] = useState("COD"); 

  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    streetAddress: '',
    city: '',
    province: '',
    stateProvince: '',
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
    stateProvince: '',
    zipcode: '',
    phone: '',
    email: '',
  });




  // const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, value } = e.target;
  //   setShippingData((prevData) => ({
  //     ...prevData,
  //     [id]: value,
  //   }));
  // };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setBillingData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const getShippingRates = async () => {
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
    // console.log(shippingResult); 

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
  
    const orderData = {
      userId: user?.id,
      cartItems: preparedCartItems,
      billingDetails: billingData,
      totalPrice: totalPricewithTax,
      shippingDetails: isShippingSame ? billingData : shippingData,
      orderStatus: 'pending',
      paymentMethod: paymentMethod,
    };
  
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
  
    const result = await response.json();
    if (result.order) {
      clearCart();
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

    setOrderPlaced(true);

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
  
    setLoading(true); 
    try {
      const serviceCode = selectedRate.service_code;
  
      const response = await fetch("/api/generate-label", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceCode,
          shippingDetails: shippingData,
          billingDetails: billingData,
        }),
      });
  
      const result = await response.json();
      // console.log(result);
  
      setShipmentAmount(result.label.shipment_cost.amount);
  
      setIsDialogOpen(true);
      if (result.success) {
        toast({
          title: "Shipping Label Generated!",
          description: "Your shipping label has been created successfully.",
          duration: 3000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error Generating Label",
          description: result.message,
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "Something went wrong. Please try again later.",
        duration: 3000,
      });
      console.error("Error generating label:", error);
    } finally {
      setLoading(false);
    }
  
  };


  const handleOnlinePayment = async () => {
  console.log("Redirecting to Online Payment...");
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

            <div className={`flex justify-center mt-10 ${orderPlaced ? "hidden" : ""}`}>
            <button
  className={`rounded-[10px] border-2 text-[20px] border-black text-black px-12 py-4`}
  onClick={getShippingRates}
>
  Get Shipping Rates
</button>
            </div>
            <div className='mt-8'>
            {shippingRates.length > 0 ? (
      <div>
        <ul>
        <div className="flex flex-wrap">
  {shippingRates.map((rate: ShippingRate, index: number) => (
    <div key={index} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4">
      <li className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-all duration-200 bg-white flex gap-2 h-full">
        <label htmlFor={`rate-${rate.rate_id}`} className="flex flex-col gap-2 cursor-pointer">
          <div className="flex justify-between items-center h-full">
            <div className="grid grid-cols-12 flex">
              <div className="col-span-10 flex items-start">
            <p className="font-semibold text-md">{rate.service_type}</p>
              </div>
              <div className="col-span-2 flex items-center justify-center">
            <input
              type="radio"
              id={`rate-${rate.rate_id}`}
              name="shippingRate"
              value={rate.rate_id}
              checked={selectedRate?.rate_id === rate.rate_id}
              onChange={() => setSelectedRate(rate)}
              className="w-4 h-4 accent-indigo-500"
            />
          </div>
              </div>
            </div>
            <div>
          <p className="text-sm text-gray-500">
          {/* ${rate.shipping_amount.amount} -  */}
            Delivery in {rate.delivery_days} days
          </p>
            </div>

          <span className="text-xs text-gray-400">
            Estimated Delivery: {new Date(rate.estimated_delivery_date).toLocaleString()}
          </span>
        </label>
      </li>
    </div>
  ))}
</div>

        </ul>
      </div>
    ) : (
      <p>No shipping rates available.</p>
    )}

<div className={`flex justify-center mt-4`}>
      {/* <DialogTrigger asChild> */}
      <button
      className="rounded-[10px] border-2 text-[20px] border-black text-black px-12 py-4 mt-4 flex items-center justify-center gap-3 disabled:opacity-50"
      onClick={handleGenerateLabel}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin w-6 h-6 text-black" />
          Processing...
        </>
      ) : (
        "Complete Order"
      )}
    </button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {/* </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Order</DialogTitle>
          <DialogDescription>
          Confirm your Order Details
          </DialogDescription>

 <div className="mt-6">
                {cartItemCount > 0 ? (
                  Object.values(cartDetails ?? {}).map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <h1 className="text-md font-bold">
                        {item.name} <span className="text-left text-sm font-bold text-[#9F9F9F]">x {item.quantity}</span>
                      </h1>
                      <h1 className="text-left text-sm font-bold text-[#9F9F9F]">
                        Rs. {item.formattedValue}
                      </h1>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Your cart is empty</p>
                )}
              </div>

            <div className="mt-6">
        <h1 className="text-sm font-semibold">Select Payment Method</h1>
        <div className="flex flex-col mt-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
              className="w-3 h-3"
            />
            <span className="text-sm">Cash on Delivery (COD)</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="Online"
              checked={paymentMethod === "Online"}
              onChange={() => setPaymentMethod("Online")}
              className="w-3 h-3"
            />
            <span className="text-sm">Online Payment</span>
          </label>
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
                <h1 className="text-left md:text-right text-sm font-medium text-black">
                Shipping. Rs.{shipmentAmount ? shipmentAmount.amount : 0}
                </h1>
                <h1 className="text-left md:text-right text-xl font-semibold text-[#B88E2F] mt-4">
                  Total: Rs. {totalPricewithTax + (shipmentAmount ? shipmentAmount.amount : 0)}
                </h1>
              </div>
            </div>
          </div>
         
        </DialogHeader>
        

        <DialogFooter>
        <button
  className={`rounded-[10px] border-2 text-[16px] border-black text-black px-3 py-1 hover:bg-black hover:transition hover:text-white`}
  onClick={paymentMethod === "COD" ? handlePlaceOrder : handleOnlinePayment}
>
  {paymentMethod === "COD" ? "Place Order" : "Proceed to Payment"}
</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
              </div>

      </div>
          </div>
        </div>
      </div>

      
      <BeforeFooter />
      <Footer />
    </div>
  );
}
