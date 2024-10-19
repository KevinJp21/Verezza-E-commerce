import { useState, useCallback, useEffect } from 'react';
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

export function useCart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [webUrl, setWebUrl] = useState<string | null>(null);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const fetcher = useFetcher<CartData>();

    const updateCart = useCallback(() => {
        const currency = localStorage.getItem('selectedCurrencySymbol') || 'COP';
        setSelectedCurrency(currency);

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
                console.error('Error al obtener los productos del carrito:', fetcher.data.error);
            } else {
                setCartItems(fetcher.data.cartItems);
                setTotalQuantity(fetcher.data.totalQuantity);
                setWebUrl(fetcher.data.checkoutUrl);
            }
        }
    }, [fetcher.data]);

    const getTotalQuantity = useCallback(() => {
        return totalQuantity;
    }, [totalQuantity]);

    return { cartItems, setCartItems, webUrl, updateCart, getTotalQuantity };
}
