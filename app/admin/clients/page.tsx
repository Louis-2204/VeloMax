import { ParticulierTableau, Professionnel } from '@/types/entities';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ParticuliersTableau from '@/components/admin/clients/ParticuliersTableau';
import ProfessionnelsTableau from '@/components/admin/clients/ProfessionnelsTableau';
import { getAllParticuliers } from '@/utils/getAllParticuliers';
import { getAllProfessionnels } from '@/utils/getAllProfessionnels';

const page = async () => {
  const [particuliers, professionnels] = await Promise.all([getAllParticuliers(), getAllProfessionnels()]);

  return (
    <div className="w-full flex justify-center">
      <Tabs defaultValue="particuliers" className="w-full flex flex-col items-center" defaultChecked>
        <div className="flex justify-center w-full">
          <TabsList>
            <TabsTrigger value="particuliers">Particuliers</TabsTrigger>
            <TabsTrigger value="professionnels">Professionnels</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="particuliers">
          <ParticuliersTableau particuliers={particuliers as unknown as ParticulierTableau[]} />
        </TabsContent>
        <TabsContent value="professionnels">
          <ProfessionnelsTableau professionnels={professionnels as unknown as Professionnel[]} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
