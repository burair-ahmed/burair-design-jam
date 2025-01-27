import { defineType } from "sanity";

export const cartItem = defineType({
  name: "cartItem",
  title: "Cart Item",
  type: "document",
  fields: [
    {
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
      validation: (rule) => rule.required(),
    },
    {
      name: "quantity",
      title: "Quantity",
      type: "number",
      validation: (rule) => rule.required().min(1),
      description: "The quantity of this product in the cart",
    },
    {
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      description: "The total price for this item (price * quantity)",
    },
  ],
});
