import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { Accordion, AccordionTrigger, AccordionContent, AccordionItem } from "../ui/accordion";
import { useEffect } from "react";



const DialogSelectItems = ({ subDialogOpen, setSubDialogOpen, produits, selectedItems, setSelectedItems }: { subDialogOpen: boolean, setSubDialogOpen: any, produits: any, selectedItems: { id: string; nom: string; quantite: number; prix: number; image: string; type: "vélo" | "pièce" }[], setSelectedItems: any }) => {

    const handleAddVelo = (velo: any) => {
        console.log('add velo', velo);
        // check if the item is already in the selectedItems
        const item = selectedItems.find((item) => item.id === velo.id_velo);
        if (item) {
            // if the item is already in the selectedItems, we increment the quantity
            setSelectedItems(selectedItems.map((item) => item.id === velo.id_velo ? { ...item, quantite: item.quantite + 1 } : item));
        } else {
            // if the item is not in the selectedItems, we add it
            setSelectedItems([...selectedItems, { id: velo.id_velo, nom: velo.nom, quantite: 1, prix: velo.prix_unitaire, image: velo.image, type: 'vélo' }]);
        }
    }

    const handleRemoveVelo = (velo: any) => {
        // check if the item is already in the selectedItems
        const item = selectedItems.find((item) => item.id === velo.id_velo);
        // if the item is already in the selectedItems and the quantity is greater than 1, we decrement the quantity
        if (item && item.quantite > 1) {
            setSelectedItems(selectedItems.map((item) => item.id === velo.id_velo ? { ...item, quantite: item.quantite - 1 } : item));
        } else {
            // if the item is already in the selectedItems and the quantity is 1, we remove the item
            setSelectedItems(selectedItems.filter((item) => item.id !== velo.id_velo));
        }
    }

    const handleAddPiece = (piece: any) => {
        const item = selectedItems.find((item) => item.id === piece.id_piece);
        if (item) {
            setSelectedItems(selectedItems.map((item) => item.id === piece.id_piece ? { ...item, quantite: item.quantite + 1 } : item));
        } else {
            setSelectedItems([...selectedItems, { id: piece.id_piece, nom: piece.nom, quantite: 1, prix: piece.prix_unitaire, image: piece.image, type: 'pièce' }]);
        }
    }

    const handleRemovePiece = (piece: any) => {
        const item = selectedItems.find((item) => item.id === piece.id_piece);
        if (item && item.quantite > 1) {
            setSelectedItems(selectedItems.map((item) => item.id === piece.id_piece ? { ...item, quantite: item.quantite - 1 } : item));
        } else {
            setSelectedItems(selectedItems.filter((item) => item.id !== piece.id_piece));
        }
    }

    useEffect(() => {
        console.log(selectedItems);
    }, [selectedItems]);

    return (
        <Dialog open={subDialogOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-hidden flex flex-col gap-2">
                <DialogHeader>
                    <DialogTitle>
                        Ajouter des produits à la commande
                    </DialogTitle>
                </DialogHeader>
                <Accordion type="single" collapsible>
                    <AccordionItem title="Vélos" value="vélos">
                        <AccordionTrigger>
                            Vélos
                        </AccordionTrigger>
                        <AccordionContent className="max-h-[400px] overflow-y-auto pb-0">
                            {produits.velos.map((velo: any) => (
                                <div key={velo.id_velo} className="flex justify-between items-center p-2 border-b border-gray-200">
                                    <div>
                                        {velo.nom}
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <Button className="flex items-center justify-center font-bold h-1 w-1 p-2" onClick={() => { handleRemoveVelo(velo) }}>
                                            -
                                        </Button>
                                        <div className="font-bold">{selectedItems.filter((item) => item.id === velo.id_velo).length > 0 ? selectedItems.find((item) => item.id === velo.id_velo)?.quantite : 0}</div>
                                        <Button className="flex items-center justify-center font-bold h-1 w-1 p-2" onClick={() => { handleAddVelo(velo) }}>
                                            +
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem title="Pièces" value="pièces">
                        <AccordionTrigger>
                            Pièces
                        </AccordionTrigger>
                        <AccordionContent className="max-h-[400px] overflow-y-auto pb-0">
                            {produits.pieces.map((piece: any) => (
                                <div key={piece.id_piece} className="flex justify-between items-center p-2 border-b border-gray-200">
                                    <div>
                                        {piece.nom}
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <Button className="flex items-center justify-center font-bold h-1 w-1 p-2" onClick={() => { handleRemovePiece(piece) }}>
                                            -
                                        </Button>
                                        <div className="font-bold">{selectedItems.filter((item) => item.id === piece.id_piece).length > 0 ? selectedItems.find((item) => item.id === piece.id_piece)?.quantite : 0}</div>
                                        <Button className="flex items-center justify-center font-bold h-1 w-1 p-2" onClick={() => { handleAddPiece(piece) }}>
                                            +
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <DialogFooter>
                    <Button onClick={() => setSubDialogOpen(false)}>Fermer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default DialogSelectItems;