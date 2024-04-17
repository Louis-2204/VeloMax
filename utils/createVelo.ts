'use server';

import { Velo } from '@/types/entities';
import { createClient } from './supabase/server';

export async function createVelo(
  data: {
    nom: string;
    description: string;
    prix_unitaire: number;
    type: Velo['type'];
    date_introduction_marche: string;
    date_discontinuation_production: string | undefined;
    image?: string;
  },
  pieces: string[]
) {
  'use server';

  data.image = 'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_velos/velo.png';

  const supabase = createClient();
  const { data: newVelo, error } = await supabase.from('vélos').insert([data]).select('id_velo').single();

  if (error) {
    console.error(error);
    return false;
  }

  const { error: error2 } = await supabase
    .from('velos_pieces')
    .insert(pieces.map((piece) => ({ id_piece: piece, id_velo: newVelo.id_velo })));

  if (error2) {
    console.error(error2);
    return false;
  }

  return true;
}
