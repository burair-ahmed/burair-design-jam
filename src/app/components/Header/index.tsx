"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import BeforeFooter from "../BeforeFooter";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const router = useRouter();
  const DotIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
      </svg>
    );
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
        <div className="col-span-4 hidden md:flex justify-end space-x-6 text-xl items-center">
          <SignedOut>
            <SignInButton mode="modal">
              <Link href="#" className="hover:text-gray-700">
                <Image
                  src={"/header-icon1.png"}
                  alt="Search"
                  width={22}
                  height={22}
                />
              </Link>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton>
              <UserButton.MenuItems>
              <UserButton.Action
            label="Manage Account"
            labelIcon={<DotIcon />}
            onClick={() => router.push("/manage-account")} // Navigate to /manage-account
          />
                <UserButton.Action
                  label="Help"
                  labelIcon={<DotIcon />}
                  open="help"
                />
                <UserButton.Action
                  label="Good"
                  labelIcon={<DotIcon />}
                  open="good"
                />
              </UserButton.MenuItems>
              <UserButton.UserProfilePage
                label="Help"
                labelIcon={<DotIcon />}
                url="help"
              >
                <div>
                  <BeforeFooter />
                </div>
              </UserButton.UserProfilePage>
              <UserButton.UserProfilePage
                label="Good"
                labelIcon={<DotIcon />}
                url="good"
              >
                <div>
                  <BeforeFooter />
                </div>
              </UserButton.UserProfilePage>
            </UserButton>
          </SignedIn>
          <Link href="#" className="hover:text-gray-700">
            <Image
              src={"/header-icon2.png"}
              alt="Search"
              width={20}
              height={22}
            />
          </Link>
          <Link href="#" className="hover:text-gray-700">
            <Image
              src={"/header-icon3.png"}
              alt="Wishlist"
              width={20}
              height={22}
            />
          </Link>
          <Link href="#" className="hover:text-gray-700">
            <Image
              src={"/header-icon4.png"}
              alt="Cart"
              width={20}
              height={22}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
