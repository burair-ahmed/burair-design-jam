"use client";
import { useShoppingCart } from "use-shopping-cart";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  quantity: string;
  id: string;
}

export default function AddToCart({
  currency,
  description,
  image,
  name,
  price,
  quantity,
  id,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();
  const product = {
    currency: currency,
    description: description,
    image: image,
    name: name,
    price: price,
    quantity: quantity,
    id: id,
  };

  const handleAddToCart = () => {
    addItem(product);
    handleCartClick();
  };
  return (
    
      <button
        onClick={handleAddToCart}
        className="w-36 h-11 mt-16 sm:mt-8 rounded-md hover:bg-blue-200 hover:text-white bg-[#23A6F0] text-white"
      >
        Add to cart
      </button>
  );
}