'use server';

import { createClient } from '@supabase/supabase-js';

export async function createAdmin(email: string, password: string, nom: string, prenom: string) {
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
      role: 'admin',
    },
  });

  if (error) {
    console.log(error);
    return false;
  }

  return true;
}
