'use server';

import { createClient } from './supabase/server';

export async function getAllParticuliers() {
  'use server';
  const supabase = createClient();
  const { data: particuliers, error } = await supabase
    .from('particuliers')
    .select('id_particulier,nom,prenom,adresse,ville,cp,province,telephone, fidelo(id_fidelo,nom)');
  if (error) {
    console.error(error);
    return [];
  }
  return particuliers;
}
