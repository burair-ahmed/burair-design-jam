'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
          <Link
            href="/"
            className="block py-2 px-4 text-lg font-medium hover:text-gray-700 md:inline"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="block py-2 px-4 text-lg font-medium hover:text-gray-700 md:inline"
          >
            Shop
          </Link>
          <Link
            href="/blog"
            className="block py-2 px-4 text-lg font-medium hover:text-gray-700 md:inline"
          >
            Blog
          </Link>
          <Link
            href="/productdetails"
            className="block py-2 px-4 text-lg font-medium hover:text-gray-700 md:inline"
          >
            Product Details
          </Link>
          <Link
            href="/contact"
            className="block py-2 px-4 text-lg font-medium hover:text-gray-700 md:inline"
          >
            Contact
          </Link>
        </div>

        {/* Right Column - Icons */}
        <div className="col-span-4 hidden md:flex justify-end space-x-6 text-xl">
          <Link href="#" className="hover:text-gray-700">
            <FaSearch />
          </Link>
          <Link href="#" className="hover:text-gray-700">
            <FaHeart />
          </Link>
          <Link href="#" className="hover:text-gray-700">
            <FaShoppingCart />
          </Link>
        </div>
      </div>
    </header>
  );
}
