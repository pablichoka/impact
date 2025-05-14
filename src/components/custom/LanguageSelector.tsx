"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  // SelectValue, // No es necesario si renderizamos contenido personalizado en SelectTrigger
} from "@components/shadcn/ui/select";
import { Locale, usePathname, useRouter } from "i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image"; // Importar Next Image

const LanguageSelector: React.FC = () => {
  const t = useTranslations("frontpage");
  const initialLanguage = useLocale().split("-")[0] as Locale; // Asegurar que sea Locale
  const [language, setLanguage] = useState<Locale>(initialLanguage);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage, pathname]);

  function onSelectChange(value: string) {
    const nextLocale = value as Locale;
    startTransition(() => {
      router.push(pathname, { locale: nextLocale });
      setLanguage(nextLocale);
    });
  }

  const renderSelectedLanguageDisplay = (localeKey: Locale) => {
    const langName = t(`language.${localeKey}`);
    if (isMobile) {
      return (
        <Image
          src={`/flags/${localeKey}.svg`}
          alt={langName}
          width={20}
          height={15}
        />
      );
    }
    return (
      <div className="flex items-center">
        <Image
          src={`/flags/${localeKey}.svg`}
          alt={langName}
          width={20}
          height={15}
          className="mr-2"
        />
        {langName}
      </div>
    );
  };

  return (
    <>
      <div>
        <div style={{ position: "relative" }}>
          <Select
            disabled={isPending}
            onValueChange={onSelectChange}
            value={language}
          >
            <SelectTrigger className={isMobile ? "w-[60px] px-2" : "w-[150px]"}>
              {renderSelectedLanguageDisplay(language)}
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="en"
                className={isMobile ? "!px-2 !py-1" : ""}
              >
                {renderSelectedLanguageDisplay("en")}
              </SelectItem>
              <SelectItem
                value="es"
                className={isMobile ? "!px-2 !py-1" : ""}
              >
                {renderSelectedLanguageDisplay("es")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default LanguageSelector;
