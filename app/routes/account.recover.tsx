import Layout from "~/layouts/layout";
import LoginRecover from "~/pages/loginRecover/LoginRecover";
import { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();
  const baseUrl = "https://verezzastore.com";
  return [
    { title: t('account_recover.seo.title') || "Recover Password | Verezza" },
    { name: "description", content: t('account_recover.seo.description') },
    { name: "og:title", content: t("account_recover.seo.title") },
    { name: "og:site_name", content: "Verezza" },
    { name: "og:description", content: t("account_recover.seo.description") },
    { name: "og:image", content: `${baseUrl}/seo/icon.webp` },
    { name: "og:image:alt", content: "Verezza Icon" },
    { name: "og:image:width", content: "192" },
    { name: "og:image:height", content: "192" },
    { name: "og:type", content: "website" },
    { name: "og:url", content: `${baseUrl}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t("account_recover.seo.title") },
    { name: "twitter:description", content: t("account_recover.seo.description") },
    { name: "twitter:image", content: `${baseUrl}/seo/icon.webp` },
    { name: "og:updated_time", content: "2024-11-12T14:59:00Z" },
  ];
};


export default function AccountAuthLoginRecover() {
  return (
    <Layout>
      <LoginRecover />
    </Layout>
  );
}
