
import { PageHeader } from "@/components/global/pageHeader";
import { PlusIcon } from "lucide-react";
import { InfoCards } from "./components/infoCards";
import { RevenueCards } from "./components/revenueCards";

export function Revenue() {
  function handleAddRevenue() {
    console.log("Adicionar Nova Renda");
  }

  return (
    <>
      <PageHeader title="Renda" button={{ text: "Adicionar Renda", action: handleAddRevenue, icon: <PlusIcon /> }} />
      <InfoCards />
      <RevenueCards />
    </>
  )
}