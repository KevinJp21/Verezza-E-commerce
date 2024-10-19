import { useState, useEffect } from 'react';
import './Bag.css';
import { closeIcon, trashIcon } from '~/assets/icons/icons';
import { useCart } from '~/hooks/Cart';
import { useTranslation } from 'react-i18next';
import { getCheckoutStatus } from '~/api/getCartItems';
import { useFetcher } from '@remix-run/react';

interface BagProps {
    isOpen: boolean;
    onClose: () => void;
}



export default function Bag({ isOpen, onClose }: BagProps) {
    const { t } = useTranslation();
    const [selectedCurrency, setSelectedCurrency] = useState('COP');
    const { cartItems, setCartItems, webUrl, updateCart } = useCart();
    const fetcher = useFetcher();
    useEffect(() => {
        const currency = localStorage.getItem('selectedCurrencySymbol');
        if (currency) {
            setSelectedCurrency(currency);
        }
    }, []);

    const loading = fetcher.state === 'submitting';


    const handleUpdateCartItemQuantity = async (itemId: string, quantity: number) => {
     
        try {
            const formData = new FormData();
            formData.append('lineItemId', itemId);
            formData.append('quantity', quantity.toString());

            fetcher.submit(formData, {
                method: 'POST',
                action: '/api/cart/updateCartItem',
            });
        } catch (error) {
            console.error('Error al actualizar la cantidad del artículo en el carrito:', error);
        } 
    };

    const removeFromCart = (itemId: string) => {
        try {
            const formData = new FormData();
            formData.append('lineItemId', itemId);

            fetcher.submit(formData, {
                method: 'POST',
                action: '/api/cart/removeCartItem',
            });

            // Actualizar el estado local del carrito
            const updatedCartItems = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedCartItems);
            updateCart();
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Error al eliminar el artículo del carrito:', error);
        }
    };
    const handleCheckout = () => {
        if (webUrl) {
            // Abre la URL de pago en una nueva ventana
            const checkoutWindow = window.open(webUrl, '_blank');
            const checkoutId = localStorage.getItem('checkoutId');
            // Verifica periódicamente si la ventana de pago se ha cerrado
            const checkWindowClosed = setInterval(async () => {
                if (checkoutWindow?.closed) {
                    clearInterval(checkWindowClosed);
                    // La ventana se cerró, verificamos el estado del checkout
                    const checkoutStatus = await getCheckoutStatus(checkoutId || '');
                    if (checkoutStatus === 'COMPLETED') {
                        // El pago se completó, limpiamos el carrito
                        localStorage.removeItem('checkoutId');
                        setCartItems([]);
                        updateCart();

                    }
                }
            }, 1000);
            window.dispatchEvent(new Event('cartUpdated'));
        }
    };

    return (
        <>
            <div className={`overlay-bag ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
            <div className={`BagContainer ${isOpen ? 'open' : ''}`}>
                <div className='BagWrapper'>
                    <div className="BagHeader">
                        <h2 className='BagTitle title-primary'>{t('bag.title')}</h2>
                        <button className='BagClose' title='Close' onClick={onClose}>{closeIcon()}</button>
                    </div>
                    <div className="BagContent">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.id} className="bagItem">
                                    <picture className="bagItemImage">
                                        <img src={item.imageUrl} alt={item.productTitle} />
                                    </picture>
                                    <div className="itemDetails">
                                        <a href={`/products/${item.productHandle.toLowerCase().replace(/\s+/g, '-')}`}>{item.productTitle}</a>
                                        <section aria-label='price' className='bagPriceIrem'>
                                            <div className="priceWrapper">
                                                <p className='productPrice'>
                                                    {loading
                                                        ? <span>0</span>
                                                        :
                                                        <>
                                                            {item.compareAtPrice && (

                                                                <span className='ProductPriceDiscount'>
                                                                    {parseFloat(item.compareAtPrice).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}
                                                                </span>


                                                            )}

                                                            <span>
                                                                {parseFloat(item.price).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}
                                                            </span>
                                                        </>
                                                    }

                                                </p>
                                            </div>
                                        </section>
                                        <div className="itemVariants">
                                            <p>{t('bag.size_title')}: {item.title}</p>
                                        </div>
                                        <div className="itemQuantity">
                                            <button className='quantity-button btn-primary' onClick={() => handleUpdateCartItemQuantity(item.id, item.quantity - 1)} disabled={loading} >
                                                <span>-</span>
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button className='quantity-button btn-primary' onClick={() => handleUpdateCartItemQuantity(item.id, item.quantity + 1)} disabled={loading}>
                                                <span>+</span>
                                            </button>
                                        </div>
                                    </div>
                                    <button className='removeItem btn-primary' onClick={() => removeFromCart(item.id)} disabled={loading}>
                                        {trashIcon()}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="bagEmpty">
                                <p>{t('bag.bag_empty')}</p>
                            </div>
                        )}
                    </div>
                    {cartItems.length > 0 && (
                        <footer className="BagFooter">
                            <div className="BagFooterWrapper">
                                <p>
                                    <span>{t('bag.subtotal')}</span>
                                    {loading
                                        ? <span>0</span>
                                        : <span>
                                            {cartItems.reduce((total, item: any) => {
                                                const itemPrice = item.price;
                                                return total + item.quantity * parseFloat(itemPrice);
                                            }, 0).toLocaleString(
                                                selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES',
                                                {
                                                    style: 'currency',
                                                    currency: selectedCurrency,
                                                    minimumFractionDigits: 0
                                                }
                                            )}
                                        </span>
                                    }
                                </p>
                                <button className='btn-secondary' onClick={handleCheckout}>{t('bag.buy_now')}</button>
                            </div>
                        </footer>
                    )}
                </div>
            </div>
        </>
    );
}