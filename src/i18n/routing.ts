import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  //Set your preferred languages
  locales: ['en', 'es'],
  localePrefix: 'always',
  defaultLocale: 'es',
  pathnames: {
    '/': '/',
    '/dashboard': {
      en: '/dashboard',
      es: '/panel-de-control'
    }
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);