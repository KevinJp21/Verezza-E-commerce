import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CustomerOrders from "~/pages/customerOrders/CustomerOrders";
import Layout from "~/layouts/layout";

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