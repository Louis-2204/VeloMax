'use server';

import { createClient } from './supabase/server';

export async function deletePiece(id_piece: string) {
  'use server';
  const supabase = createClient();
  const { error } = await supabase.from('pieces').delete().eq('id_piece', id_piece);
  if (error) {
    console.error(error);
    return false;
  }
  return true;
}
