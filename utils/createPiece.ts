'use server';

import { Piece } from '@/types/entities';
import { createClient } from './supabase/server';

export async function createPiece(data: {
  nom: string;
  description: string;
  prix_unitaire: number;
  type: Piece['type'];
  date_introduction_marche: string;
  date_discontinuation_production: string | undefined;
  image?: string;
}) {
  'use server';

  switch (data.type) {
    case 'Cadre':
      data.image = 'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_pieces/cadre.jpg';
      break;
    case 'Guidon':
      data.image = 'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_pieces/guidon.jpg';
      break;
    case 'Freins':
      data.image = 'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_pieces/freins.jpg';
      break;
    case 'Selle':
      data.image = 'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_pieces/selle.jpg';
      break;
    case 'Dérailleur Avant':
      data.image =
        'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_pieces/derraileur-avant.jpg';
      break;
    case 'Dérailleur Arrière':
      data.image =
        'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_pieces/derraileur-arriere.jpg?t=2024-04-15T21%3A44%3A11.604Z';
      break;
    case 'Roue avant':
      data.image = 'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_pieces/roue-avant.jpg';
      break;
    case 'Roue arrière':
      data.image = 'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_pieces/roue-arriere.jpg';
      break;
    case 'Réflecteurs':
      data.image = 'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_pieces/reflecteurs.jpg';
      break;
    case 'Pédalier':
      data.image = 'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_pieces/pedalier.jpg';
      break;
    case 'Ordinateur':
      data.image = 'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_pieces/ordinateur.jpg';
      break;
    case 'Panier':
      data.image = 'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_pieces/panier.jpg';
      break;
    default:
      return false;
  }

  const supabase = createClient();
  const { error } = await supabase.from('pieces').insert([data]);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}
