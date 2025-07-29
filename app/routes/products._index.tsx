import Shop from "~/pages/shop/shop";
import { MetaFunction } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();
  const baseUrl = "https://verezzastore.com";
  return [
    { title: t("products.products_seo.title") || "Shop | Verezza" },
    { name: "description", content: t("products.products_seo.description") },
    { name: "keywords", content: t("products.products_seo.keywords") },
    { name: "og:title", content: t("products.products_seo.title") },
    { name: "og:site_name", content: "Verezza" },
    { name: "og:description", content: t("products.products_seo.description") },
    { name: "og:image", content: `${baseUrl}/seo/verezza.webp` },
    { name: "og:image:alt", content: "Verezza Icon" },
    { name: "og:image:width", content: "500" },
    { name: "og:image:height", content: "500" },
    { name: "og:type", content: "website" },
    { name: "og:url", content: `${baseUrl}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t("products.products_seo.title") },
    { name: "twitter:description", content: t("products.products_seo.description") },
    { name: "twitter:image", content: `${baseUrl}/seo/verezza.webp` },
    { name: "og:updated_time", content: "2024-11-12T14:59:00Z" },
  ];
};

export default function ShopIndex() {
  return (
    <>
      <Shop />
    </>
  );
}