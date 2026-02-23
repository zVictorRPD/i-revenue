import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavLink, useLocation } from "react-router"

const data = {
  navMain: [
    {
      title: "Páginas",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Renda",
          url: "/renda",
        },
        {
          title: "Investimento",
          url: "/investimento",
        },
        {
          title: "Despesa",
          url: "/despesa",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={currentPath === item.url}>
                      <NavLink to={item.url}>{item.title}</NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
