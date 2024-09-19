import { useState, useEffect } from 'react';
import './Bag.css';
import { closeIcon, trashIcon } from '~/assets/icons/icons';
import { useProductContext } from '~/hooks/ProductContext';

interface BagProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Bag({ isOpen, onClose }: BagProps) {
    const { cartItems, updateCartItemQuantity, removeFromCart } = useProductContext();
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(0);

    useEffect(() => {
        const currency = localStorage.getItem('selectedCurrencySymbol');
        if (currency) {
            setSelectedCurrency(currency);
        } else {
            setSelectedCurrency('COP');
        }
    }, []);


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
                                <div key={item.id + item.variants.nodes[0].title} className="bagItem">
                                    <picture className="bagItemImage">
                                        <img src={item.images.edges[0].node.src} alt={item.title} />
                                    </picture>
                                    <div className="itemDetails">
                                        <a href={`/collections/${item.collections.nodes[0]?.title?.toLowerCase().replace(/\s+/g, '-') || ''}`}>{item.collections.nodes[0]?.title || 'Sin categoría'}</a>
                                        <a href={`/product/${item.title.toLowerCase().replace(/\s+/g, '-')}`}>{item.title}</a>
                                        <section aria-label='price' className='bagPriceIrem'>
                                            <div className="priceWrapper">
                                                <p className='productPrice'>{parseFloat(item.priceRange.minVariantPrice.amount.toString()).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}</p>
                                            </div>
                                        </section>
                                        <div className="itemVariants">
                                            <p>Talla: {item.variants.nodes[0].title}</p>
                                        </div>
                                        <div className="itemQuantity">
                                            <button className='quantity-button btn-primary' onClick={() => updateCartItemQuantity(item.id, item.quantity - 1, item.variants.nodes[0].title)}>
                                                <span>-</span>
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button className='quantity-button btn-primary' onClick={() => updateCartItemQuantity(item.id, item.quantity + 1, item.variants.nodes[0].title)}>
                                                <span>+</span>
                                            </button>
                                        </div>
                                    </div>
                                    <button className='removeItem btn-primary' onClick={() => removeFromCart(item.id, item.variants.nodes[0].title)}>
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
                                <p><span>Total</span> <span>{cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.priceRange.minVariantPrice.amount.toString()), 0).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}</span></p>
                                <button className='btn-secondary'>Comprar</button>
                            </div>
                        </footer>
                    )}
                </div>
            </div>
        </>
    )
}