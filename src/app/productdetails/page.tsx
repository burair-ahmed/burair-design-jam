import Footer from "../components/Footer";
import Header from "../components/Header";
// import PageHero from "../components/Page-Hero"
import Image from "next/image";
import { FaShareAlt, FaRegHeart, FaRegClone, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function ProductDetails() {
  const productlist = [
    {
      id: 1,
      image: "/product1.png",
      title: "Syltherine",
      description: "Stylish cafe chair",
      price: 3500000,
      discounted_price: 2500000,
      discount: "20%",
    },
    {
      id: 2,
      image: "/product2.png",
      title: "Leviosa",
      description: "Stylish cafe chair",
      price: "",
      discounted_price: 2500000,
      discount: "20%",
    },
    {
      id: 3,
      image: "/product3.png",
      title: "Lolito",
      description: "Luxury big sofa",
      price: 14000000,
      discounted_price: 7000000,
      discount: "25%",
    },
    {
      id: 4,
      image: "/product4.jpg",
      title: "Lolito",
      description: "Luxury big sofa",
      price: "",
      discounted_price: 500000,
      discount: "New",
    },
  ];

  return (
    <div>
      <Header />
      <div className="bg-[#F9F1E7] grid grid-cols-12 py-8 px-8">
        <div className="col-span-12 space-x-2">
          <span className="text-[#9F9F9F] font-medium">Home</span>{" "}
          <span className="font-bold text-lg">&gt;</span>{" "}
          <span className="text-[#9F9F9F] font-medium">Shop</span>{" "}
          <span className="font-bold text-lg">&gt;</span>{" "}
          <span className="font-extrabold text-2xl text-[#9F9F9F]">|</span>{" "}
          <span className="font-semibold text-sm">Asgaard sofa</span>
        </div>
      </div>
      {/* <PageHero title="Product Details"/> */}

      <div className="grid grid-cols-12 py-12">
        <div className="md:col-span-6 col-span-6">
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
                <div className="w-[296.1px] h-[350px] md:w-[423px] md:h-[500px] flex items-center px-4 bg-[#F9F1E7] rounded-lg">
                  <Image
                    src={"/detail5.png"}
                    alt="Details 5"
                    width={481}
                    height={391}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-6 col-span-12">
          <div className="grid grid-cols-12 px-4">
            <div className="col-span-12">
              <h1 className="text-[42px]">Asgaard Sofa</h1>
              <h1 className="text-[24px] text-[#9F9F9F]">Rs. 250,000.00</h1>
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
                Setting the bar as one of the loudest speakers in its class, the
                Kilburn is a compact, stout-hearted hero with a well-balanced
                audio which boasts a clear midrange and extended highs for a
                sound.
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

              <div className="grid grid-cols-12 inline-flex items-center">
              
                
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
                <h1 className="text-[16px] font-medium text-[#9F9F9F] mt-6"><span className="mr-4">:</span> Sofa, Chair, Home, Shop</h1>
                <h1 className="flextext-[16px] font-medium text-[#9F9F9F] mt-6"><span className="mr-4">:</span> <span className="inline-flex space-x-2 items-center text-black text-lg" ><FaFacebook/> <FaLinkedin/> <FaTwitter/></span></h1>
                </div>

                </div>
                {/* end of SKU and other stufffs */}
        
                      </div>

          </div>
        </div>
      </div>

      <div className="grid grid-col-12">
        <div className="col-span-12">
            
        </div>
      </div>

      {/*  */}
      {/* <div className="grid grid-cols-12 gap-4 mt-8 px-16">
                {productlist.map((product) => (
           <div
           key={product.id}
           className="bg-[#f4f5f7] col-span-12 md:col-span-3 group relative hover:bg-black hover:bg-opacity-[50%] transition duration-300 ease-in-out"
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
         
                ))}
              </div> */}
      <Footer />
    </div>
  );
}
