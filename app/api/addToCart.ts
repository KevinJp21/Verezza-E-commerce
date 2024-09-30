import { gql } from 'graphql-request';

import { SHOPIFY_STOREFRONT_API_URL, SHOPIFY_STOREFRONT_API_TOKEN } from './tokenShopify';

const CREATE_CHECKOUT_MUTATION = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const ADD_TO_CART_MUTATION = gql`
  mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
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

async function createCheckout() {
  const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN,
    },
    body: JSON.stringify({
      query: CREATE_CHECKOUT_MUTATION,
      variables: {
        input: {},
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Error en la solicitud: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors || !data.data || !data.data.checkoutCreate || data.data.checkoutCreate.userErrors.length > 0) {
    const userErrors = data.data?.checkoutCreate?.userErrors || [];
    const errorMessages = userErrors.map((error: any) => error.message).join(', ');
    throw new Error(`Error en la respuesta de GraphQL: ${errorMessages}`);
  }

  return data.data.checkoutCreate.checkout.id;
}

export async function addToCart(variantId: string, quantity: number) {
  try {
    let checkoutId = localStorage.getItem('checkoutId');

    if (!checkoutId) {
      checkoutId = await createCheckout();
      localStorage.setItem('checkoutId', checkoutId || '');
    }

    const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN,
      },
      body: JSON.stringify({
        query: ADD_TO_CART_MUTATION,
        variables: {
          checkoutId,
          lineItems: [
            {
              variantId,
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

    console.log('Respuesta completa de la API:', data);

    if (data.errors || !data.data || !data.data.checkoutLineItemsAdd || data.data.checkoutLineItemsAdd.userErrors.length > 0) {
      const userErrors = data.data?.checkoutLineItemsAdd?.userErrors || [];
      const errorMessages = userErrors.map((error: any) => error.message).join(', ');
      throw new Error(`Error en la respuesta de GraphQL: ${errorMessages}`);
    }

    return data.data.checkoutLineItemsAdd.checkout;
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    throw error;
  }
}