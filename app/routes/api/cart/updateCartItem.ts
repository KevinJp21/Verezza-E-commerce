import client from '~/lib/apolloClient';
import { gql } from '@apollo/client/core';
import { json, type ActionFunction } from "@remix-run/node";
import { createCookie } from "@remix-run/node";

const UPDATE_CART_ITEM_MUTATION = gql`
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
            userErrors {
                field
                message
            }
            warnings {
                code
                message
            }
        }
    }
`;

export const action: ActionFunction = async ({ request }) => {
    if(request.method !== 'POST') {
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
    const quantity = parseInt(formData.get('quantity') as string);

    if (!lineItemId) {
        return json({ message: "lineItemId es requerido" }, { status: 400 });
    }

    try{
        const { data } = await client.mutate({
            mutation: UPDATE_CART_ITEM_MUTATION,
            variables: {
                cartId: cartData.cartId,
                lines: [{
                    id: lineItemId,
                    quantity: quantity
  }]
            },
            fetchPolicy: "network-only"
        });

        if (data.cartLinesUpdate.userErrors.length > 0) {
            const errorMessage = data.cartLinesUpdate.userErrors[0].message;
            return json({ message: errorMessage }, { status: 400 });
        }

        if (data.cartLinesUpdate.warnings.length > 0) {
            console.warn("Advertencias al actualizar el item del carrito:", data.cartLinesUpdate.warnings);
        }

        return json({ message: "Item actualizado en el carrito exitosamente" }, { status: 200 });
    } catch (error) {
        console.error("Error al actualizar el item del carrito:", error);
        return json({ message: "Error al actualizar el item del carrito" }, { status: 500 });
    }
}