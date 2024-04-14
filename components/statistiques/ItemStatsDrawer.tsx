'use client';
import { get_total_item_count_in_all_orders } from '@/utils/statistiques/get_total_item_count_in_all_orders';
import { Drawer } from 'antd';
import { use, useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '../ui/button';
import { get_total_item_count_for_vendeur_orders } from '@/utils/statistiques/get_total_item_count_for_vendeur_orders';
import { get_total_item_count_in_boutique_orders } from '@/utils/statistiques/get_total_item_count_in_boutique_orders';
const ItemStatsDrawer = ({
  open,
  onClose,
  magasins,
  vendeurs,
  selectedPiece,
}: {
  open: boolean;
  onClose: () => void;
  magasins: any;
  vendeurs: any;
  selectedPiece: any;
}) => {
  const [selectedVendeur, setSelectedVendeur] = useState<any | undefined>();
  const [selectedMagasin, setSelectedMagasin] = useState<any | undefined>();
  const [totalCount, setTotalCount] = useState(0);
  const [vendeurCount, setVendeurCount] = useState<number>();
  const [magasinCount, setMagasinCount] = useState<number>();

  useEffect(() => {
    setTotalCount(0);
    setMagasinCount(undefined);
    setVendeurCount(undefined);
    get_total_item_count_in_all_orders(
      'id_piece' in selectedPiece ? selectedPiece.id_piece : selectedPiece.id_velo,
      'id_velo' in selectedPiece ? 'velo' : 'piece'
    ).then((count) => {
      setTotalCount(count);
    });
  }, [selectedPiece]);

  useEffect(() => {
    setVendeurCount(undefined);
    if (selectedVendeur) {
      get_total_item_count_for_vendeur_orders(
        'id_piece' in selectedPiece ? selectedPiece.id_piece : selectedPiece.id_velo,
        'id_velo' in selectedPiece ? 'velo' : 'piece',
        selectedVendeur.id_vendeur
      ).then((count) => {
        setVendeurCount(count);
      });
    }
  }, [selectedVendeur]);

  useEffect(() => {
    setMagasinCount(undefined);
    if (selectedMagasin) {
      get_total_item_count_in_boutique_orders(
        'id_piece' in selectedPiece ? selectedPiece.id_piece : selectedPiece.id_velo,
        'id_velo' in selectedPiece ? 'velo' : 'piece',
        selectedMagasin.id_boutique
      ).then((count) => {
        setMagasinCount(count);
      });
    }
  }, [selectedMagasin]);

  return (
    <Drawer
      classNames={{ body: 'bg-white dark:bg-black', header: 'bg-white dark:bg-black' }}
      title={<h3 className="dark:text-white">Statistiques sur {selectedPiece.nom}</h3>}
      closeIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 dark:invert"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      }
      width={500}
      onClose={onClose}
      open={open}
    >
      <p>
        {selectedPiece.nom} s'est vendu {totalCount} fois au total
      </p>

      <div className="flex flex-col w-full gap-2 mt-10">
        <Select
          onValueChange={(value) => setSelectedMagasin(magasins.find((magasin: any) => magasin.id_boutique === value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Voir les stats pour une boutique" />
          </SelectTrigger>
          <SelectContent className="z-[500000000]">
            {magasins.map((magasin: any) => (
              <SelectItem key={magasin.id_boutique} value={magasin.id_boutique}>
                {magasin.adresse} - {magasin.ville}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {magasinCount !== undefined && selectedMagasin !== undefined && (
          <p>
            {selectedPiece.nom} s'est vendu {magasinCount} fois dans la boutique {selectedMagasin.adresse} -
            {selectedMagasin.ville}
          </p>
        )}
      </div>

      <div className="flex flex-col w-full gap-2 mt-10">
        <Select
          onValueChange={(value) => setSelectedVendeur(vendeurs.find((vendeur: any) => vendeur.id_vendeur === value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Voir les stas pour un vendeur" />
          </SelectTrigger>
          <SelectContent className="z-[500000000]">
            {vendeurs.map((vendeur: any) => (
              <SelectItem key={vendeur.id_vendeur} value={vendeur.id_vendeur}>
                {vendeur.nom} {vendeur.prenom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {vendeurCount !== undefined && selectedVendeur !== undefined && (
          <p>
            {selectedPiece.nom} s'est vendu {vendeurCount} fois par {selectedVendeur.nom} {selectedVendeur.prenom}
          </p>
        )}
      </div>
    </Drawer>
  );
};

export default ItemStatsDrawer;
