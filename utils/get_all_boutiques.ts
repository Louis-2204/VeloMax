'use server';

import { createClient } from './supabase/server';

export async function get_all_boutiques() {
  'use server';
  const supabase = createClient();
  const { data: boutiques, error } = await supabase.from('boutiques').select('id_boutique,adresse,ville');
  if (error) {
    console.error(error);
    return [];
  }
  return boutiques;
}
