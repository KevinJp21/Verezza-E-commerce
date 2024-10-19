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
    error?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    webUrl: string | null;
    totalQuantity: number;
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetcher = useFetcher<CartData>();

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
                setError(null);
            }
            setLoading(false);
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
