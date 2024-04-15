'use client';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import RecapProduits from '../RecapProduits';
import { CommandesTableauType } from '@/types/entities';
import RecapPrix from '../RecapPrix';
const DialogCommande = ({
    commande,
    dialogOpen,
    setDialogOpen,
}: {
    commande: CommandesTableauType;
    dialogOpen: boolean;
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {


    return (
        <Dialog open={dialogOpen}>
            <DialogContent className="sm:max-w-[900px] overflow-y-auto max-h-screen">
                <DialogHeader>
                    <DialogTitle>

                    </DialogTitle>
                </DialogHeader>
                <div className="flex justify-between">
                    <RecapProduits type='detailCommande' items={commande.items} />
                    <RecapPrix type='detailCommande' items={commande.items} />
                </div>
                <DialogFooter className='mt-4'>
                    <Button onClick={() => setDialogOpen(false)}>Fermer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogCommande;
