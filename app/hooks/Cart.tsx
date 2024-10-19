import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useFetcher } from '@remix-run/react';

interface CartItem {
    id: string;
    quantity: number;
    title: string;
    productTitle: string;
    price: string;
    currency: string;
    compareAtPrice?: string;
    imageUrl?: string;
    productHandle: string;
}

interface CartData {
    cartItems: CartItem[];
    totalQuantity: number;
    checkoutUrl: string;
    subtotal: string;
    error?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    webUrl: string | null;
    totalQuantity: number;
    subtotal: string;
    loading: boolean;
    error: string | null;
    updateCart: () => void;
    setCartItems: (cartItems: CartItem[]) => void;
    getTotalQuantity: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [webUrl, setWebUrl] = useState<string | null>(null);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [subtotal, setSubtotal] = useState<string>('0');
    const [error, setError] = useState<string | null>(null);
    const fetcher = useFetcher<CartData>();

    const loading = fetcher.state === 'submitting';

    const updateCart = useCallback(() => {
        if (fetcher.state === 'idle' && !fetcher.data) {
            fetcher.load('/api/cart/getCartItems');
        }
    }, [fetcher]);

    useEffect(() => {
        updateCart();
    }, [updateCart]);

    useEffect(() => {
        if (fetcher.data) {
            if (fetcher.data.error) {
                setError('Error al obtener los productos del carrito');
            } else {
                setCartItems(fetcher.data.cartItems);
                setTotalQuantity(fetcher.data.totalQuantity);
                setWebUrl(fetcher.data.checkoutUrl);
                setSubtotal(fetcher.data.subtotal);
                setError(null);
            }
    
        }
    }, [fetcher.data]);

    const getTotalQuantity = useCallback(() => {
        return totalQuantity;
    }, [totalQuantity]);

    const contextValue: CartContextType = {
        cartItems,
        setCartItems,
        webUrl,
        totalQuantity,
        subtotal,
        loading,
        error,
        updateCart,
        getTotalQuantity
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};
