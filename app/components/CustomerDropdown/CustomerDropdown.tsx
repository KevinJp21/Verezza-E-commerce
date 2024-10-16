import { useAuthStatus } from '~/hooks/authStatus';
import './CustomerDropdown.css';

interface CustomerDropdownProps {
    isDropdownOpen: boolean;
}

export const CustomerDropdown: React.FC<CustomerDropdownProps> = ({ isDropdownOpen }) => {
    const isLogged = useAuthStatus();

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
                            <button className="customerDropdownLogout">
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
                            <a href="/register">
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
