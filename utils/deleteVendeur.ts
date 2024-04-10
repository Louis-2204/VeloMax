'use server';

import { createClient } from '@supabase/supabase-js';

export async function deleteVendeur(id_vendeur: string) {
  'use server';
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const { error } = await supabase.auth.admin.deleteUser(id_vendeur);

  if (error) {
    return false;
  }
  return true;
}
