'use client';
import { Card } from '@/components/ui/card';
import { FournisseurTableau, ItemCatalogue } from '@/types/entities';
import { Drawer } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PieceFournisseurCard from './PieceFournisseurCard';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { createFournisseurPiece } from '@/utils/createFournisseurPiece';
const UpdateFournisseurCatalogue = ({ fournisseur, pieces }: { fournisseur: FournisseurTableau; pieces: any }) => {
  const [catalogue, setCatalogue] = useState<ItemCatalogue[]>();
  const [triggerUpdate, setTriggerUpdate] = useState(0);
  const [newNumeroCatalogue, setNewNumeroCatalogue] = useState<number>();
  const [newPrixFournisseur, setNewPrixFournisseur] = useState<number>();
  const [newDelaiApprovisionnement, setNewDelaiApprovisionnement] = useState<number>();
  const [newPiece, setNewPiece] = useState<string>();

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

  const triggerAjouter = async () => {
    if (!newDelaiApprovisionnement || !newNumeroCatalogue || !newPrixFournisseur || !newPiece) return;
    const isCreated = await createFournisseurPiece(
      newNumeroCatalogue,
      newPrixFournisseur,
      newDelaiApprovisionnement,
      newPiece,
      fournisseur.id_fournisseur
    );
    if (!isCreated) {
      alert("Une erreur est survenue lors de l'ajout");
    } else {
      alert("L'ajout a été effectué avec succès");
      setTriggerUpdate((old) => old + 1);
      setNewDelaiApprovisionnement(undefined);
      setNewNumeroCatalogue(undefined);
      setNewPrixFournisseur(undefined);
      setNewPiece(undefined);
    }
  };
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Ajouter un article</AccordionTrigger>
        <AccordionContent>
          <Card>
            <div className="flex flex-col gap-2 p-2 w-full">
              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="piece">Pièce</Label>
                <Select onValueChange={(value) => setNewPiece(value)} value={newPiece}>
                  <SelectTrigger>
                    <SelectValue placeholder="Piece" />
                  </SelectTrigger>
                  <SelectContent className="z-[500000000]">
                    {pieces &&
                      pieces.length > 0 &&
                      pieces
                        .filter(
                          (piece: any) => !catalogue?.find((item) => item.pieces_infos.id_piece === piece.id_piece)
                        )
                        .map((piece: any) => (
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
                  disabled={!newDelaiApprovisionnement || !newNumeroCatalogue || !newPrixFournisseur || !newPiece}
                  variant={'outline'}
                  className="w-full bg-vm_secondary hover:bg-vm_secondary_2 text-white hover:text-white"
                  onClick={() => triggerAjouter()}
                >
                  Ajouter
                </Button>
              </div>
            </div>
          </Card>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Articles actuels</AccordionTrigger>
        <AccordionContent>
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default UpdateFournisseurCatalogue;
