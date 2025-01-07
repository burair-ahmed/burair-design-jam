"use client";

interface Room {
  id: string;
  type: string;
  title: string;
  image: string;
}

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

interface RoomInspirationProps {
  className?: string;
}

const RoomInspiration: React.FC<RoomInspirationProps> = ({
  className = "",
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const rooms: Room[] = [
    {
      id: "01",
      type: "Bed Room",
      title: "Inner Peace",
      image: "/room1.png",
    },
    {
      id: "02",
      type: "Bed Room",
      title: "Asdasd",
      image: "/room1.png",
    },
  ];

  return (
    <div className={`grid mx-auto px-4 py-8 bg-[#FCF8F3] ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mx-auto">
        <div className="col-span-5 p-4 md:p-8 my-auto">
          <h2 className="text-2xl md:text-[40px] font-extrabold text-[#3A3A3A] mb-4">
            50+ Beautiful rooms inspiration
          </h2>
          <p className="text-gray-600 mb-6 md:mb-8">
            Our designer already made a lot of beautiful prototypes of rooms to
            inspire you.
          </p>
          <button
            className="bg-[#B8860B] text-white px-6 py-2 md:px-8 md:py-3 font-bold hover:bg-[#9B7009] transition-colors"
            onClick={() => console.log("Explore More clicked")}
          >
            Explore More
          </button>
        </div>

        <div className="col-span-7 relative pb-20 md:pb-0">
  <div className="flex gap-4 md:gap-6 overflow-hidden">
    <div className="relative flex-shrink-0 w-full md:w-[400px]">
      <img
        src="/room1.png"
        alt="Bedroom inspiration"
        className="w-full h-[300px] md:h-[582px] object-cover rounded-[10px]"
      />
      <div>
        <div className="absolute bottom-6 left-4 md:bottom-12 md:left-8 bg-white bg-opacity-[60%] p-4 md:p-6 pr-16 max-w-full md:max-w-[400px]">
          <div className="flex items-center gap-2 md:gap-3 text-gray-500 mb-2">
            <span className="font-medium">01</span>
            <span className="w-6 md:w-8 h-[1px] bg-gray-300"></span>
            <span>Bed Room</span>
          </div>
          <h3 className="text-lg md:text-2xl font-semibold text-gray-800">
            Inner Peace
          </h3>
        </div>
      </div>
      <button
        className="absolute bottom-12 left-[60%] bg-[#B8860B] p-3"
        onClick={() => console.log("Next room clicked")}
      >
        <ChevronRight className="text-white w-5 h-5" />
      </button>
    </div>
    <div className="hidden md:flex gap-4">
      <img
        src="/room2.png"
        alt="Next room preview"
        className="w-[180px] md:w-[372px] h-[200px] md:h-[486px] object-cover rounded-[10px]"
      />
      <img
        src="/room1.png"
        alt="Next room preview"
        className="w-[180px] md:w-[372px] h-[200px] md:h-[486px] object-cover rounded-[10px]"
      />
    </div>
  </div>


  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 slider-dots">
    {[0, 1, 2, 3].map((dot: number) => (
      <button
        key={dot}
        onClick={() => setCurrentSlide(dot)}
        className={`w-3 h-3 rounded-full transition-colors ${
          currentSlide === dot
            ? 'bg-[#B8860B] p-2 outline outline-2 outline-[#B8860B] outline-offset-2'
            : 'bg-gray-300'
        }`}
        aria-label={`Go to slide ${dot + 1}`}
      />
    ))}
  </div>

          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-3 rounded-full "
            onClick={() => {
              const nextSlide = (currentSlide + 1) % 4;
              setCurrentSlide(nextSlide);
            }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-[#B8860B]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomInspiration;
