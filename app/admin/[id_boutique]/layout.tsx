import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

const layout = async ({ children, params }: { children: ReactNode; params: { id_boutique: string } }) => {
  console.log(params.id_boutique);
  const supabase = createClient();
  const { data: doesExist, error } = await supabase
    .from('boutiques')
    .select('id_boutique')
    .eq('id_boutique', params.id_boutique)
    .single();
  if (error || !doesExist) {
    return notFound();
  }
  return <>{children}</>;
};

export default layout;
