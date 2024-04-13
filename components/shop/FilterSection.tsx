'use client';
import { Button } from '../ui/button';
import { CheckBoxInRow } from '../ui/CheckBoxInRow';
import { Separator } from '../ui/separator';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
const FilterSection = ({
  searchParams,
  content,
  fournisseurs,
}: {
  searchParams: { prix?: string; pieces?: string; velos?: string; fournisseur?: string };
  content: 'stock' | 'shop';
  fournisseurs?: { nom_entreprise: string; id_fournisseur: string }[];
}) => {
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    let velosParams = [];
    if (formData.get('VTT')) velosParams.push('VTT');
    if (formData.get('Vélo de course')) velosParams.push('Vélo de course');
    if (formData.get('Classique')) velosParams.push('Classique');
    if (formData.get('BMX')) velosParams.push('BMX');

    let piecesParams = [];
    if (formData.get('Cadre')) piecesParams.push('Cadre');
    if (formData.get('Guidon')) piecesParams.push('Guidon');
    if (formData.get('Freins')) piecesParams.push('Freins');
    if (formData.get('Selle')) piecesParams.push('Selle');
    if (formData.get('Dérailleur Avant')) piecesParams.push('Dérailleur Avant');
    if (formData.get('Dérailleur Arrière')) piecesParams.push('Dérailleur Arrière');
    if (formData.get('Roue avant')) piecesParams.push('Roue avant');
    if (formData.get('Roue arrière')) piecesParams.push('Roue arrière');
    if (formData.get('Réflecteurs')) piecesParams.push('Réflecteurs');
    if (formData.get('Pédalier')) piecesParams.push('Pédalier');
    if (formData.get('Ordinateur')) piecesParams.push('Ordinateur');
    if (formData.get('Panier')) piecesParams.push('Panier');

    let priceParams = [];
    if (formData.get('0-100')) priceParams.push('0-100');
    if (formData.get('50-100')) priceParams.push('50-100');
    if (formData.get('100-200')) priceParams.push('100-200');
    if (formData.get('200-400')) priceParams.push('200-400');
    if (formData.get('400-700')) priceParams.push('400-700');
    if (formData.get('700-1000')) priceParams.push('700-1000');
    if (formData.get('1000+')) priceParams.push('1000+');

    let fournisseurParams = [];
    if (formData.get('fournisseur')) fournisseurParams.push(formData.get('fournisseur'));

    const url = new URL(window.location.href);
    url.searchParams.set('velos', velosParams.join(','));
    url.searchParams.set('pieces', piecesParams.join(','));
    url.searchParams.set('prix', priceParams.join(','));
    if (content === 'stock') url.searchParams.set('fournisseur', fournisseurParams.join(','));

    router.push(url.toString());
  };

  const shouldBeChecked = (id: string) => {
    if (searchParams.velos?.split(',').includes(id)) return true;
    if (searchParams.pieces?.split(',').includes(id)) return true;
    if (searchParams.prix?.split(',').includes(id)) return true;
    return false;
  };

  return (
    <form
      action={handleSubmit}
      className="w-full sm:w-4/12 sm:max-w-[250px] h-fit flex flex-col gap-4 rounded-md bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder p-2"
    >
      <div className="flex flex-col w-full gap-2">
        <h4 className="text-lg text-vm_text_gray dark:text-white font-semibold">Vélos</h4>

        <CheckBoxInRow defaultChecked={shouldBeChecked('VTT')} id="VTT" text="VTT" />
        <CheckBoxInRow defaultChecked={shouldBeChecked('Vélo de course')} id="Vélo de course" text="Course" />
        <CheckBoxInRow defaultChecked={shouldBeChecked('Classique')} id="Classique" text="Classique" />
        <CheckBoxInRow defaultChecked={shouldBeChecked('BMX')} id="BMX" text="BMX" />
      </div>

      <div className="flex flex-col w-full gap-2">
        <Separator className="bg-vm_secondary" />
        <h4 className="text-lg text-vm_text_gray dark:text-white font-semibold">Pièces</h4>
        <CheckBoxInRow defaultChecked={shouldBeChecked('Cadre')} id="Cadre" text="Cadre" />
        <CheckBoxInRow defaultChecked={shouldBeChecked('Guidon')} id="Guidon" text="Guidon" />
        <CheckBoxInRow defaultChecked={shouldBeChecked('Freins')} id="Freins" text="Freins" />
        <CheckBoxInRow defaultChecked={shouldBeChecked('Selle')} id="Selle" text="Selle" />
        <CheckBoxInRow
          defaultChecked={shouldBeChecked('Dérailleur Avant')}
          id="Dérailleur Avant"
          text="Dérailleur avant"
        />
        <CheckBoxInRow
          defaultChecked={shouldBeChecked('Dérailleur Arrière')}
          id="Dérailleur Arrière"
          text="Dérailleur arrière"
        />
        <CheckBoxInRow defaultChecked={shouldBeChecked('Roue avant')} id="Roue avant" text="Roue avant" />
        <CheckBoxInRow defaultChecked={shouldBeChecked('Roue arrière')} id="Roue arrière" text="Roue arrière" />
        <CheckBoxInRow defaultChecked={shouldBeChecked('Réflecteurs')} id="Réflecteurs" text="Réflecteurs" />
        <CheckBoxInRow defaultChecked={shouldBeChecked('Pédalier')} id="Pédalier" text="Pédalier" />
        <CheckBoxInRow defaultChecked={shouldBeChecked('Ordinateur')} id="Ordinateur" text="Ordinateur" />
        <CheckBoxInRow defaultChecked={shouldBeChecked('Panier')} id="Panier" text="Panier" />
      </div>

      {content === 'shop' && (
        <div className="flex flex-col w-full gap-2">
          <Separator className="bg-vm_secondary" />
          <h4 className="text-lg text-vm_text_gray dark:text-white font-semibold">Prix</h4>
          <CheckBoxInRow defaultChecked={shouldBeChecked('0-50')} id="0-50" text="0€ - 50€" />
          <CheckBoxInRow defaultChecked={shouldBeChecked('50-100')} id="50-100" text="50€ - 100€" />
          <CheckBoxInRow defaultChecked={shouldBeChecked('100-200')} id="100-200" text="100€ - 200€" />
          <CheckBoxInRow defaultChecked={shouldBeChecked('200-400')} id="200-400" text="200€ - 400€" />
          <CheckBoxInRow defaultChecked={shouldBeChecked('400-700')} id="400-700" text="400€ - 700€" />
          <CheckBoxInRow defaultChecked={shouldBeChecked('700-1000')} id="700-1000" text="700€ - 1000€" />
          <CheckBoxInRow defaultChecked={shouldBeChecked('1000+')} id="1000+" text="+1000€" />
        </div>
      )}

      {content === 'stock' && (
        <div className="flex flex-col w-full gap-2">
          <Separator className="bg-vm_secondary" />
          <h4 className="text-lg text-vm_text_gray dark:text-white font-semibold">Fournisseur</h4>
          <Select name="fournisseur" defaultValue={searchParams.fournisseur}>
            <SelectTrigger>
              <SelectValue placeholder="Selectionner un fournisseur" />
            </SelectTrigger>
            <SelectContent>
              {fournisseurs?.map((fournisseur) => (
                <SelectItem key={fournisseur.id_fournisseur} value={fournisseur.id_fournisseur}>
                  {fournisseur.nom_entreprise}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex flex-col w-full gap-2">
        <Button
          type="submit"
          className="!w-full bg-vm_secondary hover:bg-vm_secondary_2 border-secondary !text-textLight"
        >
          {'Filtrer'}
        </Button>
        <Button variant="outline" className="!w-full ">
          Supprimer les filtres
        </Button>
      </div>
    </form>
  );
};

export default FilterSection;
