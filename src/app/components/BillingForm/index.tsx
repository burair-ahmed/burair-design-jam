import React, { useState } from "react";

interface BillingFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const BillingForm: React.FC<BillingFormProps> = ({ onChange }) => {
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    zipcode: '',
    phone: '',
    email: '',
  });

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const errors = formErrors;

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

    setFormErrors({ ...errors });
    onChange(e); // pass the changes to the parent component
  };

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
              onChange={handleValidation}
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
              className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              onChange={handleValidation}
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
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={handleValidation}
          />
          {formErrors.streetAddress && <p className="text-red-500 text-sm">{formErrors.streetAddress}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="city" className="block text-sm font-semibold text-black mb-4">
            City
          </label>
          <input
            type="text"
            id="city"
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={handleValidation}
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
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={handleValidation}
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
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={handleValidation}
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
            className="mt-1 py-5 block w-full border-[1px] border-[#9F9F9F] rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={handleValidation}
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
            onChange={onChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default BillingForm;
