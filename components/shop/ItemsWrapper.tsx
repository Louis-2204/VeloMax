import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';

const ItemsWrapper = ({ items }: { items: any }) => {
  return (
    <div className={`flex w-full  min-h-[299px] lg:min-h-[339px] overflow-hidden gap-2 p-4 flex-wrap `}>
      {items.length > 0 &&
        items.map((item: any) => (
          <Link
            href={`/p/${item.id_velo ? item.id_velo : item.id_piece}`}
            key={item.id_velo ? item.id_velo : item.id_piece}
          >
            <div className="w-[140px] bg-white dark:bg-black border rounded-md flex flex-col items-center shadow p-2 transition-colors duration-500">
              <div className="w-[90%] aspect-square relative">
                <Image src={item.image} alt={item.nom} fill sizes="299px" className="rounded-md object-scale-down" />
              </div>
              <div className="flex flex-col w-full items-center gap-1">
                <p className='text-black dark:text-white transition-colors duration-500'>
                  {item.nom}
                </p>
                <Button className="w-full py-2 h-fit gap-1 bg-black dark:bg-white text-white dark:text-black transition-colors duration-500">
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
