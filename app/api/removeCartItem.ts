import { gql } from '@apollo/client/core';
import client from '~/lib/apolloClient';

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
    const response = await client.mutate({
      mutation: REMOVE_CART_ITEM_MUTATION,
      variables: {
        checkoutId,
          lineItemIds: [lineItemId],
      },
      fetchPolicy: "network-only",
    });

    if (response.errors) {
      throw new Error(`Error en la solicitud: ${response.errors.map((error) => error.message).join(', ')}`);
    }

    if (response.data.checkoutLineItemsRemove.userErrors.length > 0) {
      const userErrors = response.data?.checkoutLineItemsRemove?.userErrors || [];
      const errorMessages = userErrors.map((error: any) => error.message).join(', ');
      throw new Error(`Error en la respuesta de GraphQL: ${errorMessages}`);
    }

    return response.data.checkoutLineItemsRemove.checkout;
  } catch (error) {
    console.error('Error al eliminar el artículo del carrito:', error);
    throw error;
  }
};
