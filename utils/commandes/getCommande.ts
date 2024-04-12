'use server';

import { createClient } from '../supabase/server';

export async function getCommande(id_user: string) {
    'use server';

    const supabase = createClient();

    const { data: dataCommande, error: errorCommande } = await supabase
        .from('commandes')
        .select('id_commande, adresse, ville, cp, created_at, status')
        .eq('id_client', id_user);

    if (errorCommande) {
        console.log(errorCommande);
        return false;
    }

    return dataCommande;
}