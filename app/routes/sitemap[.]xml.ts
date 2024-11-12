import { LoaderFunction } from "@remix-run/node";
import { gql } from "@apollo/client/core";
import client from "~/lib/apolloClient";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    // GraphQL Query para obtener los productos
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

    const getProducts = async (cursor: string | null = null): Promise<string[]> => {
      const { data } = await client.query({
        query: graphqlQuery,
        variables: { cursor },
      });

      const products = data.products.edges.map(
        (edge: { node: { handle: string } }) => `${baseUrl}/products/${edge.node.handle}`
      );

      const pageInfo = data.products.pageInfo;
      if (pageInfo.hasNextPage) {
        const nextProducts = await getProducts(pageInfo.endCursor);
        return [...products, ...nextProducts];
      }
      return products;
    };

    const products = await getProducts();

    // Páginas adicionales que pueden ser importantes en el sitemap
    const pagesUrls = [
      baseUrl,
      `${baseUrl}/products`,
      `${baseUrl}/atelier`,
      `${baseUrl}/our-brand`,
      `${baseUrl}/terms-of-use`,
      `${baseUrl}/returns-refunds`,
    ];

    // Unir todas las URLs
    const allUrls = [...products, ...pagesUrls];

    // Generar el contenido del sitemap.xml
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls
        .map(
          (url) => `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`
        )
        .join("")}
    </urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error al generar el sitemap:", error);
    return new Response("Error al generar el sitemap", { status: 500 });
  }
};
