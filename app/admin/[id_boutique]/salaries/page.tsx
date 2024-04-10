import SalariesTableau from '@/components/admin/salaries/SalariesTableau';
import { Vendeur } from '@/types/entities';
import { createClient } from '@/utils/supabase/server';

const page = async ({ params }: { params: { id_boutique: string } }) => {
  const supabase = createClient();
  const { data: salaries, error } = await supabase.from('vendeurs').select('*').eq('id_boutique', params.id_boutique);
  console.log(salaries);

  return (
    <div className="w-full flex justify-center">
      <SalariesTableau salaries={salaries as Vendeur[]} />
    </div>
  );
};

export default page;
