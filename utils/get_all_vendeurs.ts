'use server';

import { createClient } from './supabase/server';

export async function get_all_vendeurs() {
  'use server';
  const supabase = createClient();
  const { data: vendeurs, error } = await supabase.from('vendeurs').select('id_vendeur,nom,prenom');
  if (error) {
    console.error(error);
    return [];
  }
  return vendeurs;
}
