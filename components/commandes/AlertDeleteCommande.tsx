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
import { Dispatch, SetStateAction } from 'react';
import { deleteCommande } from '@/utils/commandes/deleteCommande';
const AlertDeleteCommande = ({
    alertOpen,
    setAlertOpen,
    selectedCommande,
}: {
    alertOpen: boolean;
    setAlertOpen: Dispatch<SetStateAction<boolean>>;
    selectedCommande: any;
}) => {
    const router = useRouter();
    const handleDeleteCommande = async () => {
        let id;
        const isDeleted = await deleteCommande(selectedCommande.id_commande);
        setAlertOpen(false);
        if (isDeleted) {
            toast.success(`Commande supprimée avec succès`);
        } else {
            toast.error(`Erreur lors de la suppression de la commande`);
        }
        router.refresh();
    };
    return (
        <AlertDialog open={alertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Etes-vous sûr de vouloir supprimer cette commande ?</AlertDialogTitle>
                    <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setAlertOpen(false)}>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteCommande()}>Supprimer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDeleteCommande;
