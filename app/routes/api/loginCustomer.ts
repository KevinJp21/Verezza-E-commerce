import { gql } from "@apollo/client/core";
import client from "~/lib/apolloClient";
import { json, type ActionFunction } from "@remix-run/node";
import { createCookie } from "@remix-run/node";

// Storefront API mutation to log in a customer
const CUSTOMER_LOGIN_MUTATION = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
export const action: ActionFunction = async ({ request }) => {
    if (request.method !== 'POST') {
        return json({ message: "Method not allowed" }, { status: 405 })
    }

    const body = await request.text();
    let loginData;
    try {
        const { json } = JSON.parse(body);
        loginData = JSON.parse(json);
    } catch (error) {
        console.error('Error parsing request body:', error);
        return json({ message: 'Error al procesar los datos del login' }, { status: 400 });
    }

    try {
        // Crear token de acceso para el cliente con la Storefront API
        const loginResponse  = await client.mutate({
            mutation: CUSTOMER_LOGIN_MUTATION,
            variables: {
                input: {
                    email: loginData.email,
                    password: loginData.password
                },
            },
            fetchPolicy: 'network-only'
        });

        const loginDataResponse = loginResponse.data.customerAccessTokenCreate;

        if (loginDataResponse.customerUserErrors.length > 0) {
            return json(
                { 
                    message: 'Login failed', 
                    errors: loginDataResponse.customerUserErrors 
                }, 
                { status: 401 } 
            );
        }


        // Obtener token de acceso y fecha de expiración
        const accessToken = loginDataResponse.customerAccessToken.accessToken;
        const expiresAt = loginDataResponse.customerAccessToken.expiresAt;

        // Crear cookie de sesión
        const sessionCookie = createCookie("customerSession", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: expiresAt ? 48 * 60 * 60 : undefined,
            path: "/",
        });

        // Crear el objeto de sesión
        const session = {
            accessToken,
            expiresAt,
        };

        // Serializar y establecer la cookie
        const serializedCookie = await sessionCookie.serialize(session);

        // Crear el objeto headers si no existe
        const headers = new Headers();
        headers.append("Set-Cookie", serializedCookie);

        return json({ message: 'Login successful' }, { status: 200, headers });

    } catch (error) {
        console.error('unauthorized:', error);
        return json({ message: 'Login failed' }, { status: 500 });
    }

}



