import { useState, useEffect } from 'react';
import './Bag.css';
import { closeIcon, trashIcon } from '~/assets/icons/icons';
import { updateCartItemQuantity } from '~/api/updateCartItem';
import { removeCartItem } from '~/api/removeCartItem';
import { useCart } from '~/hooks/Cart';
import { useTranslation } from 'react-i18next';

interface BagProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Bag({ isOpen, onClose }: BagProps) {
    const { t } = useTranslation();
    const [selectedCurrency, setSelectedCurrency] = useState('COP');
    const [isLoading, setIsLoading] = useState(false);
    const { cartItems, setCartItems, webUrl, productDetails, updateCart } = useCart();

    useEffect(() => {
        const currency = localStorage.getItem('selectedCurrencySymbol');
        if (currency) {
            setSelectedCurrency(currency);
        }
    }, []);

    useEffect(() => {
        const handleCartUpdated = () => {
            updateCart();
        };

        window.addEventListener('cartUpdated', handleCartUpdated);
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdated);
        };
    }, [updateCart]);

    const handleUpdateCartItemQuantity = async (itemId: string, quantity: number) => {
        setIsLoading(true);
        const checkoutId = localStorage.getItem('checkoutId');
        if (checkoutId) {
            try {
                const updatedCheckout = await updateCartItemQuantity(checkoutId, itemId, quantity);
                setCartItems(updatedCheckout.lineItems.edges.map((edge: any) => edge.node));
                await updateCart();
                window.dispatchEvent(new Event('cartUpdated'));
            } catch (error) {
                console.error('Error al actualizar la cantidad del artículo en el carrito:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const removeFromCart = async (itemId: string) => {
        setIsLoading(true);
        const checkoutId = localStorage.getItem('checkoutId');
        if (checkoutId) {
            try {
                const updatedCheckout = await removeCartItem(checkoutId, itemId);
                setCartItems(updatedCheckout.lineItems.edges.map((edge: any) => edge.node));
                await updateCart();
                window.dispatchEvent(new Event('cartUpdated'));
            } catch (error) {
                console.error('Error al eliminar el artículo del carrito:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleCheckout = () => {
        if (webUrl) {
            window.open(webUrl, '_blank');
        }
    };

    return (
        <>
            <div className={`overlay-bag ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
            <div className={`BagContainer ${isOpen ? 'open' : ''}`}>
                <div className='BagWrapper'>
                    <div className="BagHeader">
                        <h2 className='BagTitle title-primary'>{t('bag.title')}</h2>
                        <button className='BagClose' onClick={onClose}>{closeIcon()}</button>
                    </div>
                    <div className="BagContent">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.id} className="bagItem">
                                    <picture className="bagItemImage">
                                        <img src={item.variant.image.src} alt={item.title} />
                                    </picture>
                                    <div className="itemDetails">
                                        <a href={`/product/${item.title.toLowerCase().replace(/\s+/g, '-')}`}>{item.title}</a>
                                        <section aria-label='price' className='bagPriceIrem'>
                                            <div className="priceWrapper">
                                                <p className='productPrice'>
                                                    {isLoading
                                                        ? <span>0</span>
                                                        :
                                                        <>
                                                            {productDetails[item.productId]?.variants.edges[0].node.compareAtPrice && (

                                                                <span className='ProductPriceDiscount'>
                                                                    {parseFloat(productDetails[item.productId].variants.edges[0].node.compareAtPrice.amount).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}
                                                                </span>


                                                            )}

                                                            <span>
                                                                {parseFloat(productDetails[item.productId]?.variants.edges[0].node.price.amount || '0').toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}
                                                            </span>
                                                        </>
                                                    }

                                                </p>
                                            </div>
                                        </section>
                                        <div className="itemVariants">
                                            <p>{t('bag.size_title')}: {item.variant.title}</p>
                                        </div>
                                        <div className="itemQuantity">
                                            <button className='quantity-button btn-primary' onClick={() => handleUpdateCartItemQuantity(item.id, item.quantity - 1)}>
                                                <span>-</span>
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button className='quantity-button btn-primary' onClick={() => handleUpdateCartItemQuantity(item.id, item.quantity + 1)}>
                                                <span>+</span>
                                            </button>
                                        </div>
                                    </div>
                                    <button className='removeItem btn-primary' onClick={() => removeFromCart(item.id)}>
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
                                    {isLoading
                                        ? <span>0</span>
                                        : <span>
                                            {cartItems.reduce((total, item: any) => {
                                                const itemPrice = productDetails[item.productId]?.variants.edges[0].node.price.amount || item.variant.price.amount;
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