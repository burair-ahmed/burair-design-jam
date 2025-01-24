"use client"; // Marks this file as a client component

import Header from "@/app/components/Header"; // Ensure this import is correct
import { UserProfile } from "@clerk/nextjs";

export default function Test() {
  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      <Header />
      
      {/* User Profile */}
      <div className="w-full max-w-4xl mt-6 flex flex-col justify-center mx-auto items-center">
        <UserProfile
          appearance={{
            elements: {
              rootBox: "bg-gray-100 shadow-md rounded-lg p-6 w-full", // Custom styles for the root container
              card: "bg-black border-2 border-black rounded-lg p-6", // Style for the card
              cardHeader: "text-xl font-bold text-gray-700 mb-4", // Style for the header
              button: "bg-black text-white hover:bg-blue-600 rounded-md px-4 py-2", // Style for buttons
              cardFooter: "bg-gray-50 border-t border-gray-200 p-4 text-sm text-center",
            },
          }}
       />
   
      </div>
    </div>
  );
}
