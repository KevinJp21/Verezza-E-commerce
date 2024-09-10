import { useState, useEffect } from 'react';
import './NavBar.css'
import './SideBar.css'
import logoOlgaBlack from '~/assets/logos/Logo Olga black.webp'
import logoOlgaWhite from '~/assets/logos/Logo Olga white.webp'
import { closeIcon, searchIcon } from '~/assets/icons/icons'
import { heartIcon, userIcon, cartIcon } from '~/assets/icons/icons';
import { useProductContext } from '~/hooks/ProductContext';

export default function NavBar() {

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const { products } = useProductContext();


    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    }

    const closeSidebar = () => {
        setIsSideBarOpen(false);
    }

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    }

    const closeSearch = () => {
        setIsSearchOpen(false);
    }

    //CloseSearch al hacer scorll
    useEffect(() => {
        const handleScroll = () => {
            closeSearch();
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    //Obtener productos y filtrarlos en tiempo real


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);

        const filtered = products.filter(product =>
            product && product.title && product.title.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <header className='navbar'>
            <nav className='NavBarContainer'>
                <div className='NavBar1'>
                    <a href="/">
                        <img src={logoOlgaWhite} alt='Logo de la marca Olga Lucía Cortes' width={290} height={20} />
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
                        <button className='BTNSearch' aria-label="Buscar" onClick={toggleSearch}>
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
                                    <a href="">CHAQUETAS</a>
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
                                    <a href="">VESTIDOS</a>
                                </li>
                                <li>
                                    <a href="">FALDAS</a>
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

            <div className="NavBarMobileContainer">
                <ul className='NavBarMobileList'>
                    <li>
                        <a href="/">{heartIcon()}</a>
                    </li>
                    <li>
                        <button>{cartIcon()}</button>
                    </li>
                    <li>
                        <a href="/">{userIcon()}</a>
                    </li>
                    <li>
                        <button onClick={toggleSearch}>{searchIcon()}</button>
                    </li>
                </ul>
            </div>
            <div className={`searchOverlay ${isSearchOpen ? 'open' : ''}`} onClick={closeSearch}></div>
            <div className={`SearhContainer ${isSearchOpen ? 'open' : ''}`} >
                <input
                    className='SearchInput'
                    type="text"
                    placeholder="Buscar"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {searchTerm && (
                    <ul className="SearchResults">
                        {filteredProducts.map((product, index) => (
                            <li key={`${product.id}-${index}`} className='searhResultWrapper'>
                                
                                    <picture className='ResultImg'>
                                        <img src={product.images.edges[0].node.src} alt={product.title} width={50} height={50} />
                                    </picture>
                                    <div className="resultDetails">
                                        <a href={`/producto/${product.id}`}>{product.title}</a>
                                        <p>{parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}</p>
                                    </div>
                              
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </header>
    );
}