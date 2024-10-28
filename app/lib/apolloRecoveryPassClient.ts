import { ApolloClient, InMemoryCache } from "@apollo/client/core";

const SHOPIFY_STOREFRONT_API_URL = process.env.SHOPIFY_STOREFRONT_API_URL as string;
const SHOPIFY_STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN as string;

export const getClient = (request: Request) => {
  // Intentar obtener la IP del cliente de diferentes headers en orden de prioridad
  const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                   request.headers.get('cf-connecting-ip') ||
                   request.headers.get('x-real-ip') ||
                   request.headers.get('x-client-ip') ||
                   '127.0.0.1';
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
