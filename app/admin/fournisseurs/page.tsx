import FournisseursTableau from '@/components/admin/fournisseurs/FournisseursTableau';
import { FournisseurTableau } from '@/types/entities';
import { getFournisseursTableau } from '@/utils/fournisseurs/getFournisseursTableau';
import { getItemsBySearchParams } from '@/utils/getItemsBySearchParams';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { createClient } from '@/utils/supabase/server';

const page = async () => {
  const supabase = createClient();
  const profileConnected = await getProfileConnected();
  const fournisseurs = await getFournisseursTableau();
  const pieces = await getItemsBySearchParams({
    pieces:
      'Cadre,Guidon,Freins,Selle,Dérailleur Avant,Dérailleur Arrière,Roue avant,Roue arrière,Réflecteurs,Pédalier,Ordinateur,Panier',
  });

  return (
    <div className="w-full flex justify-center p-2">
      <FournisseursTableau
        fournisseurs={fournisseurs as FournisseurTableau[]}
        is_admin={profileConnected.role === 'admin'}
        pieces={pieces}
      />
    </div>
  );
};

export default page;
