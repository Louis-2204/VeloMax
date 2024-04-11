'use server';

import { createClient } from './supabase/server';

export async function getAllProfessionnels() {
  'use server';
  const supabase = createClient();
  const { data: professionnels, error } = await supabase.rpc('get_all_professionnels_with_details');
  if (error) {
    console.error(error);
    return [];
  }
  return professionnels;
}
