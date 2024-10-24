import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Página no encontrada" },
        { name: "description", content: "Lo sentimos, la página que estás buscando no existe." }
    ];
};

export default function NotFound() {
  return (
    <div>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <a href="/">Volver a la página principal</a>
    </div>
  );
}