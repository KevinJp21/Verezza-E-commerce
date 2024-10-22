import client from '~/lib/apolloClient';
import { gql } from '@apollo/client/core';
import { json, type ActionFunction } from "@remix-run/node";
import { createCookie } from "@remix-run/node";

const REMOVE_CART_ITEM_MUTATION = gql`
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            userErrors {
                field
                message
            }
            warnings {
                message
                code
                target
            }
        }
    }
`;

export const action: ActionFunction = async ({ request }) => {
    if (request.method !== 'POST') {
        return json({ message: "Method not allowed" }, { status: 405 })
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

    const formData = await request.formData();
    const lineItemId = formData.get('lineItemId');

    if (!lineItemId) {
        return json({ message: "lineItemId es requerido" }, { status: 400 });
    }

    try {
        const { data } = await client.mutate({
            mutation: REMOVE_CART_ITEM_MUTATION,
            variables: {
                cartId: cartData.cartId,
                lineIds: [lineItemId]
            },
            fetchPolicy: "network-only"
        });

        if (data.cartLinesRemove.userErrors.length > 0) {
            const errorMessage = data.cartLinesRemove.userErrors[0].message;
            return json({ message: errorMessage }, { status: 400 });
        }

        if (data.cartLinesRemove.warnings.length > 0) {
            console.warn("Advertencias al eliminar el item del carrito:", data.cartLinesRemove.warnings);
        }

        return json({ message: "Item eliminado del carrito exitosamente" }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar el item del carrito:", error);
        return json({ message: "Error al eliminar el item del carrito" }, { status: 500 });
    }
}
