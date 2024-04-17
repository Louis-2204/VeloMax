import { SelectBoutiqueSection } from '@/components/admin/SelectBoutiqueSection';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { createClient } from '@supabase/supabase-js';
import { notFound, redirect } from 'next/navigation';
import { ReactNode } from 'react';

export async function generateStaticParams() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const results = (await supabase.from('boutiques').select('id_boutique')) as unknown as { data: any[] };
  const ids_boutique = results?.data;

  return ids_boutique?.map(({ id_boutique }) => ({
    id_boutique,
  }));
}

const layout = async ({ children, params }: { children: ReactNode; params: { id_boutique: string } }) => {
  const profileConnected = await getProfileConnected();

  if (!profileConnected) return redirect('/');
  if (profileConnected.role === 'particulier') return redirect('/');
  if (profileConnected.role === 'professionnel') return redirect('/');

  if (params.id_boutique !== 'null') {
    const supabase = createServerClient();
    const { data: doesExist, error } = await supabase
      .from('boutiques')
      .select('id_boutique')
      .eq('id_boutique', params.id_boutique)
      .single();
    if (error || !doesExist) {
      return notFound();
    }
  }

  if (params.id_boutique === 'null' && profileConnected.role !== 'admin') {
    redirect('/');
  }

  return (
    <>
      {profileConnected.role === 'admin' && <SelectBoutiqueSection actual_id_boutique={params.id_boutique} />}
      {params.id_boutique === 'null' && profileConnected.role === 'admin' && (
        <div className="flex justify-center mt-4">
          <p className="text-red-500">Vous n'avez pas selectionné de boutique</p>
        </div>
      )}
      {params.id_boutique !== 'null' && children}
    </>
  );
};

export default layout;
