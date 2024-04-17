'use server';

import { CommandesTableauType } from '@/types/entities';
import { createClient } from '../supabase/server';

export async function getNbItemInStock(id_item: string, type: "vélo" | "pièce", id_boutique: string) {
    'use server';

    const supabase = createClient();

    const { data, error: errorGetStock } = await supabase
        .from(type === "vélo" ? 'boutiques_velos' : 'boutiques_pieces_fournisseurs')
        .select('quantite')
        .eq(type === "vélo" ? 'id_velo' : 'id_piece', id_item)
        .eq('id_boutique', id_boutique)
        .single();


    if (errorGetStock) {
        console.log(errorGetStock);
        return { quantite: 0 };
    }

    return data;
}