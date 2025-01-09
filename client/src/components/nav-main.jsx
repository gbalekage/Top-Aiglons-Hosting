import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

export function NavMain({ items }) {
  const location = useLocation(); // Get the current location
  const pathName = location.pathname; // Extract the pathname

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathName === item.url;

          return (
            <Link key={item.title} to={item.url} className="rounded-none">
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={
                    isActive ? "bg-black text-white hover:bg-gray-800 hover:text-white" : "text-gray-700"
                  } // Add active styles
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
