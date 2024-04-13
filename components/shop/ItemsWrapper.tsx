'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { PieceStock, VeloStock } from '@/types/entities';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
const ItemsWrapper = ({ items, content }: { items: any | (PieceStock | VeloStock)[]; content: 'shop' | 'stock' }) => {
  return (
    <div className={`flex w-full  min-h-[299px] lg:min-h-[339px] overflow-hidden gap-2 p-4 flex-wrap `}>
      {items.length > 0 &&
        items.map((item: any) => (
          <div key={item.id_velo ? item.id_velo : item.id_piece}>
            {content === 'shop' ? <ItemShop item={item} /> : <ItemStock item={item} />}
          </div>
        ))}
      {items.length === 0 && (
        <div className="min-h-full w-full flex justify-center items-center ">
          <p className="text-vm_text_gray dark:text-white">Aucun item trouvé...</p>
        </div>
      )}
    </div>
  );
};

export default ItemsWrapper;

const ItemShop = ({ item }: { item: any }) => {
  return (
    <Link href={`/p/${item.id_velo ? item.id_velo : item.id_piece}`} key={item.id_velo ? item.id_velo : item.id_piece}>
      <div className="w-[140px] bg-white dark:bg-black border rounded-md flex flex-col items-center shadow p-2">
        <div className="w-[90%] aspect-square relative">
          <Image src={item.image} alt={item.nom} fill sizes="299px" className="rounded-md" />
        </div>
        <div className="flex flex-col w-full items-center gap-1">
          <p>{item.nom}</p>
          <Button className="w-full py-2 h-fit gap-1">
            <span className="text-xs"> {item.prix_unitaire}€</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Button>
        </div>
      </div>
    </Link>
  );
};

const ItemStock = ({ item }: { item: PieceStock | VeloStock }) => {
  return (
    <div className="w-[140px] bg-white dark:bg-black border rounded-md flex flex-col items-center shadow p-2">
      <div className="w-[90%] aspect-square relative">
        <Image src={item.image} alt={item.nom} fill sizes="299px" className="rounded-md" />
      </div>
      <div className="flex flex-col w-full items-center gap-1">
        <p>{item.nom}</p>
        {'id_velo' in item ? (
          <Button variant={'outline'} className="w-full hover:bg-inherit cursor-auto text-xs">
            {item.quantite + ' '}
            en stock
          </Button>
        ) : (
          <Popover>
            <PopoverTrigger className="w-full">
              <div className="cursor-pointer hover:bg-[#f1f5f9] dark:hover:bg-[#262626] inline-flex hover items-center justify-between whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:text-accent-foreground h-10 px-4 py-2 w-full text-xs">
                {item.fournisseurs.reduce((acc: number, current: any) => acc + current.quantite, 0) + ' en stock'}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3 opacity-50"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-2 flex flex-col gap-2 w-fit">
              {item.fournisseurs.map((fournisseur: any) => (
                <div key={fournisseur.nom_fournisseur}>
                  <p className="text-xs">
                    {fournisseur.nom_fournisseur} : {fournisseur.quantite}
                  </p>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};
