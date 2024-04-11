'use server';

import { createClient } from '@supabase/supabase-js';

type Data = {
  email: string;
  password: string;
  nom_compagnie: string;
  nom_contact: string;
  adresse: string;
  ville: string;
  cp: string;
  province: string;
  telephone: string;
};

export async function createProfessionnel(data: Data) {
  'use server';
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      role: 'professionnel',
      theme: 'light',
      nom_compagnie: data.nom_compagnie,
      nom_contact: data.nom_contact,
      telephone: data.telephone,
      adresse: data.adresse,
      ville: data.ville,
      cp: data.cp,
      province: data.province,
    },
  });

  if (error) {
    console.log(error);
    return false;
  }

  return true;
}
