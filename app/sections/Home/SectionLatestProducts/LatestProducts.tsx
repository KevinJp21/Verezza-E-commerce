import { useState, useEffect, useRef } from 'react';
import { getLatestProducts } from '~/utils/GetLatestProucts';
import './LatestProducts.css';
import Index from '~/routes/_index';

export default function LatestProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [InitialIndex, setInitialIndex] = useState(0);
    const carrouselRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(5);
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

    // Obtener los productos
    useEffect(() => {
        async function fetchProducts() {
            const fetchedProducts = await getLatestProducts();
            setProducts(fetchedProducts);
        }
        fetchProducts();
    }, []);

    //Funciones de carrusel

    const next = () => {
        setInitialIndex((prevIndex) => (prevIndex + 1) % (products.length * 3));
    };

    const prev = () => {
        setInitialIndex((prevIndex) => (prevIndex - 1 + products.length * 3) % (products.length * 3));
    };

    const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setStartX(e.pageX - carrouselRef.current!.offsetLeft);
        setStartScrollLeft(carrouselRef.current!.scrollLeft);
        setAutoScrollEnabled(false);
    };

    const stopDragging = () => {
        setIsDragging(false);
        setTimeout(() => setAutoScrollEnabled(true), 5000);
    };

    const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carrouselRef.current!.offsetLeft;
        const walk = (x - startX) * 2;
        carrouselRef.current!.scrollLeft = startScrollLeft - walk;
    };

    useEffect(() => {
        if (carrouselRef.current) {
            carrouselRef.current.style.transition = 'transform 0.3s ease';
            carrouselRef.current.style.transform = `translateX(-${(InitialIndex % products.length) * (100 / itemsPerView)}%)`;
        }
    }, [InitialIndex, products.length, itemsPerView]);

    useEffect(() => {
        let intervalo: NodeJS.Timeout;
        if (autoScrollEnabled) {
            intervalo = setInterval(next, 8000);
        }
        return () => clearInterval(intervalo);
    }, [autoScrollEnabled]);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 600) {
                setItemsPerView(1);
            } else if (window.innerWidth < 900) {
                setItemsPerView(2);
            } else if (window.innerWidth < 1200) {
                setItemsPerView(3);
            } else if (window.innerWidth < 1500) {
                setItemsPerView(4);
            } else {
                setItemsPerView(5);
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="CarrouselContainer">
            <button onClick={prev} className="carrouselButton CarrouselButtonLeft">{'<'}</button>
            <div
                className="carrusel-viewport"
                onMouseDown={startDragging}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
                onMouseMove={onDrag}
            >
                <div className="CarrouselProducts" ref={carrouselRef}>
                    {[...products, ...products, ...products].map((product, index) => (
                        <div key={`${product.id}-${index}`} className="ProductItem" style={{flex: `0 0 ${100 / itemsPerView}%`, minWidth: `${100 / itemsPerView}%`}}>
                            <img src={product.images.edges[0].node.src} alt={product.images.edges[0].node.altText} draggable="false" width={280} height={451} />
                            <div className="ProductDetails">
                                <p>{product.title}</p>
                                <p>{parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={next} className="carrouselButton CarrouselButtonRight">{'>'}</button>
        </section>
    );
}