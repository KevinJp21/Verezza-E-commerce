import { useState, useEffect } from 'react';
import './Bag.css';
import { closeIcon, trashIcon } from '~/assets/icons/icons';
import { fetchCartItems } from '~/api/getCartItems';
import { updateCartItemQuantity } from '~/api/updateCartItem';
import { removeCartItem } from '~/api/removeCartItem';
import { fetchWebUrl } from '~/api/getCartItems';
interface BagProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: any[];
    setCartItems: (items: any[]) => void;
    webUrl: string;
}

export default function Bag({ isOpen, onClose, cartItems, setCartItems, webUrl }: BagProps) {
    const [selectedCurrency, setSelectedCurrency] = useState('');

    useEffect(() => {
        const currency = localStorage.getItem('selectedCurrencySymbol');
        if (currency) {
            setSelectedCurrency(currency);
        } else {
            setSelectedCurrency('COP');
        }

        const checkoutId = localStorage.getItem('checkoutId');
        if (checkoutId) {
            fetchCartItems(checkoutId).then(setCartItems).catch(console.error);
        }


    }, []);

    const handleUpdateCartItemQuantity = async (itemId: string, quantity: number) => {
        const checkoutId = localStorage.getItem('checkoutId');
        if (checkoutId) {
            try {
                const updatedCheckout = await updateCartItemQuantity(checkoutId, itemId, quantity);
                setCartItems(updatedCheckout.lineItems.edges.map((edge: any) => edge.node));
            } catch (error) {
                console.error('Error al actualizar la cantidad del artículo en el carrito:', error);
            }
        }
    };

    const removeFromCart = async (itemId: string) => {
        const checkoutId = localStorage.getItem('checkoutId');
        if (checkoutId) {
            try {
                const updatedCheckout = await removeCartItem(checkoutId, itemId);
                setCartItems(updatedCheckout.lineItems.edges.map((edge: any) => edge.node));
            } catch (error) {
                console.error('Error al eliminar el artículo del carrito:', error);
            }
        }
    };

    const handleCheckout = () => {
        window.open(webUrl, '_blank');
    };

    return (
        <>
            <div className={`overlay-bag ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
            <div className={`BagContainer ${isOpen ? 'open' : ''}`}>
                <div className='BagWrapper'>
                    <div className="BagHeader">
                        <h2 className='BagTitle title-primary'>Bolsa de compras</h2>
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
                                                    {item.variant.compareAtPriceV2 && (
                                                        <span className='ProductPriceDiscount'>{parseFloat(item.variant.compareAtPriceV2.amount).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}</span>
                                                    )}
                                                    <span>
                                                        {parseFloat(item.variant.priceV2.amount).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}
                                                    </span>
                                                </p>

                                            </div>
                                        </section>
                                        <div className="itemVariants">
                                            <p>Talla: {item.variant.title}</p>
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
                                <p>La bolsa está vacía</p>
                            </div>
                        )}
                    </div>
                    {cartItems.length > 0 && (
                        <footer className="BagFooter">
                            <div className="BagFooterWrapper">
                                <p><span>Total</span> <span>{cartItems.reduce((total, item: any) => total + item.quantity * parseFloat(item.variant.priceV2.amount), 0).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}</span></p>
                                <button className='btn-secondary' onClick={handleCheckout}>Comprar</button>
                            </div>
                        </footer>
                    )}
                </div>
            </div>
        </>
    );
}