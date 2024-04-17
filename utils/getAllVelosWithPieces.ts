'use server';

import { createClient } from './supabase/server';

export async function getAllVelosWithPieces() {
  'use server';

  const supabase = createClient();
  const { data: velos, error } = await supabase.from('vélos').select('*, velos_pieces(id_piece)');
  if (error) {
    console.error(error);
    return [];
  }

  const velosFormated = velos.map((velo) => {
    return {
      ...velo,
      pieces: velo.velos_pieces.map((piece: { id_piece: string }) => piece.id_piece),
    };
  });

  return velosFormated;
}
