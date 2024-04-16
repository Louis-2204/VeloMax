import { SelectBoutiqueSection } from '@/components/admin/SelectBoutiqueSection';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { createClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { ReactNode } from 'react';

const layout = async ({ children, params }: { children: ReactNode; params: { id_boutique: string } }) => {
  const profileConnected = await getProfileConnected();

  if (!profileConnected) return redirect('/');
  if (profileConnected.role === 'particulier') return redirect('/');
  if (profileConnected.role === 'professionnel') return redirect('/');

  if (params.id_boutique !== 'null') {
    const supabase = createClient();
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
