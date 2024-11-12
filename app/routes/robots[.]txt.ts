import { LoaderFunction } from "@remix-run/node";
import { gql } from "@apollo/client/core";
import client from "~/lib/apolloClient";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    // GraphQL query para obtener productos con paginación
    const graphqlQuery = gql`
      query ($cursor: String) {
        products(first: 250, after: $cursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              handle
            }
          }
        }
      }
    `;

    let allProducts: string[] = [];
    let cursor = null;
    let hasNextPage = true;

    // Obtener productos con paginación
    while (hasNextPage) {
      const { data }: { data: any } = await client.query({
        query: graphqlQuery,
        variables: { cursor },
      });

      // Extraer los handles de los productos
      const products = data.products.edges.map(
        (edge: { node: { handle: string } }) => edge.node.handle
      );

      // Agregar las URLs de los productos a la lista
      allProducts = [...allProducts, ...products.map((handle: string) => `/products/${handle}`)];

      // Verificar si hay más productos para cargar
      hasNextPage = data.products.pageInfo.hasNextPage;
      cursor = data.products.pageInfo.endCursor;
    }

    // Agregar URLs de páginas estáticas
    const pagesUrls = [
      baseUrl,
      `/products`,
      `/atelier`,
      `/our-brand`,
      `/terms-of-use`,
      `/returns-refunds`
    ];

    // Combinar URLs de productos y páginas estáticas
    const allUrls = [...allProducts, ...pagesUrls].map(url => `Allow: ${url}`).join("\n");

    // Crear el contenido del robots.txt
    const robotsTxt = `User-agent: *
Disallow: /account/orders
Disallow: /account/recover
Allow: /products/*
${allUrls}
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay: 10
`;

    // Retornar el archivo robots.txt
    return new Response(robotsTxt, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    // En caso de error, devolver un robots.txt básico
    return new Response("User-agent: *\nDisallow: /", { 
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
};
