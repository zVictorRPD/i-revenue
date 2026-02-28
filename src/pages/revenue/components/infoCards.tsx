import { InfoCard } from "@/components/global/infoCard";
import type { CalculatedRevenueData } from "@/types/revenue";
import { maskMoney } from "@/utils/mask";
import {
  TrendingDownIcon,
  TrendingUpDownIcon,
  TrendingUpIcon,
} from "lucide-react";

interface RevenueInfoCardsProps {
  calculated_data: CalculatedRevenueData;
  isLoading: boolean;
}
export function RevenueInfoCards({
  calculated_data,
  isLoading,
}: RevenueInfoCardsProps) {
  const formattedCardInfo = [
    {
      id: 1,
      title: "Renda Mínima",
      value: calculated_data.total_min_revenue,
      icon: <TrendingDownIcon className="text-green-800" />,
    },
    {
      id: 2,
      title: "Renda Máxima",
      value: calculated_data.total_max_revenue,
      icon: <TrendingUpIcon className="text-green-500" />,
    },
    {
      id: 3,
      title: "Total de Benefícios",
      value: calculated_data.total_benefits,
      icon: <TrendingUpDownIcon className="text-blue-500" />,
    },
    {
      id: 4,
      title: "Total de Impostos",
      value: calculated_data.total_taxes,
      icon: <TrendingDownIcon className="text-red-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
      {formattedCardInfo.map((item) => (
        <InfoCard
          key={item.id}
          title={item.title}
          value={maskMoney(item.value)}
          icon={item.icon}
          loading={isLoading}
        />
      ))}
    </div>
  );
}
