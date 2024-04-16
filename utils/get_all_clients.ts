'use server';

import { createClient } from './supabase/server';

export async function get_all_clients() {
    'use server';
    const supabase = createClient();

    const { data: particuliers, error: errorParticuliers } = await supabase
        .from('particuliers')
        .select('id_particulier, nom, prenom');

    if (errorParticuliers) {
        console.error(errorParticuliers);
        return [] as unknown as { id_client: string; nom: string; prenom: string }[]
    }

    const { data: professionnels, error: errorProfessionnels } = await supabase
        .from('professionnels')
        .select('id_professionnel, nom_compagnie, nom_contact');

    if (errorProfessionnels) {
        console.error(errorProfessionnels);
        return [] as unknown as { id_client: string; nom: string; prenom: string }[]
    }

    return [
        ...particuliers as unknown as { id_particulier: string; nom: string; prenom: string }[],
        ...professionnels as unknown as { id_professionnel: string; nom_compagnie: string; nom_contact: string }[]
    ];

}
