import { Outlet } from "@remix-run/react";
import Layout from "~/layouts/layout";
export default function ShopIndex() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}