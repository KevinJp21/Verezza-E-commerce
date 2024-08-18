import type { MetaFunction } from "@remix-run/node";

import Home from "~/pages/home/home";

export const meta: MetaFunction = () => {
  const currentDate = new Date().toISOString();
 
  return [
    { title: "Olga Lucía Cortes – Moda exclusiva para mujeres reales" },
    { name: "description", content: "Descubre la moda exclusiva de Olga Lucía Cortés. Encuentra blusas, pantalones, vestidos y más, diseñados para mujeres reales. Compra ahora y complementa tu look con nuestras colecciones únicas." },
    { name: "keywords", content: "moda, ropa de mujer, blusas, pantalones, vestidos, accesorios, moda colombiana, talla s, talla m, talla l, talla xl, talla xxl, complementos" },
    { name: "og:title", content: "Olga Lucía Cortes - Moda exclusiva para mujeres reales" },
    { name: "og:description", content: "Descubre nuestra colección de moda diseñada para resaltar la belleza de todas las mujeres. Prendas únicas y elegantes para cada ocasión." },
    { name: "og:image", content: `https://olga-lucia-cortes.vercel.app/seo/HomeScreen.webp` },
    { name: "og:image:alt", content: "Página de inicio de Olga Lucía Cortés" },
    { name: "og:image:width", content: "1200" },
    { name: "og:image:height", content: "630" },
    { name: "og:type", content: "website" },
    { name: "og:url", content: "https://olga-lucia-cortes.vercel.app" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Olga Lucía Cortes – Moda exclusiva para mujeres reales" },
    { name: "twitter:description", content: "Descubre la moda exclusiva de Olga Lucía Cortés. Encuentra blusas, pantalones, vestidos y más, diseñados para mujeres reales. Compra ahora y complementa tu look con nuestras colecciones únicas." },
    { name: "twitter:image", content: `https://olga-lucia-cortes.vercel.app/seo/HomeScreen.webp` },
    { name: "og:updated_time", content: currentDate },
  ];
};

export default function Index() {
  return (
    <Home />
  );
}