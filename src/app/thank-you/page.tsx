'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ScrollArea } from "@/components/ui/scroll-area"

interface ThankYouPageProps {
  labelDetails: {
    tracking_number: string;
    shipment_cost: { amount: number; currency: string };
    label_download: { pdf: string };
  };
  totalWithShipping: number;
}

export default function ThankYouPage({ labelDetails }: ThankYouPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const trackingNumber = searchParams.get('trackingNumber');
  const paymentMethod = searchParams.get('paymentMethod');
  const shipmentCost = searchParams.get('shipmentCost');
  const totalAmount = searchParams.get('totalAmount');
  const cartItems = searchParams.get('cartItems');

  const parsedCartItems = cartItems ? JSON.parse(decodeURIComponent(cartItems)) : [];

  useEffect(() => {
    
  }, [labelDetails, router]);

  return (
    <div>
      <Header/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="max-w-md w-full shadow-xl p-6 text-center">
        <h1 className="text-2xl font-bold text-green-600">Thank You for Your Order!</h1>
        <p className="text-gray-700 mt-2">Your shipping label has been successfully generated.</p>

        <CardContent className="mt-4 space-y-3">
        <div className="mt-4">
        <p>Order ID: {orderId}</p>
        <p>Tracking Number: {trackingNumber || "N/A"}</p>
        <p>Payment Method: {paymentMethod}</p>
        <p>Shipping: ${shipmentCost}</p>
        <p>Total Amount: ${totalAmount}</p>

      </div>
          <div>
            {/* <Button asChild>
              <a href={labelDetails.label_download.pdf} target="_blank" rel="noopener noreferrer">
                Download Shipping Label
              </a>
            </Button> */}
               <h2 className="text-xl font-semibold mt-6">Your Items:</h2>
               <ScrollArea className='h-[350px]'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {parsedCartItems.length > 0 ? (
          parsedCartItems.map((item: any) => (
            <div key={item._key} className="border p-4 rounded-md shadow-md">
              {item.image && (
                <img src={item.image} alt={item.name} className="w-32 h-32 object-cover mx-auto" />
              )}
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
      </ScrollArea>
          </div>
        </CardContent>

        <Button className="mt-4" onClick={() => router.push('/')}>Go Back to Home</Button>
      </Card>
    </div>
    <Footer/>
    </div>
  );
}
