import Layout from "~/layouts/layout";
import AtelierPage from "~/pages/Atelier/AtelierPage";
import { useTranslation } from "react-i18next";
import { MetaFunction } from "@remix-run/node";



export const meta: MetaFunction = () => {
    const { t } = useTranslation();
    const baseUrl = "https://verezzastore.com";
    return [
      { title: t('atelier.seo.title') || "Atelier | Verezza" },
      { name: "description", content: t('atelier.seo.description') },
      { name: "og:title", content: t("atelier.seo.title") },
      { name: "og:site_name", content: "Verezza" },
      { name: "og:description", content: t("atelier.seo.description") },
      { name: "og:image", content: `${baseUrl}/seo/verezza.webp` },
      { name: "og:image:alt", content: "Verezza Icon" },
      { name: "og:image:width", content: "500" },
      { name: "og:image:height", content: "500" },
      { name: "og:type", content: "website" },
      { name: "og:url", content: `${baseUrl}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: t("atelier.seo.title") },
      { name: "twitter:description", content: t("atelier.seo.description") },
      { name: "twitter:image", content: `${baseUrl}/seo/verezza.webp` },
      { name: "og:updated_time", content: "2024-11-12T14:59:00Z" },
    ];
  };

export default function Atelier() {
    return (
        <Layout>
            <AtelierPage />
        </Layout>
    );
}
