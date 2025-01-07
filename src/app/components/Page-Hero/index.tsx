import Link from "next/link";

interface PageHeroProps {
    title: string;
  }
  
  export default function PageHero({ title }: PageHeroProps) {
    const pageurl = title.toLowerCase().replace(/\s+/g, '-') 
    return (
      <div>
        <div className="relative grid grid-cols-12 bg-[url('/background-shop.jpg')] py-[158px] bg-center">
          <div className="absolute inset-0 bg-white bg-opacity-50"></div>
          <div className="relative col-span-12 flex-row items-center justify-center">
            <h1 className="text-center text-5xl font-bold">{title}</h1>
            <div className="relative flex space-x-4 mt-4 items-center justify-center">
                <h1 className="font-bold"><Link href="/">Home</Link></h1>
                <h1 className="font-bold">&gt;</h1>
                <h1 className="font-bold"><Link href={`/${pageurl}`}>{title}</Link></h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  