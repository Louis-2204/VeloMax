'use server';

import { createClient } from './supabase/server';

export async function get_all_produits() {
    'use server';
    const supabase = createClient();

    const { data: velos, error: errorVelos } = await supabase
        .from('vélos')
        .select('*')

    if (errorVelos) {
        console.error(errorVelos);
        return []
    }

    const { data: pieces, error: errorPieces } = await supabase
        .from('pieces')
        .select('*')

    if (errorPieces) {
        console.error(errorPieces);
        return []
    }

    return {
        velos,
        pieces
    };
}
