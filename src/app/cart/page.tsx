import Image from "next/image";
import BeforeFooter from "../components/BeforeFooter";
import Footer from "../components/Footer";
import PageHero from "../components/Page-Hero";
import { FaTrash} from "react-icons/fa";

export default function Cart() {
    return (
        <div>
            <PageHero title="Cart" />

            <div className="grid grid-cols-12 w-[90%] gap-x-12 mt-16 mx-auto md:w-[95%]">
                {/* Cart Items Section */}
                <div className="col-span-12 md:col-span-8 px-4 md:px-8">
                    {/* Header Row */}
                    <div className="hidden md:grid grid-cols-12 bg-[#F9F1E7] py-4 px-4 md:px-12 font-semibold">
                        <div className="col-span-3 text-right">Product</div>
                        <div className="col-span-3 text-center">Price</div>
                        <div className="col-span-3 text-right">Quantity</div>
                        <div className="col-span-3 text-center">Subtotal</div>
                    </div>

                    {/* Cart Item */}
                    <div className="grid grid-cols-12 py-4 font-semibold gap-y-4 items-center border-b border-gray-200 md:border-none">
                        <div className="col-span-12 md:col-span-4">
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <Image
                                    src={"/cart-img.png"}
                                    alt="Asgaard sofa"
                                    width={105}
                                    height={105}
                                    className="rounded-lg bg-[#FAF3EA]"
                                />
                                <div className="text-center md:text-left font-medium">Asgaard sofa</div>
                            </div>
                        </div>
                        <div className="col-span-6 md:col-span-3 text-center md:text-right">Rs. 250,000.00</div>
                        <div className="col-span-6 md:col-span-2 text-center md:text-right">
                            <select
                                name="QTY"
                                id=""
                                className="custom-select border-2 border-black rounded-lg w-full md:w-auto"
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="col-span-12 md:col-span-2 text-center md:text-right">Rs. 250,000.00</div>
                        <div className="col-span-12 md:col-span-1 flex justify-center md:justify-end">
                            <FaTrash className="text-[#B88E2F] text-xl" />
                        </div>
                    </div>
                </div>

                {/* Cart Totals Section */}
                <div className="col-span-12 md:col-span-3 bg-[#F9F1E7] py-8 px-6 md:py-12 md:px-12 mt-6 md:mt-0">
                    <h1 className="text-center text-2xl md:text-4xl font-semibold">Cart Totals</h1>
                    <div className="mt-8 space-y-6">
                        <div className="flex justify-between">
                            <span className="font-semibold text-md">Subtotal</span>
                            <span className="font-semibold text-md text-[#9F9F9F]">Rs. 250,000.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-md">Total</span>
                            <span className="font-[500] text-lg text-[#B88E2F]">Rs. 250,000.00</span>
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        <button className="rounded-lg border-2 text-lg md:text-xl border-black text-black px-6 md:px-12 py-2 md:py-4">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>

            <BeforeFooter />
            <Footer />
        </div>
    );
}

