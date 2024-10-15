import { useState } from 'react';
import { useFetcher } from "@remix-run/react";

// Definimos una interfaz para la respuesta
interface CustomerCreateResponse {
  customerCreate: {
    customer: {
      id: string;
    };
    userErrors: Array<{ message: string }>;
  };
}

export default function AccountRegister() {
  const fetcher = useFetcher<CustomerCreateResponse>();
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: '',
    identificationType: '',
    identificationNumber: '',
    address1: '',
    city: '',
    country: '',
    zip: '',
    province: '',
    acceptsMarketing: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCustomerData({
      ...customerData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetcher.submit(
      { json: JSON.stringify(customerData) },
      { 
        method: "post", 
        action: "/api/registerCustomer",
        encType: "application/json"
      }
    );
  };

  return (
    <div>
      <h1>Registro</h1>
      <fetcher.Form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={customerData.firstName}
            onChange={handleChange}
            required
            autoComplete="on"
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={customerData.lastName}
            onChange={handleChange}
            required
            autoComplete="on"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
            required
            autoComplete="on"
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
            required
            autoComplete="on"
          />
        </div>
        <div>
          <label>Birthday:</label>
          <input
            type="date"
            name="birthday"
            value={customerData.birthday}
            onChange={handleChange}
            autoComplete="on"
          />
          
        </div>
        <div>
          <label>Identification Type:</label>
          <input
            type="text"
            name="identificationType"
            value={customerData.identificationType}
            onChange={handleChange}
            required
            autoComplete="on"
          />
        </div>
        <div>
          <label>Identification Number:</label>
          <input
            type="text"
            name="identificationNumber"
            value={customerData.identificationNumber}
            onChange={handleChange}
            required
            autoComplete="on"
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={customerData.country}
            onChange={handleChange}
            required
            autoComplete="on"
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={customerData.city}
            onChange={handleChange}
            required
            autoComplete="on"
          />
        </div>
        <div>
          <label>Province:</label>
          <input
            type="text"
            name="province"
            value={customerData.province}
            onChange={handleChange}
            required
            autoComplete="on"
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address1"
            value={customerData.address1}
            onChange={handleChange}
            required
            autoComplete="on"
          />
        </div>
        <div>
          <label>ZIP:</label>
          <input
            type="text"
            name="zip"
            value={customerData.zip}
            onChange={handleChange}
            autoComplete="on"
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="acceptsMarketing"
              checked={customerData.acceptsMarketing}
              onChange={handleChange}
            />
            Accepts Marketing
          </label>
        </div>
        <button type="submit">Registrar</button>
      </fetcher.Form>
      {fetcher.state === "submitting" && <p>Registrando cliente...</p>}
      {fetcher.data && 'customerCreate' in fetcher.data && (
        <p>Cliente registrado con éxito: {fetcher.data.customerCreate.customer.id}</p>
      )}
      {fetcher.data && 'customerCreate' in fetcher.data && fetcher.data.customerCreate.userErrors.length > 0 && (
        <p>Error: {fetcher.data.customerCreate.userErrors[0].message}</p>
      )}
    </div>
  );
}
