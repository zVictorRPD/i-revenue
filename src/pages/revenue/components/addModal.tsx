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
import { handleMutationError, post } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function RevenueAddModal() {
  const queryClient = useQueryClient();
  const addRevenueModalOpen = useRevenueStore(
    (state) => state.addRevenueModalOpen,
  );
  const setAddRevenueModalOpen = useRevenueStore(
    (state) => state.setAddRevenueModalOpen,
  );

  function handleAddRevenue(data: RevenueFormData) {
    mutation.mutate(data);
  }

  const mutation = useMutation({
    mutationFn: async (data: RevenueFormData) => {
      const response = await post("/revenues", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Renda adicionada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["revenues"] });
      setAddRevenueModalOpen(false);
    },
    onError: (error) => {
      const message = handleMutationError(error);
      toast.error(message);
    },
  });

  return (
    <Dialog open={addRevenueModalOpen} onOpenChange={setAddRevenueModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Renda</DialogTitle>
          <DialogDescription>
            Aqui você pode adicionar uma fonte de renda, seja um salário,
            freelance, vendas, etc.
          </DialogDescription>
        </DialogHeader>
        <RevenueForm onSubmit={handleAddRevenue} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            type="submit"
            form="revenue-form"
            loading={mutation.isPending}
          >
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
