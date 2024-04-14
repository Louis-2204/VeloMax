import SouscrireFideloBtn from '@/components/SouscrireFideloBtn';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { createClient } from '@/utils/supabase/server';
import moment from 'moment';
import { redirect } from 'next/navigation';

type Fidelo = {
  id_fidelo: string;
  nom: string;
  duree: number;
  remise: number;
  cout: number;
};

const page = async () => {
  const profileConnected = await getProfileConnected();
  if (profileConnected.role !== 'particulier') {
    redirect('/');
  }
  const supabase = createClient();
  const { data: fidelos, error } = await supabase.from('fidelo').select('*');

  if (error) {
    console.error(error);
    return <p>Erreur lors de la récupération des programmes fidélo</p>;
  }

  return (
    <>
      {profileConnected.id_fidelo ? (
        <>
          <Card className="justify-between flex items-center px-2 py-4">
            <div className="flex flex-col items-start gap-2">
              <p className="font-semibold">
                Votre programme fidélo actuel :{' '}
                {fidelos.find((fidelo: Fidelo) => fidelo.id_fidelo === profileConnected.id_fidelo)?.nom}
              </p>
              <p>Prix : {fidelos.find((fidelo: Fidelo) => fidelo.id_fidelo === profileConnected.id_fidelo)?.cout} €</p>
              <p className="text-sm">
                Du {moment(profileConnected.date_souscription).format('DD/MM/YYYY')} au{' '}
                {moment(profileConnected.date_fin_souscription).format('DD/MM/YYYY')}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl font-semibold">
                -{fidelos.find((fidelo: Fidelo) => fidelo.id_fidelo === profileConnected.id_fidelo)?.remise}%
              </p>
              <p className="max-w-[100px] text-xs text-center">De remise sur chaque article</p>
            </div>
          </Card>
          <span className="mt-2 text-xs opacity-50">
            A la fin de la période vous ne bénéficierais plus de la remise de{' '}
            {fidelos.find((fidelo: Fidelo) => fidelo.id_fidelo === profileConnected.id_fidelo)?.remise}%. Mais pas
            d'inquiétude vous pourrez toujours souscrire au même programme ou à un nouveau si vous le souhaitez 😀
          </span>
        </>
      ) : (
        <>
          <p className="text-sm opacity-70">Vous n'avez souscrit à aucun programme fidélo.</p>
        </>
      )}
      <Separator className="my-6" />
      <div className="flex flex-col gap-4">
        {fidelos &&
          fidelos.length > 0 &&
          fidelos.map((fidelo: Fidelo) => (
            <Card className="justify-between flex items-center px-2 py-4">
              <div className="flex flex-col items-start gap-2">
                <p className="font-semibold">{fidelo.nom}</p>
                <p>Prix : {fidelo.cout} €</p>
                <p className="text-sm">Durée : {fidelo.duree === 1 ? `${fidelo.duree} an ` : `${fidelo.duree} ans`}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl font-semibold">-{fidelo.remise}%</p>
                <p className="max-w-[100px] text-xs text-center">De remise sur chaque article</p>
                {profileConnected.id_fidelo === null && (
                  <SouscrireFideloBtn
                    id_fidelo={fidelo.id_fidelo}
                    id_user={profileConnected.id_particulier}
                    duree={fidelo.duree}
                  />
                )}
              </div>
            </Card>
          ))}
      </div>
    </>
  );
};

export default page;
