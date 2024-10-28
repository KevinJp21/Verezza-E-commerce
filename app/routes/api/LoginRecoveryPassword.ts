import { gql } from "@apollo/client/core";
import getClient from "~/lib/apolloRecoveryPassClient";
import { json, type ActionFunction } from "@remix-run/node";

// Storefront API mutation to log in a customer
const CUSTOMER_LOGIN_MUTATION = gql`
mutation customerRecover($email: String!) {
  customerRecover(email: $email) {
    customerUserErrors {
      code
      field
      message
    }
    customerUserErrors{
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
    let loginRecoverData;
    try {
        const { json } = JSON.parse(body);
        loginRecoverData = JSON.parse(json);
    } catch (error) {
        console.error('Error parsing request body:', error);
        return json({ message: 'Error al procesar los datos del login' }, { status: 400 });
    }

    const client = getClient(request);

    try {
        // Crear token de acceso para el cliente con la Storefront API
        const loginRecoverResponse = await client.mutate({
            mutation: CUSTOMER_LOGIN_MUTATION,
            variables: {
                email: loginRecoverData.email,
            },
            fetchPolicy: 'network-only'
        });

        const loginRecoverDataResponse = loginRecoverResponse.data.customerRecover;

        if (loginRecoverDataResponse.customerUserErrors.length > 0) {
            return json(
                {
                    message: 'Error al enviar el correo',
                    errors: loginRecoverDataResponse.customerUserErrors
                },
                { status: 401 }
            );
        }
        return json({ message: 'EMAIL_SENT_SUCCESSFULLY' }, { status: 200 });
    } catch (error) {
        return json({ error: 'ERROR_SENDING_EMAIL' }, { status: 500 });
    }

}



