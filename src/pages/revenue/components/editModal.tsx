import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useRevenueStore from "@/storage/revenue";
import { RevenueForm } from "./form";
import type { RevenueFormData } from "@/types/forms/revenue/form";
import { Button } from "@/components/ui/button";
import { handleMutationError, put } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function RevenueEditModal() {
  const queryClient = useQueryClient();
  const editRevenueModalData = useRevenueStore(
    (state) => state.editRevenueModalData,
  );
  const setEditRevenueModalData = useRevenueStore(
    (state) => state.setEditRevenueModalData,
  );

  function handleEditRevenue(data: RevenueFormData) {
    mutation.mutate(data);
  }

  const mutation = useMutation({
    mutationFn: async (data: RevenueFormData) => {
      const response = await put(
        `/revenues/${editRevenueModalData.revenue?.id}`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Renda editada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["revenues"] });
      setEditRevenueModalData(false, null);
    },
    onError: (error) => {
      const message = handleMutationError(error);
      toast.error(message);
    },
  });

  return (
    <Dialog
      open={editRevenueModalData.open}
      onOpenChange={(open) => setEditRevenueModalData(open, null)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Renda</DialogTitle>
          <DialogDescription>
            Aqui você pode editar uma fonte de renda, seja um salário,
            freelance, vendas, etc.
          </DialogDescription>
        </DialogHeader>
        <RevenueForm
          key={`${editRevenueModalData.revenue?.id ?? "new"}-${String(editRevenueModalData.open)}`}
          onSubmit={handleEditRevenue}
          revenue={editRevenueModalData.revenue}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            type="submit"
            form="revenue-form"
            loading={mutation.isPending}
          >
            Editar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
