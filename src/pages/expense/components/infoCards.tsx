import { InfoCard } from "@/components/global/infoCard";
import type { CalculatedExpenseData } from "@/types/expense";
import { maskMoney } from "@/utils/mask";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

interface ExpenseInfoCardsProps {
  calculated_data: CalculatedExpenseData;
  isLoading: boolean;
}
export function ExpenseInfoCards({
  calculated_data,
  isLoading,
}: ExpenseInfoCardsProps) {
  const formattedCardInfo = [
    {
      id: 1,
      title: "Despesa Mínima",
      value: calculated_data.total_min_expense,
      icon: <TrendingDownIcon className="text-green-800" />,
    },
    {
      id: 2,
      title: "Despesa Máxima",
      value: calculated_data.total_max_expense,
      icon: <TrendingUpIcon className="text-green-500" />,
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
