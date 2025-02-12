"use client";
import { useShoppingCart } from "use-shopping-cart";
import { toast } from "sonner";
import { ToastAction } from "@/components/ui/toast"
import Link from "next/link";


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
    quantity: Number(quantity),
    id: id,
  };

  const handleAddToCart = () => {
    addItem(product); 
    handleCartClick(); 

    toast(`${name} added to cart`,{
        
      description: "",
        action: (
          <div className="flex items-center">
            <img src={image} alt={name} className="w-12 h-12 mr-4" />
              <ToastAction  altText="View Cart"><Link href={"/cart"}>View Cart</Link></ToastAction>
          </div>
        ),
        duration: 3000, 
      });
    };

  return (
    <button
      onClick={handleAddToCart}
      className="rounded-[10px] border text-[16px] border-black text-black px-4 py-4"
    >
      Add to cart
    </button>
  );
}
