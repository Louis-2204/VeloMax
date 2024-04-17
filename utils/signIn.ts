'use server';
import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';

export async function signIn(formData: FormData) {
  'use server';

  if (!formData.get('email')) {
    return redirect('/login?message=Veuillez entrer une adresse email');
  }

  if (!formData.get('password')) {
    return redirect('/login?message=Veuillez entrer un mot de passe');
  }

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect('/login?message=Could not authenticate user');
  }

  return redirect('/');
}
