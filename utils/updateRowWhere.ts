'use server';
import { createClient } from './supabase/server';

type UpdateRowData =
  | {
      nom?: string;
      prenom?: string;
      temps?: 'partiel' | 'plein';
      date_embauche?: string;
    }
  | {
      nom?: string;
      prenom?: string;
      adresse?: string;
      ville?: string;
      cp?: string;
      province?: string;
      telephone?: string;
    };

export async function updateRowWhere(data: UpdateRowData, table_name: string, id_label: string, id: string) {
  'use server';
  const supabase = createClient();
  const { error } = await supabase.from(table_name).update(data).eq(id_label, id);
  if (error) {
    console.error(error);
    return false;
  }
  return true;
}
