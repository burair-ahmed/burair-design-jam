interface BillingFormProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  }
  
  const  BillingForm: React.FC<BillingFormProps> = ({ onChange }) =>  {
    return (
        <div>
                <form>

    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
        <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-black mb-4">
                First Name
            </label>
            <input
                type="text"
                id="firstName"
                className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                onChange={onChange}

            />
        </div>
        <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-black mb-4">
                Last Name
            </label>
            <input
                type="text"
                id="lastName"
                className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                onChange={onChange}

            />
        </div>
    </div>
    <div className="mb-6">
        <label htmlFor="companyName" className="block text-sm font-semibold text-black mb-4">
            Company Name (Optional)
        </label>
        <input
            type="text"
            id="companyName"
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={onChange}

        />
    </div>
    <div className="mb-6">
        <label htmlFor="country" className="block text-sm font-semibold text-black mb-4">
            Country/Region
        </label>
        <select
            id="country"
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={onChange}

        >
            <option value="usa">United States</option>
            <option value="canada">Canada</option>
            <option value="uk">United Kingdom</option>
        </select>
    </div>
    <div className="mb-6">
        <label htmlFor="streetAddress" className="block text-sm font-semibold text-black mb-4">
            Street Address
        </label>
        <input
            type="text"
            id="streetAddress"
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={onChange}

       />
    </div>
    <div className="mb-6">
        <label htmlFor="city" className="block text-sm font-semibold text-black mb-4">
            Town/City
        </label>
        <input
            type="text"
            id="city"
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={onChange}
            />
    </div>

    <div className="mb-6">
        <label htmlFor="province" className="block text-sm font-semibold text-black mb-4">
            Province
        </label>
        <input
            type="text"
            id="province"
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={onChange}
            />
    </div>

    <div className="mb-6">
        <label htmlFor="zipcode" className="block text-sm font-semibold text-black mb-4">
            Zipcode
        </label>
        <input
            type="text"
            id="zipcode"
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={onChange}
            />
    </div>

    <div className="mb-6">
        <label htmlFor="phone" className="block text-sm font-semibold text-black mb-4">
            Phone
        </label>
        <input
            type="tel"
            id="phone"
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={onChange}
/>
    </div>

    <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-semibold text-black mb-4">
            Email Address
        </label>
        <input
            type="email"
            id="email"
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={onChange}
/>
    </div>

    <div className="mb-6">
        <label htmlFor="additionalInfo" className="block text-sm font-semibold text-black mb-4">
            Additional Information
        </label>
        <textarea
            id="additionalInfo"
            rows={1}
            placeholder="Additional Information"
            className="mt-1 py-5 px-4 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={onChange}
        ></textarea>
    </div>
</form>

        </div>
    )
}

export default BillingForm;
