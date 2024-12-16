import Image from "next/image";
import { FaShareAlt, FaRegHeart, FaRegClone } from 'react-icons/fa';

const productlist = [
  {
    "id": 1,
    "image": "/product1.png",
    "title": "Syltherine",
    "description": "Stylish cafe chair",
    "price": 3500000,
    "discounted_price": 2500000,
    "discount": "20%"
  },
  {
    "id": 2,
    "image": "/product2.png",
    "title": "Leviosa",
    "description": "Stylish cafe chair",
    "price": "",
    "discounted_price": 2500000,
    "discount": "20%"
  },
  {
    "id": 3,
    "image": "/product3.png",
    "title": "Lolito",
    "description": "Luxury big sofa",
    "price": 14000000,
    "discounted_price": 7000000,
    "discount": "25%"
  },
  {
    "id": 4,
    "image": "/product4.jpg",
    "title": "Lolito",
    "description": "Luxury big sofa",
    "price": "",
    "discounted_price": 500000,
    "discount": "New"
  },
  {
    "id": 5,
    "image": "/product1.png",
    "title": "Syltherine",
    "description": "Stylish cafe chair",
    "price": 3500000,
    "discounted_price": 2500000,
    "discount": "20%"
  },
  {
    "id": 6,
    "image": "/product2.png",
    "title": "Leviosa",
    "description": "Stylish cafe chair",
    "price": "",
    "discounted_price": 2500000,
    "discount": "20%"
  },
  {
    "id": 7,
    "image": "/product3.png",
    "title": "Lolito",
    "description": "Luxury big sofa",
    "price": 14000000,
    "discounted_price": 7000000,
    "discount": "25%"
  },
  {
    "id": 8,
    "image": "/product4.jpg",
    "title": "Lolito",
    "description": "Luxury big sofa",
    "price": "",
    "discounted_price": 500000,
    "discount": "New"
  }
];

export default function Products() {
  return (
    <div>
      <div>
        <h1 className="mt-10 text-center font-bold text-lg md:text-4xl">
          Our Products
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-8 px-16">
        {productlist.map((product) => (
          <div key={product.id} className="bg-[#f4f5f7] col-span-12 md:col-span-3 group relative">
            <div className="w-full h-[300px] mx-auto relative group-hover:bg-black group-hover:bg-opacity-[80%] transition duration-300 ease-in-out">
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
      </div>

      <div>
        <div className="flex justify-center items-center mt-12">
          <button className="px-16 py-2 border-2 border-[#b88e2f] text-[#b88e2f] font-bold hover:bg-[#b88e2f] hover:text-white transition">
            Show More
          </button>
  </div>
      </div>
    </div>
  );
}
