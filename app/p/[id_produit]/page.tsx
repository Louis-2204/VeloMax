import AddToCartBtn from '@/components/p/AddToCartBtn';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const page = async ({ params }: { params: { id_produit: string } }) => {
  console.log(params);
  const supabase = createClient();
  let produit = null;
  const { data, error } = await supabase
    .from('vélos')
    .select('*, pieces(id_piece,type,nom)')
    .eq('id_velo', params.id_produit)
    .single();
  if (error && error.details !== 'The result contains 0 rows') {
    console.error(error);
  }
  console.log(data);
  if (!data) {
    const { data, error } = await supabase.from('pieces').select('*').eq('id_piece', params.id_produit).single();
    if (error && error.details !== 'The result contains 0 rows') {
      console.error(error);
    }
    console.log(data);
    produit = data;
  } else {
    produit = data;
  }

  console.log(produit);

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
              <Image src={produit.image} fill alt={produit.nom} />
            </div>
          </div>
          <div className="w-7/12 flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-vm_text_gray dark:text-white break-words">
              {produit.nom}
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-vm_secondary">{produit.prix_unitaire}€</h2>
            <AddToCartBtn item={produit} />
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
