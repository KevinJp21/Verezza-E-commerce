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

export const handle = { i18n: ["translation"] }

export async function loader({ request }: LoaderFunctionArgs) {
  let locale = await i18nServer.getLocale(request);
  return json({ locale });
}


export const links: LinksFunction = () => {
  return [
    { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'}
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {

  let loaderData = useRouteLoaderData<typeof loader>("root");

  return (
    <html lang={loaderData?.locale ?? "en"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ProductProvider>
          {children}
        </ProductProvider>
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
    if(typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('selectedLanguage');
      if(storedLanguage) {
        if(storedLanguage === 'Español') {
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