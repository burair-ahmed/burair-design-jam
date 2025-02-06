'use client'

import Image from "next/image";
import Link from "next/link";
import { FaShareAlt, FaRegHeart, FaRegClone } from "react-icons/fa";
import { client } from "../../../sanity/lib/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { useState, useEffect } from "react";
import AddToCart2 from "../addToCart2";


type Product = {
  _id: string;
  title: string;
  description: string;
  productImage: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
      url: string;
    };
  };
  price: number;
  tags?: string[];
  discountPercentage?: number;
  isNew?: boolean;
  slug: {
    _type: "slug";
    current: string;
  };
  quantity?: number;
};



async function getProducts(limit: number): Promise<Product[]> {
  const query = `*[_type == "product"] | order(title asc) [0..${limit - 1}] {
    _id,
    title,
    description,
    productImage {
      asset -> {
        url
      }
    },
    price,
    tags,
    discountPercentage,
    isNew,
    slug
  }`;

  try {
    const products: Product[] = await client.fetch(query);
    console.log("Fetched Products:", products);
    return products;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}



export default function Products() {

  const [displayedProduct, setDisplayedProduct] = useState<Product[]>([]);
  // const [slug, setSlug] = useState<string | null>(null);
  const productLimit = 8; 
  

  useEffect(() => {
    getProducts(productLimit).then((products) => setDisplayedProduct(products));
  }, [productLimit]);

  return (
    <div className="mb-12">
      <div>
        <h1 className="mt-10 text-center font-bold text-lg md:text-4xl">
          Our Products
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-8 px-16">
        {displayedProduct.map((product) => (
          <div
            key={product._id}
            className="bg-[#f4f5f7] col-span-12 md:col-span-3 group relative hover:bg-black hover:bg-opacity-[50%] transition duration-300 ease-in-out rounded-lg"
          >
            <Link href={`/product/${product.slug?.current}`} target="_blank">
              <Card className="py-0 group-hover:bg-black group-hover:bg-opacity-[50%] transition duration-300 ease-in-out">
                <CardHeader className="p-0">
                  <div className="w-full h-[300px] mx-auto relative">
                      <Image
                                        src={product.productImage.asset.url}
                                        alt={product.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg group-hover:opacity-70 transition"
                                      />
                                      <div
                                              className={`absolute top-4 right-4 text-white text-xs px-3 py-3 rounded-full w-[40px] h-[40px] flex items-center justify-center ${
                                                product.discountPercentage &&
                                                product.discountPercentage > 0
                                                  ? "bg-[#E97171]"
                                                  : ""
                                              }`}
                                            >
                                              {product.discountPercentage
                                                ? `-${product.discountPercentage}%`
                                                : ""}
                                            </div>
                                            <div className={`${product.isNew? "absolute top-4 left-4 text-white text-xs px-3 py-3 rounded-full w-[40px] h-[40px] flex items-center justify-center bg-[#2ec1ac]" : ""}`}>{product.isNew? "New" : ""}</div>
                    

                  </div>
                </CardHeader>

                <CardContent>
                  {/* <CardTitle>{product.title}</CardTitle> */}
                  {/* <CardDescription>{product.description}</CardDescription> */}
                </CardContent>

                <CardFooter>
                  <div className="pl-4">
                    <h2 className="mt-4 font-bold text-xl">{product.title}</h2>
                    <div className="flex justify-center items-center mt-4 space-x-4">
                      <div className="flex flex-col items-center">
                        <p className="font-bold text-lg">
                          <span>${product.price}</span>
                        </p>
                      </div>

                      <div className="flex flex-col items-center">
                        <p className="font-bold text-[12px]">
                          <span className="line-through text-gray-500">
                            {product.price}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>

            <div className="absolute top-[10%] left-[17%] space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="grid grid-cols-12 items-center justify-center pt-[100px]">
                <div className="col-span-12 flex justify-center items-center">
                  <AddToCart2 currency="PKR" description={product.description} image={product.productImage?.asset?.url} name={product.title} price={product.price} 
                                    quantity={product.quantity?.toString() || ''} key={product._id} id={product._id}/>
                </div>

                <div className="col-span-12 flex justify-center items-center space-x-4 mt-4">
                  <button className="flex items-center text-white p-2 hover:bg-gray-800 transition">
                    <FaShareAlt size={10} className="mr-2" /> Share
                  </button>
                  <button className="flex items-center text-white p-2 hover:bg-gray-800 transition">
                    <FaRegClone size={10} className="mr-2" /> Compare
                  </button>
                  <button className="flex items-center text-white p-2 hover:bg-gray-800 transition">
                    <FaRegHeart size={10} className="mr-2" /> Like
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex justify-center items-center mt-12">
          <Link href={"/shop"} target="_blank">
            <button className="px-16 py-2 border-2 border-[#b88e2f] text-[#b88e2f] font-bold hover:bg-[#b88e2f] hover:text-white transition" >
              Show More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
