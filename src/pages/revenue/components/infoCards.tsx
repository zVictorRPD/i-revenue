import { InfoCard } from "@/components/global/infoCard";
import { maskMoney } from "@/utils/mask";
import { TrendingDownIcon, TrendingUpDownIcon, TrendingUpIcon } from "lucide-react";
const mockRevenue = [
  {
    id: 1,
    title: "Renda Mínima",
    value: 10000,
    icon: <TrendingDownIcon className="text-green-800" />
  },
  {
    id: 2,
    title: "Renda Máxima",
    value: 50000,
    icon: <TrendingUpIcon className="text-green-500" />
  },
  {
    id: 3,
    title: "Renda Média",
    value: 30000,
    icon: <TrendingUpDownIcon className="text-blue-500" />
  },
  {
    id: 4,
    title: "Total de Impostos",
    value: 2000,
    icon: <TrendingDownIcon className="text-red-500" />
  }
]
export function InfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
      {mockRevenue.map((item) => (
        <InfoCard key={item.id} title={item.title} value={maskMoney(item.value)} icon={item.icon} />
      ))}
    </div>
  )
}