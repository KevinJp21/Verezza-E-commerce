import { useState, useEffect } from "react";
import { useProductContext } from "~/hooks/ProductContext";
import ProductCarousel from "~/components/productCarousel/ProductCarousel";
import "./ShopProducts.css";

export default function ShopProducts() {
    const { products } = useProductContext();
    const TotalProducts = products.length;
    const [selectedCurrency, setSelectedCurrency] = useState<string>('COP');
    const [itemsPerRow, setItemsPerRow] = useState<number>(4);

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

    return (
        <section className="ShopProductsContainer">
            <header className="ShopHeaderContainer">
                <div className="ShopHeaderContent">
                    <p className="ProductsQuantity">{TotalProducts} PRODUCTOS</p>
                    <div className="ShopHeaderFiltersItem">
                        <p>FILTROS</p>
                        <span>|</span>
                        <select className="ShopHeaderFiltersItemSelect" role="listbox" title="Ordenar por">
                            <option value="1">MÁS VENDIDOS</option>
                            <option value="2">MÁS NUEVOS</option>
                            <option value="3">PRECIO: MENOR A MAYOR</option>
                            <option value="4">PRECIO: MAYOR A MENOR</option>
                        </select>
                    </div>
                </div>
            </header>
            <div className="ShopProductsContent" style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`
            }}>
                {products.map((product: any, index: number) =>
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
                                <button className='btn-secondary'>
                                    <span>VER PRODUCTO</span>
                                </button>
                            </div>
                    </div>
                )}
            </div>
        </section>
    )
}