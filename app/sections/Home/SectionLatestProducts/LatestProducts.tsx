import { useState, useEffect, useRef } from 'react';
import { getLatestProducts } from '~/utils/GetLatestProucts';
import './LatestProducts.css';
import { arrowLeftIcon, arrowRightIcon } from '~/assets/icons/icons';

export default function LatestProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carrouselRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragPosition, setDragPosition] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(5);
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
    const [transitionEnabled, setTransitionEnabled] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            const fetchedProducts = await getLatestProducts();
            setProducts([...fetchedProducts, ...fetchedProducts.slice(0, itemsPerView)]);
        }
        fetchProducts();
    }, [itemsPerView]);

    const next = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex < products.length - itemsPerView) {
                return prevIndex + 1;
            } else {
                setTransitionEnabled(false);
                setCurrentIndex(0);
                setTimeout(() => {
                    setTransitionEnabled(true);
                    setCurrentIndex(1);
                }, 0);
                return prevIndex;
            }
        });
    };

    const prev = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex > 0) {
                return prevIndex - 1;
            } else {
                setTransitionEnabled(false);
                setCurrentIndex(products.length - itemsPerView);
                setTimeout(() => {
                    setTransitionEnabled(true);
                    setCurrentIndex(products.length - itemsPerView - 1);
                }, 0);
                return prevIndex;
            }
        });
    };

    const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setAutoScrollEnabled(false);
    };

    const stopDragging = () => {
        setIsDragging(false);
        const dragDistance = dragPosition;
        const itemWidth = carrouselRef.current?.offsetWidth ? carrouselRef.current.offsetWidth / itemsPerView : 0;
        if (Math.abs(dragDistance) > itemWidth / 2) {
            if (dragDistance > 0) {
                prev();
            } else {
                next();
            }
        }
        setDragPosition(0);
        setTimeout(() => setAutoScrollEnabled(true), 5000);
    };

    const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.clientX;
        const walk = x - startX;
        setDragPosition(walk);
    };

    useEffect(() => {
        if (carrouselRef.current) {
            const itemWidth = carrouselRef.current.offsetWidth / itemsPerView;
            const translateX = -(currentIndex * itemWidth) + dragPosition;
            carrouselRef.current.style.transition = transitionEnabled ? 'transform 0.3s ease' : 'none';
            carrouselRef.current.style.transform = `translateX(${translateX}px)`;
        }
    }, [currentIndex, itemsPerView, dragPosition, transitionEnabled]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (autoScrollEnabled) {
            interval = setInterval(next, 8000);
        }
        return () => clearInterval(interval);
    }, [autoScrollEnabled]);

    useEffect(() => {
        function handleResize() {
            setAutoScrollEnabled(false);
            if (window.innerWidth < 600) {
                setItemsPerView(1);
            } else if (window.innerWidth < 900) {
                setItemsPerView(2);
            } else if (window.innerWidth < 1200) {
                setItemsPerView(3);
            } else {
                setItemsPerView(4);
            }
            setCurrentIndex(0);
            setTimeout(() => setAutoScrollEnabled(true), 1000);
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="CarrouselContainer">
            <div className="CarrouselHeader">
                <h2>RECIENTES</h2>
                <div className="CarrouselButtons">
                    <button onClick={prev} className="carrouselButton CarrouselButtonLeft">{arrowLeftIcon()}</button>
                    <button onClick={next} className="carrouselButton CarrouselButtonRight">{arrowRightIcon()}</button>
                </div>
            </div>
            <div
                className="carrusel-viewport"
                onMouseDown={startDragging}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
                onMouseMove={onDrag}
            >
                <div 
                    className="CarrouselProducts" 
                    ref={carrouselRef}
                >
                    {products.map((product, index) => (
                        <a
                            href='#'
                            key={`${product.id}-${index}`}
                            className="ProductItem"
                            style={{ flex: `0 0 ${100 / itemsPerView}%`, minWidth: `${100 / itemsPerView}%` }}
                            onMouseDown={(e) => e.preventDefault()} // Prevenir comportamiento predeterminado
                        >
                            <img src={product.images.edges[0].node.src} alt={product.images.edges[0].node.altText} draggable="false" width={280} height={600} />
                            <div className="ProductDetails">
                                <p>{product.title}</p>
                                <p>{parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
          
        </section>
    );
}
