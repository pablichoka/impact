"use client";

import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage"); // Namespace para esta página

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <p className="text-lg">{t("welcomeMessage")}</p>
      {/* Aquí va el contenido específico de tu página de inicio */}
    </div>
  );
}
