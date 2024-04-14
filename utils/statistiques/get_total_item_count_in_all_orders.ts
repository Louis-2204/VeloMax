'use server';

import { createClient } from '../supabase/server';

export async function get_total_item_count_in_all_orders(id_item: string, type: 'velo' | 'piece') {
  'use server';
  const supabase = createClient();
  const { data: count, error } = await supabase.rpc('get_total_item_count_in_all_orders', {
    the_id_item: id_item,
    type: type,
  });
  if (error) {
    console.error(error);
    return 0;
  }
  return count;
}
