import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import i18next from "i18next";

const SHOPIFY_STOREFRONT_API_URL = process.env.SHOPIFY_STOREFRONT_API_URL as string;
const SHOPIFY_STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN as string;

export interface Product {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        src: string;
        altText: string | null;
      };
    }>;
  };
  productType: string;
  collections: {
    nodes: Array<{
      title: string;
      id?: string;
    }>;
  };
  variants: {
    nodes: Array<{
      id?: string;
      title: string;
      availableForSale?: boolean;
      price: {
        amount: string;
        currencyCode: string;
      };
      compareAtPrice: {
        amount: string;
        currencyCode: string;
      } | null;
    }>;
  };
}

const client = createStorefrontApiClient({
  storeDomain: SHOPIFY_STOREFRONT_API_URL,
  apiVersion: '2024-04',
  publicAccessToken: SHOPIFY_STOREFRONT_API_TOKEN,
});

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const currentLanguage = i18next.language;
  
  let currency = 'COP';
  let countryCode = 'CO';
  let language = currentLanguage;

  if (currency === 'COP') {
    countryCode = 'CO';
  } else if (currency === 'USD') {
    countryCode = 'US';
  } else if (currency === 'EUR') {
    countryCode = 'ES';
  }

  if (language === 'Español' || language === 'es') {
    language = 'ES';
  } else if (language === 'English' || language === 'en') {
    language = 'EN';
  }

  const query = `
    query getProductByHandle($handle: String!) @inContext(country: ${countryCode}, language: ${language}) {
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
              src
              altText
            }
          }
        }
        productType
        collections(first: 1) {
          nodes {
            id
            title
          }
        } 
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
    const response = await client.request(query, { variables: { handle } });
    return response.data.product || null;
  } catch (error) {
    console.error('Error al obtener el producto por handle:', error);
    return null;
  }
}
