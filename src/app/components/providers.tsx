'use client';

import { CartProvider as USCProvider } from "use-shopping-cart";
import { ReactNode } from "react";

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <div>
      <USCProvider
        mode="payment"
        cartMode="client-only"
        successUrl="http://localhost:3000/success"
        cancelUrl="http://localhost:3000/error"
        currency="PKR"
        billingAddressCollection={true}
        shouldPersist={true}
        language="en-US"
      >
        {children}
      </USCProvider>
    </div>
  );
}
