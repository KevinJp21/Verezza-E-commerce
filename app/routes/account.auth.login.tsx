import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import LoginPage from '~/pages/login/LoginPage';
import Layout from '~/layouts/layout';
import { createCookie } from "@remix-run/node";
import { MetaFunction } from '@remix-run/node';
import { useEffect } from 'react';

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

  // En lugar de redirigir, devolvemos un indicador
  if (session && session.accessToken) {
    return json({ shouldRedirect: true });
  }

  return json({ shouldRedirect: false });
};


export const meta: MetaFunction = () => {
  return [
    { title: 'Olga Lucia Cortes | Iniciar Sesión' },
  ];
};


export default function Login() {
  const { shouldRedirect } = useLoaderData<{ shouldRedirect: boolean }>();

  useEffect(() => {
    if (shouldRedirect) {
      window.location.href = '/';
    }
  }, [shouldRedirect]);

  if (shouldRedirect) {
    return null; // o un componente de carga si prefieres
  }

  return (
    <Layout>
      <LoginPage />
    </Layout>
  );
}
