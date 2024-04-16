'use server';
import { getProfileConnected } from './getProfileConnected';
import { createClient } from './supabase/server';

export async function getUserFidelo(id_client?: string) {
    'use server';

    const userConnected = await getProfileConnected();
    const supabase = createClient();

    if (id_client) {
        const { data: dataUser, error: errorUser } = await supabase
            .from('particuliers')
            .select('fidelo(*)')
            .eq('id_particulier', id_client)
            .single();

        if (errorUser) {
            console.log(errorUser);
            return {};
        }


        return dataUser['fidelo'] || {};

    } else {
        const { data: dataUser, error: errorUser } = await supabase
            .from('particuliers')
            .select('fidelo(*)')
            .eq('id_particulier', userConnected.id_particulier)
            .single();

        if (errorUser) {
            console.log(errorUser);
            return {};
        }

        return dataUser['fidelo'] || {};
    }



}
