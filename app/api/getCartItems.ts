import { gql } from 'graphql-request';

import { SHOPIFY_STOREFRONT_API_URL, SHOPIFY_STOREFRONT_API_TOKEN } from './tokenShopify';
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
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                image {
                  src
                }
                product {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

const GET_WEB_URL_QUERY = gql`
  query ($checkoutId: ID!) {
    node(id: $checkoutId) {
      ... on Checkout {
        webUrl
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

    return data.data.node.lineItems.edges.map((edge: any) => ({
      ...edge.node,
      productId: edge.node.variant.product.id
    }));
  } catch (error) {
    console.error('Error al obtener los artículos del carrito:', error);
    throw error;
  }
};

export const fetchWebUrl = async (checkoutId: string) => {
  try {
    const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN,
      },
      body: JSON.stringify({
        query: GET_WEB_URL_QUERY,
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

    return data.data.node.webUrl;
  } catch (error) {
    console.error('Error al obtener la URL del carrito:', error);
    throw error;
  }
};
