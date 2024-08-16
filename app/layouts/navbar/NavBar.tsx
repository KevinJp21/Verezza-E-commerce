import './NavBar.css'
import logoOlgaBlack from '~/assets/logos/Logo Olga black.webp'
import logoOlgaWhite from '~/assets/logos/Logo Olga white.webp'

import { heartIcon, userIcon, cartIcon } from '~/assets/icons/icons';
export default function NavBar() {
    return (
        <header className='navbar'>
            <nav className='NavBarContainer'>
                <div className='NavBar1'>
                    <a href="/">
                        <img src={logoOlgaWhite} alt='Logo de la marca Olga Lucía Cortes' width={290} height={20} decoding='async' loading='lazy' />
                    </a>
                    <div className='NavBar1-1'>
                        <a href="" className="accoutHeader">
                            {userIcon()}
                        </a>
                        <a href="/" className="whishlistHeader">
                            {heartIcon()}
                        </a>
                        <a href="/" className="whishlistHeader">
                            {cartIcon()}
                        </a>
                    </div>
                </div>
                <div className='NavBar2'>
                    <ul className='NavbarListWrapper'>
                        <li>
                            <a href="">BLUSAS</a>
                        </li>
                        <li>
                            <a href="">PANTALONES</a>
                        </li>
                        <li>
                            <a href="">VESTIDOS</a>
                        </li>
                        <li>
                            <a href="">CONJUNTOS</a>
                        </li>
                        <li>
                            <a href="">COMPLEMENTOS</a>
                        </li>
                        <li>
                            <a href="">ATÉLIER</a>
                        </li>
                        <li>
                            <a href="" className='strongLink'>NUESTRA MARCA</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}