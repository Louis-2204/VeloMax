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
import { deleteUser } from '@/utils/deleteUser';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ParticulierTableau, Professionnel, Vendeur } from '@/types/entities';
import { Dispatch, SetStateAction } from 'react';
const AlertDeleteUser = ({
  alertOpen,
  setAlertOpen,
  selectedUser,
  label,
}: {
  alertOpen: boolean;
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
  selectedUser: Vendeur | ParticulierTableau | Professionnel;
  label: string;
}) => {
  const router = useRouter();
  const handleDeleteVendeur = async () => {
    let id;
    if ('id_vendeur' in selectedUser) id = selectedUser.id_vendeur;
    if ('id_particulier' in selectedUser) id = selectedUser.id_particulier;
    if ('id_professionnel' in selectedUser) id = selectedUser.id_professionnel;
    if (!id) return;
    const isDeleted = await deleteUser(id);
    setAlertOpen(false);
    if (isDeleted) {
      toast.success(`${label} supprimé avec succès`);
    } else {
      toast.error(`Erreur lors de la suppression du ${label}`);
    }
    router.refresh();
  };
  return (
    <AlertDialog open={alertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes-vous sûr de vouloir supprimer ce {label} ?</AlertDialogTitle>
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

export default AlertDeleteUser;
