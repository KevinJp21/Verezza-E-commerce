import { useState, useEffect } from 'react';
import './NavBar.css'
import './SideBar.css'
import logoOlgaBlack from '~/assets/logos/Logo Olga black.webp'
import logoOlgaWhite from '~/assets/logos/Logo Olga white.webp'
import { closeIcon, searchIcon } from '~/assets/icons/icons'
import { heartIcon, userIcon, cartIcon } from '~/assets/icons/icons';
import { useProductContext } from '~/hooks/ProductContext';
import { useTranslation } from "react-i18next";

export default function NavBar() {

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const { products } = useProductContext();



    const { t } = useTranslation();

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    }

    const closeSidebar = () => {
        setIsSideBarOpen(false);
    }

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        setSearchTerm('');
    }

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchTerm('');
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
                    <a className='Logo_Olga' href="/">
                        OLGA LUCIA CORTES
                    </a>
                    <div className='NavBar1-2'>
                        <ul className='NavbarListWrapper'>
                            <li>
                                <a href="">{t("navbar.blouses")}</a>
                            </li>
                            <li>
                                <a href="">{t("navbar.pants")}</a>
                            </li>
                            <li>
                                <a href="">{t("navbar.dresses")}</a>
                            </li>
                            <li>
                                <a href="">{t("navbar.sets")}</a>
                            </li>
                            <li>
                                <a href="">{t("navbar.complements")}</a>
                            </li>
                            <li>
                                <a href="">{t("navbar.atelier")}</a>
                            </li>
                            <li>
                                <a href="" className='strongLink'>{t("navbar.our_brand")}</a>
                            </li>
                        </ul>
                    </div>
                    <div className='NavBar1-3'>
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
            </nav>
            <div className={`overlay-sidebar ${isSideBarOpen ? 'open' : ''}`} onClick={closeSidebar}></div>
            <div className={`sidebar ${isSideBarOpen ? 'open' : ''}`}>
                <div className='sidebarWrapper'>
                    <div className="sidebarHeader">
                        <a className='Logo_Olga' href="/">OLGA LUCIA CORTES</a>
                        <button className='closeSidebar' onClick={closeSidebar} aria-label="Cerrar menu">
                            {closeIcon()}
                        </button>
                    </div>
                    <div className="sidebarContent">
                        <div className="sidebarBody">
                            <span>{t("sidebar.sidebar_title")}</span>
                            <ul className='sidebarList'>
                                <li>
                                    <a href="">{t("sidebar.blouses")}</a>
                                </li>
                                <li>
                                    <a href="">{t("sidebar.jackets")}</a>
                                </li>
                                <li>
                                    <a href="">{t("sidebar.pants")}</a>
                                </li>
                                <li>
                                    <a href="">{t("sidebar.dresses")}</a>
                                </li>
                                <li>
                                    <a href="">{t("sidebar.sets")}</a>
                                </li>
                                <li>
                                    <a href="">{t("sidebar.skirts")}</a>
                                </li>
                                <li>
                                    <a href="">{t("sidebar.complements")}</a>
                                </li>
                                <li>
                                    <a href="">{t("sidebar.atelier")}</a>
                                </li>
                                <li>
                                    <a href="" className='strongLink'>{t("sidebar.our_brand")}</a>
                                </li>
                            </ul>
                        </div>
                        <div className="sidebarBody">
                            <span>{t("sidebar.user")}</span>
                            <ul className='sidebarList sidebarListOthers'>
                                <li>
                                    <a href=""><strong>{t("sidebar.login")}</strong> / <strong>{t("sidebar.create_account")}</strong></a>
                                </li>
                                <li>
                                    <a href="">{t("sidebar.shopping_bag")}</a>
                                </li>
                                <li>
                                    <a href="">{t("sidebar.privacy_policy")}</a>
                                </li>
                                <li>
                                    <a href="">{t("sidebar.returns")}</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            <div className="NavBarMobileContainer">
                <ul className='NavBarMobileList'>
                    <li>
                        <a href="/" aria-label="Lista de deseos">{heartIcon()}</a>
                    </li>
                    <li>
                        <button aria-label="Bolsa de compras">{cartIcon()}</button>
                    </li>
                    <li>
                        <a href="/" aria-label="Usuario">{userIcon()}</a>
                    </li>
                    <li>
                        <button onClick={toggleSearch} aria-label="Buscar">{searchIcon()}</button>
                    </li>
                </ul>
            </div>
            <div className={`searchOverlay ${isSearchOpen ? 'open' : ''}`} onClick={closeSearch}></div>
            <div className={`SearhContainer ${isSearchOpen ? 'open' : ''}`}>
                <input
                    className='SearchInput'
                    id='SearchInput'
                    type="search"
                    placeholder={t("navbar.navbar_search.placeholder")}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {searchTerm && (
                    <ul className="SearchResults">
                        {filteredProducts.map((product, index) => (
                            <li key={`${product.id}-${index}`} className='searhResultWrapper'>

                                <picture className='ResultImg'>
                                    <img src={product.images.edges[0].node.src} alt={product.title} width={50} height={50} loading='lazy' decoding='async' />
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