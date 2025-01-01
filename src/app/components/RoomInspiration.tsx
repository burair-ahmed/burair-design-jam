'use client'

interface Room {
    id: string;
    type: string;
    title: string;
    image: string;
  }
 
  import React, { useState } from 'react';
  import { ChevronRight } from 'lucide-react';
  
  interface RoomInspirationProps {
    className?: string;
  }
  
  const RoomInspiration: React.FC<RoomInspirationProps> = ({ className = '' }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    
    const rooms: Room[] = [
      {
        id: "01",
        type: "Bed Room",
        title: "Inner Peace",
        image: "/room1.png"
      },
      {
        id: "02",
        type: "Bed Room",
        title: "asdasd",
        image: "/room1.png"
      },
    ];
  
    return (
      <div className={`grid mx-auto px-4 py-8 bg-[#FCF8F3] ${className}`}>
        <div className="grid grid-cols-12 gap-8 mx-auto">
    
          <div className="col-span-5">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              50+ Beautiful rooms inspiration
            </h2>
            <p className="text-gray-600 mb-8">
              Our designer already made a lot of beautiful prototipe of rooms that inspire you
            </p>
            <button 
              className="bg-[#B8860B] text-white px-8 py-3 font-medium hover:bg-[#9B7009] transition-colors"
              onClick={() => console.log('Explore More clicked')}
            >
              Explore More
            </button>
          </div>
  
          <div className="col-span-7 relative">
            <div className="flex gap-6 overflow-hidden">
              <div className="relative flex-shrink-0 w-[400px]">
                <img
                  src="/room1.png"
                  alt="Bedroom inspiration"
                  className="w-full h-[582px] object-cover rounded-[10px]"
                />

                <div>
                <div className="absolute bottom-12 left-8 bg-white bg-opacity-[60%] p-6 pr-16 max-w-[400px]">
                  <div className="flex items-center gap-3 text-gray-500 mb-2">
                    <span className="font-medium">01</span>
                    <span className="w-8 h-[1px] bg-gray-300"></span>
                    <span>Bed Room</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Inner Peace</h3>
                  
                </div>

              </div>
              <button 
                    className="absolute bottom-12 left-[60%] bg-[#B8860B] p-3"
                    onClick={() => console.log('Next room clicked')}
                  >
                    <ChevronRight className="text-white w-5 h-5" />
                  </button>
                </div>
              <div className="flex gap-4">
                <img
                  src="/room2.png"
                  alt="Next room preview"
                  className="w-[372px] h-[486px] object-cover rounded-[10px]"
                />
                <img
                  src="/room1.png"
                  alt="Next room preview"
                  className="w-[372px] h-[486px] object-cover flex-grid rounded-[10px]"
                />
                <div className="absolute bottom-12 left-[52%] transform flex gap-2">
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
              </div>
            </div>
  
            <button 
              className="absolute top-1/2 right-0 transform p-2"
              onClick={() => {
                const nextSlide = (currentSlide + 1) % 4;
                setCurrentSlide(nextSlide);
              }}
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default RoomInspiration;