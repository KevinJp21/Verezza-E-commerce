import { useState } from 'react';
import { useFetcher } from "@remix-run/react";
import { useTranslation } from 'react-i18next';
import './LoginPage.css';

interface CustomerLoginResponse {
    customerAccessTokenCreate: {
        customerAccessToken: {
            accessToken: string;
            expiresAt: string;
        };
        customerUserErrors: Array<{ message: string }>;
    };
}

export default function LoginPage() {
    const { t } = useTranslation();
    const fetcher = useFetcher<CustomerLoginResponse>();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

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

    const handleLogout = () => {
        fetcher.submit(
            null,
            {
                method: "post",
                action: "/api/logOutCustomer",
                encType: "application/json"
            }
        );
    };
    return (
        <section className='ContainerLogin'>
            <fetcher.Form onSubmit={handleSubmit} className='FormLogin'>
                <h1>{t("login.title")}</h1>
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
            {fetcher.state === "submitting" && <p>{t("login.submitting")}</p>}
            {fetcher.data && 'customerAccessTokenCreate' in fetcher.data && (
                <p>Cliente logeado con éxito: {fetcher.data.customerAccessTokenCreate.customerAccessToken.accessToken}</p>
            )}
            {fetcher.data && 'customerAccessTokenCreate' in fetcher.data && fetcher.data.customerAccessTokenCreate.customerUserErrors.length > 0 && (
                <p>Error: {fetcher.data.customerAccessTokenCreate.customerUserErrors[0].message}</p>
            )}
            {/*Boton cerrar sesión <button onClick={handleLogout} className='btn-secondary' type="submit"><span>Cerrar sesion</span></button> */}
        </section>
    );
}
