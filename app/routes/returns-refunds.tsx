import ReturnsRefundsPage from "~/pages/ReturnsRefunds/ReturnsRefundsPage";
import Layout from "~/layouts/layout";
import { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();
  const baseUrl = "https://verezzastore.com";
  return [
    { title: t('returnsRefunds.seo.title') || "Returns and Refunds | Verezza" },
    { name: "description", content: t('returnsRefunds.seo.description') },
    { name: "og:title", content: t("returnsRefunds.seo.title") },
    { name: "og:site_name", content: "Verezza" },
    { name: "og:description", content: t("returnsRefunds.seo.description") },
    { name: "og:image", content: `${baseUrl}/seo/icon.webp` },
    { name: "og:image:alt", content: "Verezza Icon" },
    { name: "og:image:width", content: "192" },
    { name: "og:image:height", content: "192" },
    { name: "og:type", content: "website" },
    { name: "og:url", content: `${baseUrl}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t("returnsRefunds.seo.title") },
    { name: "twitter:description", content: t("returnsRefunds.seo.description") },
    { name: "twitter:image", content: `${baseUrl}/seo/icon.webp` },
    { name: "og:updated_time", content: "2024-11-12T14:59:00Z" },
  ];
};


export default function ReturnsRefunds() {
  return (
    <Layout>
      <ReturnsRefundsPage />
    </Layout>
  );
}
