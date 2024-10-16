import './CustomerDropdown.css';

interface CustomerDropdownProps {
    isDropdownOpen: boolean;
}

export const CustomerDropdown: React.FC<CustomerDropdownProps> = ({ isDropdownOpen }) => {
    return (
        (isDropdownOpen) ? (
            <div className="customerDropdownContainer">
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
            </div>
        ) : (
            <></>
        )
    )
}
