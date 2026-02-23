import { Outlet } from "react-router";
import { AppSidebar } from "./sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LoggedInHeader } from "./header";

export function LoggedInLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <LoggedInHeader />
          <main className="p-4 md:p-6 flex-1 flex flex-col gap-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}