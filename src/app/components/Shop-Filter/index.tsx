import Image from "next/image";

interface shopFilterProps {
  NoOfItems: string;
  currentPage: number;
  productsPerPage: number;
  productsPerPageOptions: number[];
  handleProductsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ShopFilter({NoOfItems, currentPage, productsPerPage, productsPerPageOptions, handleProductsPerPageChange,} : shopFilterProps) {

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const startProduct = indexOfFirstProduct + 1;
  const endProduct = Math.min(indexOfLastProduct, parseInt(NoOfItems));

  return (
    <div className="bg-[#F9F1E7] py-8">
      <div className="grid grid-cols-10 w-[90%] gap-2 mx-auto flex items-center justify-center">
        <div className="col-span-10 md:col-span-1">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6">
              <div className="grid grid-cols-12">
                <div className="col-span-4 flex justify-center items-center">
                  <Image
                    src={"/filtericon1.png"}
                    alt="Filter Icon"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="col-span-8 flex justify-start items-center">
                  <h1 className="text-[20px]">Filters</h1>
                </div>
              </div>
            </div>

            <div className="col-span-4 flex justify-center items-center">
              <Image
                src={"/filtericon2.png"}
                alt="Filter Icon"
                width={20}
                height={20}
              />
            </div>
            <div className="col-span-2 flex justify-center items-center">
              <Image
                src={"/filtericon3.png"}
                alt="Filter Icon"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
        <div className="col-span-10 md:col-span-2 md:border-l-2 md:border-[#9F9F9F] flex justify-center items-center pl-6">
          <h1 className="text-[16px]">Showing {startProduct}–{endProduct} of {NoOfItems} results</h1>
        </div>
        <div className="col-span-4"></div>

        <div className="col-span-10 md:col-span-3">
          <div className="grid grid-cols-12">
            <div className="col-span-6 md:col-span-3">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-2 flex justify-start items-center">
                  <h1 className="text-[20px]">Show</h1>
                </div>
                <div className="col-span-8 flex ">
                <select
  name="productsPerPage"
  id="productsPerPage"
  className="text-md custom-select"
  value={productsPerPage}
  onChange={(e) => handleProductsPerPageChange(e)} // Trigger parent handler
>
  {productsPerPageOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ))}
</select>
                </div>
              </div>
            </div>
            <div className="col-span-6 md:col-span-6">
              <div className="grid grid-cols-12">
                <div className="col-span-5 md:col-span-4 items-center">
                  <h1 className="text-[20px]">Sort By</h1>
                </div>
                <div className="col-span-2 flex ">
                  <select name="" id="" className="text-md custom-select">
                    <option value="08">08</option>
                    <option value="16">16</option>
                    <option value="24">24</option>
                    <option value="32">32</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
