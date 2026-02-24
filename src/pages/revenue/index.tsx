
import { PageHeader } from "@/components/global/pageHeader";
import { PlusIcon } from "lucide-react";
import { RevenueInfoCards } from "./components/infoCards";
import { RevenueCards } from "./components/cards";
import useRevenueStore from "@/storage/revenue";
import { RevenueAddModal } from "./components/addModal";
import { RevenueDeleteAlert } from "./components/deleteAlert";

export function Revenue() {
  const setAddRevenueModalOpen = useRevenueStore((state) => state.setAddRevenueModalOpen);
  function handleAddRevenue() {
    setAddRevenueModalOpen(true);
  }

  return (
    <>
      <PageHeader title="Renda" button={{ text: "Adicionar Renda", action: handleAddRevenue, icon: <PlusIcon /> }} />
      <RevenueInfoCards />
      <RevenueCards />

      <RevenueAddModal />
      <RevenueDeleteAlert />
    </>
  )
}