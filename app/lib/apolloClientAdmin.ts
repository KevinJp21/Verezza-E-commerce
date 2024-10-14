import { ApolloClient, InMemoryCache } from "@apollo/client/core";
const SHOPIFY_ADMIN_API_URL = process.env.SHOPIFY_ADMIN_API_URL as string;
const SHOPIFY_ADMIN_API_TOKEN= process.env.SHOPIFY_ADMIN_API_TOKEN as string;


const clientAdmin = new ApolloClient({
    uri: SHOPIFY_ADMIN_API_URL,
    headers: {
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_API_TOKEN,
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

export default clientAdmin;
