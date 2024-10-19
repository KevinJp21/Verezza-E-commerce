import { gql } from "@apollo/client/core";
import client from "~/lib/apolloClient";
import { json, type ActionFunction } from "@remix-run/node";

const GET_CART_ITEMS_QUERY = gql`
 query getProductsByIds($ids: [ID!]!, $country: CountryCode!, $language: LanguageCode!) @inContext(country: $country, language: $language) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
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

export const action: ActionFunction = async ({ request }) => {
    if (request.method !== 'POST') {
        return json({ message: "Método no permitido" }, { status: 405 });
    }

    const { productIds, country, language } = await request.json();
    try {
        const { data } = await client.query({
            query: GET_CART_ITEMS_QUERY,
            variables: { 
              ids: productIds,
              country: country,
              language: language
            },
            fetchPolicy: "network-only"
        });

        const cartItems = data.nodes.map((node: any) => ({
            id: node.id,
            title: node.title,
            price: node.variants.edges[0].node.price.amount,
            currency: node.variants.edges[0].node.price.currencyCode,
            compareAtPrice: node.variants.edges[0].node.compareAtPrice?.amount,
            imageUrl: node.image?.url,
            productHandle: node.handle,
        }));

        return json({
            cartItems,
        });
    } catch (error) {
        console.error("Error al obtener los productos del carrito por ids:", error);
        return json({ error: "Error al obtener los productos del carrito por ids" }, { status: 500 });
    }
}
