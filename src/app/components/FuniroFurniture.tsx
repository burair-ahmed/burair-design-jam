import Image from "next/image";

export default function FuniroFurniture() {
    return (
        <div className="mt-16">

<div className="grid grid-cols-12">
  <div className="col-span-12 mx-auto">
  <h2 className="text-[16px] md:text-[18px] font-extrabold text-[#3A3A3A] md:mb-4 text-center">
  Share your setup with
          </h2>
  <h2 className="text-[28px] md:text-[40px] font-extrabold text-[#3A3A3A] mb-4 text-center">
  #FuniroFurniture
          </h2>
  </div>

</div>
<div className="grid grid-cols-12">
<div className="col-span-12">
  <Image
    src="/masonry.png"
    alt="Masonry"
    width={1780}
    height={720}
    className="w-full h-auto"
  />
</div>
</div>
<div className="grid grid-cols-12">
{/* <div className="col-span-12">
  <Image
    src={"/masonry.png"}
    alt="Masonry"
    layout="fill"
    className="object-cover"
  />
</div> */}

</div>


    
        </div>
    )
}