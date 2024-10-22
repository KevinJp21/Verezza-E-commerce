import { useState } from 'react';
import { useFetcher } from "@remix-run/react";
import { useTranslation } from 'react-i18next';
import { useCountries } from '~/hooks/Countries';
import './RegisterPage.css';

interface CustomerCreateResponse {
  CreateCustomerErrors: Array<{
    message: string;
    code: string;
    field: string;
  }>;

  UpdateCustomerErrors: Array<{
    message: string;
    code: string;
    field: string;
  }>;
}

export default function RegisterPage() {
  const { t } = useTranslation();
  const countries = useCountries();
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
    province: '',
    address1: '',
    zip: '',
    acceptsMarketing: false,
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setCustomerData({
      ...customerData,
      [name]: type === 'checkbox' ? checked : value,
    });
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
          return (!/^\d{7,}$/.test(value as string)) ? validationErrors.push(t("register.error.phone")) : '';
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
        case 'province':
          return (!value) ? validationErrors.push(t("register.error.province")) : '';
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
        {fetcher.data && fetcher.data.CreateCustomerErrors && fetcher.data.CreateCustomerErrors.length > 0 && (
          <p className='ErrorMsg'>
            {fetcher.data.CreateCustomerErrors[0].code === 'TAKEN'
              ? t("register.error.emailTaken")
              : t("register.error")}
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

              autoComplete="on"
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

              autoComplete="on"
              placeholder='example@gmail.com'
            />
          </div>
          <div className='InputContainer'>
            <label>contraseña</label>
            <input
              type="password"
              name="password"
              value={customerData.password}
              onChange={handleChange}

              autoComplete="on"
            />
          </div>
        </div>
        <div className="formGroup">
          <div className='InputContainer'>
            <label>{t("register.identification_type")}</label>
            <input
              type="text"
              name="identificationType"
              value={customerData.identificationType}
              onChange={handleChange}

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
            <select
              name="country"
              value={customerData.country}

              autoComplete="on"
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
        <button className='btn-secondary' type="submit"><span>{t("register.button")}</span></button>
      </fetcher.Form>
    </section>
  );
}
