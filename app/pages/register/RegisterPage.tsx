import { useEffect, useState } from 'react';
import { useFetcher } from "@remix-run/react";
import { useTranslation } from 'react-i18next';
import phonePrefix from '~/utils/PhonePrefix';
import './RegisterPage.css';
import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from 'libphonenumber-js';

interface CustomerCreateResponse {
  message: string;
  customerId: string;

  CreateCustomerErrors: Array<{
    message: string;
    code: string;
    field: string[];
  }>;

  UpdateCustomerErrors: Array<{
    message: string;
    code: string;
    field: string[];
  }>;

}

export default function RegisterPage() {
  const { t } = useTranslation();
  const [countries, setCountries] = useState<Array<{ name: string; isoCode: string }>>([]);
  const fetcher = useFetcher<CustomerCreateResponse>();
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    identificationType: '',
    identificationNumber: '',
    phone: '',
    birthday: '',
    country: '',
    city: '',
    address1: '',
    zip: '',
    acceptsMarketing: false,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedPrefix, setSelectedPrefix] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === 'phonePrefix') {
      setSelectedPrefix(value);
      if (e.target instanceof HTMLSelectElement) {
        setSelectedCountry(e.target.options[e.target.selectedIndex].getAttribute('data-country') || '');
      }
      setCustomerData({
        ...customerData,
        phone: value + phoneNumber,
      });
    } else if (name === 'phone') {
      const newPhoneNumber = value.replace(/\D/g, '');
      setPhoneNumber(newPhoneNumber);
      setCustomerData({
        ...customerData,
        phone: selectedPrefix + newPhoneNumber,
      });
    } else {
      setCustomerData({
        ...customerData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
    setErrors([]);
  };
  const validateFields = () => {
    let validationErrors: string[] = [];

    Object.entries(customerData).forEach(([key, value]) => {
      switch (key) {
        case 'firstName':
          if (!value) {
            validationErrors.push(t("register.error.firstName"));
          } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value as string)) {
            validationErrors.push(t("register.error.firstName")); // Agrega un mensaje para nombres no válidos
          }
          break;
        case 'lastName':
          if (!value) {
            validationErrors.push(t("register.error.lastName"));
          } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value as string)) {
            validationErrors.push(t("register.error.invalidLastName")); // Agrega un mensaje para apellidos no válidos
          }
          break;
        case 'email':
          return (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value as string)) ? validationErrors.push(t("register.error_email")) : '';
        case 'password':
          return ((value as string).length < 8) ? validationErrors.push(t("register.error.password")) : '';
        case 'identificationType':
          return (!value) ? validationErrors.push(t("register.error.identificationType")) : '';
        case 'identificationNumber':
          return (!value) ? validationErrors.push(t("register.error.identificationNumber")) : '';
        case 'phone':
          if (!selectedPrefix || !phoneNumber) {
            validationErrors.push(t("register.error.phone"));
          } else {
            const fullPhoneNumber = selectedPrefix + phoneNumber;
            if (!isValidPhoneNumber(fullPhoneNumber, selectedCountry as CountryCode)) {
              validationErrors.push(t("register.error.phone"));
            }
          }
        case 'birthday':
          if (!value) {
            validationErrors.push(t("register.error.birthday"));
          } else {
            const birthday = new Date(value as string);
            const age = new Date().getFullYear() - birthday.getFullYear();
            const isBeforeBirthdayThisYear =
              new Date().setFullYear(new Date().getFullYear()) < birthday.setFullYear(new Date().getFullYear());
            const actualAge = isBeforeBirthdayThisYear ? age - 1 : age;

            if (isNaN(birthday.getTime())) {
              validationErrors.push(t("register.error.birthday"));
            } else if (actualAge < 18) {
              validationErrors.push(t("register.error.birthday"));
            }
          }
          break;
        case 'country':
          return (!value) ? validationErrors.push(t("register.error.country")) : '';
        case 'city':
          return (!value) ? validationErrors.push(t("register.error.city")) : '';
        case 'address1':
          return (!value) ? validationErrors.push(t("register.error.address1")) : '';
        case 'zip':
          return (!value) ? validationErrors.push(t("register.error.zip")) : '';
        default:
          break;
      }
    });

    return validationErrors;
  };

  const loading = fetcher.state === 'submitting';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateFields();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      fetcher.submit(
        { json: JSON.stringify(customerData) },
        {
          method: "post",
          action: "/api/registerCustomer",
          encType: "application/json"
        }
      );
    }
  };

  useEffect(() => {
    if (fetcher.data?.customerId) {
      window.location.href = `/account/auth/login`;
    }
  }, [fetcher.data?.customerId]);

  //Get countries
  useEffect(() => {
    const fetchCountries = async () => {
      try{
        const response = await fetch('/api/getAvailableCountries');
        const data = await response.json();
        setCountries(data.localization.availableCountries);
      } catch (error) {
        console.error('Error al obtener los países:', error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <section className='ContainerRegister'>
      <fetcher.Form onSubmit={handleSubmit} className='FormRegister'>
        <h1>{t("register.title")}</h1>
        {errors.length > 0 && (
          <p className='ErrorMsg'>
            {
              <span>{errors[0]}<br /></span>
            }
          </p>
        )}
        {fetcher.data && (
          <p className='ErrorMsg'>
            {fetcher.data && fetcher.data.CreateCustomerErrors && fetcher.data.CreateCustomerErrors.length > 0
              ? (fetcher.data.CreateCustomerErrors[0].code === 'TAKEN' &&
                fetcher.data.CreateCustomerErrors[0].field.includes('email')
                ? t("register.error.emailTaken")
                : fetcher.data.CreateCustomerErrors[0].code === 'TAKEN' &&
                  fetcher.data.CreateCustomerErrors[0].field.includes('phone')
                  ? t("register.error.phoneTaken")
                  : t("register.error.errorRegister"))
              : fetcher.data && fetcher.data.message
                ? t("register.error.errorRegister")
                : ''}
          </p>
        )}
        <div className="formGroup">
          <div className='InputContainer'>
            <label>{t("register.name")}</label>
            <input
              type="text"
              name="firstName"
              value={customerData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className='InputContainer'>
            <label>{t("register.last_name")}</label>
            <input
              type="text"
              name="lastName"
              value={customerData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="formGroup">
          <div className='InputContainer'>
            <label>{t("register.email")}</label>
            <input
              type="email"
              name="email"
              value={customerData.email}
              onChange={handleChange}
              placeholder='example@gmail.com'
            />
          </div>
          <div className='InputContainer'>
            <label>{t("register.password")}</label>
            <input
              type="password"
              name="password"
              value={customerData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="formGroup">
          <div className='InputContainer'>
            <label>{t("register.identification_type")}</label>
            <input
              type="text"
              name="identificationType"
              value={customerData.identificationType.toUpperCase()}
              onChange={handleChange}
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
            />
          </div>
        </div>
        <div className="formGroup">
          <div className='InputContainer'>
            <label>{t("register.phone")}</label>
            <div className="phone-input-container">
              <input
                type="tel"
                name="phone"
                value={phoneNumber}
                onChange={handleChange}
                placeholder={t("register.phone_placeholder")}
                className="phone-input"
              />
            </div>
          </div>
          <div className="InputContainer">
            <label>{t("register.prefix")}</label>
            <select
              name="phonePrefix"
              value={selectedPrefix}
              onChange={handleChange}
              className="phone-prefix-select"
            >
              <option value="">{t("register.select_prefix")}</option>
              {phonePrefix.map((country) => (
                <option
                  key={country.code}
                  value={`+${country.phoneNumberPrefix}`}
                  data-country={country.code}
                >
                  {country.name} (+{country.phoneNumberPrefix})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='InputContainer'>
          <label>{t("register.birthday")}</label>
          <input
            type="date"
            name="birthday"
            value={customerData.birthday}
            onChange={handleChange}
          />

        </div>
        <div className="formGroup">
          <div className='InputContainer'>
            <label>{t("register.country")}</label>
            <select
              name="country"
              value={customerData.country}
              onChange={handleChange}
            >
              <option value="">{t("register.choose_country")}</option>
              {countries.map((country, index) => (
                <option key={index} value={country.isoCode}>{country.name}</option>
              ))}
            </select>
          </div>

          <div className='InputContainer'>
            <label>{t("register.city")}</label>
            <input
              type="text"
              name="city"
              value={customerData.city}
              onChange={handleChange}
              placeholder={t("register.city_placeholder")}
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
            />
          </div>

          <div className='InputContainer'>
            <label>{t("register.zip")}</label>
            <input
              type="text"
              name="zip"
              value={customerData.zip}
              onChange={handleChange}
              placeholder='Ej: 131011, 10001, 1000, etc.'
            />
          </div>
        </div>


        <div className='InputContainer '>
          <label className='CheckboxContainer'>
            <input
              type="checkbox"
              name="acceptsMarketing"
              checked={customerData.acceptsMarketing}
              onChange={handleChange}
            />
            <span>{t("register.accepts_marketing")}</span>
          </label>
        </div>
        <button className='btn-secondary' type="submit" disabled={loading}><span>{t("register.button")}</span></button>
      </fetcher.Form>
    </section>
  );
}
