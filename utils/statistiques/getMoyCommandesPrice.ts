'use server';

import { createClient } from '../supabase/server';

export async function getMoyCommandesPrice() {
  'use server';
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_average_commande_price');
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}
