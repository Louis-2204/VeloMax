import SalariesTableau from '@/components/admin/salaries/SalariesTableau';
import { Vendeur } from '@/types/entities';
import { createClient } from '@/utils/supabase/server';

const page = async ({ params }: { params: { id_boutique: string } }) => {
  if (params.id_boutique === 'null') return <></>;

  const supabase = createClient();
  const { data: salaries, error } = await supabase.from('vendeurs').select('*').eq('id_boutique', params.id_boutique);

  return (
    <div className="w-full flex justify-center p-2">
      <SalariesTableau salaries={salaries as Vendeur[]} />
    </div>
  );
};

export default page;
