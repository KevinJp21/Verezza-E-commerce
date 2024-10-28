import { useState, useEffect } from 'react';
import { useFetcher } from "@remix-run/react";
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '~/components/loadingSpinner/loadingSpinner';
import './LoginRecover.css';

interface CustomerRecoverResponse {
    message: string;
    error: string;
   errors: {
    field: string;
    code: string;
    message: string;
   }[];
}

export default function LoginRecover() {
    const { t } = useTranslation();
    const fetcher = useFetcher<CustomerRecoverResponse>();
    const [loginRecoverData, setLoginRecoverData] = useState({
        email: '',
    });
    const [errors, setErrors] = useState<string>('');

    const loading = fetcher.state === 'submitting';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginRecoverData({
            ...loginRecoverData,
            [name]: value,
        });
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors('');

        // Validación del email
        if (!loginRecoverData.email.trim()) {
            setErrors(t('loginRecover.emailRequired'));
            return;
        }

        if (!validateEmail(loginRecoverData.email)) {
            setErrors(t('loginRecover.invalidEmail'));
            return;
        }

        fetcher.submit(
            { json: JSON.stringify(loginRecoverData) },
            {
                method: "post",
                action: "/api/LoginRecoveryPassword",
                encType: "application/json"
            }
        );
    };

    return (
        <section className='ContainerLogin'>
            <fetcher.Form onSubmit={handleSubmit} className='FormLogin'>
                <h1>{t('loginRecover.title')}</h1>
                <p className='LoginRecoverText'>{t('loginRecover.text')}</p>
                {errors && <p className='ErrorMsg'>{errors}</p>}
                {fetcher.data && (
                    <p className={`${fetcher.data.errors ? 'ErrorMsg' : fetcher.data.error ? 'ErrorMsg' : 'SuccessMsg'}`}>
                        {fetcher.data.errors?.[0]?.code === 'UNIDENTIFIED_CUSTOMER'
                            ? t('loginRecover.unidentifiedCustomer')
                            : fetcher.data.message === 'EMAIL_SENT_SUCCESSFULLY'
                            ? t('loginRecover.emailSentSuccessfully')
                            : t('loginRecover.error')}
                    </p>
                )}
                <div className='InputContainer'>
                    <label>{t('loginRecover.emailLabel')}</label>
                    <input
                        type="email"
                        name="email"
                        value={loginRecoverData.email}
                        onChange={handleChange}
                        placeholder={t('loginRecover.emailPlaceholder')}
                    />
                </div>
                <div className='LoginLink'>
                    <a href='/account/auth/login'>{t('loginRecover.alreadyHaveAccount')}</a>
                </div>
                <button className='btn-secondary' type="submit"><span>{t('loginRecover.button')}</span></button>
            </fetcher.Form>
            {loading && <LoadingSpinner isLoading={loading}/>}
        </section>
    );
}
