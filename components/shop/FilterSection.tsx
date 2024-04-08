import { Button } from '../ui/button';
import { CheckBoxInRow } from '../ui/CheckBoxInRow';
import { Separator } from '../ui/separator';

const FilterSection = () => {
  return (
    <div className="w-full sm:w-4/12 sm:max-w-[250px] h-fit flex flex-col gap-4 rounded-md bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder p-2">
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

        <CheckBoxInRow id="50-100" text="50€ - 100€" />
        <CheckBoxInRow id="100-200" text="100€ - 200€" />
        <CheckBoxInRow id="200-400" text="200€ - 400€" />
        <CheckBoxInRow id="400-700" text="400€ - 700€" />
        <CheckBoxInRow id="700-1000" text="700€ - 1000€" />
        <CheckBoxInRow id="1000+" text="+1000€" />
      </div>
      <div className="flex flex-col w-full gap-2">
        <Button className="!w-full bg-vm_secondary hover:bg-vm_secondary_2 border-secondary !text-textLight">
          Filtrer
        </Button>
        <Button variant="outline" className="!w-full ">
          Supprimer les filtres
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;
