import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "@/components/ui/theme-provider";
import { MoonIcon, SunIcon } from "lucide-react";

export function LoggedInHeader() {
  const { theme, setTheme } = useTheme();
  
  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="p-4 px-6 border-b flex items-center justify-between">
      <SidebarTrigger />
      <Button variant="ghost" size="icon-sm" onClick={toggleTheme}>
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </header>
  )
}