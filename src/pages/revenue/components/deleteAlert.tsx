
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
} from "@/components/ui/alert-dialog"
import useRevenueStore from "@/storage/revenue"
import { Trash2Icon } from "lucide-react"

export function RevenueDeleteAlert() {
  const deleteAlertData = useRevenueStore((state) => state.deleteRevenueAlertData)
  const setDeleteAlertOpen = useRevenueStore((state) => state.setDeleteRevenueAlertData)
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
          <AlertDialogTitle>Deletar {deleteAlertData.revenue?.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja deletar essa renda? Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Deletar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
