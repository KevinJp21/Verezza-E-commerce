import { json, MetaFunction, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CustomerOrders from "~/pages/customerOrders/CustomerOrders";
import Layout from "~/layouts/layout";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
    const { t } = useTranslation();
    const baseUrl = "https://olgaluciacortes.com";
    return [
      { title: t('account_orders.seo.title') || "My Orders | Verezza" },
      { name: "description", content: t('account_orders.seo.description') },
      { name: "og:title", content: t("account_orders.seo.title") },
      { name: "og:site_name", content: "Verezza" },
      { name: "og:description", content: t("account_orders.seo.description") },
      { name: "og:image", content: `${baseUrl}/seo/icon.webp` },
      { name: "og:image:alt", content: "Verezza Icon" },
      { name: "og:image:width", content: "192" },
      { name: "og:image:height", content: "192" },
      { name: "og:type", content: "website" },
      { name: "og:url", content: `${baseUrl}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: t("account_orders.seo.title") },
      { name: "twitter:description", content: t("account_orders.seo.description") },
      { name: "twitter:image", content: `${baseUrl}/seo/icon.webp` },
      { name: "og:updated_time", content: "2024-11-12T14:59:00Z" },
    ];
  };

export const loader: LoaderFunction = async ({ request }) => {
    const response = await fetch(`${new URL(request.url).origin}/api/getCustomerOrders`, {
        headers: {
            Cookie: request.headers.get("Cookie") || "",
        },
    });
    if (!response.ok) {
        throw new Response("Error al cargar los pedidos del cliente", { status: response.status });
    }
    const data = await response.json();
    return json(data);
}


export default function AccountOrders() {

    const data = useLoaderData<typeof loader>();
    return (
        <Layout>
            <CustomerOrders data={data} />
        </Layout>
    );
}