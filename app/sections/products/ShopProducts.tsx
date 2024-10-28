import { useState, useEffect } from "react";
import { useProductContext } from "~/hooks/ProductContext";
import ProductCarousel from "~/components/productCarousel/ProductCarousel";
import { useTranslation } from "react-i18next";
import ModalCart from "~/components/modalCart/ModalCart";
import LoadingSpinner from "~/components/loadingSpinner/loadingSpinner";
import { Pagination } from "@mui/material";
import "./ShopProducts.css";
import { useSearchParams, useNavigate } from "@remix-run/react";

export default function ShopProducts() {
    const { t } = useTranslation();
    const [selectedCurrency, setSelectedCurrency] = useState<string>('COP');
    const [itemsPerRow, setItemsPerRow] = useState<number>(4);
    const [specialItems, setSpecialItems] = useState<JSX.Element[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    //Modal cart props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [productId, setProductId] = useState<string | null>(null);
    const [productName, setProductName] = useState<string>('');
    const [productCategory, setProductCategory] = useState<string>('');
    const [productPrice, setProductPrice] = useState<number>(0);
    const [productDiscountPrice, setProductDiscountPrice] = useState<number>(0);
    const [productSizes, setProductSizes] = useState<string[]>([]);
    const [productDescription, setProductDescription] = useState<string>('');
    const [productImages, setProductImages] = useState<string[]>([]);
    const [productHandle, setProductHandle] = useState<string>('');
    // Agregar estados para paginación
    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 15;
    //Products
    const { products } = useProductContext();
    const TotalProducts = products.length;

    //Ordenar productos por los mas nuevos



    useEffect(() => {
        if (products.length > 0) {
            setLoading(false);
        }
    }, [products]);


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
                    <video src="https://cdn.shopify.com/videos/c/o/v/4716a587e6094175a493f8e84a26ceef.mp4" autoPlay muted loop></video>
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
        setProductHandle(product.handle || '');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    //Products filters
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const sortBy = searchParams.get('sort_by') || 'created-descending';
    
    // Definir las opciones de ordenamiento con valores compatibles con URLs
    const sortOptions = [
        { value: 'created-descending', label: t('products.products_default') },
        { value: 'created-ascending', label: t('products.products_oldest') },
        { value: 'price-ascending', label: t('products.products_price_asc') },
        { value: 'price-descending', label: t('products.products_price_desc') },
        { value: 'title-ascending', label: t('products.products_name_asc') },
        { value: 'title-descending', label: t('products.products_name_desc') },
    ];

    // Actualizar el manejador de ordenamiento
    const handleSortBy = (value: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort_by', value);
        navigate(`?${newParams.toString()}`, { replace: true });
    };

    // Actualizar la función de ordenamiento
    const sortProducts = (products: any[]) => {
        return [...products].sort((a, b) => {
            switch (sortBy) {
                case 'created-ascending':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'created-descending':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'price-ascending':
                    return a.variants.nodes[0].price.amount - b.variants.nodes[0].price.amount;
                case 'price-descending':
                    return b.variants.nodes[0].price.amount - a.variants.nodes[0].price.amount;
                case 'title-ascending':
                    return a.title.localeCompare(b.title);
                case 'title-descending':
                    return b.title.localeCompare(a.title);
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });
    };

    //Cargar loading spinner al iniciar
    if (isLoading) {
        return <LoadingSpinner isLoading={isLoading} />;
    }

    // Modificar la lógica de renderizado para incluir paginación
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortProducts(products).slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="ShopProductsContainer">
            <header className="ShopHeaderContainer">
                <div className="ShopHeaderContent">
                    <p className="ProductsQuantity">{TotalProducts} {t('products.products_quantity')}</p>
                    <div className="ShopHeaderFiltersItem">
                        <p>{t('products.products_filters')}</p>
                        <span>|</span>
                        <select 
                            className="ShopHeaderFiltersItemSelect" 
                            role="listbox" 
                            id="products-sort-by" 
                            title={t('products.products_sort_by')} 
                            onChange={(e) => handleSortBy(e.target.value)}
                            value={sortBy}
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </header>
            <div className="ShopProductsContent" style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`
            }}>
                {insertSpecialItems(currentProducts.map((product: any, index: number) =>
                    <div className="ShopProductsItem" key={`${product.id}-${index}`}>
                        <ProductCarousel
                            productImages={product.images.edges.map(({ node }: any) => node)}
                            productId={product.id}
                            productName={product.title}
                        />

                        <div className="ProductDetails">
                            <div className="ProductDetailsHeader">
                                <a href={`/category/${product.productType.toLowerCase().replace(/\s+/g, '-')}`}>{product.productType}</a>
                            </div>
                            <div className="ProductContent">
                                <p>{product.title}</p>
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

            <div className="pagination-container" style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '2rem 0'
            }}>
                <Pagination
                    count={Math.ceil(products.length / productsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="medium"
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        '& .MuiPaginationItem-root': {
                            color: 'rgba(51, 51, 51, 1)',
                            backgroundColor: "#fff",
                            '&:hover': {
                                backgroundColor: 'rgba(183, 183, 183, 1)',
                            },
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(183, 183, 183, 1)',
                                color: 'rgba(51, 51, 51, 1)',
                                '&:hover': {
                                    backgroundColor: 'rgba(183, 183, 183, 1)',
                                },
                            },
                        },
                    }}
                />
            </div>
            {isModalOpen && <ModalCart isOpen={isModalOpen} onClose={handleCloseModal} selectedProduct={selectedProduct} productId={productId} productName={productName} productCategory={productCategory} productPrice={productPrice} productDiscountPrice={productDiscountPrice} productSizes={productSizes} productDescription={productDescription} productImages={productImages} productHandle={productHandle} />}
        </section>
    )
}
