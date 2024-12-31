import Image from "next/image";

export default function Range() {
  return (
    <div>
      <div className="">
        <h1 className="mt-10 text-center font-bold text-lg md:text-2xl">
          Browse The Range
        </h1>
        <p className="text-center text-gray-700 text-base mt-2 md:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="grid grid-cols-12 gap-2 mt-8">
          {/* First Image and Text */}
          <div className="col-span-12 md:col-span-4">
            <div className="w-[300px] h-[400px] mx-auto relative">
              <Image
                src="/range1.png"
                alt="Range 1"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </div>
            <h1 className="mt-4 text-center font-bold text-md md:text-2xl">
              Dining
            </h1>
          </div>

          {/* Second Image and Text */}
          <div className="col-span-12 md:col-span-4">
            <div className="w-[300px] h-[400px] mx-auto relative">
              <Image
                src="/range2.png"
                alt="Range 2"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </div>
            <h1 className="mt-4 text-center font-bold text-md md:text-2xl">
              Living
            </h1>
          </div>

          {/* Third Image and Text */}
          <div className="col-span-12 md:col-span-4">
            <div className="w-[300px] h-[400px] mx-auto relative">
              <Image
                src="/range3.png"
                alt="Range 3"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </div>
            <h1 className="mt-4 text-center font-bold text-md md:text-2xl">
              Bedroom
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
