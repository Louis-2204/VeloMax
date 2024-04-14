'use server';

import { createClient } from '../supabase/server';

export async function get_total_item_count_in_boutique_orders(
  id_item: string,
  type: 'velo' | 'piece',
  id_boutique: string
) {
  'use server';
  const supabase = createClient();
  const { data: count, error } = await supabase.rpc('get_total_item_count_in_boutique_orders', {
    the_id_item: id_item,
    type: type,
    the_id_boutique: id_boutique,
  });
  if (error) {
    console.error(error);
    return 0;
  }
  return count;
}
