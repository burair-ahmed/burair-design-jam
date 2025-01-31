import React, { useState } from "react";

interface BillingFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  billingData: any;
  shippingData: any;
  isShippingSame: boolean;
  setShippingData: React.Dispatch<React.SetStateAction<any>>;
  setIsShippingSame: React.Dispatch<React.SetStateAction<boolean>>;
}

const BillingForm: React.FC<BillingFormProps> = ({
  onChange,
  billingData,
  shippingData,
  isShippingSame,
  setShippingData,
  setIsShippingSame
}) => {
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    stateProvince: '',
    city: '',
    zipcode: '',
    phone: '',
    email: '',
  });

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const errors = { ...formErrors };

    switch (id) {
      case 'firstName':
        errors.firstName = value.trim() === '' ? 'First Name is required' : '';
        break;
      case 'lastName':
        errors.lastName = value.trim() === '' ? 'Last Name is required' : '';
        break;
      case 'streetAddress':
        errors.streetAddress = value.trim() === '' ? 'Street Address is required' : '';
        break;
      case 'stateProvince':
        errors.stateProvince = value.trim() === '' ? 'State Province is required' : '';
        break;
      case 'city':
        errors.city = value.trim() === '' ? 'City is required' : '';
        break;
      case 'zipcode':
        errors.zipcode = value.trim() === '' ? 'Zipcode is required' : '';
        break;
      case 'phone':
        errors.phone = value.trim() === '' ? 'Phone is required' : '';
        break;
      case 'email':
        errors.email = value.trim() === '' ? 'Email is required' : '';
        break;
      default:
        break;
    }

    setFormErrors(errors);
    if (!isShippingSame || (id !== 'firstName1' && id !== 'lastName1')) {
      onChange(e);
    }
  };

  const handleShippingCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsShippingSame(e.target.checked);
    if (e.target.checked) {
      setShippingData(billingData); 
    }
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setShippingData({ ...shippingData, [id]: value });
  };

  return (
    <div>

      <form>

         <div className="mb-6">
          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={isShippingSame}
              onChange={handleShippingCheckboxChange}
            />
            Use Billing Address as Shipping Address
          </label>
        </div>

        <h3 className="font-semibold mb-4">Billing Information</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-black mb-4">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={billingData.firstName || ""}
              onChange={handleValidation}
              className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-black mb-4">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={billingData.lastName || ""}
              onChange={handleValidation}
              className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="streetAddress" className="block text-sm font-semibold text-black mb-4">
            Street Address
          </label>
          <input
            type="text"
            id="streetAddress"
            value={billingData.streetAddress || ""}
            onChange={handleValidation}
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {formErrors.streetAddress && <p className="text-red-500 text-sm">{formErrors.streetAddress}</p>}
        </div>
      
        <div className="mb-6">
          <label htmlFor="stateProvince" className="block text-sm font-semibold text-black mb-4">
            State Province
          </label>
          <input
            type="text"
            id="stateProvince"
            value={billingData.stateProvince || ""}
            onChange={handleValidation}
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {formErrors.stateProvince && <p className="text-red-500 text-sm">{formErrors.stateProvince}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="city" className="block text-sm font-semibold text-black mb-4">
            City
          </label>
          <input
            type="text"
            id="city"
            value={billingData.city || ""}
            onChange={handleValidation}
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="zipcode" className="block text-sm font-semibold text-black mb-4">
            Zipcode
          </label>
          <input
            type="text"
            id="zipcode"
            value={billingData.zipcode || ""}
            onChange={handleValidation}
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {formErrors.zipcode && <p className="text-red-500 text-sm">{formErrors.zipcode}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-semibold text-black mb-4">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={billingData.phone || ""}
            onChange={handleValidation}
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-semibold text-black mb-4">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={billingData.email || ""}
            onChange={handleValidation}
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
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
            onChange={onChange || ""}
          ></textarea>
        </div>

       
        {!isShippingSame && (
          <>
            <h3 className="font-semibold mb-4">Shipping Information</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="shippingFirstName" className="block text-sm font-semibold text-black mb-4">
                  Shipping First Name
                </label>
                <input
                  type="text"
                  id="shippingFirstName"
                  value={shippingData.firstName || ""}
                  onChange={handleShippingChange}
                  className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="shippingLastName" className="block text-sm font-semibold text-black mb-4">
                  Shipping Last Name
                </label>
                <input
                  type="text"
                  id="shippingLastName"
                  value={shippingData.lastName || ""}
                  onChange={handleShippingChange}
                  className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="shippingStreetAddress" className="block text-sm font-semibold text-black mb-4">
                Shipping Street Address
              </label>
              <input
                type="text"
                id="shippingStreetAddress"
                value={shippingData.streetAddress || ""}
                onChange={handleShippingChange}
                className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="shippingCity" className="block text-sm font-semibold text-black mb-4">
                Shipping City
              </label>
              <input
                type="text"
                id="shippingCity"
                value={shippingData.city || ""}
                onChange={handleShippingChange}
                className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="shippingZipcode" className="block text-sm font-semibold text-black mb-4">
                Shipping Zipcode
              </label>
              <input
                type="text"
                id="shippingZipcode"
                value={shippingData.zipcode || ""}
                onChange={handleShippingChange}
                className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="shippingPhone" className="block text-sm font-semibold text-black mb-4">
                Shipping Phone
              </label>
              <input
                type="tel"
                id="shippingPhone"
                value={shippingData.phone || ""}
                onChange={handleShippingChange}
                className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="shippingEmail" className="block text-sm font-semibold text-black mb-4">
                Shipping Email Address
              </label>
              <input
                type="email"
                id="shippingEmail"
                value={shippingData.email || ""}
                onChange={handleShippingChange}
                className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
          </>
          
        )}
      </form>
    </div>
  );
};

export default BillingForm;
