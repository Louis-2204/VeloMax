'use server';

import { createClient } from './supabase/server';

export async function getAllProfessionnels() {
  'use server';
  const supabase = createClient();
  const { data: professionnels, error } = await supabase.from('professionnels').select('*');
  if (error) {
    console.error(error);
    return [];
  }
  return professionnels;
}
