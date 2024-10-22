import { useState, useEffect } from 'react';
import './Bag.css';
import { closeIcon, trashIcon } from '~/assets/icons/icons';
import { useCart } from '~/hooks/Cart';
import { useTranslation } from 'react-i18next';
import { useFetcher } from '@remix-run/react';
import { useProductContext } from '~/hooks/ProductContext';


interface BagProps {
    isOpen: boolean;
    onClose: () => void;
}



export default function Bag({ isOpen, onClose }: BagProps) {
    const { t } = useTranslation();
    const [selectedCurrency, setSelectedCurrency] = useState('COP');
    const { cartItems, setCartItems, webUrl, updateCart, subtotal } = useCart();
    const { products } = useProductContext();
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
            window.location.href = webUrl;
        }
    };

    // Función para obtener el producto completo desde products
    const getFullProduct = (productId: string) => {
        return products.find(product => product.id === productId);
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
                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map((item: any) => {
                                const fullProduct = getFullProduct(item.productId);
                                if (!fullProduct) return null; // Si no se encuentra el producto, no lo mostramos

                                return (
                                    <div key={item.id} className="bagItem">
                                        <picture className="bagItemImage">
                                            <img src={fullProduct.images.edges[0].node.src} alt={fullProduct.title} />
                                        </picture>
                                        <div className="itemDetails">
                                            <a href={`/products/${fullProduct.handle}`}>{fullProduct.title}</a>
                                            <section aria-label='price' className='bagPriceIrem'>
                                                <div className="priceWrapper">
                                                    <p className='productPrice'>
                                                        {loading ? (
                                                            <span>0</span>
                                                        ) : (
                                                            <>
                                                                {fullProduct.variants.nodes[0].compareAtPrice && (
                                                                    <span className='ProductPriceDiscount'>
                                                                        {parseFloat(fullProduct.variants.nodes[0].compareAtPrice.amount).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', {
                                                                            style: 'currency',
                                                                            currency: fullProduct.variants.nodes[0].compareAtPrice.currencyCode,
                                                                            minimumFractionDigits: 0
                                                                        })}
                                                                    </span>
                                                                )}
                                                                <span>
                                                                    {parseFloat(fullProduct.priceRange.minVariantPrice.amount).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', {
                                                                            style: 'currency',
                                                                            currency: fullProduct.priceRange.minVariantPrice.currencyCode,
                                                                            minimumFractionDigits: 0
                                                                        })}
                                                                </span>
                                                            </>
                                                        )}
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
                                );
                            })
                        ) : (
                            <div className="bagEmpty">
                                <p>{t('bag.bag_empty')}</p>
                            </div>
                        )}
                    </div>
                    {cartItems && cartItems.length > 0 && (
                        <footer className="BagFooter">
                            <div className="BagFooterWrapper">
                                <p>
                                    <span>{t('bag.subtotal')}</span>
                                    {loading
                                        ? <span>0</span>
                                        : <span>
                                            {cartItems.reduce((total, item: any) => {
                                                const itemPrice = getFullProduct(item.productId)?.priceRange.minVariantPrice.amount || item.variant.price.amount;
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
