import { gql } from 'graphql-request';
import { SHOPIFY_STOREFRONT_API_URL, SHOPIFY_STOREFRONT_API_TOKEN } from './tokenShopify';

const REMOVE_CART_ITEM_MUTATION = gql`
  mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
      checkout {
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
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const removeCartItem = async (checkoutId: string, lineItemId: string) => {
  try {
    const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN,
      },
      body: JSON.stringify({
        query: REMOVE_CART_ITEM_MUTATION,
        variables: {
          checkoutId,
          lineItemIds: [lineItemId],
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors || !data.data || !data.data.checkoutLineItemsRemove || data.data.checkoutLineItemsRemove.userErrors.length > 0) {
      const userErrors = data.data?.checkoutLineItemsRemove?.userErrors || [];
      const errorMessages = userErrors.map((error: any) => error.message).join(', ');
      throw new Error(`Error en la respuesta de GraphQL: ${errorMessages}`);
    }

    return data.data.checkoutLineItemsRemove.checkout;
  } catch (error) {
    console.error('Error al eliminar el artículo del carrito:', error);
    throw error;
  }
};
