"use client";

import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarGroupLabel,
  SidebarGroup,
} from "@components/shadcn/ui/sidebar";
import { Button } from "@components/shadcn/ui/button";
import { Home, Settings, Users } from "lucide-react";
import LanguageSelector from "@components/custom/LanguageSelector";
import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const router = useRouter();

  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      <SidebarProvider>
        <div className="flex background text-foreground min-h-screen">
          <Sidebar className="border-r bg-primary text-primary-foreground flex flex-col">
            <SidebarGroup className="flex flex-col flex-grow">
              <SidebarGroupLabel className="p-4 text-black">
                Admin
              </SidebarGroupLabel>
              <SidebarContent className="flex flex-col flex-grow">
                <SidebarMenu className="flex-grow">
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <Home className="mr-2 h-4 w-4" />
                      Inicio
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Users className="mr-2 h-4 w-4" />
                      Usuarios
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings className="mr-2 h-4 w-4" />
                      Configuración
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter className="p-4">
                <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
                  Cerrar Sesión
                </Button>
              </SidebarFooter>
            </SidebarGroup>
          </Sidebar>

          <SidebarInset className="flex text-foreground p-8">
            <header className="flex justify-left border-b">
              <SidebarTrigger className="mr-4 md:hidden" />
              <h1 className="text-xl font-semibold">Bienvenido al Dashboard</h1>
            </header>
            <main className="flex-1 p-6">
              <p>Contenido principal del dashboard aquí.</p>
              {/* Aquí puedes añadir más componentes y lógica para tu dashboard */}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}
