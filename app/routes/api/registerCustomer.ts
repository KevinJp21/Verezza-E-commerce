import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import clientAdmin from "~/lib/apolloClientAdmin";
import { gql } from "@apollo/client/core";

const REGISTER_USER_MUTATION = gql`
  mutation createCustomerMetafields($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
        metafields(first: 3) {
          edges {
            node {
              id
              namespace
              key
              value
            }
          }
        }
      }
      userErrors {
        message
        field
      }
    }
  }
`;

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ message: "Método no permitido" }, { status: 405 });
  }

  const body = await request.text();
  let customerData;
  try {
    const { json } = JSON.parse(body);
    customerData = JSON.parse(json);
  } catch (error) {
    console.error('Error parsing request body:', error);
    return json({ message: 'Error al procesar los datos del cliente' }, { status: 400 });
  }

  try {
    const response = await clientAdmin.mutate({
      mutation: REGISTER_USER_MUTATION,
      variables: {
        input: {
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          email: customerData.email,
          phone: customerData.phone,
          emailMarketingConsent: {
            marketingState: "SUBSCRIBED",
            consentUpdatedAt: new Date(),
            marketingOptInLevel: "CONFIRMED_OPT_IN",
          },
          addresses: [
            {
              country: customerData.country,
              city: customerData.city,
              province: customerData.province,
              address1: customerData.address1,
              phone: customerData.phone,
              zip: customerData.zip,
            },
          ],
          metafields: [
            {
              namespace: 'customer_identification',
              key: 'identification_type',
              type: 'single_line_text_field',
              value: customerData.identificationType,
            },
            {
              namespace: 'customer_identification',
              key: 'identification_number',
              type: 'single_line_text_field',
              value: customerData.identificationNumber,
            },
            {
              namespace: 'facts',
              key: 'birth_date',
              type: 'date',
              value: customerData.birthday,
            },
          ],
        },
      },
      fetchPolicy: 'network-only',
    });

    if (response.errors && Array.isArray(response.errors)) {
      const errorMessages = response.errors.map((error) => error.message).join(', ');
      throw new Error(`GraphQL errors: ${errorMessages}`);
    }

    if (!response.data) {
      throw new Error('No data returned from Shopify');
    }

    const data = response.data;

    if (data.customerCreate.userErrors.length > 0) {
      throw new Error(data.customerCreate.userErrors[0].message);
    }

    return json(data.customerCreate.customer);
  } catch (error) {
    console.error('Error en la consulta a Shopify:', error);
    return json({ message: 'Error al registrar el cliente' }, { status: 500 });
  }
};
