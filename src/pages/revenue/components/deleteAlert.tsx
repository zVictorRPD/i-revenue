import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useRevenueStore from "@/storage/revenue";
import { del, handleMutationError } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export function RevenueDeleteAlert() {
  const queryClient = useQueryClient();
  const deleteAlertData = useRevenueStore(
    (state) => state.deleteRevenueAlertData,
  );
  const setDeleteAlertOpen = useRevenueStore(
    (state) => state.setDeleteRevenueAlertData,
  );
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await del(`/revenues/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Renda deletada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["revenues"] });
      setDeleteAlertOpen(false, null);
    },
    onError: (error) => {
      const message = handleMutationError(error);
      toast.error(message);
    },
  });

  return (
    <AlertDialog
      open={deleteAlertData.open}
      onOpenChange={(open) => setDeleteAlertOpen(open, null)}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="size-12 bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon className="size-6" />
          </AlertDialogMedia>
          <AlertDialogTitle>
            Deletar {deleteAlertData.revenue?.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja deletar essa renda? Essa ação não pode ser
            desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutation.mutate(deleteAlertData.revenue?.id || 0)}
            asChild
          >
            <Button variant="destructive" loading={mutation.isPending}>
              Deletar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
