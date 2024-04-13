'use server';
import { FournisseurTableau } from '@/types/entities';
import { createClient } from '@/utils/supabase/server';

export async function getFournisseursTableau() {
  'use server';
  const supabase = createClient();
  const { data: fournisseurs, error } = await supabase
    .from('fournisseurs')
    .select(
      '*,catalogue:fournisseurs_pieces(numero_catalogue,prix_fournisseur,delai_approvisionnement, pieces_infos:pieces(*))'
    );
  if (error) {
    console.error(error);
    return [] as FournisseurTableau[];
  }
  return fournisseurs as FournisseurTableau[];
}
