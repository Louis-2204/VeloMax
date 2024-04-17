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

export async function removePieceFromStock(data: DataType, table: 'boutiques_pieces_fournisseurs' | 'boutiques_velos') {
    'use server';
    const supabase = createClient();

    const { data: existingPiece, error: pieceError } = await supabase
        .from(table)
        .select('quantite')
        .eq('id_boutique', data.id_boutique)
        .eq(data.hasOwnProperty('id_velo') ? 'id_velo' : 'id_piece', data.hasOwnProperty('id_velo')
            ? (data as { id_velo: string; id_boutique: string; quantite: number; id_piece?: never }).id_velo
            : (data as { id_velo: string; id_boutique: string; quantite: number; id_piece?: never }).id_piece)
        .eq(table === 'boutiques_pieces_fournisseurs' ? 'id_fournisseur' : 'id_velo', table === 'boutiques_pieces_fournisseurs'
            ? (data as { id_piece: string; id_fournisseur: string; id_boutique: string; quantite: number; id_velo?: never }).id_fournisseur
            : (data as { id_piece: string; id_fournisseur: string; id_boutique: string; quantite: number; id_velo?: never }).id_velo);

    if (pieceError) {
        console.error(pieceError);
        return false;
    }

    if (existingPiece.length) {
        if (existingPiece[0].quantite <= data.quantite) {
            // Si la quantité à retirer est supérieure ou égale à la quantité en stock,
            // supprimer complètement la pièce du stock
            const { error } = await supabase
                .from(table)
                .delete()
                .eq('id_boutique', data.id_boutique)
                .eq(data.hasOwnProperty('id_velo') ? 'id_velo' : 'id_piece', data.hasOwnProperty('id_velo')
                    ? (data as { id_velo: string; id_boutique: string; quantite: number; id_piece?: never }).id_velo
                    : (data as { id_velo: string; id_boutique: string; quantite: number; id_piece?: never }).id_piece)
                .eq(table === 'boutiques_pieces_fournisseurs' ? 'id_fournisseur' : 'id_velo', table === 'boutiques_pieces_fournisseurs'
                    ? (data as { id_piece: string; id_fournisseur: string; id_boutique: string; quantite: number; id_velo?: never }).id_fournisseur
                    : (data as { id_piece: string; id_fournisseur: string; id_boutique: string; quantite: number; id_velo?: never }).id_velo);

            if (error) {
                console.error(error);
                return false;
            }
        } else {
            // Sinon, mettre à jour la quantité en soustrayant la quantité spécifiée
            const { error } = await supabase
                .from(table)
                .update({ quantite: existingPiece[0].quantite - data.quantite })
                .eq('id_boutique', data.id_boutique)
                .eq(data.hasOwnProperty('id_velo') ? 'id_velo' : 'id_piece', data.hasOwnProperty('id_velo')
                    ? (data as { id_velo: string; id_boutique: string; quantite: number; id_piece?: never }).id_velo
                    : (data as { id_velo: string; id_boutique: string; quantite: number; id_piece?: never }).id_piece)
                .eq(table === 'boutiques_pieces_fournisseurs' ? 'id_fournisseur' : 'id_velo', table === 'boutiques_pieces_fournisseurs'
                    ? (data as { id_piece: string; id_fournisseur: string; id_boutique: string; quantite: number; id_velo?: never }).id_fournisseur
                    : (data as { id_piece: string; id_fournisseur: string; id_boutique: string; quantite: number; id_velo?: never }).id_velo);

            if (error) {
                console.error(error);
                return false;
            }
        }

        return true;
    }

    console.error("La pièce spécifiée n'existe pas dans le stock de la boutique.");
    return false;
}
