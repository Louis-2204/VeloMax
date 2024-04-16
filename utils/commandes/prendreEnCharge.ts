'use server';

import moment from 'moment';
import { createClient } from '../supabase/server';

export async function prendreEnCharge(commande: any, id_vendeur: string, newDate: string) {
    'use server';

    const supabase = createClient();
    const formattedDate = moment(commande.livraison).format('YYYY-MM-DD');

    const { data: id_boutique, error: id_boutiqueError } = await supabase
        .from('vendeurs')
        .select('id_boutique')
        .eq('id_vendeur', id_vendeur)
        .single();

    if (id_boutiqueError || !id_boutique) {
        console.error(id_boutiqueError);
        return false;
    }

    const { data, error: errorPrendreEnCharge } = await supabase
        .from('commandes')
        .update({
            id_vendeur,
            id_boutique: id_boutique.id_boutique,
            status: formattedDate === newDate ? 'En traitement' : 'En attente de restockage',
            livraison: newDate,
        })
        .eq('id_commande', commande.id_commande)

    if (errorPrendreEnCharge) {
        console.error(errorPrendreEnCharge);
        return false;
    }

    return data;
}