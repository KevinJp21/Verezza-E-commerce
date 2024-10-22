import { useState, useEffect } from 'react';
import { useAuthStatus } from '~/hooks/authStatus';
import { useFetcher } from '@remix-run/react';
import './CustomerDropdown.css';

interface CustomerDropdownProps {
    isDropdownOpen: boolean;
}

export const CustomerDropdown: React.FC<CustomerDropdownProps> = ({ isDropdownOpen }) => {
    const isLogged = useAuthStatus();
    const fetcher = useFetcher();
    const loading = fetcher.state === "submitting";

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

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            window.location.reload();
        }
    }, [fetcher.state, fetcher.data]);

    return (
        (isDropdownOpen) ? (
            <div className="customerDropdownContainer">
                {isLogged ? (
                    <ul className="customerDropdownContent">
                        <li className="customerDropdownItem">
                            <a href="/account/profile">
                                <span>MI CUENTA</span>
                            </a>
                        </li>
                        <li className="customerDropdownItem">
                            <a href="/account/orders">
                                <span>MIS PEDIDOS</span>
                            </a>
                        </li>
                        <li className="customerDropdownItem">
                            <a href="/account/addresses">
                                <span>MIS DIRECCIONES</span>
                            </a>
                        </li>
                        <li className="customerDropdownItem">
                            <button className="customerDropdownLogout" onClick={handleLogout} disabled={loading}>
                                <span>CERRAR SESIÓN</span>
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="customerDropdownContent">
                        <li className="customerDropdownItem">
                            <a href="/account/auth/login">
                                <span>INICIAR SESIÓN</span>
                            </a>
                        </li>
                        <li className="customerDropdownItem">
                            <a href="/account/auth/register">
                                <span>REGISTRARSE</span>
                            </a>
                        </li>
                    </ul>
                )}
            </div>
        ) : (
            <></>
        )
    )
}
