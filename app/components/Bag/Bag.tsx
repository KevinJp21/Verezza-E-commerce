import './Bag.css';
import { closeIcon } from '~/assets/icons/icons';
import { useContext } from 'react';
import { useProductContext } from '~/hooks/ProductContext';

interface BagProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Bag({ isOpen, onClose }: BagProps) {
    const { cartItems } = useProductContext();
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
                            <div className="cartItems">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="cartItem">
                                        <span>{item.title}</span>
                                        <span>{item.priceRange.minVariantPrice.amount}</span>
                                        <span>{item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="cartEmpty">
                                <p>La bolsa está vacía</p>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </>
    )
}