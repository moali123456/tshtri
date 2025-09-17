"use client";
import { useTranslations, useLocale } from "next-intl";
import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
  Users,
  Notebook,
  ShieldUser,
} from "lucide-react";

import { NavMain } from "./nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import LogoutButton from "../logout-button/LogutButton";
import Images from "../../../../public/assets/images/images";
import Image from "next/image";

function MainSidebar({ ...props }) {
  const t = useTranslations("sidebar");
  const locale = useLocale();

  const isRTL = locale === "ar";

  const data = {
    navMain: [
      {
        title: t("dashboard"),
        url: "/dashboard",
        icon: SquareTerminal,
      },
      {
        title: t("users"),
        url: "#",
        icon: Users,
        //isActive: true,
        items: [
          {
            title: (
              <span className="flex gap-1">
                <ShieldUser className="size-4" /> {t("admins")}
              </span>
            ),
            url: "/admins",
            //isActive: true,
            //icon: Users,
          },
          {
            title: t("customers"),
            url: "/customers",
            //icon: ShieldUser,
          },
        ],
      },
      {
        title: t("advertisements"),
        url: "/advertisements",
        icon: Bot,
      },
      {
        title: t("contacts"),
        url: "/contacts",
        icon: Notebook,
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className={isRTL ? "right-0" : "left-0"}
    >
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted cursor-default">
              <div className="bg-[#b6e2bf] text-sidebar-primary-foreground flex items-center justify-center rounded-lg size-10 p-2">
                <Image
                  src={Images.logoIcon}
                  alt="logo"
                  width={70}
                  height={70}
                />
              </div>
              <div className="grid text-left text-sm leading-tight">
                <Image
                  src={Images.textLogo}
                  alt="logo"
                  width={70}
                  height={50}
                />
                {/* <span className="font-medium truncate">Acme Inc</span>
                <span className="text-xs truncate">Enterprise Plan</span> */}
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main navigation content */}
      <SidebarContent>
        {/* <SidebarMenu>
          <SidebarMenuItem>
            <a
              href="#"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              <SquareTerminal className="h-4 w-4" />
              <span>Dashboard</span>
            </a>
          </SidebarMenuItem>
        </SidebarMenu> */}
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <div className="py-4 px-1.5">
          <LogoutButton className="text-white bg-[#4ca161] py-3 px-6 rounded-lg text-base font-medium w-full" />
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

export default MainSidebar;
