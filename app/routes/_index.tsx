import type { MetaFunction } from "@remix-run/node";

import Home from "~/pages/home/home";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();
  const baseUrl = "https://verezzastore.com";
  return [
    { title: t("home.home_seo.title") || "Exclusive fashion for real women | Verezza" },
    { name: "description", content: t("home.home_seo.description") },
    { name: "keywords", content: t("home.home_seo.keywords") },
    { name: "canonical", content: `${baseUrl}` },
    { name: "og:title", content: t("home.home_seo.title") },
    { name: "og:site_name", content: "Verezza" },
    { name: "og:description", content: t("home.home_seo.description") },
    { name: "og:image", content: `${baseUrl}/seo/icon.webp` },
    { name: "og:image:alt", content: "Verezza Icon" },
    { name: "og:image:width", content: "192" },
    { name: "og:image:height", content: "192" },
    { name: "og:type", content: "website" },
    { name: "og:url", content: `${baseUrl}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t("home.home_seo.title") },
    { name: "twitter:description", content: t("home.home_seo.description") },
    { name: "twitter:image", content: `${baseUrl}/seo/icon.webp` },
    { name: "og:updated_time", content: "2024-11-12T14:59:00Z" },
  ];
};

export default function Index() {
  return (
    <Home />
  );
}