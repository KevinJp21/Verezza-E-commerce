import { gql } from 'graphql-request';
import { SHOPIFY_STOREFRONT_API_URL, SHOPIFY_STOREFRONT_API_TOKEN } from './tokenShopify';

const UPDATE_CART_ITEM_MUTATION = gql`
  mutation checkoutLineItemsUpdate($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
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
      userErrors {
        field
        message
      }
    }
  }
`;

export const updateCartItemQuantity = async (checkoutId: string, itemId: string, quantity: number) => {
  try {
    const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN,
      },
      body: JSON.stringify({
        query: UPDATE_CART_ITEM_MUTATION,
        variables: {
          checkoutId,
          lineItems: [
            {
              id: itemId,
              quantity,
            },
          ],
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors || !data.data || !data.data.checkoutLineItemsUpdate || data.data.checkoutLineItemsUpdate.userErrors.length > 0) {
      const userErrors = data.data?.checkoutLineItemsUpdate?.userErrors || [];
      const errorMessages = userErrors.map((error: any) => error.message).join(', ');
      throw new Error(`Error en la respuesta de GraphQL: ${errorMessages}`);
    }

    return data.data.checkoutLineItemsUpdate.checkout;
  } catch (error) {
    console.error('Error al actualizar la cantidad del artículo en el carrito:', error);
    throw error;
  }
};