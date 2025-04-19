"use client";

import { Button } from "@components/shadcn/ui/button";
import { Locale, usePathname, useRouter } from "i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState, useTransition } from "react";

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
    <div>
      <Button onClick={() => alert('miau')}>Miau</Button>
      <div style={{ position: "relative" }}></div>
        <select
          style={{
            color: "white",
            backgroundColor: "transparent",
            padding: "8px 24px 8px 8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            appearance: "none",
            width: "100%"
          }}
          onChange={onSelectChange}
          value={language}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
        {isPending ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div 
              style={{ 
                width: "20px", 
                height: "20px", 
                border: "2px solid white",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }} 
            />
            <style jsx>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "8px" }}>🌐</span>
            <span>{t(`language.${language}`)}</span>
          </div>
        )}
        <span style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>▼</span>
      </div>
  );
};

export default LanguageSelector;