'use server';

import { createClient } from "../supabase/server";

export async function deleteCommande(id_commande: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('commandes')
        .delete()
        .eq('id_commande', id_commande);

    if (error) {
        console.log(error);
        return false;
    }

    return true;
}