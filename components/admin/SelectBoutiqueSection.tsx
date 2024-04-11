import { createClient } from '@/utils/supabase/server';
import SelectBoutique from './SelectBoutique';

export async function SelectBoutiqueSection({ actual_id_boutique }: { actual_id_boutique: string }) {
  const supabase = createClient();
  const { data: boutiques, error } = await supabase.from('boutiques').select('id_boutique, adresse,ville');
  if (error) {
    console.error(error);
    return <div>Erreur lors de la récupération des boutiques</div>;
  }

  return (
    <div className="flex flex-col md:flex-row w-full max-w-8xl gap-2 py-4 justify-center items-center">
      <SelectBoutique boutiques={boutiques} actual_id_boutique={actual_id_boutique} />
    </div>
  );
}
