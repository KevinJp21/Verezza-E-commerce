import { useState, useEffect, useRef } from 'react';
import { arrowLeftIcon, arrowRightIcon } from '~/assets/icons/icons';
import ProductCarousel from '../productCarousel/ProductCarousel';
import './CarouselSection.css';

interface CarouselSectionProps {
  title: string;
  products: any[];
}

export default function CarouselSection({ title, products }: CarouselSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(products.length);
    const carrouselRef = useRef<HTMLDivElement>(null);
    const [itemsPerView, setItemsPerView] = useState(5);
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
    const [transitionEnabled, setTransitionEnabled] = useState(true);

    const extendedProducts = [...products, ...products, ...products];

    const next = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const prev = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    useEffect(() => {
        if (carrouselRef.current) {
            const itemWidth = carrouselRef.current.offsetWidth / itemsPerView;
            const translateX = -(currentIndex * itemWidth);
            carrouselRef.current.style.transition = transitionEnabled ? 'transform 0.7s ease' : 'none';
            carrouselRef.current.style.transform = `translateX(${translateX}px)`;
        }
    }, [currentIndex, itemsPerView, transitionEnabled]);

    useEffect(() => {
        if (currentIndex === products.length * 2) {
            setTransitionEnabled(false);
            setCurrentIndex(products.length);
            setTimeout(() => setTransitionEnabled(true), 0);
        } else if (currentIndex === products.length - 1) {
            setTransitionEnabled(false);
            setCurrentIndex(products.length * 2 - 1);
            setTimeout(() => setTransitionEnabled(true), 0);
        }
    }, [currentIndex, products.length]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (autoScrollEnabled) {
            interval = setInterval(next, 7000);
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
            setCurrentIndex(products.length);
            setTimeout(() => setAutoScrollEnabled(true), 1000);
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [products.length]);

    const handlePause = () => {
        setAutoScrollEnabled(false);
    };

    const handleResume = () => {
        setAutoScrollEnabled(true);
    };

    return (
        <section className="CarrouselContainer">
            <div className="CarrouselHeader">
                <h2>{title}</h2>
                <div className="CarrouselButtons" onMouseEnter={handlePause} onMouseLeave={handleResume}>
                    <button onClick={prev} className="carrouselButton CarrouselButtonLeft">{arrowLeftIcon()}</button>
                    <button onClick={next} className="carrouselButton CarrouselButtonRight">{arrowRightIcon()}</button>
                </div>
            </div>
            <div
                className="carrusel-viewport"
                onMouseEnter={handlePause}
                onMouseLeave={handleResume}
            >
                <div 
                    className="CarrouselProducts" 
                    ref={carrouselRef}
                >
                    {extendedProducts.map((product, index) => (
                        <div
                            key={`${product.id}-${index}`}
                            className="ProductItem"
                            style={{ flex: `0 0 ${100 / itemsPerView}%`, minWidth: `${100 / itemsPerView}%` }}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <ProductCarousel images={product.images.edges.map(({ node }: any) => node)} productId={product.id} />
                            <div className="ProductDetails">
                                <p>{product.title}</p>
                                <p>{parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
