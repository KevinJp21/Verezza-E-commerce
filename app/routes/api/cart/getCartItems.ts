import { gql } from "@apollo/client/core";
import client from "~/lib/apolloClient";
import { json, type LoaderFunction } from "@remix-run/node";
import { createCookie } from "@remix-run/node";

const GET_CART_ITEMS_QUERY = gql`
query cart($id: ID!) {
  cart(id: $id) {
    totalQuantity
    checkoutUrl
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 10) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              compareAtPrice{
                amount
              }
              price {
                amount
                currencyCode
              }
              image {
                url
              }
              product {
                title
                handle
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const loader: LoaderFunction = async ({ request }) => {
    if (request.method !== 'GET') {
        return json({ message: "Método no permitido" }, { status: 405 });
    }

    const cookieHeader = request.headers.get("Cookie");

    const cartCookie = createCookie("cart", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    const cartData = await cartCookie.parse(cookieHeader);

    if (!cartData || !cartData.cartId) {
        return json({ message: "No hay carrito activo" }, { status: 404 });
    }

    try {
        const { data } = await client.query({
            query: GET_CART_ITEMS_QUERY,
            variables: { id: cartData.cartId },
            fetchPolicy: "network-only"
        });

        const cartItems = data.cart.lines.edges.map(({ node }: any) => ({
            id: node.id,
            quantity: node.quantity,
            title: node.merchandise.title,
            productTitle: node.merchandise.product.title,
            price: node.merchandise.price.amount,
            currency: node.merchandise.price.currencyCode,
            compareAtPrice: node.merchandise.compareAtPrice?.amount,
            imageUrl: node.merchandise.image?.url,
            productHandle: node.merchandise.product.handle,
        }));

        return json({
            cartItems,
            totalQuantity: data.cart.totalQuantity,
            checkoutUrl: data.cart.checkoutUrl,
            subtotal: data.cart.cost.subtotalAmount.amount
        });
    } catch (error) {
        console.error("Error al obtener los productos del carrito:", error);
        return json({ error: "Error al obtener los productos del carrito" }, { status: 500 });
    }
}
