import { gql } from "@apollo/client/core";
import client from "~/lib/apolloClient";

const GET_CART_ITEMS_QUERY = gql`
query ($checkoutId: ID!) {
  node(id: $checkoutId) {
    ... on Checkout {
      id
      completedAt
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
      id
      webUrl
    }
  }
}
`;


export const fetchCartItems = async (checkoutId: string) => {
  try {
    const response = await client.query({
      query: GET_CART_ITEMS_QUERY,
      variables: { checkoutId },
      fetchPolicy: "cache-first",
    });

    if (response.errors && Array.isArray(response.errors)) {
      const errorMessages = response.errors.map((error) => error.message).join(', ');
      throw new Error(`GraphQL errors: ${errorMessages}`);
    }

    const data = response.data;
    if (!data || !data.node || !data.node.lineItems) {
      throw new Error('Estructura de respuesta inesperada: ' + JSON.stringify(data));
    }

    return data.node.lineItems.edges.map((edge: any) => ({
      ...edge.node,
      productId: edge.node.variant.product.id,
    }));
  } catch (error) {
    console.error('Error al obtener los artículos del carrito:', error);
    throw error;
  }
};

export const fetchWebUrl = async (checkoutId: string) => {
  try {
    const response = await client.query({
      query: GET_WEB_URL_QUERY,
      variables: { checkoutId },
      fetchPolicy: "cache-first"
    });

    if (response.errors && Array.isArray(response.errors)) {
      // Manejo de errores si response.errors es un array
      const errorMessages = response.errors.map((error) => error.message).join(', ');
      throw new Error(`GraphQL errors: ${errorMessages}`);
    }

    const data = response.data;
    if (!data || !data.node) {
      throw new Error('No se encontró el nodo en la respuesta.');
    }

    return data.node.webUrl;
  } catch (error) {
    console.error('Error al obtener la URL del carrito:', error);
    throw error;
  }
};

export const getCheckoutStatus = async (checkoutId: string) => {
  try {
    const response = await client.query({
      query: gql`
        query getCheckoutStatus($checkoutId: ID!) {
          node(id: $checkoutId) {
            ... on Checkout {
              id
              completedAt
            }
          }
        }
      `,
      variables: { checkoutId },
      fetchPolicy: "cache-first",
    });

    if (response.errors && Array.isArray(response.errors)) {
      const errorMessages = response.errors.map((error) => error.message).join(', ');
      throw new Error(`GraphQL errors: ${errorMessages}`);
    }

    const data = response.data;
    if (!data || !data.node) {
      throw new Error('No se encontró el nodo en la respuesta.');
    }

    return data.node.completedAt ? 'COMPLETED' : 'ACTIVE';
  } catch (error) {
    console.error('Error al obtener el estado del checkout:', error);
    throw error;
  }
};