'use server';
import { createClient } from './supabase/server';
import { redirect } from 'next/navigation';
export async function signUp(formData: FormData) {
  'use server';
  const supabase = createClient();

  if (formData.get('nomDeLaSociete') !== null) {
    const { error } = await supabase.auth.signUp({
      email: formData.get('email')!.toString(),
      password: formData.get('password')!.toString(),
      options: {
        data: {
          role: 'professionnel',
          theme: 'light',
          nom_compagnie: formData.get('nomDeLaSociete')!.toString(),
          nom_contact: formData.get('nomDeLaPersonneDeContact')!.toString(),
          telephone: formData.get('telephone')!.toString(),
          adresse: formData.get('adresse')!.toString(),
          ville: formData.get('ville')!.toString(),
          cp: formData.get('codePostal')!.toString(),
          province: formData.get('province')!.toString(),
        },
      },
    });

    if (error) {
      console.log(error);
      return redirect("/login?message=Erreur lors de l'inscription");
    }
  } else {
    const { error } = await supabase.auth.signUp({
      email: formData.get('email')!.toString(),
      password: formData.get('password')!.toString(),
      options: {
        data: {
          role: 'particulier',
          theme: 'light',
          nom: formData.get('nom')!.toString(),
          prenom: formData.get('prenom')!.toString(),
          telephone: formData.get('telephone')!.toString(),
          adresse: formData.get('adresse')!.toString(),
          ville: formData.get('ville')!.toString(),
          cp: formData.get('codePostal')!.toString(),
          province: formData.get('province')!.toString(),
          id_fidelo: null,
          date_souscription: null,
          date_fin_souscription: null,
        },
      },
    });

    if (error) {
      console.log(error);
      return redirect("/login?message=Erreur lors de l'inscription");
    }
  }

  return redirect('/');
}
