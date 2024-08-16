import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Olga Lucía Cortes – Ideal para mujeres reales" },
    { name: "description", content: "Descubre la moda exclusiva de Olga Lucía Cortés. Encuentra blusas, pantalones, vestidos y más, diseñados para mujeres reales. Compra ahora y complementa tu look con nuestras colecciones únicas." },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Olga Lucía Cortes</h1>
    </div>
  );
}