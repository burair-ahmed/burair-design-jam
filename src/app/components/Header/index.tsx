'use client'

import { useState } from "react";
import Image from "next/image";
import { FaSearch, FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="grid grid-cols-12 items-center p-4">
        {/* Left Column - Logo */}
        <div className="col-span-6 md:col-span-4 flex justify-start">
          <Image
            src="/logo.png"
            alt="Burai Design Jam"
            width={200}
            height={50}
            className="w-32 md:w-auto"
          />
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="col-span-6 md:hidden flex justify-end text-2xl">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Center Column - Menu */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } col-span-12 md:col-span-4 md:flex md:justify-center md:space-x-6 absolute md:static bg-white w-full left-0 top-[70px] md:top-0 z-10 md:w-auto`}
        >
          <a
            href="/"
            className="block py-2 px-4 text-lg font-medium hover:text-gray-700 md:inline"
          >
            Home
          </a>
          <a
            href="/shop"
            className="block py-2 px-4 text-lg font-medium hover:text-gray-700 md:inline"
          >
            Shop
          </a>
          <a
            href="/blog"
            className="block py-2 px-4 text-lg font-medium hover:text-gray-700 md:inline"
          >
            Blog
          </a>
          <a
            href="/productdetails"
            className="block py-2 px-4 text-lg font-medium hover:text-gray-700 md:inline"
          >
            Product Details
          </a>
          <a
            href="/contact"
            className="block py-2 px-4 text-lg font-medium hover:text-gray-700 md:inline"
          >
            Contact
          </a>
        </div>

        {/* Right Column - Icons */}
        <div className="col-span-4 hidden md:flex justify-end space-x-6 text-xl">
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
