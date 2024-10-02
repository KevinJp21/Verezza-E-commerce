import { useState, useEffect } from 'react';
import './ModalCart.css';
import ProductCarousel from '../productCarousel/ProductCarousel';
import { closeIcon } from '~/assets/icons/icons';
import { useTranslation } from 'react-i18next';
import { addToCart } from '~/api/addToCart';

interface ModalCartProps {
    isOpen: boolean;
    onClose: () => void;
    selectedProduct: string | null;
    productId: number | null;
    productName: string;
    productCategory: string;
    productPrice: number;
    productDiscountPrice: number;
    productSizes: any[];
    productDescription: string;
    productImages: any[];
}

const ModalCart: React.FC<ModalCartProps> = ({ onClose, selectedProduct, productId, productName, productCategory, productPrice, productDiscountPrice, productSizes, productDescription, productImages }) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('COP');
    const [isSizeSelected, setIsSizeSelected] = useState<boolean>(false);
    const { t } = useTranslation();

    const handleClose = () => {
        onClose();
    }

    const handleSizeClick = (size: string) => {
        setSelectedSize(size);
        setIsSizeSelected(false);
    }

    const handleQuantityClick = (quantity: number) => {
        setSelectedQuantity(quantity < 1 ? 1 : quantity);
    }

    useEffect(() => {
        const currency = localStorage.getItem('selectedCurrencySymbol');
        if (currency) {
            setSelectedCurrency(currency);
        }
    }, []);

    // Función para agregar producto al carrito
    const handleAddToBag = async () => {
        if (!selectedSize) {
            setIsSizeSelected(true);
            return;
        }

        try {
            const selectedVariant = productSizes.find(size => size.id === selectedSize);
            if (!selectedVariant) {
                throw new Error('Variant not found for the selected size');
            }

            const variantId = selectedVariant.id;
            const checkout = await addToCart(variantId, selectedQuantity);
            localStorage.setItem('checkoutId', checkout.id);
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
        }

        onClose();
        setIsSizeSelected(false);
        window.dispatchEvent(new Event('cartUpdated'));
    }

    const handleScroll = () => {
        const element = document.getElementById('ModalCartProductInfo');
        element?.scrollIntoView({ behavior: 'smooth' });
    }

    //Ocultar ScrollElement al scrollear hacia abajo
    useEffect(() => {
        const scrollElement = document.getElementById('ScrollElement');
        const modalCartWrapper = document.querySelector('.ModalCartWrapper');

        if (scrollElement && modalCartWrapper) {
            modalCartWrapper.addEventListener('scroll', () => {
                const scrollPosition = modalCartWrapper.scrollTop;
                const opacity = 1 - Math.min(scrollPosition / 100, 1);
                scrollElement.style.opacity = opacity.toString();
            });
        }
    }, []);


    return (
        <div className='ModalCartContainer'>
            <div className="ModalCartWrapper">
                <header className='ModalCartHeader'>
                    <h2>{selectedProduct}</h2>
                    <button onClick={handleClose}>{closeIcon()}</button>
                </header>
                <div className="ModalCartContent">
                    <div className="ModalCartImgProduct">
                        <ProductCarousel productImages={productImages} productId={productId} productName={productName} />
                    </div>

                    <div className='ModalCartProductInfo' id="ModalCartProductInfo">
                        <div className='ModalCartProductInfoHeader'>
                            <h3>{productName}</h3>
                            <a href={`/collections/${productCategory.toLowerCase().replace(/\s+/g, '-')}`}>{productCategory}</a>
                        </div>
                        {productDescription &&
                            <div className='productDescription'>
                                <h4>Description</h4>
                                <p>{productDescription}</p>
                            </div>
                        }
                        <p className='productPrice'>
                            {productDiscountPrice && <span className='productDiscountPrice'>{parseFloat(productDiscountPrice.toString()).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}</span>}
                            {parseFloat(productPrice.toString()).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}
                        </p>
                        <div className='ModalCartProductSize'>
                            <div className='size-header'>
                                <span>{t('modalCart.size_title')}</span>
                            </div>
                            <div className='size-buttons'>
                                {productSizes.map((size) => (
                                    <button
                                        key={size.id}
                                        className={`size-button ${selectedSize === size.id ? 'selected' : ''}`}
                                        onClick={() => handleSizeClick(size.id)}
                                        disabled={!size.availableForSale}
                                    >
                                        {size.title}
                                    </button>
                                ))}
                            </div>
                            {isSizeSelected && <span className='size-warning'>{t('modalCart.size_warning')}</span>}
                        </div>
                        <div className='ModalCartProductQuantity'>
                            <button className='quantity-button btn-primary' onClick={() => handleQuantityClick(selectedQuantity - 1)}>
                                <span>-</span>
                            </button>
                            <span>{selectedQuantity}</span>
                            <button className='quantity-button btn-primary' onClick={() => handleQuantityClick(selectedQuantity + 1)}>
                                <span>+</span>
                            </button>
                        </div>
                    </div>
                </div>
                <footer className='ModalCartFooter'>
                    <button className='btn-secondary' onClick={handleAddToBag}><span>{t('modalCart.add_to_cart')}</span></button>
                    <button className='btn-secondary'><span>{t('modalCart.buy_now')}</span></button>
                </footer>

                <div id="ScrollElement" className="ScrollElement">
                    <button className='btn-primary' onClick={handleScroll}><span></span></button>
                </div>
            </div>
        </div>
    );
}

export default ModalCart;
