import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'https://api.shipengine.com/v1/rates';

export async function POST(req: NextRequest) {
  try {
    const { shippingDetails, billingDetails } = await req.json();

    const shipmentRequest = {
      rate_options: {
        carrier_ids: ["se-1850379"],  
        service_code: "ups_ground",   
        package_type: "package",      
        ship_date: "2025-02-01T12:00:00Z",
        residential: false,         
      },
      shipment: {
        ship_from: {
            name: shippingDetails.firstName,
            phone: shippingDetails.phone,
            address_line1: shippingDetails.streetAddress,
            city_locality: shippingDetails.city,
            state_province: shippingDetails.province,
            postal_code: shippingDetails.zipcode,
            country_code: shippingDetails.country,
        },
        ship_to: {
            name: billingDetails.firstName,
            phone: billingDetails.phone,
            address_line1: billingDetails.streetAddress,
            city_locality: billingDetails.city,
            state_province: billingDetails.stateProvince,
            postal_code: billingDetails.zipcode,
            country_code: billingDetails.country,
        },
        packages: [
          {
            weight: {
              value: 2,
              unit: "pound" as const, 
            },
            dimensions: {
              length: 10, 
              width: 5,   
              height: 5,   
              unit: "inch" as const,
            },
          },
        ],
      },
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.SHIPENGINE_API_KEY!,
      },
      body: JSON.stringify(shipmentRequest),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch shipping rates: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({ rates: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: 'Failed to fetch shipping rates', message }, { status: 500 });
  }
}
