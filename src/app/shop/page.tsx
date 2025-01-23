"use client";

import Header from "../components/Header";
import PageHero from "../components/Page-Hero";
import ShopFilter from "../components/Shop-Filter";
import { FaShareAlt, FaRegHeart, FaRegClone } from "react-icons/fa";
import Image from "next/image";
import BeforeFooter from "../components/BeforeFooter";
import Footer from "../components/Footer";
import { client } from "../../sanity/lib/client";
import { useState, useEffect } from "react";
// import { product } from "@/sanity/schemaTypes/product";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

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
};

// const productlist = [
//   {
//     id: 1,
//     image: "/product1.png",
//     title: "Syltherine",
//     description: "Stylish cafe chair",
//     price: 3500000,
//     discounted_price: 2500000,
//     discount: "20%",
//   },
//   {
//     id: 2,
//     image: "/product2.png",
//     title: "Leviosa",
//     description: "Stylish cafe chair",
//     price: "",
//     discounted_price: 2500000,
//     discount: "20%",
//   },
//   {
//     id: 3,
//     image: "/product3.png",
//     title: "Lolito",
//     description: "Luxury big sofa",
//     price: 14000000,
//     discounted_price: 7000000,
//     discount: "25%",
//   },
//   {
//     id: 4,
//     image: "/product4.jpg",
//     title: "Lolito",
//     description: "Luxury big sofa",
//     price: "",
//     discounted_price: 500000,
//     discount: "New",
//   },
//   {
//     id: 5,
//     image: "/product1.png",
//     title: "Syltherine",
//     description: "Stylish cafe chair",
//     price: 3500000,
//     discounted_price: 2500000,
//     discount: "20%",
//   },
//   {
//     id: 6,
//     image: "/product2.png",
//     title: "Leviosa",
//     description: "Stylish cafe chair",
//     price: "",
//     discounted_price: 2500000,
//     discount: "20%",
//   },
//   {
//     id: 7,
//     image: "/product3.png",
//     title: "Lolito",
//     description: "Luxury big sofa",
//     price: 14000000,
//     discounted_price: 7000000,
//     discount: "25%",
//   },
//   {
//     id: 8,
//     image: "/product4.jpg",
//     title: "Lolito",
//     description: "Luxury big sofa",
//     price: "",
//     discounted_price: 500000,
//     discount: "New",
//   },
// ];

