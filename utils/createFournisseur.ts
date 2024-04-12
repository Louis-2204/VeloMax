'use server';
import { createClient } from './supabase/server';

export async function createFournisseur(
  nom_entreprise: string,
  nom_contact: string,
  adresse: string,
  ville: string,
  cp: string,
  libelle: string | null,
  pieces: {
    numero_catalogue: number;
    prix_fournisseur: number;
    delai_approvisionnement: number;
    id_piece: string;
  }[]
) {
  'use server';
  const supabase = createClient();
  const { data, error } = await supabase
    .from('fournisseurs')
    .insert([{ nom_entreprise, nom_contact, adresse, ville, cp, libelle }])
    .select('id_fournisseur')
    .single();
  if (error) {
    console.log(error);
    return false;
  }

  if (!data) {
    console.log('Erreur lors de la création du fournisseur');
    return false;
  }

  const id_fournisseur = data.id_fournisseur;
  for (const piece of pieces) {
    const { error } = await supabase.from('fournisseurs_pieces').insert([{ ...piece, id_fournisseur }]);
    if (error) {
      console.log(error);
      return false;
    }
  }
  return true;
}
