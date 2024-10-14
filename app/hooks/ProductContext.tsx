import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllProducts } from '~/api/GetAllProducts';
import { Product } from '~/utils/TypeProducts';


interface CartItem extends Product {
  quantity: number;
}

interface ProductContextType {
  products: Product[];
  cartItems: CartItem[];
  addToBag: (product: Product, quantity: number, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number, size: string) => void;
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

  const addToBag = (product: Product, quantity: number, size: string) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id && item.variants.nodes.some(variant => variant.title === size));
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.variants.nodes.some(variant => variant.title === size) 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevItems, { ...product, quantity: quantity, variants: { nodes: [{ ...product.variants.nodes[0], title: size }] } }];
    });
  };
  
  const removeFromCart = (productId: string, size: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId || !item.variants.nodes.some(variant => variant.title === size)));
  };
  
  const updateCartItemQuantity = (productId: string, quantity: number, size: string) => {
    setCartItems(prevItems => 
      quantity < 1 
        ? prevItems.filter(item => item.id !== productId || !item.variants.nodes.some(variant => variant.title === size)) 
        : prevItems.map(item => 
            item.id === productId && item.variants.nodes.some(variant => variant.title === size) 
              ? { ...item, quantity: quantity } 
              : item
          )
    );
  };

  return (
    <ProductContext.Provider value={{ products, cartItems, addToBag, removeFromCart, updateCartItemQuantity, loading, error }}>
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
