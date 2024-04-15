'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Piece } from '@/types/entities';
import { Dispatch, SetStateAction } from 'react';
import { deletePiece } from '@/utils/deletePiece';
const AlertPiece = ({
  alertOpen,
  setAlertOpen,
  selectedPiece,
}: {
  alertOpen: boolean;
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
  selectedPiece: Piece;
}) => {
  const router = useRouter();
  const handleDeletePiece = async () => {
    const isDeleted = await deletePiece(selectedPiece.id_piece);
    setAlertOpen(false);
    if (isDeleted) {
      toast.success(`Pièce supprimée avec succès`);
    } else {
      toast.error(`Erreur lors de la suppression de la pièce`);
    }
    router.refresh();
  };
  return (
    <AlertDialog open={alertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous sûr de vouloir supprimer cette pièce ?</AlertDialogTitle>
          <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setAlertOpen(false)}>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeletePiece()}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertPiece;
