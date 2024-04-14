import { Card } from '@/components/ui/card';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { redirect } from 'next/navigation';

const page = async () => {
  const profileConnected = await getProfileConnected();
  if (profileConnected.role !== 'professionnel') {
    redirect('/');
  }
  return profileConnected.remise_commerciale ? (
    <Card className="justify-between flex items-center px-2 py-4">
      <p>Votre remise actuelle:</p>
      <div className="flex flex-col items-center">
        <p className="text-2xl font-semibold">-{profileConnected.remise_commerciale}%</p>
        <p className="max-w-[100px] text-xs text-center">De remise sur chaque article</p>
      </div>
    </Card>
  ) : (
    <>
      <p className="text-sm opacity-70">Aucune remise commerciale n’est attribuée à votre profil.</p>
      <p className="text-sm opacity-70">Pour obtenir une remise effectuez d'avantage de commandes.</p>
    </>
  );
};

export default page;
