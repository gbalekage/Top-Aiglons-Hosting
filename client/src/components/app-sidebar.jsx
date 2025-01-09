import * as React from "react";
import { Globe, Server, SquareTerminal } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

import LogoImg from "@/assets/icon.png";
import { Link } from "react-router-dom";
import { RiCashFill } from "@remixicon/react";
import { NavUser } from "./nav-user";

// Sample data for sidebar navigation
const data = [
  {
    title: "Tableau de bord",
    url: "/dashboard",
    icon: SquareTerminal,
  },
  {
    title: "Hebergement",
    url: "/my-hosting",
    icon: Server,
  },
  {
    title: "Nom de Domain",
    url: "/my-domains",
    icon: Globe,
  },
  {
    title: "Mes Factures",
    url: "/billing",
    icon: RiCashFill,
  },
];

// User data for displaying profile information
const user = {
  name: "Balekage Gael",
  email: "gbalekage21@gmail.com",
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link to="/" className="flex items-center gap-3">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <img src={LogoImg} className="size-4" alt="Logo" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate text-lg font-semibold">topaiglons</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
