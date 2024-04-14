'use server';

import { createClient } from '../supabase/server';

export async function getMoyVelosCommandes() {
  'use server';
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_avg_velos_per_commandes');
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}
