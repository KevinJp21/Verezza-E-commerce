import Layout from "~/layouts/layout";
import AtelierPage from "~/pages/Atelier/AtelierPage";
import { useTranslation } from "react-i18next";
import { MetaFunction } from "@remix-run/node";



export const meta: MetaFunction = () => {
    const { t } = useTranslation();
    return [
        { title: t("atelier.seo.title") + " | Olga Lucia Cortes" },
        { description: t("atelier.seo.description") }
    ];
};

export default function Atelier() {
    return (
        <Layout>
            <AtelierPage />
        </Layout>
    );
}
