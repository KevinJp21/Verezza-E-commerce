import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllProducts } from '~/api/GetAllProducts';
import { Product } from '~/utils/TypeProducts';


interface CartItem extends Product {
  quantity: number;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts as Product[]);
      } catch (err) {
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext debe ser usado dentro de un ProductProvider');
  }
  return context;
};
