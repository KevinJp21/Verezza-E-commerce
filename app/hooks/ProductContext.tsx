import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllProducts } from '~/utils/GetAllProducts';

interface PriceRange {
  minVariantPrice: {
    amount: string;
    currencyCode: string;
  };
}

interface Image {
  src: string;
  altText: string | null;
}

interface Collection {
  title: string;
  id: string;
}

interface Variant {
  id: string;
  title: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        src: string;
        altText: string | null;
      };
    }>;
  };
  collections: {
    nodes: Array<{
      title: string;
      id?: string; // Hacemos el id opcional
    }>;
  };
  variants: {
    nodes: Array<{
      id: string;
      title: string;
    }>;
  };
}

interface CartItem extends Product {
  quantity: number;
}

interface ProductContextType {
  products: Product[];
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  loading: boolean;
  error: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
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

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  return (
    <ProductContext.Provider value={{ products, cartItems, addToCart, removeFromCart, loading, error }}>
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
