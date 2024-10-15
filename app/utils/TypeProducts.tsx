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
        };
      }>;
    };
  }