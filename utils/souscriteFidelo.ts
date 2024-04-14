'use server';

import { createClient } from './supabase/server';

export async function souscrireFidelo(id_fidelo: string, id_user: string, duree: number) {
  'use server';
  const supabase = createClient();
  const data = {
    id_fidelo: id_fidelo,
    date_souscription: new Date().toISOString(),
    date_fin_souscription: new Date(new Date().setFullYear(new Date().getFullYear() + duree)).toISOString(),
  };
  const { error } = await supabase.from('particuliers').update(data).eq('id_particulier', id_user);
  if (error) {
    console.error(error);
    return false;
  }
  return true;
}
