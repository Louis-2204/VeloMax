'use server';
import { User } from '@supabase/supabase-js';
import { createClient } from './supabase/server';

export async function getProfileConnected(userConnected?: User | null) {
  'use server';

  const supabase = createClient();
  let user;

  if (userConnected) {
    user = userConnected;
  } else {
    const {
      data: { user: supaUser },
    } = await supabase.auth.getUser();
    user = supaUser;
  }

  if (!user) return null;

  const queryVendeur = supabase.from('vendeurs').select('*').eq('id_vendeur', user!.id).single();
  const queryParticulier = supabase.from('particuliers').select('*').eq('id_particulier', user!.id).single();
  const queryProfessionnel = supabase.from('professionnels').select('*').eq('id_professionnel', user!.id).single();
  const queryGerantMagasin = supabase.from('gerants').select('*').eq('id_gerant', user!.id).single();
  const queryAdmin = supabase.from('admin').select('*').eq('id_admin', user!.id).single();

  const [
    { data: vendeur, error: errorVendeur },
    { data: particulier, error: errorParticulier },
    { data: professionnel, error: errorProfessionnel },
    { data: gerantMagasin, error: errorGerantMagasin },
    { data: admin, error: errorAdmin },
  ] = await Promise.all([queryVendeur, queryParticulier, queryProfessionnel, queryGerantMagasin, queryAdmin]);

  if (
    (errorVendeur && errorVendeur.details !== 'The result contains 0 rows') ||
    (errorParticulier && errorParticulier.details !== 'The result contains 0 rows') ||
    (errorProfessionnel && errorProfessionnel.details !== 'The result contains 0 rows') ||
    (errorGerantMagasin && errorGerantMagasin.details !== 'The result contains 0 rows') ||
    (errorAdmin && errorAdmin.details !== 'The result contains 0 rows')
  ) {
    console.log(errorVendeur);
    console.log(errorParticulier);
    console.log(errorProfessionnel);
    console.log(errorGerantMagasin);
    console.log(errorAdmin);
    return null;
  }

  if (vendeur) {
    return { role: 'vendeur', ...vendeur };
  } else if (particulier) {
    return { role: 'particulier', ...particulier };
  } else if (professionnel) {
    return { role: 'professionnel', ...professionnel };
  } else if (gerantMagasin) {
    return { role: 'gerant', ...gerantMagasin };
  } else if (admin) {
    return { role: 'admin', ...admin };
  }

  return null;
}
