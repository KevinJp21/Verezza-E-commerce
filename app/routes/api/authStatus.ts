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
    console.log("Cookie header recibido:", cookieHeader); // Log para depurar el encabezado de la cookie

    const session = cookieHeader ? await sessionCookie.parse(cookieHeader) : null;
    console.log("Session parseada:", session); // Log para verificar la sesión parseada
  
    // Verificar si existe una sesión activa
    const isLogged = !!(session && session.accessToken);

    console.log("Estado de sesión:", isLogged); // Log para depuración del estado de sesión

    return json({ isLogged });
};