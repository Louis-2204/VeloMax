import { createClient } from '../supabase/server';

interface Item {
    id: string;
    nom: string;
    prix: number;
    image: string;
    quantite: number;
    type: "vélo" | "pièce";
    id_commande: string;
}

export async function getCommande(id_user: string) {
    const supabase = createClient();

    try {
        const { data: dataCommande, error: errorCommande } = await supabase
            .from('commandes')
            .select('*, avis(note), commandes_velos(quantite, id_commande, velo:public_commandes_velos_id_velo_fkey(id_velo, nom, prix_unitaire, image, type)), commandes_pieces(quantite, id_commande, piece:public_commandes_pieces_id_piece_fkey(id_piece, nom, prix_unitaire, image, type))')
            .eq('id_client', id_user);

        if (errorCommande) {
            console.log(errorCommande);
            return false;
        }

        const items: Item[] = [];

        for (const commande of dataCommande) {
            const velos: Item[] = commande.commandes_velos.map((velo: any) => ({
                ...velo.velo,
                prix: velo.velo.prix_unitaire, // Renommer la clé prix_unitaire en prix
                quantite: velo.quantite,
                type: 'vélo',
                id_commande: velo.id_commande
            }));

            console.log(velos);

            const pieces: Item[] = commande.commandes_pieces.map((piece: any) => ({
                ...piece.piece,
                prix: piece.piece.prix_unitaire, // Renommer la clé prix_unitaire en prix
                quantite: piece.quantite,
                type: 'pièce',
                id_commande: piece.id_commande
            }));

            items.push(...velos, ...pieces);
        }

        return dataCommande.map((commande: any) => ({
            ...commande,
            items: items.filter((item: Item) => commande.commandes_pieces.some((piece: any) => piece.id_piece === item.id && piece.id_commande === item.id_commande) || commande.commandes_velos.some((velo: any) => velo.id_velo === item.id && velo.id_commande === item.id_commande))
        }));

    } catch (error) {
        console.error(error);
        return false;
    }
}
