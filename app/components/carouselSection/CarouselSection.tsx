import { useState, useEffect, useRef } from 'react';
import { arrowLeftIcon, arrowRightIcon } from '~/assets/icons/icons';
import ProductCarousel from '../productCarousel/ProductCarousel';
import { useCart } from '~/hooks/Cart';
import './CarouselSection.css';
import ModalCart from '../modalCart/ModalCart';
import { useTranslation } from 'react-i18next';
interface CarouselSectionProps {
    title: string;
    products: any[];
}

export default function CarouselSection({ title, products }: CarouselSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(products.length);
    const carrouselRef = useRef<HTMLDivElement>(null);
    const [itemsPerView, setItemsPerView] = useState(5);
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const extendedProducts = [...products, ...products, ...products];
    const [selectedCurrency, setSelectedCurrency] = useState<string>('COP');
    const { t } = useTranslation();

    //Modal cart props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [productId, setProductId] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [productCategory, setProductCategory] = useState<string>('');
    const [productPrice, setProductPrice] = useState<number>(0);
    const [productDiscountPrice, setProductDiscountPrice] = useState<number>(0);
    const [productSizes, setProductSizes] = useState<string[]>([]);
    const [productDescription, setProductDescription] = useState<string>('');
    const [productImages, setProductImages] = useState<string[]>([]);
    const [productHandle, setProductHandle] = useState<string>('');

    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    const handleNavigation = (direction: 'next' | 'prev') => {
        if (isButtonDisabled) return;

        setIsButtonDisabled(true);
        setCurrentIndex((prevIndex) => {
            if (direction === 'next') {
                return prevIndex + 1;
            } else {
                return prevIndex === 0 ? products.length * 2 - 1 : prevIndex - 1;
            }
        });

        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 700);
    };

    const next = () => handleNavigation('next');
    const prev = () => handleNavigation('prev');

    useEffect(() => {
        if (carrouselRef.current) {
            const itemWidth = carrouselRef.current.offsetWidth / itemsPerView;
            const translateX = -(currentIndex * itemWidth);
            carrouselRef.current.style.transition = transitionEnabled ? 'transform 0.7s ease' : 'none';
            carrouselRef.current.style.transform = `translateX(${translateX}px)`;
        }

        if (currentIndex >= products.length * 2) {
            setTimeout(() => {
                setTransitionEnabled(false);
                setCurrentIndex(currentIndex - products.length);
            }, 700);
        } else if (currentIndex < products.length) {
            setTimeout(() => {
                setTransitionEnabled(false);
                setCurrentIndex(currentIndex + products.length);
            }, 700);
        }

        setTimeout(() => setTransitionEnabled(true), 750);
    }, [currentIndex, itemsPerView, products.length]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (autoScrollEnabled) {
            interval = setInterval(next, 7000);
        }
        return () => clearInterval(interval);
    }, [autoScrollEnabled]);

    useEffect(() => {
        function handleResize() {
            setAutoScrollEnabled(false);
            if (window.innerWidth < 450) {
                setItemsPerView(1);
            } else if (window.innerWidth < 900) {
                setItemsPerView(2);
            } else if (window.innerWidth < 1200) {
                setItemsPerView(3);
            } else {
                setItemsPerView(4);
            }

            setTimeout(() => setAutoScrollEnabled(true), 1000);
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [products.length]);

    const handlePause = () => {
        setAutoScrollEnabled(false);
    };

    const handleResume = () => {
        setAutoScrollEnabled(true);
    };

    //Modal cart
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

    const handleClick = (index: number) => {
        setClickedIndex(clickedIndex === index ? null : index);
    };

    //Selected currency
    useEffect(() => {
        let currency = localStorage.getItem('selectedCurrencySymbol');
        if (currency) {
            setSelectedCurrency(currency);
        }
    }, [])

    return (
        <section className="CarrouselContainer">
            <div className="CarrouselHeader">
                <h2 className='title-primary'>{title}</h2>
                <div className="CarrouselButtons" onMouseEnter={handlePause} onMouseLeave={handleResume}>
                    <button onClick={prev} className="carrouselButton CarrouselButtonLeft" disabled={isButtonDisabled} aria-label="Botón Prev">{arrowLeftIcon()}</button>
                    <button onClick={next} className="carrouselButton CarrouselButtonRight" disabled={isButtonDisabled} aria-label="Botón Next">{arrowRightIcon()}</button>
                </div>
                <div className="CarrouselSectionPagination">
                    <span className="CarrouselSectionPaginationText">{(currentIndex % products.length) + 1 || 1} / {products.length}</span>
                </div>
            </div>

            <div
                className="carrusel-viewport"
                onMouseEnter={handlePause}
                onMouseLeave={handleResume}
            >
                <div
                    className="CarrouselProducts"
                    ref={carrouselRef}
                >
                    {extendedProducts.map((product, index) => (
                        <div
                            key={`${product.id}-${index}`}
                            className={`ProductItem ${clickedIndex === index ? 'clicked' : ''}`}
                            style={{ flex: `0 0 ${100 / itemsPerView}%`, minWidth: `${100 / itemsPerView}%` }}
                            onMouseDown={(e) => e.preventDefault()}
                            draggable="false"
                            onClick={() => handleClick(index)}
                        >
                            <ProductCarousel
                                productImages={product.images.edges.map(({ node }: any) => node)}
                                productId={product.id}
                                productName={product.title}
                                onNavigationClick={(e: React.MouseEvent) => {
                                    e.stopPropagation(); // Detiene la propagación del evento
                                }}
                            />
                            <div className="ProductDetails">
                                <div className="ProductDetailsHeader">
                                    <a href={`/category/${product.productType.toLowerCase().replace(/\s+/g, '-')}`}>{product.productType}</a>
                                </div>
                                <div className="ProductContent">
                                    <p>{product.title}</p>
                                    <p>
                                        {product.variants.nodes[0].compareAtPrice && (
                                            <span className='ProductPriceDiscount'>{parseFloat(product.variants.nodes[0].compareAtPrice.amount).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}</span>
                                        )}

                                        <span>{parseFloat(product.variants.nodes[0].price.amount).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}

                                        </span>

                                    </p>
                                </div>

                            </div>
                            <div className="ProductDetailsFooter">
                                <div className="ProductSize">
                                    {product.variants.nodes.map((size: any) => (
                                        <span key={size.id}>{size.title}</span>
                                    ))}
                                </div>
                                <button className='btn-secondary' onClick={() => handleOpenModal(product)}>
                                    <span>{t("carouselSection.button")}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && <ModalCart isOpen={isModalOpen} onClose={handleCloseModal} selectedProduct={selectedProduct} productId={productId} productName={productName} productCategory={productCategory} productPrice={productPrice} productDiscountPrice={productDiscountPrice} productSizes={productSizes} productDescription={productDescription} productImages={productImages} productHandle={productHandle} />}
        </section>
    );
}
