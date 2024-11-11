import { useState, useEffect } from 'react';
import './ModalCart.css';
import ProductCarousel from '../productCarousel/ProductCarousel';
import { closeIcon } from '~/assets/icons/icons';
import { useTranslation } from 'react-i18next';
import { useFetcher } from '@remix-run/react';
import { useCart } from '~/hooks/Cart';

interface ModalCartProps {
    isOpen: boolean;
    onClose: () => void;
    selectedProduct: string | null;
    productId: string;
    productName: string;
    productCategory: string;
    productPrice: number;
    productDiscountPrice: number;
    productSizes: any[];
    productDescription: string;
    productImages: any[];
    productHandle: string;
}

const ModalCart: React.FC<ModalCartProps> = ({ onClose, selectedProduct, productId, productName, productCategory, productPrice, productDiscountPrice, productSizes, productDescription, productImages, productHandle }) => {
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('COP');
    const [isSizeSelected, setIsSizeSelected] = useState<boolean>(false);
    const { t } = useTranslation();
    const fetcher = useFetcher();
    const { cartItems, webUrl } = useCart();
    
    const loading = fetcher.state === 'submitting';

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

    const isLoading = fetcher.state === 'submitting';

    // Función refactorizada para agregar producto al carrito
    const handleAddToBag = async () => {
        if (!selectedSize) {
            setIsSizeSelected(true);
            return;
        }

        try {
            const selectedVariant = productSizes.find(size => size.id === selectedSize);
            if (!selectedVariant) {
                throw new Error('Variante no encontrada para el tamaño seleccionado');
            }

            const formData = new FormData();
            formData.append('merchandiseId', selectedVariant.id);
            formData.append('quantity', selectedQuantity.toString());

            fetcher.submit(formData, {
                method: 'POST',
                action: '/api/cart/addToCart',
            });
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
        } finally {
            setIsSizeSelected(false);
            onClose();
        }
    }

    // Función para comprar ahora

    const handleBuyNow = async () => {
        if (!selectedSize) {
            setIsSizeSelected(true);
                return;
            }
        
            try {
                const selectedVariant = productSizes.find((size: any) => size.id === selectedSize);
                if (!selectedVariant) {
                    throw new Error('Variante no encontrada para el tamaño seleccionado');
                }
        
                // Crear formData para agregar el producto al carrito
                const formData = new FormData();
                formData.append('merchandiseId', selectedVariant.id);
                formData.append('quantity', selectedQuantity.toString());
        
                // Usar fetcher.submit para agregar el producto al carrito
                fetcher.submit(formData, {
                    method: 'POST',
                    action: '/api/cart/addToCart',
                });
        
                // Aquí esperas hasta que el carrito esté actualizado, verificando si el producto se agregó
                setTimeout(async () => {
                    // Verificar si el carrito tiene productos
                    if (!loading) {
                        // Si `webUrl` tiene el link de checkout, redirigir al usuario a la página de checkout
                        if (webUrl) {
                            window.location.href = webUrl;
                        } else {
                            console.error('No se encontró la URL del checkout');
                        }
                    } else {
                        console.error('El producto no se agregó al carrito.');
                    }
                }, 1000); // Esperar un segundo para asegurar que el producto fue agregado
        
            } catch (error) {
                console.error('Error al procesar la compra:', error);
            }
        };

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
                            <h3><a href={`/products/${productHandle}`}>{productName}</a></h3>
                            <a href={`/category/${productCategory.toLowerCase().replace(/\s+/g, '-')}`}>{productCategory}</a>
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
                    <button className='btn-secondary' onClick={handleAddToBag} disabled={loading}><span>{t('modalCart.add_to_cart')}</span></button>
                    <button className='btn-secondary' onClick={handleBuyNow} disabled={loading}><span>{t('modalCart.buy_now')}</span></button>
                </footer>

                <div id="ScrollElement" className="ScrollElement">
                    <button className='btn-primary' onClick={handleScroll}><span></span></button>
                </div>
            </div>
        </div>
    );
}

export default ModalCart;
