import { MetaFunction } from "@remix-run/node";
import Layout from "~/layouts/layout";
import NotFoundPage from "~/pages/NotFoundPage/NotFoundPage";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
    const { t } = useTranslation();
    return [
        { title: t('page_not_found.seo.title') || "Page not found | Olga Lucía Cortes" },
        { name: "description", content: t('page_not_found.seo.description') }
    ];
};

export default function NotFound() {
  return (
    <Layout>
      <NotFoundPage />
    </Layout>
  );
}