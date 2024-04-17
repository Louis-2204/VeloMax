import AddToCartBtn from '@/components/p/AddToCartBtn';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const results = (await supabase.from('vélos').select('id_velo')) as unknown as { data: any[] };
  const ids_velos = results?.data;
  const results2 = (await supabase.from('pieces').select('id_piece')) as unknown as { data: any[] };
  const ids_pieces = results2?.data;
  const ids_articles = [...ids_velos, ...ids_pieces];
  ids_articles.map((article) => {
    if (article.id_velo) {
      article.id_produit = article.id_velo;
      delete article.id_velo;
    } else {
      article.id_produit = article.id_piece;
      delete article.id_piece;
    }
  });
  return ids_articles?.map(({ id_produit }) => ({
    id_produit,
  }));
}

const page = async ({ params }: { params: { id_produit: string } }) => {
  const supabase = createServerClient();
  const profileConnected = await getProfileConnected();
  let produit = null;
  const { data, error } = await supabase
    .from('vélos')
    .select('*, pieces(id_piece,type,nom)')
    .eq('id_velo', params.id_produit)
    .single();
  if (error && error.details !== 'The result contains 0 rows') {
    console.error(error);
  }
  if (!data) {
    const { data, error } = await supabase.from('pieces').select('*').eq('id_piece', params.id_produit).single();
    if (error && error.details !== 'The result contains 0 rows') {
      console.error(error);
    }
    produit = data;
  } else {
    produit = data;
  }

  if (!produit) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full h-full max-w-8xl">
      <div className="flex flex-col mt-8 px-4 xl:px-0 gap-10 w-full">
        {/* article image, prix, nom, btn */}
        <div className="flex w-full gap-8">
          <div className="w-5/12">
            <div className="w-full aspect-square rounded-md bg-vm_text_gray relative border shadow">
              <Image className="object-scale-down" src={produit.image} fill alt={produit.nom} />
            </div>
          </div>
          <div className="w-7/12 flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-vm_text_gray dark:text-white break-words">
              {produit.nom}
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-vm_secondary">{produit.prix_unitaire}€</h2>
            <AddToCartBtn item={produit} profileConnected={profileConnected} />
          </div>
        </div>

        {/* article infos */}
        <div className="flex flex-col w-full gap-4">
          <h2 className="text-2xl font-semibold text-vm_text_gray dark:text-white">Informations :</h2>
          <p>{produit.description}</p>
          <div className="flex flex-col gap-2">
            {produit &&
              produit.id_velo &&
              produit.pieces.map((piece: any) => (
                <Link href={piece.id_piece}>
                  <div key={piece.id_piece} className="flex gap-4 ">
                    <h3 className="text-lg font-semibold text-vm_text_gray dark:text-white">{piece.type} :</h3>
                    <p className="text-lg text-vm_text_gray dark:text-white underline">{piece.nom}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
