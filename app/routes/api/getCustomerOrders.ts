import { gql } from "@apollo/client/core";
import client from "~/lib/apolloClient";
import { json, type LoaderFunction } from "@remix-run/node";
import { createCookie } from "@remix-run/node";

const GET_CUSTOMER_ORDERS = gql`
query getAllOrders($customerAccessToken: String!, $cursor: String) {
  customer(customerAccessToken: $customerAccessToken) {
    id
    firstName
    lastName
    orders(first: 100, after: $cursor) { 
      edges {
        node {
          id
          name
          processedAt
          fulfillmentStatus
          canceledAt
          totalPrice {
            amount
            currencyCode
          }
          lineItems(first: 10) {
            edges {
              node {
                title
                quantity
                variant {
                  price{
                    amount
                    currencyCode
                  }
                  product {
                    title
                    images(first: 1) {
                      nodes {
                        id
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor  
      }
    }
  }
}
`;

export const loader: LoaderFunction = async ({ request }) => {
  // Crear la cookie de sesión
  const sessionCookie = createCookie("customerSession", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  // Obtener la cookie de la solicitud
  const cookieHeader = request.headers.get("Cookie");

  const session = cookieHeader ? await sessionCookie.parse(cookieHeader) : null;

  if (!session || !session.accessToken) {
    return json({ error: "No se encontró el token de acceso" }, { status: 401 });
  }

  try {
    const { data } = await client.query({
      query: GET_CUSTOMER_ORDERS,
      variables: { customerAccessToken: session.accessToken },
    });

    return json(data);
  } catch (error) {
    console.error("Error al obtener los pedidos del cliente:", error);
    return json({ error: "Error al obtener los pedidos del cliente" }, { status: 500 });
  }
};
