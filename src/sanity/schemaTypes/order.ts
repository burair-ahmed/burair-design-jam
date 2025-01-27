export default {
    name: "order",
    title: "Order",
    type: "document",
    fields: [
        {
            name: 'orderId',
            title: 'Order ID',
            type: 'string',
            description: 'Unique identifier for the order',
            options: {
              isUnique: true, 
            },
        },
      {
        name: "userId",
        title: "User ID",
        type: "string",
      },
      {
        name: "cartItems",
        title: "Cart Items",
        type: "array",
        of: [
          {
            type: 'cartItem', // Updated cartItem type
          },
        ],
      },
      {
        name: "billingDetails",
        title: "Billing Details",
        type: "object",
        fields: [
          { name: "firstName", title: "First Name", type: "string" },
          { name: "lastName", title: "Last Name", type: "string" },
          { name: "companyName", title: "Company Name", type: "string" },
          { name: "country", title: "Country/Region", type: "string" },
          { name: "streetAddress", title: "Street Address", type: "string" },
          { name: "city", title: "City", type: "string" },
          { name: "province", title: "Province", type: "string" },
          { name: "zipcode", title: "Zipcode", type: "string" },
          { name: "phone", title: "Phone", type: "string" },
          { name: "email", title: "Email Address", type: "string" },
          {
            name: "additionalInfo",
            title: "Additional Information",
            type: "text",
          },
        ],
      },
      {
        name: "totalPrice",
        title: "Total Price",
        type: "number",
      },
      {
        name: "orderStatus",
        title: "Order Status",
        type: "string",
        options: {
          list: ["pending", "completed", "shipped"],
        },
      },
    ],
  };
  
  
  // Define the cartItem type
  export const cartItem = {
    name: 'cartItem',
    title: 'Cart Item',
    type: 'object',
    fields: [
      {
        name: 'product',
        title: 'Product',
        type: 'reference',
        to: [{ type: 'product' }],
      },
      {
        name: 'quantity',
        title: 'Quantity',
        type: 'number',
      },
    ],
  };
  
  