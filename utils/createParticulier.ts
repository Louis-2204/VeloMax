'use server';

import { createClient } from '@supabase/supabase-js';
import moment from 'moment';

type Data = {
  email: string;
  password: string;
  nom: string;
  prenom: string;
  adresse: string;
  ville: string;
  cp: string;
  province: string;
  telephone: string;
  fidelo?: string;
  date_souscription?: string;
};

export async function createParticulier(data: Data) {
  'use server';
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );

  let fidelo_id = null;
  let fidelo_duree = null;
  let fidelo_fin_souscription = null;

  if (data.fidelo) {
    const { data: fidelo, error } = await supabase
      .from('fidelo')
      .select('id_fidelo, duree')
      .eq('nom', data.fidelo)
      .single();

    if (error) {
      console.log(error);
      return false;
    }

    fidelo_id = fidelo.id_fidelo;
    fidelo_duree = fidelo.duree;
    // use moment to add duree in years to date_souscription to get date_fin_souscription
    fidelo_fin_souscription = moment(data.date_souscription).add(fidelo_duree, 'years').format('YYYY-MM-DD');
  }

  const { error } = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      role: 'particulier',
      theme: 'light',
      nom: data.nom,
      prenom: data.prenom,
      telephone: data.telephone,
      adresse: data.adresse,
      ville: data.ville,
      cp: data.cp,
      province: data.province,
      id_fidelo: fidelo_id,
      date_souscription: data.date_souscription,
      date_fin_souscription: fidelo_fin_souscription,
    },
  });

  if (error) {
    console.log(error);
    return false;
  }

  return true;
}
