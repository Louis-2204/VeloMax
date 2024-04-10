'use server';
import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';

export async function signOut() {
  'use server';
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error('Error signing out');
  redirect('/');
}
