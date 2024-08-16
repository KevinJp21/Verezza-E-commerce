import type { MetaFunction } from "@remix-run/node";

import Home from "~/pages/home/home";
export const meta: MetaFunction = () => {
  return [
    { title: "Olga Lucía Cortes – Ideal para mujeres reales" },
    { name: "description", content: "Descubre la moda exclusiva de Olga Lucía Cortés. Encuentra blusas, pantalones, vestidos y más, diseñados para mujeres reales. Compra ahora y complementa tu look con nuestras colecciones únicas." },
  ];
};

export default function Index() {
  return (
    <Home />
  );
}