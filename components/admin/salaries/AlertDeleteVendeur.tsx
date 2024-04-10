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
import { deleteVendeur } from '@/utils/deleteVendeur';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Vendeur } from '@/types/entities';
import { Dispatch, SetStateAction } from 'react';
const AlertDeleteVendeur = ({
  alertOpen,
  setAlertOpen,
  selectedVendeur,
}: {
  alertOpen: boolean;
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
  selectedVendeur: Vendeur;
}) => {
  const router = useRouter();
  const handleDeleteVendeur = async () => {
    const isDeleted = await deleteVendeur(selectedVendeur.id_vendeur);
    setAlertOpen(false);
    if (isDeleted) {
      toast.success('Vendeur supprimé avec succès');
    } else {
      toast.error('Erreur lors de la suppression du vendeur');
    }
    router.refresh();
  };
  return (
    <AlertDialog open={alertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous sûr de vouloir supprimer ce vendeur ?</AlertDialogTitle>
          <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setAlertOpen(false)}>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteVendeur()}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDeleteVendeur;
