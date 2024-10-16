import { json, type LoaderFunction } from '@remix-run/node';
import { createCookie } from "@remix-run/node";


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
    console.log("Session parseada:", session); // Log para verificar la sesión parseada
  
    // Verificar si existe una sesión activa
    const isLogged = !!(session && session.accessToken);

    return json({ isLogged });
};