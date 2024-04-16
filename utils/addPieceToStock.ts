'use server';

import { createClient } from './supabase/server';

type DataType =
  | {
      id_velo: string;
      id_boutique: string;
      quantite: number;
    }
  | {
      id_piece: string;
      id_fournisseur: string;
      id_boutique: string;
      quantite: number;
    };

export async function addPieceToStock(data: DataType, table: 'boutiques_pieces_fournisseurs' | 'boutiques_velos') {
  'use server';
  const supabase = createClient();
  const { error } = await supabase.from(table).insert([data]);
  if (error) {
    console.error(error);
    return false;
  }

  return true;
}
