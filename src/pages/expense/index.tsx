import { PageHeader } from "@/components/global/pageHeader";
import { PlusIcon } from "lucide-react";
import { ExpenseInfoCards } from "./components/infoCards";
import { ExpenseCards } from "./components/cards";
import useExpenseStore from "@/storage/expense";
import { ExpenseAddModal } from "./components/addModal";
import { ExpenseDeleteAlert } from "./components/deleteAlert";
import { get } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import type { CalculatedExpenseData, Expense } from "@/types/expense";
import { useMemo } from "react";
import { ExpenseEditModal } from "./components/editModal";

export function Expense() {
  const setAddExpenseModalOpen = useExpenseStore(
    (state) => state.setAddExpenseModalOpen,
  );
  function handleAddExpense() {
    setAddExpenseModalOpen(true);
  }

  const { data: expenses, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => await get<Expense[]>("/expenses"),
  });

  const calculated_data: CalculatedExpenseData = useMemo(() => {
    let total_min_expense = 0;
    let total_max_expense = 0;
    expenses?.data.forEach((expense) => {
      if (expense.min_expense) {
        total_min_expense += expense.min_expense;
        total_max_expense += expense.min_expense;
      }
      if (expense.max_expense) {
        total_max_expense += expense.max_expense - expense.min_expense;
      }
    });
    return {
      total_min_expense,
      total_max_expense,
    };
  }, [expenses]);

  return (
    <>
      <PageHeader
        title="Despesa"
        button={{
          text: "Adicionar Despesa",
          action: handleAddExpense,
          icon: <PlusIcon />,
        }}
      />
      <ExpenseInfoCards
        calculated_data={calculated_data}
        isLoading={isLoading}
      />
      <ExpenseCards expenses={expenses?.data} isLoading={isLoading} />
      <ExpenseAddModal />
      <ExpenseEditModal />
      <ExpenseDeleteAlert />
    </>
  );
}
