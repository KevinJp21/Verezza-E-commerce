import { useEffect, useState } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import './styles.css'
import { ProductProvider } from './hooks/ProductContext';
import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import i18next  from "~/i18next.server";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request);
  return json({ locale });
}

export let handle = {
	i18n: "global",
};

export const links: LinksFunction = () => {
  return [
    { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'}
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  let { locale: initialLocale } = useLoaderData<typeof loader>();
  const [locale, setLocale] = useState(initialLocale);

	let { i18n } = useTranslation();

  useChangeLanguage(locale);

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
    
  }, [])

  return (
    <html lang={locale} dir={i18n.dir()}>
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
  return <Outlet />;
}
