'use server';
import { getUserFidelo } from '../getUserFidelo';
import { createClient } from '../supabase/server';

export async function getTotalPrixWithFideloForUser(items: { id: string; nom: string; quantite: number; prix: number; image: string; type: 'vélo' | 'pièce'; }[], id_client: string) {
    'use server';

    const supabase = createClient();
    const fideloUser: any = await getUserFidelo(id_client);

    let total = 0;

    for (const item of items) {
        total += item.prix * item.quantite;
    }

    if (fideloUser.id_fidelo) {
        total = total - total * fideloUser.remise / 100;
    }

    total = total + (total * 0.2);

    return Number(total.toFixed(2));
}
