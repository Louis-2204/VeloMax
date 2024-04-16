import PiecesTableau from '@/components/admin/articles/PiecesTableau';
import VelosTableau from '@/components/admin/articles/VelosTableau';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getItemsBySearchParams } from '@/utils/getItemsBySearchParams';

const page = async () => {
  const pièces = await getItemsBySearchParams({
    pieces:
      'Cadre,Guidon,Freins,Selle,Dérailleur Avant,Dérailleur Arrière,Roue avant,Roue arrière,Réflecteurs,Pédalier,Ordinateur,Panier',
  });
  const velos = await getItemsBySearchParams({ velos: 'VTT,Vélo de course,Classique,BMX' });
  return (
    <div className="w-full flex justify-center">
      <Tabs defaultValue="pièces" className="w-full flex flex-col items-center" defaultChecked>
        <div className="flex justify-center w-full">
          <TabsList>
            <TabsTrigger value="pièces">Pièces</TabsTrigger>
            <TabsTrigger value="vélos">Vélos</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="pièces">
          <PiecesTableau pieces={pièces} />
        </TabsContent>
        <TabsContent value="vélos">
          <VelosTableau velos={velos} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
