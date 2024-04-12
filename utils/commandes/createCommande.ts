'use server';

import { createClient } from "../supabase/server";
import { getUserConnected } from '../getUserConnected';

export async function createCommande(infos: { items: { id: string; nom: string; quantite: number; prix: number; image: string; type: "vélo" | "pièce" }[]; nom: string; prenom: string; adresse: string; ville: string; codePostal: string }) {
    'use server';

    const supabase = createClient();

    const user = await getUserConnected();


    const { data: dataCommande, error: errorCommande } = await supabase
        .from('commandes')
        .insert([
            {
                //nom: infos.nom,
                //prenom: infos.prenom,
                adresse: infos.adresse,
                ville: infos.ville,
                cp: infos.codePostal,
                id_boutique: null,
                id_vendeur: null,
                id_client: user?.id,
                status: 'En attente de traitement'
            },
        ])
        .select()
        .single();

    if (errorCommande) {
        console.log(errorCommande);
        return false;
    }

    // if atleast one product is a piece
    if (infos.items.some((item) => item.type === 'pièce')) {
        const { data: dataCommandePiece, error: errorCommandePiece } = await supabase
            .from('commandes_pieces')
            .insert(
                infos.items.map((item) => ({
                    id_piece: item.id,
                    id_commande: dataCommande.id_commande,
                    quantite: item.quantite,
                }))
            );

        if (errorCommandePiece) {
            console.log(errorCommandePiece);
            return false;
        }
    }

    // if atleast one product is a vélo
    if (infos.items.some((item) => item.type === 'vélo')) {
        const { data: dataCommandeVelo, error: errorCommandeVelo } = await supabase
            .from('commandes_velos')
            .insert(
                infos.items.map((item) => ({
                    id_velo: item.id,
                    id_commande: dataCommande.id_commande,
                    quantite: item.quantite,
                }))
            );

        if (errorCommandeVelo) {
            console.log(errorCommandeVelo);
            return false;
        }
    }


    return true;
}
