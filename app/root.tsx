import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useEffect, useState } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import './styles.css'
import { ProductProvider } from './hooks/ProductContext';
import i18nServer from "./modules/i18n.server";
import { useChangeLanguage } from "remix-i18next/react";
import NimbusSans from '~/assets/fonts/fonts.css?url';
import { AuthProvider } from "./hooks/authStatus";
import { CartProvider } from '~/hooks/Cart';
export const handle = { i18n: ["translation"] }

export async function loader({ request }: LoaderFunctionArgs) {
  let locale = await i18nServer.getLocale(request);
  return json({ locale });
}


export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'use-credentials' },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" },
    { rel: 'stylesheet', href: NimbusSans }
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  let loaderData = useRouteLoaderData<typeof loader>("root");

  return (
    <html lang={loaderData?.locale ?? "es"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
        </AuthProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  let { locale: initialLocale } = useLoaderData<typeof loader>();
  const [locale, setLocale] = useState(initialLocale);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('selectedLanguage');
      if (storedLanguage) {
        if (storedLanguage === 'Español') {
          setLocale('es');
        } else {
          setLocale('en');
        }
      }
    }
  }, [initialLocale]);

  useChangeLanguage(locale);
  return <Outlet />;
}
