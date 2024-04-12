'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ItemCatalogue } from '@/types/entities';
import { updateFournisseurItem } from '@/utils/updateFournisseurItem';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
const PieceFournisseurCard = ({
  catalogueItem,
  id_fournisseur,
  setTriggerUpdate,
}: {
  catalogueItem: ItemCatalogue;
  id_fournisseur: string;
  setTriggerUpdate: Dispatch<SetStateAction<number>>;
}) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [newNumeroCatalogue, setNewNumeroCatalogue] = useState<number>(catalogueItem.numero_catalogue);
  const [newPrixFournisseur, setNewPrixFournisseur] = useState<number>(catalogueItem.prix_fournisseur);
  const [newDelaiApprovisionnement, setNewDelaiApprovisionnement] = useState<number>(
    catalogueItem.delai_approvisionnement
  );
  const triggerAnnuler = () => {
    setShowUpdate(false);
  };

  const triggerModifier = async () => {
    if (!newDelaiApprovisionnement || !newNumeroCatalogue || !newPrixFournisseur) return;
    const is_updated = await updateFournisseurItem(
      newNumeroCatalogue,
      newPrixFournisseur,
      newDelaiApprovisionnement,
      catalogueItem.pieces_infos.id_piece,
      id_fournisseur
    );
    if (!is_updated) {
      alert('Une erreur est survenue lors de la modification');
    } else {
      alert('La modification a été effectuée avec succès');
      setTriggerUpdate((old) => old + 1);
    }
    setShowUpdate(false);
  };

  const setUpdate = () => {
    setShowUpdate(true);
    setNewNumeroCatalogue(catalogueItem.numero_catalogue);
    setNewPrixFournisseur(catalogueItem.prix_fournisseur);
    setNewDelaiApprovisionnement(catalogueItem.delai_approvisionnement);
  };

  return (
    <Card
      className={`mb-4 p-4 items-center flex justify-between relative group ${
        showUpdate ? '' : 'cursor-pointer'
      } hover:scale-[1.02] transition-all`}
      onClick={() => {
        showUpdate === false && setUpdate();
      }}
    >
      {showUpdate ? (
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="nom">Numéro du catalogue</Label>
            <Input
              placeholder="Numéro catalogue"
              id="numero_catalogue"
              type="number"
              value={newNumeroCatalogue}
              onChange={(e) => setNewNumeroCatalogue(parseInt(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="prix_fournisseur">Prix du fournisseur</Label>
            <Input
              placeholder="Prix du fournisseur"
              id="prix_fournisseur"
              type="number"
              value={newPrixFournisseur}
              onChange={(e) => setNewPrixFournisseur(parseInt(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="delai_approvisionnement">Délais d'approsionnement</Label>
            <Input
              placeholder="Délais d'approsionnement"
              id="delai_approvisionnement"
              type="number"
              value={newDelaiApprovisionnement}
              onChange={(e) => setNewDelaiApprovisionnement(parseInt(e.target.value))}
            />
          </div>
          <div className="flex justify-around mt-2">
            <Button variant={'destructive'}>Supprimer</Button>
            <Button variant={'outline'} onClick={() => triggerAnnuler()}>
              Annuler
            </Button>
            <Button
              disabled={!newDelaiApprovisionnement || !newNumeroCatalogue || !newPrixFournisseur}
              variant={'outline'}
              className="bg-vm_secondary hover:bg-vm_secondary_2 text-white hover:text-white"
              onClick={() => triggerModifier()}
            >
              Modifier
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <p>Numéro catalogue : {catalogueItem.numero_catalogue}</p>
            <p>Pièce : {catalogueItem.pieces_infos.nom}</p>
            <p>Prix fournisseur : {catalogueItem.prix_fournisseur} €</p>
            <p>Délai d'approvisionnement : {catalogueItem.delai_approvisionnement} jours</p>
          </div>
          <div className="w-2/12 h-fit !aspect-square relative rounded-md overflow-hidden">
            <Image fill alt={catalogueItem.pieces_infos.nom} src={catalogueItem.pieces_infos.image} />
          </div>
        </>
      )}
    </Card>
  );
};

export default PieceFournisseurCard;
