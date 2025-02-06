import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { client } from "../../../sanity/lib/client";
import Link from "next/link";
import Image from 'next/image';
import { ScrollArea } from "@/components/ui/scroll-area"


interface Product {
  _id: string;
  title: string;
  description: string;
  productImage: {
    asset: {
      url: string;
    };
  };
  price: number;
  slug: {
    current: string;
  };
}

async function fetchProducts(): Promise<Product[]> {
  const query = `*[_type == "product"] {
    _id,
    title,
    description,
    productImage { asset -> { url } },
    price,
    slug
  }`;
  return await client.fetch(query);
}

const ProductSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      fetchProducts().then(setProducts);
    } else {
      setProducts([]);
    }
  }, [searchTerm]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
<ScrollArea className="w-[320px] h-[280px] rounded-md border p-4">
      {searchTerm.trim() !== "ABC" && (
        <div className="grid gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
          <li key={product._id} className="flex py-4">
                              <Link href={`/product/${product.slug.current}`} className="">
                          <div className='flex'>
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                             <Image
                               src={product.productImage.asset.url}
                               alt={product.title}
                               width={100}
                               height={100}
                               className="object-cover"
                             />
                           </div>
         
                           <div className="ml-4 flex flex-col flex-1">
                             <div>
                               <div className="flex flex-col justify-between text-base font-semibold text-gray-900">
                                 <h3>{product.title}</h3>
                                 <p>Rs {product.price}</p>
                               </div>
                             </div>
                             <div className="flex flex-1 items-end justify-between text-sm">
                             </div>
                           </div>
                          </div>
                           </Link>
                         </li>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
      </ScrollArea>
    </div>
  );
};

export default ProductSearch;
