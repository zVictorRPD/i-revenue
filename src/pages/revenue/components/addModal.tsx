import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useRevenueStore from "@/storage/revenue";
import { RevenueForm } from "./form";

export function RevenueAddModal() {
  const addRevenueModalOpen = useRevenueStore((state) => state.addRevenueModalOpen)
  const setAddRevenueModalOpen = useRevenueStore((state) => state.setAddRevenueModalOpen)
  return (
    <Dialog
      open={addRevenueModalOpen}
      onOpenChange={setAddRevenueModalOpen}
    >
      <form>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Renda</DialogTitle>
            <DialogDescription>
              Aqui você pode adicionar uma fonte de renda, seja um salário, freelance, vendas, etc.
            </DialogDescription>
          </DialogHeader>
          <RevenueForm />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}