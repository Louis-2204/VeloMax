'use server';

import { createClient } from './supabase/server';

export async function deleteVelo(id_velo: string) {
  'use server';
  const supabase = createClient();
  const { error } = await supabase.from('vélos').delete().eq('id_velo', id_velo);
  if (error) {
    console.error(error);
    return false;
  }
  return true;
}
