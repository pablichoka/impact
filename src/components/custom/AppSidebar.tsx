"use client";

import { Button } from "@components/shadcn/ui/button";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  Sidebar,
  SidebarRail,
} from "@components/shadcn/ui/sidebar";
import { Calendar, Home, Settings, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mapeo de strings a componentes
const iconMap = {
  Home,
  Users,
  Calendar,
  Settings,
};

type SidebarItem = {
  title: string;
  icon: keyof typeof iconMap;
  url: string;
};

type SidebarItems = {
  category: string;
  items: SidebarItem[];
}[];

export default function AppSidebar() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("Home");

  const adminItems: SidebarItem[] = [
    { title: "Home", icon: "Home", url: "#" },
    { title: "Users", icon: "Users", url: "#" },
    { title: "Settings", icon: "Settings", url: "#" },
  ];

  const userItems: SidebarItem[] = [
    { title: "Home", icon: "Home", url: "#" },
    { title: "Calendar", icon: "Calendar", url: "#" },
    { title: "Settings", icon: "Settings", url: "#" },
  ];

  const sidebarItems: SidebarItems = [
    { category: "User", items: userItems },
    { category: "Admin", items: adminItems },
  ];

  return (
    <Sidebar className="border-r bg-primary text-background flex flex-col">
      <SidebarHeader>
        <div className="flex items-center justify-around p-2">
          <Image src={"/images/logo.png"} alt="Logo" width={70} height={70} />
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <SidebarTrigger className="md:hidden" />
        </div>
      </SidebarHeader>
      {sidebarItems.map((categoryGroup) => (
        <div key={categoryGroup.category}>
          {/* //TODO add collapsible component */}
          <SidebarGroup className="flex flex-col flex-grow">
            <SidebarGroupLabel className="p-4 text-black">
              {categoryGroup.category}
            </SidebarGroupLabel>
            <SidebarContent className="flex flex-col flex-grow">
              <SidebarMenu className="flex-grow">
                {categoryGroup.items.map((menuItem) => {
                  const Icon = iconMap[menuItem.icon];
                  return (
                    <SidebarMenuItem key={menuItem.title}>
                      <SidebarMenuButton
                        isActive={activeItem === menuItem.title}
                        onClick={() => {
                          setActiveItem(menuItem.title);
                          // router.push(menuItem.url);
                        }}
                        asChild
                      >
                        <a href={menuItem.url} className="flex items-center">
                          {Icon && <Icon className="mr-2 h-5 w-5" />}
                          {menuItem.title}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarContent>
          </SidebarGroup>
        </div>
      ))}
      <SidebarFooter className="p-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push("/")}
        >
          Cerrar Sesión
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
