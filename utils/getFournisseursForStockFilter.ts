'use server';

import { createClient } from './supabase/server';

export async function getFournisseursForStockFilter() {
  'use server';

  const supabase = createClient();
  const { data: fournisseurs, error } = await supabase.from('fournisseurs').select('nom_entreprise,id_fournisseur');
  if (error) {
    console.log(error);
    return [];
  }
  return fournisseurs;
}
