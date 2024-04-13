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
import { FournisseurTableau } from '@/types/entities';
import { Dispatch, SetStateAction } from 'react';
import { deleteFournisseur } from '@/utils/fournisseurs/deleteFournisseur';
const AlertDeleteFournisseur = ({
  alertOpen,
  setAlertOpen,
  selectedFournisseur,
}: {
  alertOpen: boolean;
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
  selectedFournisseur: FournisseurTableau;
}) => {
  const router = useRouter();
  const handleDeleteFournisseur = async () => {
    const isDeleted = await deleteFournisseur(selectedFournisseur.id_fournisseur);
    setAlertOpen(false);
    if (isDeleted) {
      toast.success(`${selectedFournisseur.nom_entreprise} supprimé avec succès`);
    } else {
      toast.error(`Erreur lors de la suppression du ${selectedFournisseur.nom_entreprise}`);
    }
    router.refresh();
  };
  return (
    <AlertDialog open={alertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous sûr de vouloir supprimer {selectedFournisseur.nom_entreprise} ?</AlertDialogTitle>
          <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setAlertOpen(false)}>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteFournisseur()}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDeleteFournisseur;
