'use server';

import { createClient } from './supabase/server';

export async function getTopSalesVelos() {
  'use server';

  const supabase = createClient();
  const { data: topVelos, error } = await supabase.from('most_sold_velos').select('id_velo,image,nom');
  if (error) {
    console.error(error);
    return [];
  }

  if (topVelos.length >= 4) {
    return topVelos;
  }

  const { data: additionalVelos, error: additionalError } = await supabase
    .from('vélos')
    .select('id_velo,image,nom')
    .limit(4 - topVelos.length)
    .not(
      'id_velo',
      'in',
      `(${topVelos
        .map((velo) => velo.id_velo)
        .toString()
        .replace(/,/g, ',')})`
    );
  if (additionalError) {
    console.error(additionalError);
    return [];
  }
  return [...topVelos, ...additionalVelos];
}
