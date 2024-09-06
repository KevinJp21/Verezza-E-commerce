import { useState, useEffect } from 'react';
import { getLatestProducts } from '~/utils/GetLatestProucts';
import CarouselSection from '~/components/carouselSection/CarouselSection';
import './LatestProducts.css';

export default function LatestProducts() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            const fetchedProducts = await getLatestProducts();
            setProducts([...fetchedProducts, ...fetchedProducts.slice(0, 5)]);
        }
        fetchProducts();
    }, []);

    return (
        <CarouselSection title="RECIENTES" products={products} />
    );
}
