'use server';

import { createClient } from '../supabase/server';

export async function deleteFournisseur(id_fournisseur: string) {
  'use server';
  const supabase = createClient();
  const { error } = await supabase.from('fournisseurs').delete().eq('id_fournisseur', id_fournisseur);

  if (error) {
    console.log(error);
    return false;
  }
  return true;
}
