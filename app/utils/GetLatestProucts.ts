const SHOPIFY_STOREFRONT_API_URL = process.env.SHOPIFY_STOREFRONT_API_URL as string;
const SHOPIFY_STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN as string;

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

export async function getLatestProducts() {
  let currency = localStorage.getItem('selectedCurrencySymbol') || 'COP';
  let countryCode = 'CO'; // Valor predeterminado
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
    query getLastProducts @inContext(country: ${countryCode}, language: ${language}) {
      products(first: 10, sortKey: CREATED_AT, reverse: true) {
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

  const data = await fetchShopify(query);
  return data.products.edges.map(({ node }: any) => node);
}