'use server';

import { CommandesTableauType } from '@/types/entities';
import { createClient } from '../supabase/server';

export async function noterCommande(commande: CommandesTableauType, note: number) {
    'use server';

    const supabase = createClient();

    const { data, error: errorNote } = await supabase
        .from('avis')
        .insert([
            {
                note: note,
                id_vendeur: commande.id_vendeur,
                id_acheteur: commande.id_client,
                id_boutique: commande.id_boutique,
                id_commande: commande.id_commande
            }
        ])



    if (errorNote) {
        console.log(errorNote);
        return false;
    }

    return true;
}