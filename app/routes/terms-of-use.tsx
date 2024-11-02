import TermsofUse from "~/pages/TermsofUse/TermsofUsePage";
import Layout from "~/layouts/layout";
import { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();
  return [
    { title: t("TermsofUse.seo.title") },
    { name: "description", content: t("TermsofUse.seo.description") },
  ];
};

export default function TermsOfUse() {
  return (
    <Layout>
      <TermsofUse />
    </Layout>
  );
}
