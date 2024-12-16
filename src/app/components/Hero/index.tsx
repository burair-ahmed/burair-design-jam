export default function Hero() {
    return (
      <div>
        <div
          className="bg-[url('/banner.jpg')] bg-cover bg-center h-[480px] grid grid-cols-1 md:grid-cols-12 p-8 md:p-16"
        >
          {/* Left Content */}
          <div className="hidden md:block col-span-6"></div>
  
          {/* Right Content */}
          <div className="col-span-12 md:col-span-6 bg-[#fff3e3] p-8 md:p-12">
            <h1 className="font-bold text-lg md:text-xl">New Arrival</h1>
            <h1 className="text-[#b88e2f] font-extrabold text-3xl md:text-5xl mr-4">
              Discover Our New Collection
            </h1>
            <p className="text-gray-700 text-base mt-2 md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
              ultricies ipsum, at mattis ligula fermentum in.
            </p>
            <button className="text-white bg-[#b88e2f] px-8 py-4 font-bold text-sm mt-4 hover:bg-[#8f771f]">
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    );
  }
  