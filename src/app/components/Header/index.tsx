"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import BeforeFooter from "../BeforeFooter";
// import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ShoppingCartPopover } from "../shoppingCart";
import { useShoppingCart } from "use-shopping-cart";
import { useUser } from '@clerk/clerk-react';
import ProductSearch from "../ProductSearch";


export default function Header() {

  const { user } = useUser();
  
  const username = user?.username 
  const {
      cartCount,
    } = useShoppingCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  // const router = useRouter();
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
   <div>
     <header className="bg-white shadow-md">
      <div className="grid grid-cols-12 items-center p-4">
 
        <div className="col-span-6 md:col-span-4 flex justify-start">
          <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="Burai Design Jam"
            width={200}
            height={50}
            className="w-32 md:w-auto"
          /></Link>
        </div>

        <div className="col-span-6 md:hidden flex justify-end text-2xl">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

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
            href="/contact"
            className="block py-2 px-4 text-lg font-medium hover:text-gray-700 md:inline"
          >
            Contact
          </Link>
        </div>

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
            <UserButton userProfileUrl="/user-profile">
              <UserButton.MenuItems>
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
<Popover>
          <PopoverTrigger>
          {/* <Link href="#" className="hover:text-gray-700"> */}
            <Image
              src={"/header-icon2.png"}
              alt="Search"
              width={20}
              height={22}
            />
          {/* </Link> */}
          </PopoverTrigger>
          <PopoverContent className="w-96 h-96"><ProductSearch/></PopoverContent>
          </Popover>
          <Link href="#" className="hover:text-gray-700">
            <Image
              src={"/header-icon3.png"}
              alt="Wishlist"
              width={20}
              height={22}
            />
          </Link>
         
          <Popover>
  <PopoverTrigger>
  <div className="relative">
  <Image
    src="/header-icon4.png"
    alt="Cart"
    width={20}
    height={22}
  />
 
    <div className="absolute -top-2 -right-2 bg-black text-white text-[12px] font-semibold w-4 h-4 rounded-full flex justify-center items-center">
      {cartCount}
    </div>

</div>

          </PopoverTrigger>
  <PopoverContent className="w-96 h-96"><ShoppingCartPopover/></PopoverContent>
</Popover>

        </div>
      </div>
    </header>

<div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 md:hidden items-center">
<div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium items-center">
        
    <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
      <Link href={"/"} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <svg className="w-[20px] h-[22px] -mt-[2px] text-black dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
        </svg>
        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-black">Home</span>
        </Link>
    </button>
  
        <div className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <Popover>
          <PopoverTrigger>
          {/* <Link href="#" className="hover:text-gray-700"> */}
            <Image
              src={"/header-icon2.png"}
              alt="Search"
              width={20}
              height={22}
            />
          {/* </Link> */}
          </PopoverTrigger>
          <PopoverContent className="w-96 h-96"><ProductSearch/></PopoverContent>
          </Popover>
    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-black">Search</span>

        </div>
    <div className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
    <Popover>
  <PopoverTrigger>
  <div className="relative">
  <Image
    src="/header-icon4.png"
    alt="Cart"
    width={20}
    height={22}
  />
 
    <div className="absolute -top-2 -right-1 bg-black text-white text-[12px] font-semibold w-4 h-4 rounded-full flex justify-center items-center">
      {cartCount}
    </div>
    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-black">Cart</span>

</div>

          </PopoverTrigger>
  <PopoverContent className="w-96 h-96"><ShoppingCartPopover/></PopoverContent>
</Popover>
    </div>
    <div className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">

    <SignedOut >
            <SignInButton mode="modal">
              <Link href="#" className="hover:text-gray-700">
                <Image
                  src={"/header-icon1.png"}
                  alt="Sign IN"
                  width={22}
                  height={22}
                />
              </Link>
            </SignInButton>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Sign In</span>

          </SignedOut>
          <SignedIn>
            <UserButton userProfileUrl="/user-profile">
              <UserButton.MenuItems>
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
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-black">{username}</span>
          </SignedIn>
    </div>
</div>
</div> 
   </div>


  );
}
