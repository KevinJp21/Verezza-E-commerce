import { LoaderFunction, json } from '@remix-run/node';
import { gql } from '@apollo/client/core';
import client from '~/lib/apolloClient';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { handle } = params;
  const url = new URL(request.url);
  const countryCode = url.searchParams.get('countryCode') || 'US';
  const languageCode = url.searchParams.get('languageCode') || 'EN';

  const GET_PRODUCT_BY_HANDLE_QUERY = gql`
    query getProductByHandle($handle: String!) @inContext(country: ${countryCode}, language: ${languageCode}) {
      product(handle: $handle) {
        id
        title
        description
        createdAt
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
            }
          }
        }
        productType
        variants(first: 10) {
          nodes {
            id
            title
            availableForSale
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
  `;

  try {
    const { data } = await client.query({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
      fetchPolicy: "network-only"
    });
    return json(data.product);
  } catch (error) {
    console.error('Error al obtener el producto por handle:', error);
    return json({ error: 'Error al obtener el producto' }, { status: 500 });
  }
};