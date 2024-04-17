'use server';

import { createClient } from './supabase/server';

export async function updateVeloPieces(id_velo: string, pieces: string[]) {
  'use server';

  const supabase = createClient();
  const { error } = await supabase.from('velos_pieces').delete().eq('id_velo', id_velo);

  if (error) {
    console.error(error);
    return false;
  }

  const { error: error2 } = await supabase
    .from('velos_pieces')
    .insert(pieces.map((piece) => ({ id_piece: piece, id_velo: id_velo })));

  if (error2) {
    console.error(error2);
    return false;
  }

  return true;
}
