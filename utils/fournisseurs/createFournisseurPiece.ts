'use server';

import { createClient } from '../supabase/server';

export async function createFournisseurPiece(
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
    .insert({ numero_catalogue, prix_fournisseur, delai_approvisionnement, id_piece, id_fournisseur });
  console.log(error);
  if (error) {
    console.log(error);
    return false;
  }
  return true;
}
