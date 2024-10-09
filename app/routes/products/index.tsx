import Shop from "~/pages/shop/shop";
import { MetaFunction } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();
  return [
    { title: t("products.products_seo.title") },
  ];
};

export default function ShopIndex() {
  return (
      <Shop />
  );
}