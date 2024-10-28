import Layout from "~/layouts/layout";
import LoginRecover from "~/pages/loginRecover/LoginRecover";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Recover Password" }
  ]

};

export default function AccountAuthLoginRecover() {
  return (
    <Layout>
      <LoginRecover />
    </Layout>
  );
}
