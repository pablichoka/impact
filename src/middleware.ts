import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  //Adapt as your preferences
  matcher: [
    '/',
    '/(es|en)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)',
    '/((?!api|_next|.*\\..*).*)'
  ]
};