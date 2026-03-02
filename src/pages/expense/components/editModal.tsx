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
import { handleMutationError, put } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function ExpenseEditModal() {
  const queryClient = useQueryClient();
  const editExpenseModalData = useExpenseStore(
    (state) => state.editExpenseModalData,
  );
  const setEditExpenseModalData = useExpenseStore(
    (state) => state.setEditExpenseModalData,
  );

  function handleEditExpense(data: ExpenseFormData) {
    mutation.mutate(data);
  }

  const mutation = useMutation({
    mutationFn: async (data: ExpenseFormData) => {
      const response = await put(
        `/expenses/${editExpenseModalData.expense?.id}`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Despesa editada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      setEditExpenseModalData(false, null);
    },
    onError: (error) => {
      const message = handleMutationError(error);
      toast.error(message);
    },
  });

  return (
    <Dialog
      open={editExpenseModalData.open}
      onOpenChange={(open) => setEditExpenseModalData(open, null)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Despesa</DialogTitle>
          <DialogDescription>
            Aqui você pode editar uma despesa, seja um aluguel, alimentação,
            transporte, etc.
          </DialogDescription>
        </DialogHeader>
        <ExpenseForm
          key={`${editExpenseModalData.expense?.id ?? "new"}-${String(editExpenseModalData.open)}`}
          onSubmit={handleEditExpense}
          expense={editExpenseModalData.expense}
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
            Editar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
