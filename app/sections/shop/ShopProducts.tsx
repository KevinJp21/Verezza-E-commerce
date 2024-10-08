import { useProductContext } from "~/hooks/ProductContext";
import "./ShopProducts.css";

export default function ShopProducts() {
    const { products } = useProductContext();
    const TotalProducts = products.length;
    return (
        <>
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
        </>
    )
}