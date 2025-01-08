import BeforeFooter from "../components/BeforeFooter";
import BillingForm from "../components/BillingForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageHero from "../components/Page-Hero";


export default function Checkout() {
    return (
        <div>
            <Header/>
            <PageHero title="Checkout"/>
                <div className="grid grid-cols-12 md:w-[75%] mx-auto md:gap-12">
                    <div className="md:col-span-6 col-span-12 px-4 mt-12">
                    <h1 className="text-center text-4xl font-semibold">Billing Details</h1>
                        <div className="mt-8">
                        <BillingForm />
                        </div>
                    </div>
                    <div className="md:col-span-6 col-span-12 px-4 mt-8 md:mt-20">
                        <div className="grid grid-cols-12">
                            <div className="col-span-6">
                                <h1 className="text-left text-2xl font-semibold">Product</h1>
                                <div className="space-y-6 mt-6">
                                <h1 className="text-left text-sm font-medium text-[#9F9F9F]">Product <span className="text-black">x 1</span></h1>
                                <h1 className="text-left text-sm font-medium text-black">Subtotal</h1>
                                <h1 className="text-left text-sm font-medium text-black">Total</h1>
                                </div>
                            </div>
                            <div className="col-span-6">
                            <h1 className="text-right text-2xl font-semibold">Subtotal</h1>
                           <div className="mt-6 space-y-6">
                           <h1 className="text-right text-sm font-medium text-black">Rs. 250,000.00</h1>
                            <h1 className="text-right text-sm font-medium text-black">Rs. 250,000.00</h1>
                            <h1 className="text-right text-xl font-semibold text-[#B88E2F]">Rs. 250,000.00</h1>
                           </div>

                            </div>
                        </div>
                        <hr className="mt-8"/>
                        <div className="mt-8">
                        <div className="flex">
    <div className="flex items-center h-5">
        <input id="helper-radio1" aria-describedby="helper-radio-text" type="radio" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    </div>
    <div className="ms-2 text-sm">
        <label className="font-medium text-black">Direct Bank Transfer</label>
        <p id="helper-radio-text" className="text-xs font-normal text-gray-500 dark:text-gray-300">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
    </div>
</div>
                        <div className="flex">
    <div className="flex items-center h-5">
        <input id="helper-radio2" aria-describedby="helper-radio-text" type="radio" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    </div>
    <div className="ms-2 text-sm">
        <label className="font-medium text-black">Cash On Delivery</label>
        <p id="helper-radio-text" className="text-xs font-normal text-gray-500 dark:text-gray-300">Pay with cash upon delivery. Please ensure the exact amount is available as change may not be provided by the delivery personnel.</p>
    </div>
</div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm">
                            Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <b>privacy policy.</b>
                            </p>
                        </div>
                        <div className="flex justify-center mt-10">
                   <button className="rounded-[10px] border-2 text-[20px] border-black text-black px-12 py-4">Place Order</button>

                   </div>
                    </div>
                </div>
            <BeforeFooter/>
            <Footer/>
        </div>
    )
}