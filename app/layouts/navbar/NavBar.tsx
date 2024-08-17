import { useState } from 'react';
import './NavBar.css'
import './SideBar.css'
import logoOlgaBlack from '~/assets/logos/Logo Olga black.webp'
import logoOlgaWhite from '~/assets/logos/Logo Olga white.webp'
import { closeIcon, searchIcon } from '~/assets/icons/icons'



import { heartIcon, userIcon, cartIcon } from '~/assets/icons/icons';
export default function NavBar() {

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    }

    const closeSidebar = () => {
        setIsSideBarOpen(false);
    }



    return (
        <header className='navbar'>
            <nav className='NavBarContainer'>
                <div className='NavBar1'>
                    <a href="/">
                        <img src={logoOlgaWhite} alt='Logo de la marca Olga Lucía Cortes' width={290} height={20} decoding='async' loading='lazy' />
                    </a>
                    <div className='NavBar1-1'>
                        <a href="" className="accoutHeader" aria-label="Usuario">
                            {userIcon()}
                        </a>
                        <a href="/" className="whishlistHeader" aria-label="Lista de deseos">
                            {heartIcon()}
                        </a>
                        <a href="/" className="whishlistHeader" aria-label="Bolsa de compras">
                            {cartIcon()}
                        </a>
                        <button className='BTNSearch' aria-label="Buscar">
                            {searchIcon()}
                        </button>
                        <button className='hamburgerMenu' onClick={toggleSideBar} aria-label="Menu">
                            <span className='bar bar1'></span>
                            <span className='bar bar2'></span>
                            <span className='bar bar3'></span>
                        </button>
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
            <div className={`overlay-sidebar ${isSideBarOpen ? 'open' : ''}`} onClick={closeSidebar}></div>
            <div className={`sidebar ${isSideBarOpen ? 'open' : ''}`}>
                <div className='sidebarWrapper'>
                    <div className="sidebarHeader">
                        <picture>
                            <img src={logoOlgaBlack} alt='Logo de la marca Olga Lucía Cortes' width={290} height={20} decoding='async' loading='lazy' />
                        </picture>
                        <button className='closeSidebar' onClick={closeSidebar} aria-label="Cerrar menu">
                            {closeIcon()}
                        </button>
                    </div>
                    <div className="sidebarContent">
                        <div className="sidebarBody">
                            <span>TIENDA</span>
                            <ul className='sidebarList'>
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
                        <div className="sidebarBody">
                            <span>USUARIO</span>
                            <ul className='sidebarList sidebarListOthers'>
                                <li>
                                    <a href=""><strong>Inicia sesión</strong> o <strong>Crea una cuenta</strong></a>
                                </li>
                                <li>
                                    <a href="">Bolsa de compras</a>
                                </li>
                                <li>
                                    <a href="">Politica de privacidad</a>
                                </li>
                                <li>
                                    <a href="">Devoluciones/reembolsos</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
}