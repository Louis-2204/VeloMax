'use server';

import { createClient } from '../supabase/server';

export async function getPiecesVelo(id_velo: string) {
    'use server';

    const supabase = createClient();

    const { data, error: errorGetStock } = await supabase
        .from('velos_pieces')
        .select('pieces(nom, boutiques_pieces_fournisseurs(quantite), fournisseurs_pieces(*))')
        .eq('id_velo', id_velo)
        .order('delai_approvisionnement', { referencedTable: 'pieces.fournisseurs_pieces' })
        .limit(1, { referencedTable: 'pieces.fournisseurs_pieces' });


    if (errorGetStock) {
        console.log(errorGetStock);
        return { quantite: 0 };
    }

    return data.map((piece: any) => ({
        id_piece: piece.pieces.fournisseurs_pieces[0].id_piece,
        nom: piece.pieces.nom,
        delai_approvisionnement: piece.pieces.fournisseurs_pieces[0].delai_approvisionnement,
        nb_stock: piece.pieces.boutiques_pieces_fournisseurs.reduce((sum: number, boutique: any) => sum + boutique.quantite, 0),
    }));
}