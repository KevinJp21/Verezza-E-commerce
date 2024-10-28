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
            setErrors('El correo electrónico es requerido');
            return;
        }

        if (!validateEmail(loginRecoverData.email)) {
            setErrors('Por favor ingresa un correo electrónico válido');
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
                <h1>Restablecer tu contraseña</h1>
                <p className='LoginRecoverText'>Te enviaremos un correo electrónico para restablecer tu contraseña</p>
                {errors && <p className='ErrorMsg'>{errors}</p>}
                {fetcher.data && (
                    <p className={`${fetcher.data.errors ? 'ErrorMsg' : fetcher.data.error ? 'ErrorMsg' : 'SuccessMsg'}`}>
                        {fetcher.data.errors?.[0]?.code === 'UNIDENTIFIED_CUSTOMER'
                            ? "Correo no registrado"
                            : fetcher.data.message === 'EMAIL_SENT_SUCCESSFULLY'
                            ? "Se ha enviado un correo para restablecer tu contraseña"
                            : "Ha ocurrido un error, por favor intente más tarde"}
                    </p>
                )}
                <div className='InputContainer'>
                    <label>Correo</label>
                    <input
                        type="email"
                        name="email"
                        value={loginRecoverData.email}
                        onChange={handleChange}
                        placeholder='example@gmail.com'
                    />
                </div>
                <div className='LoginLink'>
                    <a href='/account/auth/login'>¿Ya tienes una cuenta? Inicia sesión</a>
                </div>
                <button className='btn-secondary' type="submit"><span>Restablecer contraseña</span></button>
            </fetcher.Form>
            {loading && <LoadingSpinner isLoading={loading}/>}
        </section>
    );
}
