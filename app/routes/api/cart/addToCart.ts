import client from '~/lib/apolloClient';
import { gql } from '@apollo/client/core';
import { json, type ActionFunction } from "@remix-run/node";
import { createCookie } from "@remix-run/node";

// Mutación para crear un carrito
const CREATE_CART_MUTATION = gql`
mutation createCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

// Mutación para añadir al carrito
const ADD_TO_CART_MUTATION = gql`
mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
      }
    }
  }
`;

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ message: "Method not allowed" }, { status: 405 })
}

  const cartCookie = createCookie("cart", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  const cookieHeader = request.headers.get("Cookie");
  const existingCartData = cookieHeader ? await cartCookie.parse(cookieHeader) : null;

  const { merchandiseId, quantity } = await request.json();

  try {
    let cart;
    if (existingCartData && existingCartData.cartId) {
      // Usar el carrito existente
      const { data } = await client.mutate({
        mutation: ADD_TO_CART_MUTATION,
        variables: {
          cartId: existingCartData.cartId,
          lines: [{ quantity, merchandiseId }]
        },
        fetchPolicy: 'network-only',
      });
      cart = data.cartLinesAdd.cart;
    } else {
      // Crear un nuevo carrito solo si no existe
      const { data } = await client.mutate({
        mutation: CREATE_CART_MUTATION,
        variables: {
          lines: [{ quantity, merchandiseId }]
        },
        fetchPolicy: 'network-only',
      });
      cart = data.cartCreate.cart;
    }

    const { id: cartId, checkoutUrl } = cart;
    const newCartCookie = await cartCookie.serialize({ cartId, checkoutUrl });

    return json({ cartId, checkoutUrl }, {
      headers: {
        "Set-Cookie": newCartCookie,
      },
    });

  } catch (error) {
    console.error("Error al crear/actualizar el carrito:", error);
    return json({ error: "Error al crear/actualizar el carrito" }, { status: 500 });
  }
};
