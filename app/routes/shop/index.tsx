import { Link } from "@remix-run/react";
import Layout from "~/layouts/layout";
export default function Shop() {
  return (
    <Layout>
    <div>
      <h1>Shop</h1>
      <Link to="/">inicio</Link>
        <Link to="/shop/products">productos</Link>
      </div>
    </Layout>
  );
}