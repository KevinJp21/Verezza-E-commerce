import { gql } from "@apollo/client/core";
import client from "~/lib/apolloClient";
import { json, redirect, type ActionFunction } from "@remix-run/node";
import { createCookie } from "@remix-run/node";

// Mutación para eliminar el token de acceso del cliente en Shopify
const CUSTOMER_LOGOUT_MUTATION = gql`
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      userErrors {
        field
        message
      }
    }
  }
`;

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ message: "Method not allowed" }, { status: 405 });
  }

  try {
    // Obtener la cookie de sesión del cliente
    const sessionCookie = createCookie("customerSession", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    const cookieHeader = request.headers.get("Cookie");
    const session = cookieHeader ? await sessionCookie.parse(cookieHeader) : null;

    if (!session || !session.accessToken) {
      return json({ message: "No se encontró una sesión activa" }, { status: 400 });
    }

    // Realizar la mutación para eliminar el token de acceso del cliente en Shopify
    const logoutResponse = await client.mutate({
      mutation: CUSTOMER_LOGOUT_MUTATION,
      variables: {
        customerAccessToken: session.accessToken,
      },
    });

    const logoutDataResponse = logoutResponse.data.customerAccessTokenDelete;

    if (logoutDataResponse.userErrors.length > 0) {
      throw new Error(logoutDataResponse.userErrors[0].message);
    }

    // Eliminar la cookie de sesión
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      await sessionCookie.serialize("", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0, // Expira inmediatamente
        path: "/",
      })
    );

    return redirect("/redirect", { headers });
  } catch (error) {
    console.error("Error en el cierre de sesión:", error);
    return json({ message: "Error al cerrar sesión" }, { status: 500 });
  }
};
