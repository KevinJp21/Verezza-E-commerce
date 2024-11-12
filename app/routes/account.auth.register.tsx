import RegisterPage from "~/pages/register/RegisterPage";
import Layout from "~/layouts/layout";
import { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";


export const meta: MetaFunction = () => {
  const { t } = useTranslation();
  const baseUrl = "https://olgaluciacortes.com";
  return [
    { title: t('register.seo.title') },
    { name: "description", content: t('register.seo.description') },
    { name: "og:title", content: t("register.seo.title") },
    { name: "og:site_name", content: "Olga Lucía Cortes" },
    { name: "og:description", content: t("register.seo.description") },
    { name: "og:image", content: `${baseUrl}/seo/icon.jpg` },
    { name: "og:image:alt", content: "Olga Lucía Cortes Icon" },
    { name: "og:image:width", content: "192" },
    { name: "og:image:height", content: "192" },
    { name: "og:type", content: "website" },
    { name: "og:url", content: `${baseUrl}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t("register.seo.title") },
    { name: "twitter:description", content: t("register.seo.description") },
    { name: "twitter:image", content: `${baseUrl}/seo/icon.jpg` },
    { name: "og:updated_time", content: "2024-11-12T14:59:00Z" },
  ];
};

export default function AccountRegister() {

  return (
    <Layout>
      <RegisterPage />
    </Layout>
  );
}
