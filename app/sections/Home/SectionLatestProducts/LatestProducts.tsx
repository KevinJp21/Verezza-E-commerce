import { useState, useEffect } from 'react';
import CarouselSection from '~/components/carouselSection/CarouselSection';
import './LatestProducts.css';
import { useProductContext } from '~/hooks/ProductContext';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '~/components/loadingSpinner/loadingSpinner';

export default function LatestProducts() {
    const { t } = useTranslation();
    const { products } = useProductContext();
    const [isLoading, setIsLoading] = useState(true);

    //Obtener los productos mas recientes segun su fecha de creacion
    const latestProducts = products.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

    useEffect(() => {
        if (latestProducts.length > 0) {
            setIsLoading(false);
        }
    }, [latestProducts]);

    //Cargar loading spinner al iniciar
    if (isLoading) {
        return <LoadingSpinner isLoading={isLoading} />;
    }


    return (
        <CarouselSection title={t("home.section_latest_products.title")} products={latestProducts} />
    );
}
