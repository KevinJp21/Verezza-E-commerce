import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import clientAdmin from "~/lib/apolloClientAdmin";
import client from "~/lib/apolloClient";
import { gql } from "@apollo/client/core";

// Storefront API mutation to create a customer
const CUSTOMER_CREATE_MUTATION = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        message
        code
        field
      }
    }
  }
`;

// Admin API mutation to update customer with metafields
const REGISTER_USER_MUTATION = gql`
  mutation createCustomerMetafields($input: CustomerInput!) {
    customerUpdate(input: $input) {
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
    return json({ message: "Method not allowed" }, { status: 405 });
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
    // 1. Crear cliente con la Storefront API
    const customerCreateResponse = await client.mutate({
      mutation: CUSTOMER_CREATE_MUTATION,
      variables: {
        input: {
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          email: customerData.email,
          acceptsMarketing: customerData.acceptsMarketing,
          password: customerData.password,
        },
      },
      fetchPolicy: 'network-only',
    });

    const customerCreateData = customerCreateResponse.data.customerCreate;

    // Manejo de errores de la Storefront API
    if (customerCreateData.customerUserErrors.length > 0) {
        return json({ message: "Register failed", CreateCustomerErrors: customerCreateData.customerUserErrors }, { status: 400 });
    }

    const customerId = customerCreateData.customer.id;

    
    const consentDate = new Date();
    consentDate.setMinutes(consentDate.getMinutes() - 1); 


    // 2. Actualizar los detalles adicionales (metafields y direcciones)
    const customerUpdateResponse  = await clientAdmin.mutate({
      mutation: REGISTER_USER_MUTATION,
      variables: {
        input: {
          id: customerId,
          phone: customerData.phone,
          addresses: [
            {
              countryCode: customerData.country,
              city: customerData.city,
              provinceCode: customerData.province,
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
              value: customerData.identificationType.toUpperCase(),
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

    const customerUpdateData = customerUpdateResponse.data.customerUpdate;
    
    if (customerUpdateData.userErrors.length > 0) {
      return json({ message: "Register failed", UpdateCustomerErrors: customerUpdateData.userErrors }, { status: 400 });
    }

    return json({ customerId });
  } catch (error) {
    console.error('Error en la consulta a Shopify:', error);
    return json({ message: 'Error al registrar el cliente' }, { status: 500 });
  }
};
