'use server';

import { createClient } from '../supabase/server';
import { getUserConnected } from '../getUserConnected';
import moment from "moment";

export async function createCommande(infos: { items: { id: string; nom: string; quantite: number; prix: number; image: string; type: "vélo" | "pièce" }[]; nom: string; prenom: string; adresse: string; ville: string; codePostal: string }, id_vendeur?: string, id_boutique?: string, id_user?: string, status?: string) {
    'use server';

    const supabase = createClient();

    const user = await getUserConnected();
    const dateLivraison = moment().add(5, 'days').format('YYYY-MM-DD');

    const { data: dataCommande, error: errorCommande } = await supabase
        .from('commandes')
        .insert([
            {
                nom: infos.nom,
                prenom: infos.prenom,
                adresse: infos.adresse,
                ville: infos.ville,
                cp: infos.codePostal,
                id_boutique: id_boutique || null,
                id_vendeur: id_vendeur || null,
                id_client: id_user || user?.id,
                status: status || 'En attente de traitement',
                prix_total: (infos.items.reduce((acc, item) => acc + item.prix * item.quantite, 0) * 1.2).toFixed(2),
                livraison: dateLivraison,
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

        // if atleast one product is a piece
        if (infos.items.some((item) => item.type === 'pièce')) {
            const { data: dataCommandePiece, error: errorCommandePiece } = await supabase
                .from('commandes_pieces')
                .insert(
                    infos.items
                        .filter((item) => item.type === 'pièce')
                        .map((item) => ({
                            id_piece: item.id,
                            id_commande: dataCommande.id_commande,
                            quantite: item.quantite,
                        }))
                );

            if (errorCommandePiece) {
                await supabase.from('commandes').delete().eq('id_commande', dataCommande.id_commande);
                console.log(errorCommandePiece);
                return false;
            }
        }
    }

    // if atleast one product is a vélo
    if (infos.items.some((item) => item.type === 'vélo')) {
        const { data: dataCommandeVelo, error: errorCommandeVelo } = await supabase
            .from('commandes_velos')
            .insert(
                infos.items
                    .filter((item) => item.type === 'vélo')
                    .map((item) => ({
                        id_velo: item.id,
                        id_commande: dataCommande.id_commande,
                        quantite: item.quantite,
                    }))
            );

        if (errorCommandeVelo) {
            await supabase.from('commandes').delete().eq('id_commande', dataCommande.id_commande);
            console.log(errorCommandeVelo);
            return false;
        }
    }

    return true;
}

