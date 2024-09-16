import { useState } from 'react';
import './ModalCart.css'
import ProductCarousel from '../productCarousel/ProductCarousel';
import { closeIcon } from '~/assets/icons/icons';
interface ModalCartProps {
    isOpen: boolean;
    onClose: () => void;
    selectedProduct: string | null;
    productId: number | null;
    productName: string;
    productCategory: string;
    productPrice: number;
    productSizes: any[];
    productDescription: string;
    productImages: any[];

}

const ModalCart: React.FC<ModalCartProps> = ({ onClose, selectedProduct, productId, productName, productCategory, productPrice, productSizes, productDescription, productImages }) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const handleClose = () => {
        onClose();
    }

    const handleSizeClick = (size: string) => {
        setSelectedSize(size);
    }

    const handleQuantityClick = (quantity: number) => {
        setSelectedQuantity(quantity);
        //evitar que sea menor a 0
        if (quantity < 1) {
            setSelectedQuantity(1);
        }
    }

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
                    <div className='ModalCartProductInfo'>
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
                        <p className='productPrice'>{parseFloat(productPrice.toString()).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })} COP</p>
                        <div className='ModalCartProductSize'>
                            <div className='size-header'>
                                <span>SIZE</span>
                            </div>
                            <div className='size-buttons'>
                                {productSizes.map((size) => (
                                    <button
                                        key={size.id}
                                        className={`size-button ${selectedSize === size.title ? 'selected' : ''}`}
                                        onClick={() => handleSizeClick(size.title)}
                                    >
                                        {size.title}
                                    </button>
                                ))}
                            </div>
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
                    <button className='btn-secondary'><span>Agregar al carrito</span></button>
                    <button className='btn-secondary'><span>Comprar ahora</span></button>
                </footer>
            </div>
        </div>
    )
}

export default ModalCart;