import { LoaderFunctionArgs, json } from "@remix-run/node";
import axios from "axios";

export async function loader({ params }: LoaderFunctionArgs) {
  const productId = params.id;
  const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;

  if (!productId) {
    return json({ error: "Se requiere el ID del producto" }, { status: 400 });
  }

  try {
    const response = await axios.get(
      `https://olgaluciacortes.myshopify.com/admin/api/2024-07/products/${productId}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_API_TOKEN,
        },
      }
    );

    return json(response.data);
  } catch (error) {
    console.error("Error al obtener el inventario:", error);
    return json({ error: "Error al obtener el inventario del producto" }, { status: 500 });
  }
}
