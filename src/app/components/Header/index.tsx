import Image from "next/image";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header>
      <div className="grid grid-cols-12 items-center p-4">
        {/* Left Column - Logo */}
        <div className="col-span-4 flex justify-start">
          <Image
            src="/logo.png"
            alt="Burai Design Jam"
            width={200}
            height={50}
          />
        </div>

        {/* Center Column - Menu */}
        <div className="col-span-4 flex justify-center space-x-6">
          <a href="#" className="text-lg font-medium hover:text-gray-700">
            Home
          </a>
          <a href="#" className="text-lg font-medium hover:text-gray-700">
            Shop
          </a>
          <a href="#" className="text-lg font-medium hover:text-gray-700">
            Blog
          </a>
          <a href="#" className="text-lg font-medium hover:text-gray-700">
            Contact
          </a>
        </div>

        {/* Right Column - Icons */}
        <div className="col-span-4 flex justify-end space-x-6 text-xl">
          <a href="#" className="hover:text-gray-700">
            <FaSearch />
          </a>
          <a href="#" className="hover:text-gray-700">
            <FaHeart />
          </a>
          <a href="#" className="hover:text-gray-700">
            <FaShoppingCart />
          </a>
        </div>
      </div>
    </header>
  );
}   