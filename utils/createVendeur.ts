'use server';

import { createClient } from '@supabase/supabase-js';

export async function createVendeur(
  email: string,
  password: string,
  nom: string,
  prenom: string,
  temps: 'partiel' | 'plein',
  id_boutique: string,
  date_embauche: string | undefined
) {
  'use server';
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const { error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
    user_metadata: {
      nom: nom,
      prenom: prenom,
      theme: 'light',
      role: 'vendeur',
      temps: temps,
      date_embauche: date_embauche ? date_embauche : null,
      id_boutique: id_boutique,
    },
  });

  if (error) {
    console.log(error);
    return false;
  }

  return true;
}
