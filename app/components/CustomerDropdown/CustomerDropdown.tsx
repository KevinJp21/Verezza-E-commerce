import './CustomerDropdown.css';

export default function CustomerDropdown() {
    return(
        <div className="customerDropdownContainer">
            <ul className="customerDropdownContent">
                <li className="customerDropdownItem">
                    <a href="/account/profile">
                        <span>Mi cuenta</span>
                    </a>
                </li>
                <li className="customerDropdownItem">
                    <a href="/account/orders">
                        <span>Mis pedidos</span>
                    </a>
                </li>
                <li className="customerDropdownItem">
                    <a href="/account/addresses">
                        <span>Mis direcciones</span>
                    </a>
                </li>
                <li className="customerDropdownItem">
                    <button className="customerDropdownLogout">
                        <span>Cerrar sesión</span>
                    </button>
                </li>
            </ul>

        </div>
    )
}
