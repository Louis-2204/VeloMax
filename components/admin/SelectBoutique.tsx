'use client';
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '../ui/button';
import { useRouter, usePathname } from 'next/navigation';
const SelectBoutique = ({
  boutiques,
  actual_id_boutique,
}: {
  boutiques: { id_boutique: string; adresse: string; ville: string }[];
  actual_id_boutique: string;
}) => {
  const [id_boutique_selected, setId_boutique_selected] = React.useState<string | undefined>(
    actual_id_boutique === 'null' ? undefined : actual_id_boutique
  );
  const path = usePathname();
  const router = useRouter();
  const handleSelectBoutique = () => {
    if (!id_boutique_selected) return;
    const newPath = path.replace('null', id_boutique_selected);
    router.push(newPath);
  };

  return (
    <>
      <Select
        name="id_boutique"
        value={id_boutique_selected}
        defaultValue={id_boutique_selected}
        required
        onValueChange={(value) => setId_boutique_selected(value)}
      >
        <SelectTrigger className="w-10/12">
          <SelectValue placeholder="Selectionner une boutique" />
        </SelectTrigger>
        <SelectContent>
          {boutiques &&
            boutiques.length > 0 &&
            boutiques.map((boutique) => (
              <SelectItem key={boutique.id_boutique} value={boutique.id_boutique}>
                VéloMax {boutique.adresse} - {boutique.ville}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Button onClick={() => handleSelectBoutique()} disabled={!id_boutique_selected} className="w-10/12 md:w-auto">
        Valider
      </Button>
    </>
  );
};

export default SelectBoutique;
