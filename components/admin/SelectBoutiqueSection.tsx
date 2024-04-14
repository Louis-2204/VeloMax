import { createClient } from '@/utils/supabase/server';
import SelectBoutique from './SelectBoutique';
import { get_all_boutiques } from '@/utils/get_all_boutiques';

export async function SelectBoutiqueSection({ actual_id_boutique }: { actual_id_boutique: string }) {
  const supabase = createClient();
  const boutiques = await get_all_boutiques();

  return (
    <div className="flex flex-col md:flex-row w-full max-w-8xl gap-2 py-4 justify-center items-center">
      <SelectBoutique boutiques={boutiques} actual_id_boutique={actual_id_boutique} />
    </div>
  );
}
