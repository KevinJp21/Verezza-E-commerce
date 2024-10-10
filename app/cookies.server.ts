import { createCookie } from "@remix-run/node";

export const preferenceCookie = createCookie("user-preference", {
  maxAge: 604_800, // una semana
  path: "/",
});