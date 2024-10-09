import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";
import { useProductContext } from "~/hooks/ProductContext";
import LoadingSpinner from "~/components/loadingSpinner/loadingSpinner";
import ProductsHandle from "~/sections/productsHandle/ProductsHandle";
export default function ProductDetail() {
    const { handle } = useParams();
    const { products } = useProductContext();
    const [loading, setLoading] = useState(true); 
    const [productExists, setProductExists] = useState(true);
    const navigate = useNavigate();

    // Buscamos el producto cuando los productos ya estén disponibles
    useEffect(() => {
        if (products.length > 0) {
            const product = products.find(product => product.handle === handle);
            if (!product) {
                setProductExists(false);
                navigate("/404"); // Redirigimos solo si el producto no existe
            }
            setLoading(false); // Terminamos de cargar una vez encontramos el producto
        }
    }, [products, handle, navigate]);

    if (loading) {
        return <LoadingSpinner isLoading={loading} />; // Indicamos que estamos esperando la carga de productos
    }

    if (!productExists) {
        return null;
    }

    const product = products.find(product => product.handle === handle);

    return (
        <ProductsHandle products={product} />
    );
}
