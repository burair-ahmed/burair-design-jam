"use client";

import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { client } from "../../../sanity/lib/client";
import Image from "next/image";
import {
  FaShareAlt,
  FaRegHeart,
  FaRegClone,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import Link from "next/link";

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
};


async function getProducts(slug: string): Promise<Product[]> {
  const query = `*[_type == "product" && slug.current == $slug]{
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
    isNew
  }`;

  try {
    const products: Product[] = await client.fetch(query, { slug });
    console.log("Fetched Products:", products);
    return products;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default function ProductDetails({ params }: { params: Promise<{ slug: string }> }) {
  const [displayedProduct, setDisplayedProduct] = useState<Product[]>([]);
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    }
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (slug) {
      getProducts(slug).then((products) => setDisplayedProduct(products));
    }
  }, [slug]);

  return (
    <div>
      <Header />

<div>
  {displayedProduct && displayedProduct.length > 0 ? (
    displayedProduct.map((item) => (
      <div key={item._id}>
      <div>
<div className="bg-[#F9F1E7] grid grid-cols-12 py-8 px-8">
        <div className="col-span-12 space-x-2">
          <span className="text-[#9F9F9F] font-medium"><Link href={"/"}>Home</Link></span>{" "}
          <span className="font-bold text-lg">&gt;</span>{" "}
          <span className="text-[#9F9F9F] font-medium"><Link href={"/shop"}>Shop</Link></span>{" "}
          <span className="font-bold text-lg">&gt;</span>{" "}
          <span className="font-extrabold text-2xl text-[#9F9F9F]">|</span>{" "}
          <span className="font-semibold text-sm">{item.title}</span>
        </div>
      </div>
      {/* <PageHero title="Product Details"/> */}

      <div className="grid grid-cols-12 py-12">
        <div className="md:col-span-6 col-span-6 md:mx-auto md:px-8">
          <div className="grid grid-cols-12 gap-6 px-2 items-center">
            <div className="col-span-4">
              <div className="flex-row space-y-4">
                <div className="bg-[#F9F1E7] w-[76px] h-[80px] flex items-center rounded-lg">
                  <Image
                    src={"/detail1.png"}
                    alt="Details 1"
                    width={83}
                    height={55}
                  />
                </div>
                <div className="bg-[#F9F1E7] w-[76px] h-[80px] flex items-center rounded-lg">
                  <Image
                    src={"/detail2.png"}
                    alt="Details 2"
                    width={99}
                    height={66}
                  />
                </div>
                <div className="bg-[#F9F1E7] w-[76px] h-[80px] flex items-center rounded-lg">
                  <Image
                    src={"/detail3.png"}
                    alt="Details 3"
                    width={77}
                    height={80}
                  />
                </div>
                <div className="bg-[#F9F1E7] w-[76px] h-[80px] flex items-center rounded-lg">
                  <Image
                    src={"/detail4.png"}
                    alt="Details 4"
                    width={74}
                    height={44}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-4">
            <div className="">
  <div className="w-[296.1px] h-[350px] md:w-[450px] md:h-[650px] flex items-center px-4 bg-[#F9F1E7] rounded-lg">
    <Image
      src={item.productImage?.asset?.url}
      alt="Details 5"
      width={481}
      height={300}
      className="rounded-lg my-2"
    />
  </div>
</div>

            </div>
          </div>
        </div>
        <div className="md:col-span-6 col-span-12">
          <div className="grid grid-cols-12 px-4">
            <div className="col-span-12">
              <h1 className="text-[42px]">{item.title}</h1>
              <h1 className="text-[24px] text-[#9F9F9F]">Rs.{item.price}</h1>
              <div className="grid grid-cols-12 mt-2">
                <div className="col-span-4">
                  <Image
                    src={"/stars.png"}
                    alt="Share"
                    width={124}
                    height={20}
                  />
                </div>
                <div className="col-span-6 border-l-[1px] border-[#9F9F9F] px-4 flex items-center">
                  <h1 className="text-[13px] font-medium text-[#9F9F9F]">
                    5 Customer Reviews
                  </h1>
                </div>
              </div>
              <p className="mt-4 text-black text-sm">
               {item.description}
              </p>
              {/* start of size */}
              <h1 className="text-[13px] font-medium text-[#9F9F9F] mt-6">
                Size
              </h1>
              <div className="flex mt-2 gap-x-4">
                <button className="p-[10px] rounded-[10px] text-[16px] font-medium text-white bg-[#B88E2F] transition">
                  XS
                </button>
                <button className="py-[10px] px-[15px] rounded-[10px] text-[16px] font-medium text-black bg-[#F9F1E7] transition">
                  L
                </button>
                <button className="p-[10px] rounded-[10px] text-[16px] font-medium text-black bg-[#F9F1E7] transition">
                  XL
                </button>
              </div>
              {/* end of size */}
              {/* start of color */}
              <h1 className="text-[13px] font-medium text-[#9F9F9F] mt-6">
                Color
              </h1>
              <div className="flex mt-2 gap-x-6">
                <button className="p-[15px] rounded-[50px] text-[16px] font-medium text-white bg-[#816DFA] transition focus:border-2 focus:border-black"></button>
                <button className="p-[15px] rounded-[50px] text-[16px] font-medium text-black bg-[#000] transition focus:border-2 focus:border-[#B88E2F]"></button>
                <button className="p-[15px] rounded-[50px] text-[16px] font-medium text-black bg-[#B88E2F] transition focus:border-2 focus:border-black"></button>
              </div>
              {/* end of color */}
              {/* start of add to carts and other buttons */}

              <div className="grid grid-cols-12 inline-flex items-center" >
              
                
                <div className="col-span-4 inline-flex items-center mt-4">
                  <div className="inline-flex items-center border border-black rounded-[10px] py-2 ">
                    <button
                      type="button"
                      className="px-4 py-2 text-black font-semibold rounded-[10px]"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 bg-white text-black font-semibold">
                      1
                    </span>
                    <button
                      type="button"
                      className="px-4 py-2 text-black font-semibold rounded-[10px]"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-span-4 inline-flex items-center mt-4">
                <button className="rounded-[10px] border text-[16px] border-black text-black px-4 py-4">Add to Cart</button>
                </div>
                <div className="col-span-4 inline-flex items-center mt-4"><button className="rounded-[10px] border text-[16px] border-black text-black px-4 py-4"><span className="">+</span> Compare</button></div>
              </div>
              {/* end of add to carts and other buttons */}
                <hr className="mt-4"/>

                {/* SKU and other stufffs */}
                <div className="grid grid-cols-12">
                <div className="col-span-4">              
                <h1 className="text-[16px] font-medium text-[#9F9F9F] mt-6">SKU </h1>
                <h1 className="text-[16px] font-medium text-[#9F9F9F] mt-6">Category </h1>
                <h1 className="text-[16px] font-medium text-[#9F9F9F] mt-6">Tags </h1>
                <h1 className="flextext-[16px] font-medium text-[#9F9F9F] mt-6">Share </h1>
                </div>
                <div className="col-span-8">              
                <h1 className="text-[16px] font-medium text-[#9F9F9F] mt-6"><span className="mr-4">:</span> SS001</h1>
                <h1 className="text-[16px] font-medium text-[#9F9F9F] mt-6"><span className="mr-4">:</span> Sofas</h1>
                <h1 className="text-[16px] font-medium text-[#9F9F9F] mt-6"><span className="mr-4">:</span> {item.tags?.join(', ')}</h1>
                <h1 className="flextext-[16px] font-medium text-[#9F9F9F] mt-6"><span className="mr-4">:</span> <span className="inline-flex space-x-2 items-center text-black text-lg" ><FaFacebook/> <FaLinkedin/> <FaTwitter/></span></h1>
                </div>

                </div>
                {/* end of SKU and other stufffs */}
        
                      </div>

          </div>
        </div>
      </div>
<hr className="mb-4"/>
      <div className="grid grid-col-12 space-y-4 px-4">
        <div className="md:col-span-4 col-span-12">
            <h1 className="text-black text-2xl font-medium">Description</h1>
            {/* <p className="text-[#9F9F9F] mt-4 md:hiddden">Embodying the raw, wayward spirit of rock n roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.</p> */}
        {/* <p className="text-[#9F9F9F] mt-4 md:hiddden">Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.</p> */}
        <p className="text-[#9F9F9F] mt-4 md:hiddden">{item.description}</p>
        </div>
        <div className="md:col-span-4 col-span-12">
        <h1 className="text-[#9F9F9F] text-2xl font-medium">Additional Information</h1>
        </div>
        <div className="md:col-span-4 col-span-12">
        <h1 className="text-[#9F9F9F] text-2xl font-medium">Reviews[5]</h1>
        </div>
      </div>
      <p className="text-[#9F9F9F] mt-4 hidden md:block">Embodying the raw, wayward spirit of rock n roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.</p>
        <p className="text-[#9F9F9F] mt-4 hidden md:block">Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.</p>
        
        <div className="grid grid-cols-12 space-y-4 md:space-y-0 mb-4">
            <div className="md:col-span-6 col-span-12 inline-flex items-center justify-center">
                <div className="md:w-[605px] md:h-[348px] w-[363px] bg-[#F9F1E7] rounded-[10px] ">
                <Image 
                src={"/detail6.png"}
                alt="Detail 6"
                width={828}
                height={551}
                />
                </div>
            </div>
            <div className="md:col-span-6 col-span-12 inline-flex items-center justify-center">
            <div className="md:w-[605px] md:h-[348px] w-[363px] bg-[#F9F1E7] rounded-[10px] inline-flex items-center">
                <Image 
                src={"/detail7.png"}
                alt="Detail 7"
                width={657}
                height={436}
                />
                </div>
            </div>
        </div>
</div>

      </div>
   ))
  ) : (
    <p>No product found for the given slug.</p>
  )}
    </div>



      {/*  */}
      
      <div className="grid grid-cols-12 gap-4 mt-8 md:px-16">
                {/* {productlist.map((product) => (
           <div
           key={product.id}
           className="items-center bg-[#f4f5f7] col-span-6 md:col-span-3 group relative hover:bg-black hover:bg-opacity-[50%] transition duration-300 ease-in-out"
         >
           <div className="w-full h-[300px] mx-auto relative">
             <Image
               src={product.image}
               alt={product.title}
               layout="fill"
               objectFit="cover"
               className="group-hover:opacity-70 transition duration-300"
             />
             <div className="absolute top-4 right-4 bg-[#2ec1ac] text-white text-xs px-3 py-3 rounded-full w-[40px] h-[40px] flex items-center justify-center">
               {product.discount}
             </div>
         
             <div className="transform space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
         
           <div className="pl-4">
             <h2 className="mt-4 font-bold text-xl">{product.title}</h2>
             <p className="text-gray-700">{product.description}</p>
             <div className="flex justify-center items-center mt-4 space-x-4">
               <div className="flex flex-col items-center">
                 <p className="font-bold text-lg">
                   <span>${product.discounted_price}</span>
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
         </div>
         
                ))} */}
              </div>
              <div className="mb-6">
        <div className="flex justify-center items-center mt-12">
          <button className="px-16 py-2 border-2 border-[#b88e2f] text-[#b88e2f] font-bold hover:bg-[#b88e2f] hover:text-white transition">
            Show More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
} 