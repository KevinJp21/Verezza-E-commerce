import { Link } from "@remix-run/react";

export default function NotFound() {
  return (
    <div>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/">Volver a la página principal</Link>
    </div>
  );
}