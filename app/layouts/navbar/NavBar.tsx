import { useState, useEffect } from 'react';
import './NavBar.css'
import './SideBar.css'
import { closeIcon, searchIcon } from '~/assets/icons/icons'
import { heartIcon, userIcon, cartIcon } from '~/assets/icons/icons';
import { useProductContext } from '~/hooks/ProductContext';
import { useTranslation } from "react-i18next";
import Bag from '~/components/Bag/Bag';
import { useCart } from '~/hooks/Cart';
import ModalCart from '~/components/modalCart/ModalCart';
import { CustomerDropdown } from '~/components/CustomerDropdown/CustomerDropdown';

export default function NavBar() {

    const { updateCart, getTotalQuantity } = useCart();
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const { products } = useProductContext();
    const [isBagOpen, setIsBagOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('COP');
    //Obtener productos del carrito
    //Obtener datosa al seleccionarlo en la busqueda
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [productId, setProductId] = useState<string | null>(null);
    const [productName, setProductName] = useState<string>('');
    const [productCategory, setProductCategory] = useState<string>('');
    const [productPrice, setProductPrice] = useState<number>(0);
    const [productDiscountPrice, setProductDiscountPrice] = useState<number>(0);
    const [productSizes, setProductSizes] = useState<string[]>([]);
    const [productDescription, setProductDescription] = useState<string>('');
    const [productImages, setProductImages] = useState<string[]>([]);
    const [productHandle, setProductHandle] = useState<string>('');
    //Dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        // Suscribirse al evento de actualización del carrito
        window.addEventListener('cartUpdated', updateCart);

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener('cartUpdated', updateCart);
        };
    }, [updateCart]);

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

    //Bag Button 
    const toggleBag = () => {
        setIsBagOpen(!isBagOpen);
    }

    const closeBag = () => {
        setIsBagOpen(false);
    }

    const handleOpenModal = (product: any) => {
        setIsModalOpen(true);
        setSelectedProduct(product.title);
        setProductId(product.id);
        setProductName(product.title);
        setProductCategory(product.productType || 'Sin categoría');
        setProductPrice(product.variants?.nodes?.[0]?.price?.amount || 0);
        setProductDiscountPrice(product.variants?.nodes?.[0]?.compareAtPrice?.amount || null);
        setProductSizes(product.variants?.nodes || []);
        setProductDescription(product.description || '');
        setProductImages(product.images?.edges?.map(({ node }: any) => node) || []);
        setProductHandle(product.handle || '');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    //Selected currency
    useEffect(() => {
        let currency = localStorage.getItem('selectedCurrencySymbol');
        if (currency) {
            setSelectedCurrency(currency);
        }
    }, [])

    //Dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }


    return (
        <header className='navbar'>
            <nav className='NavBarContainer'>
                <div className='NavBar1'>
                    <h1 className='title-primary'>
                        <a href="/">OLGA LUCIA CORTES</a>
                    </h1>
                    <div className='NavBar1-2'>
                        <ul className='NavbarListWrapper'>
                            <li>
                                <a href="/products">{t("navbar.shop")}</a>
                            </li>
                            <li>
                                <a href="">{t("navbar.blouses")}</a>
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
                        <div className="CustomerContainer">
                            <button className="accoutHeader" aria-label="Usuario" onClick={toggleDropdown}>
                                {userIcon()}
                            </button>
                            <CustomerDropdown isDropdownOpen={isDropdownOpen} />
                        </div>

                        <button className="CartHeader" aria-label="Bolsa de compras" onClick={toggleBag}>
                            {cartIcon()}
                            {getTotalQuantity() > 0 && <span className="cart-count">{getTotalQuantity()}</span>}
                        </button>
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
                        <a className='title-primary' href="/">OLGA LUCIA CORTES</a>
                        <button className='closeSidebar' onClick={closeSidebar} aria-label="Cerrar menu">
                            {closeIcon()}
                        </button>
                    </div>
                    <div className="sidebarContent">
                        <div className="sidebarBody">
                            <span>{t("sidebar.sidebar_title")}</span>
                            <ul className='sidebarList'>
                                <li>
                                    <a href="/products">{t("sidebar.shop")}</a>
                                </li>
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
                                    <a href="/account/auth/login"><strong>{t("sidebar.login")}</strong> / <strong>{t("sidebar.create_account")}</strong></a>
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
                        <button className='CartHeader' aria-label="Bolsa de compras" onClick={toggleBag}>
                            {cartIcon()}
                            {getTotalQuantity() > 0 && <span className="cart-count">{getTotalQuantity()}</span>}
                        </button>
                    </li>
                    <li>
                        <a href="/account/auth/login" aria-label="Usuario">{userIcon()}</a>
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
                            <li key={`${product.id}-${index}`} className='searhResultWrapper' onClick={() => handleOpenModal(product)}>

                                <picture className='ResultImg'>
                                    <img src={product.images.edges[0].node.src} alt={product.title} width={50} height={50} loading='lazy' decoding='async' />
                                </picture>
                                <div className="resultDetails" >
                                    <span>{product.title}</span>
                                    <p>
                                        {product.variants.nodes[0].compareAtPrice && (
                                            <span className='ProductPriceDiscount'>{parseFloat(product.variants.nodes[0].compareAtPrice.amount).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}</span>
                                        )}

                                        <span>{parseFloat(product.variants.nodes[0].price.amount).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}

                                        </span>

                                    </p>

                                </div>

                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Bag isOpen={isBagOpen} onClose={closeBag} />
            {isModalOpen && <ModalCart isOpen={isModalOpen} onClose={handleCloseModal} selectedProduct={selectedProduct} productId={productId} productName={productName} productCategory={productCategory} productPrice={productPrice} productDiscountPrice={productDiscountPrice} productSizes={productSizes} productDescription={productDescription} productImages={productImages} productHandle={productHandle} />}
        </header>
    );
}