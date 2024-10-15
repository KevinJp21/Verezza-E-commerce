import { useState } from 'react';
import { useFetcher } from "@remix-run/react";
import { useTranslation } from 'react-i18next';
import './RegisterPage.css';

interface CustomerCreateResponse {
  customerCreate: {
    customer: {
      id: string;
    };
    userErrors: Array<{ message: string }>;
  };
}

export default function RegisterPage() {
  const { t } = useTranslation();
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
    <section className='ContainerRegister'>
      <fetcher.Form onSubmit={handleSubmit} className='FormRegister'>
        <h1>{t("register.title")}</h1>
        <div className="formGroup">
          <div className='InputContainer'>
            <label>{t("register.name")}</label>
            <input
              type="text"
              name="firstName"
              value={customerData.firstName}
              onChange={handleChange}
              required
              autoComplete="on"
            />
          </div>
          <div className='InputContainer'>
            <label>{t("register.last_name")}</label>
            <input
              type="text"
              name="lastName"
              value={customerData.lastName}
              onChange={handleChange}
              required
              autoComplete="on"
            />
          </div>
        </div>

        <div className='InputContainer'>
          <label>{t("register.email")}</label>
          <input
            type="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
            required
            autoComplete="on"
            placeholder='example@gmail.com'
          />
        </div>
        <div className="formGroup">
          <div className='InputContainer'>
            <label>{t("register.identification_type")}</label>
            <input
              type="text"
              name="identificationType"
              value={customerData.identificationType}
              onChange={handleChange}
              required
              autoComplete="on"
              placeholder={t("register.identification_type_placeholder")}
            />
          </div>
          <div className='InputContainer'>
            <label>{t("register.identification_number")}</label>
            <input
              type="text"
              name="identificationNumber"
              value={customerData.identificationNumber}
              onChange={handleChange}
              required
              autoComplete="on"
            />
          </div>
        </div>
        <div className='InputContainer'>
          <label>{t("register.phone")}</label>
          <input
            type="text"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
            required
            autoComplete="on"
            placeholder={t("register.phone_placeholder")}
          />
        </div>
        <div className='InputContainer'>
          <label>{t("register.birthday")}</label>
          <input
            type="date"
            name="birthday"
            value={customerData.birthday}
            onChange={handleChange}
            autoComplete="on"
          />

        </div>
        <div className="formGroup">
          <div className='InputContainer'>
            <label>{t("register.country")}</label>
            <input
              type="text"
              name="country"
              value={customerData.country}
              onChange={handleChange}
              required
              autoComplete="on"
              placeholder={t("register.country_placeholder")}
            />
          </div>

          <div className='InputContainer'>
            <label>{t("register.city")}</label>
            <input
              type="text"
              name="city"
              value={customerData.city}
              onChange={handleChange}
              required
              autoComplete="on"
              placeholder={t("register.city_placeholder")}
            />
          </div>

          <div className='InputContainer'>
            <label>{t("register.province")}</label>
            <input
              type="text"
              name="province"
              value={customerData.province}
              onChange={handleChange}
              required
              autoComplete="on"
              placeholder={t("register.province_placeholder")}
            />
          </div>
        </div>
        <div className="formGroup">
          <div className='InputContainer'>
            <label>{t("register.address")}</label>
            <input
              type="text"
              name="address1"
              value={customerData.address1}
              onChange={handleChange}
              required
              autoComplete="on"
            />
          </div>

          <div className='InputContainer'>
            <label>{t("register.zip")}</label>
            <input
              type="text"
              name="zip"
              value={customerData.zip}
              onChange={handleChange}
              autoComplete="on"
              placeholder='Ej: 131011, 10001, 1000, etc.'
            />
          </div>
        </div>


        <div className='InputContainer CheckboxContainer'>
          <input
            type="checkbox"
            name="acceptsMarketing"
            checked={customerData.acceptsMarketing}
            onChange={handleChange}
          />
          <label>
            {t("register.accepts_marketing")}
          </label>
        </div>
        <button className='btn-secondary' type="submit"><span>{t("register.button")}</span></button>
      </fetcher.Form>
      {fetcher.state === "submitting" && <p>Registrando cliente...</p>}
      {fetcher.data && 'customerCreate' in fetcher.data && (
        <p>Cliente registrado con éxito: {fetcher.data.customerCreate.customer.id}</p>
      )}
      {fetcher.data && 'customerCreate' in fetcher.data && fetcher.data.customerCreate.userErrors.length > 0 && (
        <p>Error: {fetcher.data.customerCreate.userErrors[0].message}</p>
      )}
    </section>
  );
}
