'use server';

import { createClient } from './supabase/server';

export async function getAllParticuliers() {
  'use server';
  const supabase = createClient();
  const { data: particuliers, error } = await supabase.rpc('get_all_particuliers_with_details');
  if (error) {
    console.error(error);
    return [];
  }
  console.log(particuliers);
  return particuliers;
}
