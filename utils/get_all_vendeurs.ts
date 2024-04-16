'use server';

import { createClient } from './supabase/server';

export async function get_all_vendeurs(id_boutique?: string) {
  'use server';
  const supabase = createClient();

  let query = supabase.from('vendeurs').select('id_vendeur,nom,prenom');

  if (id_boutique) {
    query = query.eq('id_boutique', id_boutique);
  }

  const { data: vendeurs, error } = await query;

  if (error) {
    console.error(error);
    return [] as unknown as { id_vendeur: string; nom: string; prenom: string }[];
  }

  return vendeurs as unknown as { id_vendeur: string; nom: string; prenom: string }[];
}
