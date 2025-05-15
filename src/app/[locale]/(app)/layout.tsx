import AppSidebar from "@components/custom/AppSidebar";
import LanguageSelector from "@components/custom/LanguageSelector";
import { SidebarInset, SidebarProvider } from "@components/shadcn/ui/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function ProtectedAppLayout({ children, params }: Props) {
  return (
    <SidebarProvider>
      <div className="flex min-w-screen h-screen">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col">
          <div className="absolute top-4 right-4 z-50 w-max">
            <LanguageSelector />
          </div>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
