'use server';

import { CommandesTableauType } from '@/types/entities';
import { createClient } from '../supabase/server';

export async function getMinDelaiApprovisionnement(id_piece: string) {
    'use server';

    const supabase = createClient();

    const { data, error: errorGetMinDelai } = await supabase
        .from('fournisseurs_pieces')
        .select('delai_approvisionnement')
        .eq('id_piece', id_piece)
        .order('delai_approvisionnement')
        .limit(1);

    if (errorGetMinDelai) {
        console.log(errorGetMinDelai);
        return 0;
    }

    return data;
}