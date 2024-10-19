import { useState, useEffect } from 'react';
import ProductCarousel from '~/components/productCarousel/ProductCarousel';
import { useFetcher } from '@remix-run/react';
import { useCart } from '~/hooks/Cart';
import './ProductsHandle.css'
import { t } from 'i18next';

export default function ProductsHandle({ products }: any) {
    const [selectedCurrency, setSelectedCurrency] = useState<string>('COP');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [isSizeSelected, setIsSizeSelected] = useState<boolean>(false);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const fetcher = useFetcher();
    const { loading, webUrl, cartItems, setCartItems, updateCart } = useCart();

    const isLoading = fetcher.state === 'submitting';
    //Selected currency
    useEffect(() => {
        let currency = localStorage.getItem('selectedCurrencySymbol');
        if (currency) {
            setSelectedCurrency(currency);
        }
    }, [])

    const handleSizeClick = (size: string) => {
        setSelectedSize(size);
        setIsSizeSelected(false);
    }

    const handleQuantityClick = (quantity: number) => {
        setSelectedQuantity(quantity < 1 ? 1 : quantity);
    }

    // Función para agregar producto al carrito
    const handleAddToBag = async () => {
        if (!selectedSize) {
            setIsSizeSelected(true);
            return;
        }

        try {
            const selectedVariant = products.variants.nodes.find((size: any) => size.id === selectedSize);
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
            setIsSizeSelected(false);
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
        }
        setIsSizeSelected(false);
    }

    // Función para comprar ahora

    const handleBuyNow = async () => {
        if (!selectedSize) {
            setIsSizeSelected(true);
            return;
        }
    
        try {
            const selectedVariant = products.variants.nodes.find((size: any) => size.id === selectedSize);
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
                if (cartItems.length > 0) {
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

        if (scrollElement) {
            const handleScroll = () => {
                const scrollPosition = window.scrollY;
                const opacity = 1 - Math.min(scrollPosition / 100, 1);
                scrollElement.style.opacity = opacity.toString();
            };

            window.addEventListener('scroll', handleScroll);

            // Limpieza del event listener
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);
    return (
        <section className='ProductsHandleContainer'>
            <div className='ProductsHandleWprapper'>
                <div className="HandleProductImg">
                    <ProductCarousel
                        productImages={products.images.edges.map(({ node }: any) => node)}
                        productId={products.id}
                        productName={products.title}
                    />
                    <div id="ScrollElement" className="ScrollElement">
                        <button className='btn-primary' onClick={handleScroll}><span></span></button>
                    </div>
                </div>
                <div className="HandleProductDetailsWrapper" id='ModalCartProductInfo'>
                    <div className="HandleProductDetails">
                        <div className='HandleProductDetailsHeader'>
                            <h3>{products.title}</h3>
                            <a href={`/category/${products.productType.toLowerCase().replace(/\s+/g, '-')}`}>{products.productType}</a>
                        </div>
                        {products.description &&
                            <div className='productDescription'>
                                <h4>Description</h4>
                                <p>{products.description}</p>
                            </div>
                        }
                        <p className='productPrice'>
                            {products.variants.nodes[0].compareAtPrice && <span className='productDiscountPrice'>{parseFloat(products.variants.nodes[0].compareAtPrice.amount.toString()).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}</span>}
                            {parseFloat(products.variants.nodes[0].price.amount.toString()).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}
                        </p>
                        <div className='ModalCartProductSize'>
                            <div className='size-header'>
                                <span>{t('modalCart.size_title')}</span>
                            </div>
                            <div className='size-buttons'>
                                {products.variants.nodes.map((size: any) => (
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
                        <div className='HandleProductQuantity'>
                            <button className='quantity-button btn-primary' onClick={() => handleQuantityClick(selectedQuantity - 1)}>
                                <span>-</span>
                            </button>
                            <span>{selectedQuantity}</span>
                            <button className='quantity-button btn-primary' onClick={() => handleQuantityClick(selectedQuantity + 1)}>
                                <span>+</span>
                            </button>
                        </div>
                        <footer className='ProductsHandleFooter'>
                            <button className='btn-secondary' onClick={handleAddToBag} disabled={loading || isLoading}><span>{t('modalCart.add_to_cart')}</span></button>
                            {<button className='btn-secondary' onClick={handleBuyNow}><span>{t('modalCart.buy_now')}</span></button>}
                        </footer>
                    </div>
                </div>
            </div>
        </section>
    );
}