import { json, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import LoginPage from '~/pages/login/LoginPage';
import Layout from '~/layouts/layout';
import { createCookie } from "@remix-run/node";
import { MetaFunction } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const baseUrl = "https://olgaluciacortes.com";
  return [
    { title: t('login.seo.title') },
    { name: "description", content: t('login.seo.description') },
    { name: "og:title", content: t("login.seo.title") },
    { name: "og:site_name", content: "Verezza" },
    { name: "og:description", content: t("login.seo.description") },
    { name: "og:image", content: `${baseUrl}/seo/icon.webp` },
    { name: "og:image:alt", content: "Verezza Icon" },
    { name: "og:image:width", content: "192" },
    { name: "og:image:height", content: "192" },
    { name: "og:type", content: "website" },
    { name: "og:url", content: `${baseUrl}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t("login.seo.title") },
    { name: "twitter:description", content: t("login.seo.description") },
    { name: "twitter:image", content: `${baseUrl}/seo/icon.webp` },
    { name: "og:updated_time", content: "2024-11-12T14:59:00Z" },
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
