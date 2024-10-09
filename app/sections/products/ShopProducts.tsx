import { useState, useEffect } from "react";
import { useProductContext } from "~/hooks/ProductContext";
import ProductCarousel from "~/components/productCarousel/ProductCarousel";
import { useTranslation } from "react-i18next";
import ModalCart from "~/components/modalCart/ModalCart";
import "./ShopProducts.css";

export default function ShopProducts() {
    const { t } = useTranslation();
    const { products } = useProductContext();
    const TotalProducts = products.length;
    const [selectedCurrency, setSelectedCurrency] = useState<string>('COP');
    const [itemsPerRow, setItemsPerRow] = useState<number>(4);
    const [specialItems, setSpecialItems] = useState<JSX.Element[]>([]);

    //Modal cart props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [productId, setProductId] = useState<number | null>(null);
    const [productName, setProductName] = useState<string>('');
    const [productCategory, setProductCategory] = useState<string>('');
    const [productPrice, setProductPrice] = useState<number>(0);
    const [productDiscountPrice, setProductDiscountPrice] = useState<number>(0);
    const [productSizes, setProductSizes] = useState<string[]>([]);
    const [productDescription, setProductDescription] = useState<string>('');
    const [productImages, setProductImages] = useState<string[]>([]);

    useEffect(() => {
        let currency = localStorage.getItem('selectedCurrencySymbol');
        if (currency) {
            setSelectedCurrency(currency);
        }

        function handleResize() {
            if (window.innerWidth < 450) {
                setItemsPerRow(1);
            } else if (window.innerWidth < 900) {
                setItemsPerRow(2);
            } else if (window.innerWidth < 1200) {
                setItemsPerRow(3);
            } else {
                setItemsPerRow(4);
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Generar elementos especiales
        const generateSpecialItems = () => {
            const items = [
                <div key="promo" className="ShopProductsItem SpecialItem videoFashionOfPower">
                    <video src="https://cdn.shopify.com/videos/c/o/v/4716a587e6094175a493f8e84a26ceef.mp4" autoPlay muted loop playsInline></video>
                </div>
            ];
            setSpecialItems(items);
        };

        generateSpecialItems();
    }, []);

    const insertSpecialItems = (items: JSX.Element[]) => {
        const result = [...items];
        const positions = new Set<number>();

        // Determinar posiciones aleatorias para insertar elementos especiales
        while (positions.size < specialItems.length) {
            const pos = Math.floor(Math.random() * (items.length + specialItems.length));
            if (!positions.has(pos)) positions.add(pos);
        }

        // Insertar elementos especiales en las posiciones determinadas
        let specialItemIndex = 0;
        positions.forEach(pos => {
            result.splice(pos, 0, specialItems[specialItemIndex]);
            specialItemIndex++;
        });

        return result;
    };

    //Modal cart
    const handleOpenModal = (product: any) => {
        setIsModalOpen(true);
        setSelectedProduct(product.title);
        setProductId(product.id);
        setProductName(product.title);
        setProductCategory(product.productType || 'Sin categoría');
        setProductPrice(product.variants?.nodes?.[0]?.price?.amount || 0);
        setProductDiscountPrice(product.variants?.nodes?.[0]?.compareAtPrice?.amount || null);
        setProductSizes(product.variants?.nodes || []);
        setProductDescription(product.description || '');
        setProductImages(product.images?.edges?.map(({ node }: any) => node) || []);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    //Products filters
    const [sortBy, setSortBy] = useState<string>('1');

    const handleSortBy = (value: string) => {
        setSortBy(value);
    };

    const sortProducts = (products: any[]) => {
        return [...products].sort((a, b) => {
            switch (sortBy) {
                case '1': // Más Viejos (asumiendo que hay un campo 'createdAt')
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case '2': // Precio ascendente
                    return a.variants.nodes[0].price.amount - b.variants.nodes[0].price.amount;
                case '3': // Precio descendente
                    return b.variants.nodes[0].price.amount - a.variants.nodes[0].price.amount;
                default: // Por defecto, no se ordena
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();;
            }
        });
    };
    return (
        <section className="ShopProductsContainer">
            <header className="ShopHeaderContainer">
                <div className="ShopHeaderContent">
                    <p className="ProductsQuantity">{t('products.products_quantity')} {TotalProducts}</p>
                    <div className="ShopHeaderFiltersItem">
                        <p>{t('products.products_filters')}</p>
                        <span>|</span>
                        <select className="ShopHeaderFiltersItemSelect" role="listbox" title={t('products.products_sort_by')} onChange={(e) => handleSortBy(e.target.value)}>
                            <option value="0">{t('products.products_default')}</option>
                            <option value="1">{t('products.products_oldest')}</option>
                            <option value="2">{t('products.products_price_asc')}</option>
                            <option value="3">{t('products.products_price_desc')}</option>
                        </select>
                    </div>
                </div>
            </header>
            <div className="ShopProductsContent" style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`
            }}>
                {insertSpecialItems(sortProducts(products).map((product: any, index: number) =>
                    <div className="ShopProductsItem" key={`${product.id}-${index}`}>
                        <ProductCarousel
                            productImages={product.images.edges.map(({ node }: any) => node)}
                            productId={product.id}
                            productName={product.title}
                        />

                        <div className="ProductDetails">
                            <div className="ProductDetailsHeader">
                                <a href={`/collections/${product.productType.toLowerCase().replace(/\s+/g, '-')}`}>{product.productType}</a>
                            </div>
                            <div className="ProductContent">
                                <a href={`/products/${product.handle}`}>
                                    <p>{product.title}</p>
                                </a>

                                <p>
                                    {product.variants.nodes[0].compareAtPrice && (
                                        <span className='ProductPriceDiscount'>{parseFloat(product.variants.nodes[0].compareAtPrice.amount).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}</span>
                                    )}

                                    <span>{parseFloat(product.variants.nodes[0].price.amount).toLocaleString(selectedCurrency === 'USD' ? 'en-US' : selectedCurrency === 'COP' ? 'es-CO' : 'es-ES', { style: 'currency', currency: selectedCurrency, minimumFractionDigits: 0 })} {selectedCurrency}

                                    </span>

                                </p>
                            </div>
                        </div>

                        <div className="ProductDetailsFooter">
                            <div className="ProductSize">
                                {product.variants.nodes.map((size: any) => (
                                    <span key={size.id}>{size.title}</span>
                                ))}
                            </div>
                            <button className='btn-secondary' onClick={() => handleOpenModal(product)}>
                                <span>{t('products.buy_now')}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && <ModalCart isOpen={isModalOpen} onClose={handleCloseModal} selectedProduct={selectedProduct} productId={productId} productName={productName} productCategory={productCategory} productPrice={productPrice} productDiscountPrice={productDiscountPrice} productSizes={productSizes} productDescription={productDescription} productImages={productImages} />}
        </section>
    )
}