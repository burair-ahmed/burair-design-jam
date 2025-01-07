export default function Footer() {
  return (
    <div>
      <hr />
      <div className="grid grid-cols-12 mx-auto w-10/12 mt-16">
        <div className="col-span-12 md:col-span-4">
          <h1 className="font-black text-[24px]">Funiro.</h1>
          <p className="text-[16px] text-[#9F9F9F] md:mt-14">
            400 University Drive Suite 200 Coral <br />
            Gables,
            <br />
            FL 33134 USA
          </p>
        </div>
        <div className="col-span-12 md:col-span-2">
          <h1 className="mt-12 md:mt-0 text-[#9F9F9F] text-[16px] font-medium">Links</h1>
          <ul className="mt-2 space-y-2 md:space-y-8 font-bold md:mt-16 text-[16px]">
            <li>Home</li>
            <li>Shop</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="col-span-12 md:col-span-2">
          <h1 className="mt-12 md:mt-0 text-[#9F9F9F] text-[16px] font-medium">Help</h1>
          <ul className="mt-2 space-y-2 md:space-y-8 font-bold md:mt-16 text-[16px]">
            <li>Pamyent Options</li>
            <li>Returns</li>
            <li>Privacy Policies</li>
          </ul>
        </div>
        <div className="col-span-12 md:col-span-4">
          <h1 className="mt-12 md:mt-0 text-[#9F9F9F] text-[16px] font-medium">Newsletter</h1>

          <form action="" className="mt-2 space-x-4 md:mt-16">
            <input
              type="email"
              name="Email"
              id=""
              placeholder="Enter Your Email Address"
              className="border-2 border-b-black border-l-0 border-r-0 border-t-0 text-[14px]"
            />
            <button
              type="submit"
              className="text-black border-b-2 border-b-black text-[14px] uppercase font-semibold"
            >
              Subscribe
            </button>
          </form>

        
        </div>
        <hr />
      </div>
      <div>
      <hr className="mx-auto w-10/12"/>
      <div className="mx-auto w-10/12 mt-14 mb-8">
      <p>
            &copy; 2025 Funiro. All rights reserved. | Designed by Burair Ahmed with ♥
          </p>
      </div>
          
      </div>
    </div>
  );
}
