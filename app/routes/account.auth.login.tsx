import { json, redirect, type LoaderFunction } from '@remix-run/node';
import LoginPage from '~/pages/login/LoginPage';
import Layout from '~/layouts/layout';
import { createCookie } from "@remix-run/node";
import { MetaFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }) => {
  // Crear la cookie de sesión
  const sessionCookie = createCookie("customerSession", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  // Obtener la cookie de la solicitud
  const cookieHeader = request.headers.get("Cookie");
  const session = cookieHeader ? await sessionCookie.parse(cookieHeader) : null;

  // Si existe una sesión activa, redirigir al inicio
  if (session && session.accessToken) {
    return redirect('/');
  }

  // Si no hay sesión, continuar con la renderización normal de la página de login
  return json({});
};


export const meta: MetaFunction = () => {
  return [
    { title: 'Olga Lucia Cortes | Iniciar Sesión' },
  ];
};


export default function Login() {

  return (
    <Layout>
      <LoginPage />
    </Layout>
  );
}
