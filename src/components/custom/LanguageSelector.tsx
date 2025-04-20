"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/shadcn/ui/select";
import { Locale, usePathname, useRouter } from "i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState, useTransition } from "react";
import LoadingSpinner from "./LoadingSpinner";

const LanguageSelector: React.FC = () => {
  const t = useTranslations("frontpage");
  const initialLanguage = useLocale().split("-")[0];
  const [language, setLanguage] = useState(initialLanguage);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage, pathname]);

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.push(pathname, { locale: nextLocale });
      setLanguage(nextLocale);
    });
  }

  return (
    <>
      <div>
        <div style={{ position: "relative" }}>
          <Select
            onValueChange={(value) => {
              const mockEvent = {
                target: { value },
              } as React.ChangeEvent<HTMLSelectElement>;
              onSelectChange(mockEvent);
            }}
            value={language}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">{t('language.en')}</SelectItem>
              <SelectItem value="es">{t('language.es')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isPending && (
        <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex items-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};

export default LanguageSelector;
