import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
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
import type { Expense } from "@/types/expense";
import useExpenseStore from "@/storage/expense";
import { Skeleton } from "@/components/ui/skeleton";
interface ExpenseCardsProps {
  expenses?: Expense[];
  isLoading: boolean;
}

export function ExpenseCards({ expenses, isLoading }: ExpenseCardsProps) {
  const setEditExpenseModalData = useExpenseStore(
    (state) => state.setEditExpenseModalData,
  );

  const handleEditExpense = (expense: Expense) => {
    setEditExpenseModalData(true, expense);
  };

  const setDeleteExpenseAlertData = useExpenseStore(
    (state) => state.setDeleteExpenseAlertData,
  );
  const handleDeleteExpense = (expense: Expense) => {
    setDeleteExpenseAlertData(true, expense);
  };

  const handleExpenseValueDisplay = (expense: Expense) => {
    const texts: string[] = [];
    if (expense.min_expense) {
      texts.push(`${maskMoney(expense.min_expense)}`);
    }
    if (expense.max_expense) {
      texts.push(`${maskMoney(expense.max_expense)}`);
    }
    return texts.join(" - ");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {!isLoading ? (
        <>
          {expenses?.map((expense) => (
            <Card key={expense.id}>
              <CardHeader className="border-b border-zinc-200 dark:border-zinc-800">
                <Badge className="text-sm font-bold [&>svg]:size-3.5 uppercase mb-2">
                  <TypeIcons type={expense.type} />
                  {expense.type}
                </Badge>
                <CardDescription className="text-md">
                  {expense.name}
                </CardDescription>
                <CardTitle className="text-lg font-semibold tabular-nums">
                  {handleExpenseValueDisplay(expense)}
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
                        <DropdownMenuItem
                          onClick={() => handleEditExpense(expense)}
                        >
                          <PencilIcon />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteExpense(expense)}
                        >
                          <TrashIcon />
                          Deletar
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardAction>
              </CardHeader>
            </Card>
          ))}
        </>
      ) : (
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
      )}
    </div>
  );
}
