import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";
import { useProductContext } from "~/hooks/ProductContext";
import LoadingSpinner from "~/components/loadingSpinner/loadingSpinner";
import ProductsHandle from "~/sections/productsHandle/ProductsHandle";
import { MetaFunction } from "@remix-run/react";
import { Product } from "~/utils/TypeProducts";
import { LoaderFunction, redirect } from "@remix-run/node";
import axios from "axios";

export let loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  //console.log(url);
  
  const countryCode = url.searchParams.get('countryCode') || 'US';
  const languageCode = url.searchParams.get('languageCode') || 'EN';
    try {
        const response = await axios.get(`${url.origin}/api/products/getProductByHandle/${params.handle}?countryCode=${countryCode}&languageCode=${languageCode}`);
        if(response.status !== 200){
          throw new Response("Producto no encontrado", { status: 404 });
        }
        const product = await response.data;
        if (!product) {
            console.log(`No se encontró ningún producto con el handle: ${params.handle}`);
            throw new Response("Producto no encontrado", { status: 404 });
        }
        
        return { product };
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        return redirect("/pagina-no-encontrada");
    }
};

// Esta es la función `meta` por defecto si no se encuentra el producto
export const meta: MetaFunction = ({ data }) => {
    const { product } = data as { product: Product };
        return [
        { title: `${product.title} | VEREZZA` },
        { name: "description", content: `${product.description || "Producto no encontrado"}` },
        { name: "og:site_name", content: "Verezza" },
        { name: "og:description", content: `${product?.description || "Producto no encontrado"}` },
        { name: "og:url", content: `https://verezzastore.com/products/${product?.handle || ""}` },
        { name: "og:title", content: `${product?.title || "Producto no encontrado"}`},
        { name: "og:type", content: "product"},
        { name: "og:image", content:`${product.images?.edges?.[0]?.node?.url}` },
        { name: "og:image:width", content: "1440" },
        { name: "og:image:height", content: "2160" },
        { name: "og:price:amount", content: `${product.priceRange?.minVariantPrice?.amount}` },
        { name: "og:price:currency", content: `${product.priceRange?.minVariantPrice?.currencyCode}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: `${product.images?.edges?.[0]?.node?.url}` },
        { name: "twitter:title", content: `${product.title || ""}` },
        { name: "twitter:description", content: `${product.description || ""}` }
    ];
};

export default function ProductDetail() {
    const { handle } = useParams();
    const { products } = useProductContext();
    const [loading, setLoading] = useState(true);
    const [productExists, setProductExists] = useState(true);

    const navigate = useNavigate();
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
        <ProductsHandle products={product as Product} />
    );
}
