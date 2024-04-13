'use server';
import { createClient } from '../supabase/server';

export async function updateFournisseurItem(
  numero_catalogue: number,
  prix_fournisseur: number,
  delai_approvisionnement: number,
  id_piece: string,
  id_fournisseur: string
) {
  'use server';
  const supabase = createClient();
  const { error } = await supabase
    .from('fournisseurs_pieces')
    .update({ numero_catalogue, prix_fournisseur, delai_approvisionnement })
    .eq('id_piece', id_piece)
    .eq('id_fournisseur', id_fournisseur);

  if (error) {
    console.log(error);
    return false;
  }
  return true;
}
