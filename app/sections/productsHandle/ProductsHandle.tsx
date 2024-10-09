import './ProductsHandle.css'
export default function ProductsHandle({ products }: { products: any }) {

    return (
        <section>
            <h2>Detalles del Producto</h2>
            <p>ID del producto: {products?.title}</p>
            {/* Aquí puedes agregar más detalles del producto */}
        </section>
    );
}