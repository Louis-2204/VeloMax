'use server';

import { Velo } from '@/types/entities';
import { createClient } from './supabase/server';

export async function createVelo(data: {
  nom: string;
  description: string;
  prix_unitaire: number;
  type: Velo['type'];
  date_introduction_marche: string;
  date_discontinuation_production: string | undefined;
  image?: string;
}) {
  'use server';

  data.image = 'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_velos/velo.png';

  const supabase = createClient();
  const { error } = await supabase.from('vélos').insert([data]);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}
