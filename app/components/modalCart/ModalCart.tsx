import { useState, useEffect } from 'react';
import './ModalCart.css'
import ProductCarousel from '../productCarousel/ProductCarousel';
import { closeIcon } from '~/assets/icons/icons';
import { useTranslation } from 'react-i18next';
import { useProductContext } from '~/hooks/ProductContext';
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
    const [selectedCurrency, setSelectedCurrency] = useState<string>('COP');
    const { t } = useTranslation();
    const { addToBag } = useProductContext();
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

    useEffect(() => {
        let currency = localStorage.getItem('selectedCurrencySymbol');
        if (currency) {
            setSelectedCurrency(currency);
        }
    }, [])

    //Agregar producto a la bolsa
    const handleAddToBag = () => {
        const productToAdd = {
            id: productId?.toString() || '',
            title: productName || '',
            description: productDescription,
            createdAt: new Date().toISOString(), // Añadir createdAt
            priceRange: {
                minVariantPrice: {
                    amount: productPrice.toString(),
                    currencyCode: selectedCurrency
                }
            },
            images: {
                edges: productImages.map((image) => ({
                    node: { src: image.src, altText: image.altText }
                }))
            },
            collections: {
                nodes: [] // Añadir collections vacío o con datos reales si están disponibles
            },
            variants: {
                nodes: productSizes.map((size) => ({
                    id: size.id,
                    title: size.title,
                    availableForSale: size.availableForSale
                }))
            }
        };

        addToBag(productToAdd, selectedQuantity); // Pasar ambos argumentos
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
                        <p className='productPrice'>{parseFloat(productPrice.toString()).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}</p>
                        <div className='ModalCartProductSize'>
                            <div className='size-header'>
                                <span>{t('modalCart.size_title')}</span>
                            </div>
                            <div className='size-buttons'>
                                {productSizes.map((size) => (
                                  
                                    <button
                                        key={size.id}
                                        className={`size-button ${selectedSize === size.title ? 'selected' : '' }`}
                                        onClick={() => handleSizeClick(size.title)}
                                        disabled={!size.availableForSale}
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
                    <button className='btn-secondary' onClick={handleAddToBag}><span>{t('modalCart.add_to_cart')}</span></button>
                    <button className='btn-secondary'><span>{t('modalCart.buy_now')}</span></button>
                </footer>
            </div>
        </div>
    )
}

export default ModalCart;