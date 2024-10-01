import { useState, useCallback, useEffect } from 'react';
import { fetchCartItems, fetchWebUrl } from '~/api/getCartItems';

export function useCart() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [webUrl, setWebUrl] = useState<string | null>(null);

    const updateCart = useCallback(() => {
        const checkoutId = localStorage.getItem('checkoutId');
        if (checkoutId) {
            fetchCartItems(checkoutId).then(setCartItems).catch(console.error);
            fetchWebUrl(checkoutId).then(setWebUrl).catch(console.error);
        }
    }, []);

    useEffect(() => {
        updateCart();
    }, [updateCart]);

    return { cartItems, setCartItems, webUrl, updateCart };
}