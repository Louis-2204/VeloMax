'use client';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import RecapProduits from '../RecapProduits';
import { CommandesTableauType } from '@/types/entities';
import RecapPrix from '../RecapPrix';
import PrendreEnChargeInfos from './PrendreEnChargeInfos';
const DialogCommande = ({
    commande,
    vendeurs,
    dialogOpen,
    setDialogOpen,
    type
}: {
    commande: CommandesTableauType;
    vendeurs?: any[];
    dialogOpen: boolean;
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
    type: string;
}) => {


    return (
        <Dialog open={dialogOpen}>
            <DialogContent className="sm:max-w-[900px] overflow-y-auto max-h-screen">
                <DialogHeader>
                    <DialogTitle>

                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col-reverse lg:flex-row gap-4 justify-between">
                    <RecapProduits type={type} items={commande.items} />
                    {type === 'detailCommande' ? (
                        <RecapPrix type={type} items={commande.items} />
                    ) : (
                        <PrendreEnChargeInfos vendeurs={vendeurs} commande={commande} setDialogOpen={setDialogOpen} />
                    )}
                </div>
                <DialogFooter className='mt-4'>
                    <Button onClick={() => setDialogOpen(false)}>Fermer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogCommande;
