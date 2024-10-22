import { useState, useEffect } from 'react';
import { useFetcher } from "@remix-run/react";
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '~/components/loadingSpinner/loadingSpinner';
import './LoginPage.css';

interface CustomerLoginResponse {
    message: string;
   errors: {
    field: string;
    code: string;
    message: string;
   }[];
}

export default function LoginPage() {
    const { t } = useTranslation();
    const fetcher = useFetcher<CustomerLoginResponse>();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const loading = fetcher.state === 'submitting';


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetcher.submit(
            { json: JSON.stringify(loginData) },
            {
                method: "post",
                action: "/api/loginCustomer",
                encType: "application/json"
            }
        );
    };

    return (
        <section className='ContainerLogin'>
            <fetcher.Form onSubmit={handleSubmit} className='FormLogin'>
                <h1>{t("login.title")}</h1>
                {fetcher.data && fetcher.data.errors && fetcher.data.errors.length > 0 && (
                    <p className='ErrorMsg'>
                        {fetcher.data.errors[0].code === 'UNIDENTIFIED_CUSTOMER'
                            ? t("login.unidentifiedCustomer")
                            : t("login.error")}
                    </p>
                )}
                <div className='InputContainer'>
                    <label>{t("login.email")}</label>
                    <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                        autoComplete="on"
                        placeholder='example@gmail.com'
                    />
                </div>
                <div className='InputContainer'>
                    <label>{t("login.password")}</label>
                    <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                        autoComplete="on"
                    />
                </div>
                <div className='RecoveryPassword'>
                    <a href='/account/recover'>{t("login.recoveryPassword")}</a>
                </div>
                <button className='btn-secondary' type="submit"><span>{t("login.button")}</span></button>
            </fetcher.Form>
            {loading && <LoadingSpinner isLoading={loading}/>}
        </section>
    );
}
