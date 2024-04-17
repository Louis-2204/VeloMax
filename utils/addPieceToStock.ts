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

  const { data: stock, error: stockError } = await supabase
    .from(table)
    .select('*')
    .eq('id_boutique', data.id_boutique)
    .eq(data.hasOwnProperty('id_velo') ? 'id_velo' : 'id_piece', data.hasOwnProperty('id_velo')
      ? (data as { id_velo: string; id_boutique: string; quantite: number; id_piece?: never }).id_velo
      : (data as { id_velo: string; id_boutique: string; quantite: number; id_piece?: never }).id_piece);

  if (stockError) {
    console.error(stockError);
    return false;
  }

  if (stock.length > 0) {
    const { error } = await supabase
      .from(table)
      .update(data.hasOwnProperty('id_piece') ? { quantite: stock.find((s: any) => s.id_fournisseur === (data as { id_piece: string; id_fournisseur: string; id_boutique: string; quantite: number; id_velo?: never }).id_fournisseur).quantite + data.quantite } : { quantite: stock[0].quantite + data.quantite })
      .eq('id_boutique', data.id_boutique)
      .eq(data.hasOwnProperty('id_velo') ? 'id_velo' : 'id_piece', data.hasOwnProperty('id_velo')
        ? (data as { id_velo: string; id_boutique: string; quantite: number; id_piece?: never }).id_velo
        : (data as { id_velo: string; id_boutique: string; quantite: number; id_piece?: never }).id_piece)
      .eq(data.hasOwnProperty('id_piece') ? 'id_fournisseur' : 'id_velo', data.hasOwnProperty('id_piece')
        ? (data as { id_piece: string; id_fournisseur: string; id_boutique: string; quantite: number; id_velo?: never }).id_fournisseur
        : (data as { id_piece: string; id_fournisseur: string; id_boutique: string; quantite: number; id_velo?: never }).id_velo);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  }

  const { error } = await supabase.from(table).insert([data]);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}
