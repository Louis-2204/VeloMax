'use server';
import { getProfileConnected } from './getProfileConnected';
import { createClient } from './supabase/server';

export async function getCompagnieReduction(id_client?: string) {
    'use server';

    const userConnected = await getProfileConnected();
    const supabase = createClient();

    if (id_client) {
        const { data: dataUser, error: errorUser } = await supabase
            .from('professionnels')
            .select('id_professionnel, remise_commerciale')
            .eq('id_professionnel', id_client)
            .single();

        if (errorUser) {
            console.log(errorUser);
            return {};
        }

        if (dataUser.remise_commerciale === 0) {
            return {};
        }

        return dataUser || {};

    } else {
        const { data: dataUser, error: errorUser } = await supabase
            .from('professionnels')
            .select('id_professionnel, remise_commerciale')
            .eq('id_professionnel', userConnected.id_professionnel)
            .single();

        if (errorUser) {
            console.log(errorUser);
            return {};
        }

        if (dataUser.remise_commerciale === 0) {
            return {};
        }

        return dataUser || {};
    }



}