async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "product"]{
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

export default function Shop() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(8);
  const [layoutMode, setLayoutMode] = useState<"grid" | "row">("grid");
  const [displayedProduct, setDisplayedProduct] = useState<Product[]>([]);
  // const [slug, setSlug] = useState<string | null>(null);
  const totalPages = Math.ceil(displayedProduct.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const productsPerPageOptions = [8, 12, 16, 20];

  const handleProductsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProductsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleLayoutChange = (mode: "grid" | "row") => {
    setLayoutMode(mode);
  };

  useEffect(() => {
    getProducts().then((products) => setDisplayedProduct(products));
  }, []);

  return (
    <div>
      <Header />
      <PageHero title="Shop" />
      <ShopFilter
        NoOfItems={displayedProduct.length.toString()}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        productsPerPageOptions={productsPerPageOptions}
        handleProductsPerPageChange={handleProductsPerPageChange}
        onLayoutChange={handleLayoutChange}
      />

      {layoutMode === "grid" ? (
        <div>
          <div className="grid grid-cols-12 gap-4 mt-8 px-16">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="bg-[#f4f5f7] col-span-12 md:col-span-3 group relative hover:bg-black hover:bg-opacity-[50%] transition duration-300 ease-in-out rounded-lg"
              >
                <Link
                  href={`/product/${product.slug?.current}`}
                  target="_blank"
                >
                  <Card className="py-0 group-hover:bg-black group-hover:bg-opacity-[50%] transition duration-300 ease-in-out">
                    <CardHeader className="p-0">
                      <div className="w-full h-[300px] mx-auto relative">
                        <Image
                          src={product.productImage?.asset?.url}
                          alt={product.title}
                          layout="fill"
                          objectFit="cover"
                          className="group-hover:opacity-70 transition duration-300 rounded-tl-lg rounded-tr-lg"
                        />

                        <div
                          className={`absolute top-4 right-4 text-white text-xs px-3 py-3 rounded-full w-[40px] h-[40px] flex items-center justify-center ${
                            product.discountPercentage &&
                            product.discountPercentage > 0
                              ? "bg-[#2ec1ac]"
                              : "bg-red-500"
                          }`}
                        >
                          {product.discountPercentage
                            ? `${product.discountPercentage}%`
                            : "0%"}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      {/* <CardTitle>{product.title}</CardTitle> */}
                      {/* <CardDescription>{product.description}</CardDescription> */}
                    </CardContent>

                    <CardFooter>
                      <div className="pl-4">
                        <h2 className="mt-4 font-bold text-xl">
                          {product.title}
                        </h2>
                        <div className="flex items-center mt-4 space-x-4">
                          <div className="flex flex-col">
                            <p className="font-bold text-lg">
                              <span>
                                $
                                {product.discountPercentage
                                  ? `${product.price - (product.price * product.discountPercentage) / 100}`
                                  : `${product.price}`}
                              </span>
                            </p>
                          </div>

                          <div className="flex flex-col">
                            <p className="font-bold text-[12px]">
                              <span
                                className={`line-through text-gray-500 ${
                                  !product.discountPercentage ? "hidden" : ""
                                }`}
                              >
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
                      <button className="text-[#b88e2f] font-bold flex text-lg space-x-8 bg-white p-2 hover:bg-gray-800 transition px-8">
                        Add to Cart
                      </button>
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
        </div>
      ) : (
        <div>
          {" "}
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="flex bg-[#f4f5f7] group hover:bg-black hover:bg-opacity-[50%] transition duration-300 ease-in-out rounded-lg p-4"
            >
              <Link
                href={`/product/${product.slug.current}`}
                target="_blank"
                className="flex items-center w-full"
              >
                <div className="w-[200px] h-[270px] relative">
                  <Image
                    src={product.productImage.asset.url}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg group-hover:opacity-70 transition"
                  />
                </div>
                <div className="flex-1 pl-4">
                  <h2 className="font-bold text-xl">{product.title}</h2>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <span className="text-lg font-bold text-black">
                      ${product.price}
                    </span>
                    {product.discountPercentage && (
                      <span className="line-through text-gray-500">
                        $
                        {product.price +
                          (product.price * product.discountPercentage) / 100}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              <div className="items-center absolute left-[40%] flex-col justify-center ml-4">
                <div className="absolute top-20 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                 <div className="">
                 <button className="px-4 py-2 bg-white text-black font-bold border border-gray-300 rounded hover:bg-gray-800 hover:text-white transition">
                    Add to Cart
                  </button>
                 </div>
                  <button className="flex items-center text-white px-2 py-2 hover:bg-gray-800 transition">
                    <FaShareAlt size={10} className="mr-2" /> Share
                  </button>
                  <button className="flex items-center text-white px-2 py-2 hover:bg-gray-800 transition">
                    <FaRegClone size={10} className="mr-2" /> Compare
                  </button>
                  <button className="flex items-center text-white px-2 py-2 hover:bg-gray-800 transition">
                    <FaRegHeart size={10} className="mr-2" /> Like
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <div className="flex justify-center items-center mt-12 gap-x-4">
          <button
            onClick={() =>
              handlePageChange(
                currentPage - 1 > totalPages ? totalPages : currentPage - 1
              )
            }
            disabled={currentPage === 1}
            className="md:px-6 md:py-4 rounded-[10px] md:text-[20px] px-4 py-2 text-[12px] font-medium text-black bg-[#F9F1E7] transition disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index - 1)}
              className={`md:px-6 md:py-4 rounded-[10px] md:text-[20px] px-4 py-2 text-[12px] font-medium ${
                currentPage === index + 1
                  ? "text-white bg-[#b88e2f]"
                  : "text-black bg-[#F9F1E7]"
              } transition`}
              disabled
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              handlePageChange(
                currentPage + 1 > totalPages ? totalPages : currentPage + 1
              )
            }
            disabled={currentPage === totalPages}
            className="md:px-6 md:py-4 rounded-[10px] md:text-[20px] px-4 py-2 text-[12px] font-medium text-black bg-[#F9F1E7] transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <BeforeFooter />
      <Footer />
    </div>
  );
}
