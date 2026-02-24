import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { CircleDollarSignIcon, MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { maskMoney } from "@/utils/mask";
import { TypeIcons } from "@/components/global/typeIcons";
import type { Revenue } from "@/types/revenue";
import useRevenueStore from "@/storage/revenue";

const revenueData: Revenue[] = [
  {
    id: 1,
    type: 'clt',
    cycle: 'monthly',
    name: 'Salário Havan',
    min_revenue: 4000,
    max_revenue: 5000,
    benefits: [
      {
        id: 1,
        type: 'food',
        name: 'Vale Refeição',
        value: 900,
        cycle: 'monthly'
      },
      {
        id: 2,
        type: 'food',
        name: 'Vale Alimentação',
        value: 500,
        cycle: 'monthly'
      },
      {
        id: 3,
        type: 'health',
        name: 'Plano de Saúde',
        value: 300,
        cycle: 'monthly'
      },
      {
        id: 4,
        type: 'transport',
        name: 'Vale Transporte',
        value: 300,
        cycle: 'monthly'
      }
    ],
    taxes: [
      {
        name: 'INSS',
        value: 500,
        cycle: 'monthly'
      },
      {
        name: 'IRRF',
        value: 200,
        cycle: 'monthly'
      }
    ]
  },
  {
    id: 2,
    type: 'pj',
    cycle: 'monthly',
    name: 'Freelancer',
    min_revenue: 6000,
    max_revenue: 8000,
    benefits: [
      {
        id: 1,
        type: 'food',
        name: 'Vale Refeição',
        value: 900,
        cycle: 'monthly'
      },
      {
        id: 2,
        type: 'food',
        name: 'Vale Alimentação',
        value: 500,
        cycle: 'monthly'
      },
    ],
    taxes: [
      {
        name: 'Simples Nacional',
        value: 1000,
        cycle: 'monthly'
      }
    ]
  },
]

export function RevenueCards() {
  const setDeleteRevenueAlertData = useRevenueStore((state) => state.setDeleteRevenueAlertData);
  const handleDeleteRevenue = (revenue: Revenue) => {
    setDeleteRevenueAlertData(true, revenue);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {revenueData.map((revenue) => (
        <Card key={revenue.id}>
          <CardHeader className="border-b border-zinc-200 dark:border-zinc-800">
            <Badge className="text-sm font-bold [&>svg]:size-3.5 uppercase mb-2">
              <TypeIcons type={revenue.type} />
              {revenue.type}
            </Badge>
            <CardDescription className="text-md">{revenue.name}</CardDescription>
            <CardTitle className="text-lg font-semibold tabular-nums">
              {maskMoney(revenue.min_revenue)} - {maskMoney(revenue.max_revenue)}
            </CardTitle>
            <CardAction className="flex gap-2 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size={'icon-sm'}>
                    <MoreHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <PencilIcon />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteRevenue(revenue)}>
                      <TrashIcon />
                      Deletar
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
          </CardHeader>
          <CardContent>
            {revenue.benefits && (
              <>
                <h6 className="font-semibold mb-1">Benefícios:</h6>
                <ul className="flex flex-col">
                  {revenue.benefits.map((benefit) => (
                    <li key={benefit.id} className="flex items-center gap-2 py-2 not-last-of-type:border-b border-zinc-200 dark:border-zinc-800">
                      <div className="rounded-full bg-zinc-200 dark:bg-zinc-800 p-1.5">
                        <TypeIcons type={benefit.type} className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium text-sm">{benefit.name}</span>
                      <span className="ml-auto font-medium text-sm">
                        {maskMoney(benefit.value)}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {revenue.taxes && (
              <>
                <h6 className="font-semibold mt-2 mb-1">Impostos:</h6>
                <ul className="flex flex-col">
                  {revenue.taxes.map((tax, index) => (
                    <li key={index} className="flex items-center gap-2 py-2 not-last-of-type:border-b border-zinc-200 dark:border-zinc-800">
                      <div className="rounded-full bg-zinc-200 dark:bg-zinc-800 p-1.5">
                        <CircleDollarSignIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium text-sm">{tax.name}</span>
                      <span className="ml-auto font-medium text-sm">
                        {maskMoney(tax.value)}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </CardContent>
        </Card>
      ))}

    </div>
  )
}