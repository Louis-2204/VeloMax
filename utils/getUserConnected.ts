'use server';
import { createClient } from './supabase/server';

export async function getUserConnected() {
  'use server';

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
