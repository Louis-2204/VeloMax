import FournisseursTableau from '@/components/admin/fournisseurs/FournisseursTableau';
import { getItemsBySearchParams } from '@/utils/getItemsBySearchParams';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { createClient } from '@/utils/supabase/server';

const page = async () => {
  const supabase = createClient();
  const profileConnected = await getProfileConnected();
  const { data: fournisseurs, error } = await supabase
    .from('fournisseurs')
    .select(
      '*,catalogue:fournisseurs_pieces(numero_catalogue,prix_fournisseur,delai_approvisionnement, pieces_infos:pieces(*))'
    );
  const pieces = await getItemsBySearchParams({
    pieces:
      'Cadre,Guidon,Freins,Selle,Dérailleur Avant,Dérailleur Arrière,Roue avant,Roue arrière,Réflecteurs,Pédalier,Ordinateur,Panier',
  });
  console.log(fournisseurs);
  console.log(error);

  return (
    <div className="w-full flex justify-center">
      <FournisseursTableau fournisseurs={fournisseurs} is_admin={profileConnected.role === 'admin'} pieces={pieces} />
    </div>
  );
};

export default page;
