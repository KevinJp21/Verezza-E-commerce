import { useState, useEffect } from "react";
import { useProductContext } from "~/hooks/ProductContext";
import ProductCarousel from "~/components/productCarousel/ProductCarousel";
import { useTranslation } from "react-i18next";
import ModalCart from "~/components/modalCart/ModalCart";
import LoadingSpinner from "~/components/loadingSpinner/loadingSpinner";
import { Pagination } from "@mui/material";
import "./ShopProducts.css";
import { useSearchParams, useNavigate } from "@remix-run/react";
import { Product } from "~/utils/TypeProducts";

export default function ShopProducts() {
    const { t } = useTranslation();
    const [selectedCurrency, setSelectedCurrency] = useState<string>('COP');
    const [itemsPerRow, setItemsPerRow] = useState<number>(4);
    const [specialItems, setSpecialItems] = useState<JSX.Element[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    //Modal cart props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [productId, setProductId] = useState<string>('');
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

    // URL params
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const sortBy = searchParams.get('sort_by') || 'created-descending';
    const categoryFilter = searchParams.get('category') || 'all';

    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    // Opciones de filtrado y ordenamiento
    const categoryOptions = [
        { value: 'all', label: t('products.all_products') },
        { value: t('products.blouses'), label: t('products.blouses') },
        { value: t('products.dresses'), label: t('products.dresses') },
        { value: t('products.sets'), label: t('products.sets') },
        { value: t('products.pants'), label: t('products.pants') },
        { value: t('products.complements'), label: t('products.complements') },
        { value: t('products.shorts'), label: t('products.shorts') },
        { value: t('products.skirts'), label: t('products.skirts') },
        { value: t('products.jackets'), label: t('products.jackets') }
    ];


    const sortOptions = [
        { value: 'created-descending', label: t('products.products_default') },
        { value: 'created-ascending', label: t('products.products_oldest') },
        { value: 'price-ascending', label: t('products.products_price_asc') },
        { value: 'price-descending', label: t('products.products_price_desc') },
        { value: 'title-ascending', label: t('products.products_name_asc') },
        { value: 'title-descending', label: t('products.products_name_desc') },
    ];


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

    // Agregar un estado para las posiciones de los elementos especiales
    const [specialItemPositions, setSpecialItemPositions] = useState<Set<number>>(new Set());

    // Modificar el useEffect de los elementos especiales
    useEffect(() => {
        const generateSpecialItems = () => {
            const items = [
                <div key="promo" className="ShopProductsItem SpecialItem videoFashionOfPower">
                    <video src="https://cdn.shopify.com/videos/c/o/v/4716a587e6094175a493f8e84a26ceef.mp4" autoPlay muted loop></video>
                </div>
            ];
            setSpecialItems(items);

            // Generar y guardar las posiciones una sola vez
            const positions = new Set<number>();
            while (positions.size < items.length) {
                const pos = Math.floor(Math.random() * (products.length + items.length));
                if (!positions.has(pos)) positions.add(pos);
            }
            setSpecialItemPositions(positions);
        };

        generateSpecialItems();
    }, []); // Solo se ejecuta una vez al montar el componente

    // Modificar la función insertSpecialItems
    const insertSpecialItems = (items: JSX.Element[]) => {
        const result = [...items];
        let specialItemIndex = 0;
        
        // Usar las posiciones guardadas en el estado
        Array.from(specialItemPositions).sort((a, b) => a - b).forEach(pos => {
            if (specialItemIndex < specialItems.length) {
                result.splice(pos, 0, specialItems[specialItemIndex]);
                specialItemIndex++;
            }
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
    // Manejadores de filtros
    const handleCategoryFilter = (value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value === 'all') {
            newParams.delete('category');
        } else {
            newParams.set('category', value);
        }
        setCurrentPage(1);
        newParams.set('page', '1');
        navigate(`?${newParams.toString()}`, { replace: true });
    };

    const handleSortBy = (value: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort_by', value);
        navigate(`?${newParams.toString()}`, { replace: true });
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', value.toString());

        // Primero realizamos el scroll suave
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Esperamos a que termine la animación antes de actualizar la URL
        setTimeout(() => {
            navigate(`?${newParams.toString()}`, { replace: true });
            setCurrentPage(value);
        }, 500);
    };

    // Función de filtrado y ordenamiento
    const filterAndSortProducts = (products: any[]) => {
        let filteredProducts = [...products];

        // Aplicar filtro de categoría
        if (categoryFilter !== 'all') {
            filteredProducts = filteredProducts.filter(
                (product: Product) => product.productType.toLowerCase() === categoryFilter.toLowerCase()
            );
        }

        // Aplicar ordenamiento
        return filteredProducts.sort((a, b) => {
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

    // Effects
    useEffect(() => {
        if (products.length === 0 || products.length > 0) {
            setLoading(false);
        }
    }, [products]);

    useEffect(() => {
        const page = parseInt(searchParams.get('page') || '1');
        setCurrentPage(page);
    }, [searchParams]);


    //Cargar loading spinner al iniciar
    if (isLoading) {
        return <LoadingSpinner isLoading={isLoading} />;
    }

    // Aplicar filtros y paginación
    const filteredAndSortedProducts = filterAndSortProducts(products);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);


    //Aplicar animacion al hacer click
    const handleClick = (index: number) => {
        setClickedIndex(clickedIndex === index ? null : index);
    };
    return (
        <section className="ShopProductsContainer">
            <header className="ShopHeaderContainer">
                <div className="ShopHeaderContent">
                    <div className="ShopHeaderFilters">
                        <div className="ShopHeaderFiltersGroup">
                            <label>{t('products.products_filters')}:</label>
                            <div className="ShopHeaderFiltersSelects">
                                <div className="SelectWrapper">
                                    <select
                                        className="ShopHeaderFiltersItemSelect"
                                        role="listbox"
                                        onChange={(e) => handleCategoryFilter(e.target.value)}
                                        title="Filter category"
                                        value={categoryFilter}
                                    >
                                        {categoryOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="SelectArrow">▼</span>
                                </div>
                                <div className="SelectDivider"></div>
                                <div className="SelectWrapper">
                                    <select
                                        className="ShopHeaderFiltersItemSelect"
                                        role="listbox"
                                        id="products-sort-by"
                                        title="Filter sort"
                                        onChange={(e) => handleSortBy(e.target.value)}
                                        value={sortBy}
                                    >
                                        {sortOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="SelectArrow">▼</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="ShopProductsContent" style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`
            }}>
                {insertSpecialItems(currentProducts.map((product: any, index: number) =>
                    <div className={`ShopProductsItem ${clickedIndex === index ? 'clicked' : ''} product-item`}
                        key={`${product.id}-${index}`}
                        onClick={() => handleClick(index)}
                    >
                        <ProductCarousel
                            productImages={product.images.edges.map(({ node }: any) => node)}
                            productId={product.id}
                            productName={product.title}
                        />

                        <div className="ProductDetails">
                            <div className="ProductDetailsHeader">
                                <a href={`/products?category=${product.productType.toLowerCase().replace(/\s+/g, '-')}`}>{product.productType}</a>
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
                    count={Math.ceil(filteredAndSortedProducts.length / productsPerPage)}
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
