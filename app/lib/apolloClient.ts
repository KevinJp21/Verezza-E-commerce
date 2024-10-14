import { ApolloClient, InMemoryCache } from "@apollo/client/core";
const SHOPIFY_STOREFRONT_API_URL = process.env.SHOPIFY_STOREFRONT_API_URL as string;
const SHOPIFY_STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN as string;


const client = new ApolloClient({
    uri: SHOPIFY_STOREFRONT_API_URL,
    headers: {
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_API_TOKEN,
        "Content-Type": "application/json"
    },
    cache: new InMemoryCache({
        typePolicies: {
            Checkout: {
                merge(existing, incoming) {
                    return { ...existing, ...incoming };
                },
            },
        },
    }),
});

export default client;
