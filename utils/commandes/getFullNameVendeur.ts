'use server';

import { createClient } from '../supabase/server';

export async function getFullNameVendeur(id_vendeur: string) {
    'use server';

    const supabase = createClient();


    const { data: dataVendeur, error: errorVendeur } = await supabase
        .from('vendeurs')
        .select('prenom, nom')
        .eq('id_vendeur', id_vendeur);

    if (errorVendeur) {
        console.log(errorVendeur);
        return [];
    }

    return dataVendeur[0].prenom + ' ' + dataVendeur[0].nom;
}