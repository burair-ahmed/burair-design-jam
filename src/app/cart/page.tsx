import Image from "next/image";
import BeforeFooter from "../components/BeforeFooter";
import Footer from "../components/Footer";
import PageHero from "../components/Page-Hero";
import { FaTrash} from "react-icons/fa";
import Header from "../components/Header";

export default function Cart() {
    return (
        <div>
            <Header/>
            <PageHero title="Cart"/>
            
            <div className="grid grid-cols-12 w-[100%] gap-x-8 md:gap-x-12 mt-16 mx-auto">
                <div className="col-span-12 md:col-span-8 px-8">
                    <div className="grid grid-cols-12 bg-[#F9F1E7] py-4 md:px-12 font-semibold">
                        <div className="col-span-3 text-center md:text-right">Product</div>
                        <div className="col-span-3 text-center">Price</div>
                        <div className="col-span-3 text-center md:text-right">Quantity</div>
                        <div className="col-span-3 text-center">Subtotal</div>
                    </div>
                    <div className="grid grid-cols-12 py-4 font-semibold md:gap-x-4 gap-x-2 items-center">
                        <div className="md:col-span-4 col-span-3">
                            <div className="grid grid-cols-12 gap-x-4 mx-auto items-center">
                            <div className="col-span-12 md:col-span-6 md:flex md:justify-end">
                                <Image
                                src={"/cart-img.png"}
                                alt=""
                                width={105}
                                height={105}
                                className="rounded-lg bg-[#FAF3EA] w-[80px] md:w-[105px]"
                                />
                                </div>
                            <div className="col-span-12 md:col-span-6 md:text-center md:pl-4 items-center">Asgaard sofa</div>
                            </div>
                        </div>
                        
                        <div className="col-span-3 text-left md:pl-8">250,000.00</div>
                        <div className="col-span-2 text-right md:pr-12">
                            <select name="QTY" id="" className="custom-select border-2 border-black rounded-lg">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="col-span-2 md:text-center md:pl-8">250,000.00</div>
                        <div className="col-span-2 md:col-span-1 flex justify-end md:pr-8"><FaTrash className="text-[#B88E2F] text-xl"/></div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-3 bg-[#F9F1E7] py-12 mx-auto ">
                <h1 className="text-center text-4xl font-semibold">Cart Totals</h1>
                   <div className="mx-auto">
                   <div className="grid grid-cols-12 px-16 mt-12">
                        <div className="col-span-6"><h1 className="font-semibold text-md">Subtotal</h1></div>
                        <div className="col-span-6 mx-auto"><h1 className="font-semibold text-md text-[#9F9F9F]">Rs. 250,000.00</h1></div>
                    </div>
                    <div className="grid grid-cols-12 px-16 mt-6">
                        <div className="col-span-6 "><h1 className="font-semibold text-md">Total</h1></div>
                        <div className="col-span-6 mx-auto"><h1 className="font-[500] text-lg text-[#B88E2F]">Rs. 250,000.00</h1></div>
                    </div>
                   </div>
                   <div className="flex justify-center mt-10">
                   <button className="rounded-[10px] border-2 text-[20px] border-black text-black px-12 py-4">Checkout</button>

                   </div>
                </div>
            </div>

            <BeforeFooter/>
            <Footer/>
        </div>
    )
}
