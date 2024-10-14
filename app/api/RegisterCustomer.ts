import clientAdmin from "~/lib/apolloClientAdmin";
import { gql } from "@apollo/client/core";
const SHOPIFY_ADMIN_API_URL = process.env.SHOPIFY_ADMIN_API_URL;
const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;

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
`

export default async function registerCustomer(customerData: any) {
  try {
    const response = await clientAdmin.mutate({
      mutation: REGISTER_USER_MUTATION,
      variables: {
        input: {
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          email: customerData.email,
          emailMarketingConsent: {
            marketingState: "SUBSCRIBED",
            consentUpdatedAt: new Date().toISOString(),
            marketingOptInLevel: "CONFIRMED_OPT_IN",
          },
          addresses: [
            {
              address1: customerData.address1,
              city: customerData.city,
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
              key: 'birthday',
              type: 'single_line_text_field', // Almacenar como string "YYYY-MM-DD"
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

    const data = await response.data;

    if (data.errors || data.data.customerCreate.userErrors.length > 0) {
      throw new Error(
        data.errors
          ? data.errors[0].message
          : data.data.customerCreate.userErrors[0].message
      );
    }

    return data.data.customerCreate.customer;
  } catch (error) {
    console.error('Error en la consulta a Shopify:', error);
    throw error;
  }
}
