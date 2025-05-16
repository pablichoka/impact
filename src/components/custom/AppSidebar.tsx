"use client";

import { Button } from "@components/shadcn/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components/shadcn/ui/collapsible";
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
import {
  CalendarMonth,
  Home,
  Settings,
  People,
  UnfoldMore,
  AdminPanelSettings,
  ArrowRight,
} from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mapeo de strings a componentes
const iconMap = {
  Home,
  People,
  CalendarMonth,
  Settings,
  AdminPanelSettings,
};

type SidebarItem = {
  title: string;
  icon: keyof typeof iconMap;
  url: string;
  collapsible: boolean;
};

type SidebarItems = {
  category: string;
  items: SidebarItem[];
}[];

export default function AppSidebar() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("Home");

  const adminItems: SidebarItem[] = [
    { title: "Users", icon: "People", url: "#", collapsible: true },
    {
      title: "Admin settings",
      icon: "AdminPanelSettings",
      url: "#",
      collapsible: true,
    },
  ];

  const userItems: SidebarItem[] = [
    { title: "Home", icon: "Home", url: "#", collapsible: false },
    { title: "Calendar", icon: "CalendarMonth", url: "#", collapsible: true },
    { title: "Settings", icon: "Settings", url: "#", collapsible: false },
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
          <SidebarGroup className="flex flex-col flex-grow">
            <SidebarGroupLabel className="p-4 text-black">
              {categoryGroup.category}
            </SidebarGroupLabel>
            <SidebarContent className="flex flex-col flex-grow bg-white/20 p-2 rounded-lg">
              <SidebarMenu className="flex-grow">
                {categoryGroup.items.map((menuItem) => {
                  const Icon = iconMap[menuItem.icon];
                  return (
                    <SidebarMenuItem key={menuItem.title}>
                      {menuItem.collapsible && (
                        <Collapsible key={menuItem.title}>
                          <SidebarMenuButton
                            isActive={activeItem === menuItem.title}
                            onClick={() => {
                              setActiveItem(menuItem.title);
                              // router.push(menuItem.url);
                            }}
                            asChild
                          >
                            <span className="flex items-center justify-between">
                              <a
                                href={menuItem.url}
                                className="flex items-center"
                              >
                                {Icon && <Icon className="mr-2 h-5 w-5" />}
                                {menuItem.title}
                              </a>
                              <CollapsibleTrigger>
                                <ArrowRight />
                              </CollapsibleTrigger>
                            </span>
                          </SidebarMenuButton>
                          <CollapsibleContent>
                            <UnfoldMore className="ml-4" />
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarContent>
          </SidebarGroup>
        </div>
      ))}
      <div className="flex flex-col mt-auto">
        <SidebarFooter className="p-4">
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => router.push("/")}
          >
            Cerrar Sesión
          </Button>
        </SidebarFooter>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
