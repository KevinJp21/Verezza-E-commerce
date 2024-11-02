import ReturnsRefundsPage from "~/pages/ReturnsRefunds/ReturnsRefundsPage";
import Layout from "~/layouts/layout";
import { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();
  return [
    { title: t('returnsRefunds.seo.title') },
    { description: t('returnsRefunds.seo.description') }
  ];
};

export default function ReturnsRefunds() {
  return (
    <Layout>
      <ReturnsRefundsPage />
    </Layout>
  );
}
