import { gql } from 'graphql-request';
import { SHOPIFY_STOREFRONT_API_URL, SHOPIFY_STOREFRONT_API_TOKEN } from './tokenShopify';

const GET_PRODUCTS_BY_IDS_QUERY = gql`
  query getProductsByIds($ids: [ID!]!, $country: CountryCode!, $language: LanguageCode!) @inContext(country: $country, language: $language) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        description
        variants(first: 1) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

export const getProductsByIds = async (productIds: string[], country: string, language: string) => {
    try {
      const countryCode = country.toUpperCase() as CountryCode;
      const languageCode = language.toUpperCase() as LanguageCode;
  
      const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN,
        },
        body: JSON.stringify({
          query: GET_PRODUCTS_BY_IDS_QUERY,
          variables: { 
            ids: productIds, 
            country: countryCode, 
            language: languageCode 
          },
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
  
      const data = await response.json();
      if (data.errors) {
        throw new Error(`Error en la respuesta de GraphQL: ${data.errors.map((error: any) => error.message).join(', ')}`);
      }
  
      return data.data.nodes;
    } catch (error) {
      console.error('Error al obtener los detalles de los productos:', error);
      throw error;
    }
  };
  
  type CountryCode = 'US' | 'CA' | 'CO' | 'ES';
  type LanguageCode = 'EN' | 'ES';
  