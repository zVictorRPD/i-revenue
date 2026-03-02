import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useExpenseStore from "@/storage/expense";
import { ExpenseForm } from "./form";
import type { ExpenseFormData } from "@/types/forms/expense/form";
import { Button } from "@/components/ui/button";
import { handleMutationError, post } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function ExpenseAddModal() {
  const queryClient = useQueryClient();
  const addExpenseModalOpen = useExpenseStore(
    (state) => state.addExpenseModalOpen,
  );
  const setAddExpenseModalOpen = useExpenseStore(
    (state) => state.setAddExpenseModalOpen,
  );

  function handleAddExpense(data: ExpenseFormData) {
    mutation.mutate(data);
  }

  const mutation = useMutation({
    mutationFn: async (data: ExpenseFormData) => {
      const response = await post("/expenses", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Despesa adicionada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      setAddExpenseModalOpen(false);
    },
    onError: (error) => {
      const message = handleMutationError(error);
      toast.error(message);
    },
  });

  return (
    <Dialog open={addExpenseModalOpen} onOpenChange={setAddExpenseModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Despesa</DialogTitle>
          <DialogDescription>
            Aqui você pode adicionar uma despesa, seja um aluguel, alimentação,
            transporte, etc.
          </DialogDescription>
        </DialogHeader>
        <ExpenseForm
          key={`add-${String(addExpenseModalOpen)}`}
          onSubmit={handleAddExpense}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            type="submit"
            form="expense-form"
            loading={mutation.isPending}
          >
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
