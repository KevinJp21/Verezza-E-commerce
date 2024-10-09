import { useState, useCallback, useEffect } from 'react';
import { fetchCartItems, fetchWebUrl } from '~/api/getCartItems';
import { getProductsByIds } from '~/api/getCartItemsByIds';
import { getCheckoutStatus } from '~/api/getCartItems';
export function useCart() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [webUrl, setWebUrl] = useState<string | null>(null);
    const [productDetails, setProductDetails] = useState<{[key: string]: any}>({});
    const [selectedCurrency, setSelectedCurrency] = useState('');

    const getTotalQuantity = useCallback(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const updateCart = useCallback(async () => {
        const checkoutId = localStorage.getItem('checkoutId');
        const currency = localStorage.getItem('selectedCurrencySymbol') || 'COP';
        const language = localStorage.getItem('selectedLanguage') || 'Español';

        let country = '';
        let languageCode = '';

        if (currency) {
            setSelectedCurrency(currency);
            if (currency === 'COP') {
                country = 'CO';
            } else if (currency === 'USD') {
                country = 'US';
            } else {
                country = 'ES';
            }
        } 

        if (language) {
            if (language === 'Español') {
                languageCode = 'ES';
            } else {
                languageCode = 'EN';
            }
        }

        if (checkoutId) {
            try {
                const checkoutStatus = await getCheckoutStatus(checkoutId);
                if (checkoutStatus === 'COMPLETED') {
                    // El checkout se completó, limpiamos el carrito
                    localStorage.removeItem('checkoutId');
                    setCartItems([]);
                    setWebUrl(null);
                    setProductDetails({});
                    window.dispatchEvent(new Event('cartUpdated'));
                    return;
                }

                const items = await fetchCartItems(checkoutId);
                setCartItems(items);
                const url = await fetchWebUrl(checkoutId);
                setWebUrl(url);

                if (items.length > 0) {
                    const productIds = items.map((item: any) => item.productId);
                    const details = await getProductsByIds(productIds, country, languageCode);
                    const detailsMap: {[key: string]: any} = {};
                    details.forEach((product: any) => {
                        detailsMap[product.id] = product;
                    });
                    setProductDetails(detailsMap);
                } else {
                    setProductDetails({});
                }
            } catch (error) {
                console.error('Error al actualizar el carrito:', error);
                // Si hay un error, asumimos que el checkout ya no es válido
                localStorage.removeItem('checkoutId');
                setCartItems([]);
                setWebUrl(null);
                setProductDetails({});
            }
        }
    }, []);

    useEffect(() => {
        updateCart();
    }, [updateCart]);

    return { cartItems, setCartItems, webUrl, productDetails, updateCart, getTotalQuantity };
}