import { useState, useCallback, useEffect } from 'react';
import { fetchCartItems, fetchWebUrl } from '~/api/getCartItems';
import { getProductsByIds } from '~/api/getCartItemsByIds';

export function useCart() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [webUrl, setWebUrl] = useState<string | null>(null);
    const [productDetails, setProductDetails] = useState<{[key: string]: any}>({});
    const [selectedCurrency, setSelectedCurrency] = useState('COP');

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
            const items = await fetchCartItems(checkoutId);
            setCartItems(items);
            const url = await fetchWebUrl(checkoutId);
            setWebUrl(url);

            const productIds = items.map((item: any) => item.productId);
            const details = await getProductsByIds(productIds, country, languageCode);
            const detailsMap: {[key: string]: any} = {};
            details.forEach((product: any) => {
                detailsMap[product.id] = product;
            });
            setProductDetails(detailsMap);
        }
    }, []);

    useEffect(() => {
        updateCart();
    }, [updateCart]);

    return { cartItems, setCartItems, webUrl, productDetails, updateCart };
}