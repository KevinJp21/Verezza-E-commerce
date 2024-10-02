import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import i18next from "i18next";
const SHOPIFY_STOREFRONT_API_URL = process.env.SHOPIFY_STOREFRONT_API_URL as string;
const SHOPIFY_STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN as string;

export interface Product {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  images: {
    edges: Array<{
      node: {
        src: string;
        altText: string | null;
      };
    }>;
  };
  collections: {
    nodes: Array<{
      id: string;
      title: string;
    }>;
  };
  variants: {
    nodes: Array<{
      id: string;
      title: string;
      availableForSale: boolean;
      compareAtPrice: {
        amount: string;
        currencyCode: string;
      };
      price: {
        amount: string;
        currencyCode: string;
      };

    }>;
  };
}

interface ProductsResponse {
  products: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    edges: Array<{
      node: Product;
    }>;
  };
}

interface GraphQLResponse {
  data?: ProductsResponse;
  errors?: Array<{ message: string }>; // Ajustado para manejar una lista de errores
}

const client = createStorefrontApiClient({
  storeDomain: SHOPIFY_STOREFRONT_API_URL,
  apiVersion: '2024-04',
  publicAccessToken: SHOPIFY_STOREFRONT_API_TOKEN,
});

export async function fetchShopify(query: string, variables = {}): Promise<ProductsResponse> {
  try {
    const response = await client.request<GraphQLResponse>(query, variables);

    if (response.errors && Array.isArray(response.errors)) {
      // Manejo de errores si response.errors es un array
      const errorMessages = response.errors.map((error) => error.message).join(', ');
      throw new Error(`GraphQL errors: ${errorMessages}`);
    }

    if (!response.data) {
      throw new Error('No data returned from Shopify');
    }

    return response.data as ProductsResponse; // Asegurarse de que el tipo sea ProductsResponse
  } catch (error) {
    // Manejo de errores en el bloque catch
    console.error('Error en la consulta a Shopify:', error);
    throw error;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const currentLanguage = i18next.language;
  let currency = localStorage.getItem('selectedCurrencySymbol') || 'COP';
  let countryCode = 'CO';
  let language = localStorage.getItem('selectedLanguage') || currentLanguage;

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
    query getAllProducts($cursor: String) @inContext(country: ${countryCode}, language: ${language}) {
      products(first: 250, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            description
            createdAt
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
      }
    }
  `;

  let allProducts: Product[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;

  while (hasNextPage) {
    const variables = { cursor };
    const data = await fetchShopify(query, variables);
    const productsData = data.products; // Acceso a la propiedad products
    allProducts = [...allProducts, ...productsData.edges.map(({ node }) => node)];
    hasNextPage = productsData.pageInfo.hasNextPage;
    cursor = productsData.pageInfo.endCursor;

    // Opcional: agregar un límite de seguridad
    if (allProducts.length > 1000) {
      console.warn('Se alcanzó el límite de 1000 productos. Considere implementar filtros adicionales.');
      break;
    }
  }

  return allProducts;
}
