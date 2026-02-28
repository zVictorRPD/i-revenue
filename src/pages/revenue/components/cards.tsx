import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CircleDollarSignIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { maskMoney } from "@/utils/mask";
import { TypeIcons } from "@/components/global/typeIcons";
import type { Revenue } from "@/types/revenue";
import useRevenueStore from "@/storage/revenue";
import { Skeleton } from "@/components/ui/skeleton";
import { revenueBenefits } from "@/types/forms/revenue/form";
interface RevenueCardsProps {
  revenues?: Revenue[];
  isLoading: boolean;
}

export function RevenueCards({ revenues, isLoading }: RevenueCardsProps) {
  const setDeleteRevenueAlertData = useRevenueStore(
    (state) => state.setDeleteRevenueAlertData,
  );
  const handleDeleteRevenue = (revenue: Revenue) => {
    setDeleteRevenueAlertData(true, revenue);
  };

  const handleRevenueValueDisplay = (revenue: Revenue) => {
    const texts: string[] = [];
    if (revenue.min_revenue) {
      texts.push(`${maskMoney(revenue.min_revenue)}`);
    }
    if (revenue.max_revenue) {
      texts.push(`${maskMoney(revenue.max_revenue)}`);
    }
    return texts.join(" - ");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {isLoading ? (
        <>
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <CardHeader className="border-b border-zinc-200 dark:border-zinc-800">
                <Skeleton className="w-14 h-4 mb-2" />
                <Skeleton className="w-12 h-4 mb-2" />
                <Skeleton className="w-20 h-4 mb-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="w-14 h-5 mb-3" />
                <Skeleton className="w-full h-8 mb-3" />
                <Skeleton className="w-full h-8 mb-3" />
                <Skeleton className="w-full h-8" />
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <>
          {revenues?.map((revenue) => (
            <Card key={revenue.id}>
              <CardHeader className="border-b border-zinc-200 dark:border-zinc-800">
                <Badge className="text-sm font-bold [&>svg]:size-3.5 uppercase mb-2">
                  <TypeIcons type={revenue.type} />
                  {revenue.type}
                </Badge>
                <CardDescription className="text-md">
                  {revenue.name}
                </CardDescription>
                <CardTitle className="text-lg font-semibold tabular-nums">
                  {handleRevenueValueDisplay(revenue)}
                </CardTitle>
                <CardAction className="flex gap-2 items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size={"icon-sm"}>
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
                        <DropdownMenuItem
                          onClick={() => handleDeleteRevenue(revenue)}
                        >
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
                        <li
                          key={benefit.id}
                          className="flex items-center gap-2 py-2 not-last-of-type:border-b border-zinc-200 dark:border-zinc-800"
                        >
                          <div className="rounded-full bg-zinc-200 dark:bg-zinc-800 p-1.5">
                            <TypeIcons
                              type={benefit.type}
                              className="w-3.5 h-3.5"
                            />
                          </div>
                          <span className="font-medium text-sm">
                            {revenueBenefits[benefit.type]}
                          </span>
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
                        <li
                          key={index}
                          className="flex items-center gap-2 py-2 not-last-of-type:border-b border-zinc-200 dark:border-zinc-800"
                        >
                          <div className="rounded-full bg-zinc-200 dark:bg-zinc-800 p-1.5">
                            <CircleDollarSignIcon className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-medium text-sm">
                            {tax.name}
                          </span>
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
        </>
      )}
    </div>
  );
}
