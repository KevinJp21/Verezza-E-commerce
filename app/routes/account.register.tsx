import RegisterPage from "~/pages/register/RegisterPage";
import Layout from "~/layouts/layout";
import { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();
  return [
    { title: t("register.seo.title") },
    { description: t("register.seo.description") },
  ];
};

export default function AccountRegister() {

  return (
    <Layout>
      <RegisterPage />
    </Layout>
  );
}
