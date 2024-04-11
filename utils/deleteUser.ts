'use server';

import { createClient } from '@supabase/supabase-js';

export async function deleteUser(id_user: string) {
  'use server';
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const { error } = await supabase.auth.admin.deleteUser(id_user);

  if (error) {
    return false;
  }
  return true;
}
