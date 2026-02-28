import { PageHeader } from "@/components/global/pageHeader";
import { PlusIcon } from "lucide-react";
import { RevenueInfoCards } from "./components/infoCards";
import { RevenueCards } from "./components/cards";
import useRevenueStore from "@/storage/revenue";
import { RevenueAddModal } from "./components/addModal";
import { RevenueDeleteAlert } from "./components/deleteAlert";
import { get } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import type { CalculatedRevenueData, Revenue } from "@/types/revenue";
import { useMemo } from "react";

export function Revenue() {
  const setAddRevenueModalOpen = useRevenueStore(
    (state) => state.setAddRevenueModalOpen,
  );
  function handleAddRevenue() {
    setAddRevenueModalOpen(true);
  }

  const { data: revenues, isLoading } = useQuery({
    queryKey: ["revenues"],
    queryFn: async () => await get<Revenue[]>("/revenues"),
  });

  const calculated_data: CalculatedRevenueData = useMemo(() => {
    let total_min_revenue = 0;
    let total_max_revenue = 0;
    let total_benefits = 0;
    let total_taxes = 0;
    revenues?.data.forEach((revenue) => {
      if (revenue.min_revenue) {
        total_min_revenue += revenue.min_revenue;
        total_max_revenue += revenue.min_revenue;
      }
      if (revenue.max_revenue) {
        total_max_revenue += revenue.max_revenue - revenue.min_revenue;
      }
      revenue.benefits?.forEach((benefit) => {
        total_benefits += benefit.value;
      });
      revenue?.taxes?.forEach((tax) => {
        total_taxes += tax.value;
      });
    });
    return {
      total_min_revenue,
      total_max_revenue,
      total_benefits,
      total_taxes,
    };
  }, [revenues]);

  return (
    <>
      <PageHeader
        title="Renda"
        button={{
          text: "Adicionar Renda",
          action: handleAddRevenue,
          icon: <PlusIcon />,
        }}
      />
      <RevenueInfoCards
        calculated_data={calculated_data}
        isLoading={isLoading}
      />
      <RevenueCards revenues={revenues?.data} isLoading={isLoading} />
      <RevenueAddModal />
      <RevenueDeleteAlert />
    </>
  );
}
