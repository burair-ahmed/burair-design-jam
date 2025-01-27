import { defineType } from "sanity";

export const cart = defineType({
  name: "cart",
  title: "Cart",
  type: "document",
  fields: [
    {
      name: "userId",
      title: "User ID",
      type: "string",
      validation: (rule) => rule.required(),
      description: "The user ID from your authentication system (e.g., Clerk)",
    },
    {
      name: "cartItem",
      title: "Cart Items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "cartItem" }] }],
      validation: (rule) => rule.required().min(1),
      description: "An array of cart items added by the user",
    },
    {
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      description: "The total price of all items in the cart",
    },
  ],
});
