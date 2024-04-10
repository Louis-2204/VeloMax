'use server';
import { createClient } from './supabase/server';

export async function updateVendeur(
  data: {
    nom?: string;
    prenom?: string;
    temps?: 'partiel' | 'plein';
    date_embauche?: string;
  },
  id_vendeur: string
) {
  'use server';
  const supabase = createClient();
  const { error } = await supabase.from('vendeurs').update(data).eq('id_vendeur', id_vendeur);
  if (error) {
    console.error(error);
    return false;
  }
  return true;
}
