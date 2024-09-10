import CarouselSection from '~/components/carouselSection/CarouselSection';
import './LatestProducts.css';
import { useProductContext } from '~/hooks/ProductContext';

export default function LatestProducts() {
    const { products } = useProductContext();

    //Obtener los productos mas recientes segun su fecha de creacion
    const latestProducts = products.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

    
    return (
        <CarouselSection title="RECIENTES" products={latestProducts} />
    );
}
