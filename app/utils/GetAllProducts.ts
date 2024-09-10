const SHOPIFY_STOREFRONT_API_URL = process.env.SHOPIFY_STOREFRONT_API_URL as string;
const SHOPIFY_STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN as string;

export interface Product {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    }
  };
  images: {
    edges: Array<{
      node: {
        src: string;
        altText: string | null;
      }
    }>
  };
  collections: {
    nodes: Array<{
      id: string;
      title: string;
    }>
  };
  variants: {
    nodes: Array<{
      id: string;
      title: string;
    }>
  };
}

export async function fetchShopify(query: string, variables = {}) {
  const res = await fetch(SHOPIFY_STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_API_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }
  return json.data;
}

export async function getAllProducts(): Promise<Product[]> {
  let currency = localStorage.getItem('selectedCurrencySymbol') || 'COP';
  let countryCode = 'CO';
  let language = localStorage.getItem('selectedLanguage') || 'ES';

  if (currency === 'COP') {
    countryCode = 'CO';
  } else if (currency === 'USD') {
    countryCode = 'US';
  }

  if (language === 'Español') {
    language = 'ES';
  } else if (language === 'English') {
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
            variants(first: 10){
              nodes{
                id
                title
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
    allProducts = [...allProducts, ...data.products.edges.map(({ node }: { node: Product }) => node)];
    hasNextPage = data.products.pageInfo.hasNextPage;
    cursor = data.products.pageInfo.endCursor;

    // Opcional: agregar un límite de seguridad
    if (allProducts.length > 1000) {
      console.warn('Se alcanzó el límite de 1000 productos. Considere implementar filtros adicionales.');
      break;
    }
  }

  return allProducts;
}
