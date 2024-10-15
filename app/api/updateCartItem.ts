import { gql } from '@apollo/client/core';
import client from '~/lib/apolloClient';


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

export const updateCartItemQuantity = async (checkoutId: string, itemId: string, quantity: number) => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_CART_ITEM_MUTATION,
      variables: {
        checkoutId,
        lineItems: [
          {
            id: itemId,
            quantity,
          },
        ],
      },
      fetchPolicy: "network-only",
    });

    if (response.errors) {
      throw new Error(`Error en la solicitud: ${response.errors.map((error) => error.message).join(', ')}`);
    }

    if (response.data.checkoutLineItemsUpdate.userErrors.length > 0) {
      const userErrors = response.data?.checkoutLineItemsUpdate?.userErrors || [];
      const errorMessages = userErrors.map((error: any) => error.message).join(', ');
      throw new Error(`Error en la respuesta de GraphQL: ${errorMessages}`);
    }

    return response.data.checkoutLineItemsUpdate.checkout;
  } catch (error) {
    console.error('Error al actualizar la cantidad del artículo en el carrito:', error);
    throw error;
  }
};