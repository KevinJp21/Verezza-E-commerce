import { useState } from 'react';
import registerCustomer from '~/api/RegisterCustomer';

export default function AccountRegister() {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
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

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setCustomerData({
      ...customerData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
        const formattedData = {
            ...customerData,
            birthday: customerData.birthday ? new Date(customerData.birthday).toISOString().split('T')[0] : '',
          };
      const customer = await registerCustomer(formattedData);
      alert('Customer registered successfully: ' + customer.id); // O muestra la info que quieras
    } catch (error) {
      console.error(error);
      alert('Error registering customer: ' + error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
