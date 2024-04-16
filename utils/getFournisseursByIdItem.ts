'use server';

import { createClient } from './supabase/server';

export async function getFournisseursByIdItems(id_item: string) {
  'use server';
  const supabase = createClient();
  const { data: fournisseurs, error } = await supabase
    .from('fournisseurs_pieces')
    .select('fournisseurs(id_fournisseur,nom_entreprise)')
    .eq('id_piece', id_item);
  if (error) {
    console.error(error);
    return undefined;
  }

  const fournisseursFormatted = fournisseurs.map((fournisseur: any) => fournisseur.fournisseurs);

  if (fournisseursFormatted.length === 0) return undefined;

  return fournisseursFormatted;
}
