'use client';
import { Card, CardContent } from '@/components/ui/card';
import { FournisseurTableau, ItemCatalogue } from '@/types/entities';
import { Drawer } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PieceFournisseurCard from './PieceFournisseurCard';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { getItemsBySearchParams } from '@/utils/getItemsBySearchParams';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DrawerFournisseur = ({
  open,
  onClose,
  fournisseur,
  pieces,
}: {
  open: boolean;
  onClose: () => void;
  fournisseur: FournisseurTableau;
  pieces: any;
}) => {
  const [catalogue, setCatalogue] = useState<ItemCatalogue[]>();
  const [triggerUpdate, setTriggerUpdate] = useState(0);
  const [newNumeroCatalogue, setNewNumeroCatalogue] = useState<number>();
  const [newPrixFournisseur, setNewPrixFournisseur] = useState<number>();
  const [newDelaiApprovisionnement, setNewDelaiApprovisionnement] = useState<number>();

  useEffect(() => {
    if (fournisseur.catalogue) {
      setCatalogue(fournisseur.catalogue);
    }
  }, [fournisseur]);

  useEffect(() => {
    if (triggerUpdate === 0) return;
    const getData = async () => {
      const supabase = createClient();
      const { data: fournisseurs, error } = await supabase
        .from('fournisseurs')
        .select(
          'catalogue:fournisseurs_pieces(numero_catalogue,prix_fournisseur,delai_approvisionnement, pieces_infos:pieces(*))'
        )
        .eq('id_fournisseur', fournisseur.id_fournisseur)
        .single();
      console.log(fournisseurs);
      console.log(error);
      if (error) {
        console.log(error);
        return;
      }
      if (fournisseurs) {
        setCatalogue(fournisseurs.catalogue);
      }
    };
    getData();
  }, [triggerUpdate]);

  const triggerAjouter = async () => {};

  return (
    <Drawer title={`Modifier le catalogue de ${fournisseur.nom_entreprise}`} width={500} onClose={onClose} open={open}>
      <Card>
        <div className="flex flex-col gap-2 p-2 w-full">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="piece">Pièce</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Piece" />
              </SelectTrigger>
              <SelectContent className="z-[500000000]">
                {pieces &&
                  pieces.length > 0 &&
                  pieces.map((piece: any) => (
                    <SelectItem key={piece.id_piece} value={piece.id_piece} className="px-2">
                      <div className="flex flex-row items-center gap-2">
                        <div className="w-[30px] h-[30px] aspect-square relative rounded-md overflow-hidden">
                          <Image fill src={piece.image} alt={piece.nom} />
                        </div>
                        <p>{piece.nom}</p>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
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
            <Button
              disabled={!newDelaiApprovisionnement || !newNumeroCatalogue || !newPrixFournisseur}
              variant={'outline'}
              className="bg-vm_secondary hover:bg-vm_secondary_2 text-white hover:text-white"
              onClick={() => triggerAjouter()}
            >
              Ajouter
            </Button>
          </div>
        </div>
      </Card>

      <Separator />
      {catalogue &&
        catalogue.length > 0 &&
        catalogue.map((catalogueItem) => (
          <PieceFournisseurCard
            catalogueItem={catalogueItem}
            id_fournisseur={fournisseur.id_fournisseur}
            setTriggerUpdate={setTriggerUpdate}
            key={` ${catalogueItem.numero_catalogue} - ${catalogueItem.pieces_infos.id_piece} `}
          />
        ))}
    </Drawer>
  );
};

export default DrawerFournisseur;
