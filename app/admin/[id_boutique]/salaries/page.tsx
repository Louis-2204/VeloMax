import Tableau from '@/components/admin/salaries/Tableau';
import { createClient } from '@/utils/supabase/server';

const page = async ({ params }: { params: { id_boutique: string } }) => {
  const supabase = createClient();
  const { data: salaries, error } = await supabase.from('vendeurs').select('*').eq('id_boutique', params.id_boutique);
  console.log(salaries);

  return (
    <div>
      <Tableau data={salaries} />
    </div>
  );
};

export default page;
