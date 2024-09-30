import { useState, useEffect } from 'react';
import './Bag.css';
import { closeIcon, trashIcon } from '~/assets/icons/icons';
import { fetchCartItems } from '~/api/getCartItems';

interface BagProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Bag({ isOpen, onClose }: BagProps) {
    const [cartItems, setCartItems] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(0);

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
            console.log(cartItems);
        }
    }, []);

    const updateCartItemQuantity = async (itemId: string, quantity: number) => {
        // Implementar la lógica para actualizar la cantidad del artículo en el carrito
    };

    const removeFromCart = async (itemId: string) => {
        // Implementar la lógica para eliminar el artículo del carrito
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
                            cartItems.map((item: any) => (
                                <div key={item.id} className="bagItem">
                                    <picture className="bagItemImage">
                                        <img src={item.variant.image.src} alt={item.title} />
                                    </picture>
                                    <div className="itemDetails">
                                        <a href={`/product/${item.title.toLowerCase().replace(/\s+/g, '-')}`}>{item.title}</a>
                                        <section aria-label='price' className='bagPriceIrem'>
                                            <div className="priceWrapper">
                                                <p className='productPrice'>{parseFloat(item.variant.priceV2.amount).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}</p>
                                            </div>
                                        </section>
                                        <div className="itemVariants">
                                            <p>Talla: {item.variant.title}</p>
                                        </div>
                                        <div className="itemQuantity">
                                            <button className='quantity-button btn-primary' onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>
                                                <span>-</span>
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button className='quantity-button btn-primary' onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>
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
                                <button className='btn-secondary'>Comprar</button>
                            </div>
                        </footer>
                    )}
                </div>
            </div>
        </>
    )
}