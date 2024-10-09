/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import i18next from "i18next";
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { getInitialNamespaces } from "remix-i18next/client";
import * as i18n from "~/i18n";
import { ProductProvider } from "./hooks/ProductContext";

async function main() {
	await i18next
		.use(initReactI18next)
		.use(i18nextBrowserLanguageDetector)
		.init({
			...i18n,
			ns: getInitialNamespaces(),
			detection: { order: ["htmlTag"], caches: [] },
		});
}

startTransition(() => {
	hydrateRoot(
		document,
		<I18nextProvider i18n={i18next}>
			<ProductProvider>
				<StrictMode>
					<RemixBrowser />
				</StrictMode>
			</ProductProvider>
		</I18nextProvider>
	);
});

main().catch((error) => console.error("Error initializing i18n", error));