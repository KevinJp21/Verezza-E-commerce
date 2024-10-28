import { ApolloClient, InMemoryCache } from "@apollo/client/core";

const SHOPIFY_STOREFRONT_API_URL = process.env.SHOPIFY_STOREFRONT_API_URL as string;
const SHOPIFY_STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN as string;

export const getClient = (request: Request) => {
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   '127.0.0.11';
    console.log(clientIP);

  return new ApolloClient({
    uri: SHOPIFY_STOREFRONT_API_URL,
    headers: {
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_API_TOKEN,
      "Content-Type": "application/json",
      "Shopify-Storefront-Buyer-IP": clientIP
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
};


export default getClient;
