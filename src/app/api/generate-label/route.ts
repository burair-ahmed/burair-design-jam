import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
   
    const { billingDetails, serviceCode } = await req.json();
    // console.log('Request Payload:', { shippingDetails, billingDetails, serviceCode });

    // Ensure country_code is not empty
    // if (!shippingDetails.country || !billingDetails.country) {
    //   return NextResponse.json({
    //     success: false,
    //     message: 'Both shipping and billing country codes are required.',
    //   }, { status: 400 });
    // }

    
    const API_URL = 'https://api.shipengine.com/v1/labels';
    const labelRequest = {
      shipment: {
        service_code: serviceCode,  
        ship_from: {
          name: billingDetails.firstName,
          phone: billingDetails.phone,
          address_line1: "123 Main St",
          city_locality: "Austin",
          state_province: "TX",
          postal_code: "73301",
          country_code: "US",  
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
              unit: 'pound',  
            },
            dimensions: {
              length: 10,  
              width: 5,
              height: 5,
              unit: 'inch', 
            },
          },
        ],
      },
      validate_address: 'no_validation', 
    };

    // console.log('Label Request:', labelRequest);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.SHIPENGINE_API_KEY!, 
      },
      body: JSON.stringify(labelRequest),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Label generated successfully:', result);
      
      return NextResponse.json({ success: true, label: result }, { status: 200 });
    } else {
      console.error('ShipEngine error:', result);  
      return NextResponse.json({ success: false, message: result.errors[0].message }, { status: 400 });
    }
  } catch (error) {
    console.error('Unexpected error:', error); 
    return NextResponse.json({ success: false, message: 'An error occurred.' }, { status: 500 });
  }
}
