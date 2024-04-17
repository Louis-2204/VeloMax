'use server';

import { createClient } from '../supabase/server';

export async function updateStock(id_commande: string, id_boutique: string) {
    'use server';

    const supabase = createClient();

    const { data, error: updateStockError } = await supabase
        .from('commandes')
        .select('commandes_velos(*), commandes_pieces(*)')
        .eq('id_commande', id_commande)

    if (updateStockError) {
        console.log(updateStockError);
        return false;
    }

    const { data: boutiqueStockVelos, error: boutiqueStockVelosError } = await supabase
        .from('boutiques_velos')
        .select('*')
        .eq('id_boutique', id_boutique)

    if (boutiqueStockVelosError) {
        console.log(boutiqueStockVelosError);
        return false;
    }

    const { data: boutiqueStockPieces, error: boutiqueStockPiecesError } = await supabase
        .from('boutiques_pieces_fournisseurs')
        .select('*')
        .eq('id_boutique', id_boutique)

    if (boutiqueStockPiecesError) {
        console.log(boutiqueStockPiecesError);
        return false;
    }


    data?.forEach(async (commande: any) => {
        if (commande.commandes_velos && commande.commandes_velos.length > 0) {
            commande.commandes_velos.forEach(async (velo: any) => {

                const newQuantite = boutiqueStockVelos.find(stockVelo => stockVelo.id_velo === velo.id_velo)?.quantite - velo.quantite;

                const { error: updateStockError } = await supabase
                    .from('boutiques_velos')
                    .update({ quantite: newQuantite < 0 ? 0 : newQuantite })
                    .eq('id_boutique', id_boutique)
                    .eq('id_velo', velo.id_velo)

                if (updateStockError) {
                    console.log(updateStockError);
                    return false;
                }
            })
        }

        if (commande.commandes_pieces && commande.commandes_pieces.length > 0) {

            console.log('pieces', commande.commandes_pieces);

            for (const piece of commande.commandes_pieces) {
                // Recherche de tous les stocks disponibles pour la pièce en question
                const stocksPiece = boutiqueStockPieces.filter(stockPiece => stockPiece.id_piece === piece.id_piece);

                let remainingQuantity = piece.quantite;

                // Parcourir les stocks disponibles
                for (const stockPiece of stocksPiece) {
                    const availableQuantity = stockPiece.quantite;

                    // Mettre à jour la quantité en stock en fonction de ce qui a été commandé
                    const newQuantite = availableQuantity - remainingQuantity >= 0 ? availableQuantity - remainingQuantity : 0;

                    // Mettre à jour la quantité en stock pour le fournisseur actuel
                    const { data: updatedStock, error: updateStockError } = await supabase
                        .from('boutiques_pieces_fournisseurs')
                        .update({ quantite: newQuantite })
                        .eq('id_boutique', id_boutique)
                        .eq('id_piece', piece.id_piece)
                        .eq('id_fournisseur', stockPiece.id_fournisseur);

                    if (updateStockError) {
                        console.log(updateStockError);
                        return false;
                    }

                    // Mettre à jour la quantité restante de la commande
                    remainingQuantity -= availableQuantity;

                    // Sortir de la boucle si la quantité restante est nulle
                    if (remainingQuantity === 0) {
                        break;
                    }
                }
            }
        }
    })

    return true;
}
