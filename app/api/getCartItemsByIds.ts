import { gql } from '@apollo/client/core';
import client from '~/lib/apolloClient';

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
  
      const response = await client.query({
        query: GET_PRODUCTS_BY_IDS_QUERY,
        variables: { 
          ids: productIds, 
          country: countryCode, 
          language: languageCode 
        },
        fetchPolicy: "cache-first",
      });
  
      if (response.errors && Array.isArray(response.errors)) {
        const errorMessages = response.errors.map((error) => error.message).join(', ');
        throw new Error(`GraphQL errors: ${errorMessages}`);
      }
  
      if (!response.data || !response.data.nodes) {
        throw new Error('No se encontraron los nodos en la respuesta.');
      }
  
      return response.data.nodes;
    } catch (error) {
      console.error('Error al obtener los detalles de los productos:', error);
      throw error;
    }
  };
  
  type CountryCode = 'US' | 'CA' | 'CO' | 'ES';
  type LanguageCode = 'EN' | 'ES';
  