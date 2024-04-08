'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { CheckBoxInRow } from '../ui/CheckBoxInRow';
import { Separator } from '../ui/separator';
import { useRouter } from 'next/navigation';
const FilterSection = () => {
  const router = useRouter();
  const handleSubmit = (formData: FormData) => {
    let velosParams = [];
    if (formData.get('vtt')) velosParams.push('VTT');
    if (formData.get('course')) velosParams.push('Vélo de course');
    if (formData.get('classique')) velosParams.push('Classique');
    if (formData.get('bmx')) velosParams.push('BMX');

    let piecesParams = [];
    if (formData.get('cadre')) piecesParams.push('Cadre');
    if (formData.get('guidon')) piecesParams.push('Guidon');
    if (formData.get('freins')) piecesParams.push('Freins');
    if (formData.get('selle')) piecesParams.push('Selle');
    if (formData.get('derailleurAv')) piecesParams.push('Dérailleur Avant');
    if (formData.get('derailleurAr')) piecesParams.push('Dérailleur Arrière');
    if (formData.get('roueAv')) piecesParams.push('Roue avant');
    if (formData.get('roueAr')) piecesParams.push('Roue arrière');
    if (formData.get('reflecteurs')) piecesParams.push('Réflecteurs');
    if (formData.get('pedalier')) piecesParams.push('Pédalier');
    if (formData.get('ordinateur')) piecesParams.push('Ordinateur');
    if (formData.get('panier')) piecesParams.push('Panier');

    let priceParams = [];
    if (formData.get('0-100')) priceParams.push('0-100');
    if (formData.get('50-100')) priceParams.push('50-100');
    if (formData.get('100-200')) priceParams.push('100-200');
    if (formData.get('200-400')) priceParams.push('200-400');
    if (formData.get('400-700')) priceParams.push('400-700');
    if (formData.get('700-1000')) priceParams.push('700-1000');
    if (formData.get('1000+')) priceParams.push('1000+');

    const url = new URL(window.location.href);
    url.searchParams.set('velos', velosParams.join(','));
    url.searchParams.set('pieces', piecesParams.join(','));
    url.searchParams.set('prix', priceParams.join(','));

    router.push(url.toString());
  };

  return (
    <form
      action={handleSubmit}
      className="w-full sm:w-4/12 sm:max-w-[250px] h-fit flex flex-col gap-4 rounded-md bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder p-2"
    >
      <div className="flex flex-col w-full gap-2">
        <h4 className="text-lg text-vm_text_gray dark:text-white font-semibold">Vélos</h4>

        <CheckBoxInRow id="vtt" text="VTT" />
        <CheckBoxInRow id="course" text="Course" />
        <CheckBoxInRow id="classique" text="Classique" />
        <CheckBoxInRow id="bmx" text="BMX" />
      </div>

      <div className="flex flex-col w-full gap-2">
        <Separator className="bg-vm_secondary" />
        <h4 className="text-lg text-vm_text_gray dark:text-white font-semibold">Pièces</h4>
        <CheckBoxInRow id="cadre" text="Cadre" />
        <CheckBoxInRow id="guidon" text="Guidon" />
        <CheckBoxInRow id="freins" text="Freins" />
        <CheckBoxInRow id="selle" text="Selle" />
        <CheckBoxInRow id="derailleurAv" text="Dérailleur avant" />
        <CheckBoxInRow id="derailleurAr" text="Dérailleur arrière" />
        <CheckBoxInRow id="roueAv" text="Roue avant" />
        <CheckBoxInRow id="roueAr" text="Roue arrière" />
        <CheckBoxInRow id="reflecteurs" text="Réflecteurs" />
        <CheckBoxInRow id="pedalier" text="Pédalier" />
        <CheckBoxInRow id="ordinateur" text="Ordinateur" />
        <CheckBoxInRow id="panier" text="Panier" />
      </div>
      <div className="flex flex-col w-full gap-2">
        <Separator className="bg-vm_secondary" />
        <h4 className="text-lg text-vm_text_gray dark:text-white font-semibold">Prix</h4>
        <CheckBoxInRow id="0-50" text="0€ - 50€" />
        <CheckBoxInRow id="50-100" text="50€ - 100€" />
        <CheckBoxInRow id="100-200" text="100€ - 200€" />
        <CheckBoxInRow id="200-400" text="200€ - 400€" />
        <CheckBoxInRow id="400-700" text="400€ - 700€" />
        <CheckBoxInRow id="700-1000" text="700€ - 1000€" />
        <CheckBoxInRow id="1000+" text="+1000€" />
      </div>
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
