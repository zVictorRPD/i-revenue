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

export function RevenueAddModal() {
  const addRevenueModalOpen = useRevenueStore(
    (state) => state.addRevenueModalOpen,
  );
  const setAddRevenueModalOpen = useRevenueStore(
    (state) => state.setAddRevenueModalOpen,
  );

  function handleAddRevenue(data: RevenueFormData) {
    console.log("Dados do formulário:", data);
  }

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
          <Button type="submit" form="revenue-form">
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
