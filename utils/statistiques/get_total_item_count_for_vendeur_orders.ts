'use server';

import { createClient } from '../supabase/server';

export async function get_total_item_count_for_vendeur_orders(
  id_item: string,
  type: 'velo' | 'piece',
  id_vendeur: string
) {
  'use server';
  const supabase = createClient();
  const { data: count, error } = await supabase.rpc('get_total_item_count_for_vendeur_orders', {
    the_id_item: id_item,
    type: type,
    the_id_vendeur: id_vendeur,
  });
  if (error) {
    console.error(error);
    return 0;
  }
  return count;
}
