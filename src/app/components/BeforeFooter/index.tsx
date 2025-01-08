import Image from "next/image";

export default function BeforeFooter() {
    return (
        <div>
            <div className="grid grid-cols-12 bg-[#FAF3EA] py-16 px-12 gap-y-8 md:px-16 mt-16">
                <div className="col-span-12 md:col-span-3">
                    <Image 
                    src={"/f1.png"}
                    alt="Image 1"
                    width={337}
                    height={70}
                    />
                </div>
                <div className="col-span-12 md:col-span-3">
                <Image 
                    src={"/f2.png"}
                    alt="Image 2"
                    width={328}
                    height={70}
                    />
                </div>
                <div className="col-span-12 md:col-span-3">
                <Image 
                    src={"/f3.png"}
                    alt="Image 3"
                    width={244}
                    height={70}
                    />
                </div>
                <div className="col-span-12 md:col-span-3">
                <Image 
                    src={"/f4.png"}
                    alt="Image 4"
                    width={259}
                    height={70}
                    />
                </div>
            </div>
        </div>
    )
}