import { gql } from 'graphql-request';

const SHOPIFY_STOREFRONT_API_URL = process.env.SHOPIFY_STOREFRONT_API_URL as string;
const SHOPIFY_STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN as string;

const GET_CART_ITEMS_QUERY = gql`
  query ($checkoutId: ID!) {
    node(id: $checkoutId) {
      ... on Checkout {
        id
        webUrl
        lineItems(first: 10) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                image {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const fetchCartItems = async (checkoutId: string) => {
  try {
    const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN,
      },
      body: JSON.stringify({
        query: GET_CART_ITEMS_QUERY,
        variables: { checkoutId },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.errors) {
      throw new Error(`Error en la respuesta de GraphQL: ${data.errors.map((error: any) => error.message).join(', ')}`);
    }

    return data.data.node.lineItems.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error('Error al obtener los artículos del carrito:', error);
    throw error;
  }
};