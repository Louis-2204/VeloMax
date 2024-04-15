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
import { Velo } from '@/types/entities';
import { Dispatch, SetStateAction } from 'react';
import { deleteVelo } from '@/utils/deleteVelo';
const AlertVelo = ({
  alertOpen,
  setAlertOpen,
  selectedVelo,
}: {
  alertOpen: boolean;
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
  selectedVelo: Velo;
}) => {
  const router = useRouter();
  const handleDeleteVelo = async () => {
    const isDeleted = await deleteVelo(selectedVelo.id_velo);
    setAlertOpen(false);
    if (isDeleted) {
      toast.success(`Vélo supprimé avec succès`);
    } else {
      toast.error(`Erreur lors de la suppression du vélo`);
    }
    router.refresh();
  };
  return (
    <AlertDialog open={alertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous sûr de vouloir supprimer ce vélo ?</AlertDialogTitle>
          <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setAlertOpen(false)}>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteVelo()}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertVelo;
