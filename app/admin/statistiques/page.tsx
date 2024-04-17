import StatsItemsWrapper from '@/components/statistiques/StatsItemsWrapper';
import { get_all_boutiques } from '@/utils/get_all_boutiques';
import { get_all_vendeurs } from '@/utils/get_all_vendeurs';
import { getItemsBySearchParams } from '@/utils/getItemsBySearchParams';
import { getMoyCommandesPrice } from '@/utils/statistiques/getMoyCommandesPrice';
import { getMoyPiecesCommandes } from '@/utils/statistiques/getMoyPiecesCommandes';
import { getMoyVelosCommandes } from '@/utils/statistiques/getMoyVelosCommandes';
const page = async () => {
  const [avgPieces, avgVelos, avgPrice, articles, boutiques, vendeurs] = await Promise.all([
    getMoyPiecesCommandes(),
    getMoyVelosCommandes(),
    getMoyCommandesPrice(),
    getItemsBySearchParams({}),
    get_all_boutiques(),
    get_all_vendeurs(),
  ]);
  return (
    <div className="flex flex-col w-full max-w-8xl gap-10 py-4 justify-center items-center">
      <div className="flex flex-col md:flex-row w-11/12 md:w-full h-auto md:h-20 gap-5 divide-x-2">
        <div className="w-full md:w-2/6 py-2 md:py-0 text-sm h-full flex rounded-md flex-col items-center justify-center shadow border">
          <p>Montant moyen des commandes :</p>
          <p>{avgPrice + ' €'}</p>
        </div>
        <div className="w-full md:w-2/6 py-2 md:py-0 text-sm h-full flex rounded-md flex-col items-center justify-center shadow border">
          <p>Moyenne pièces par commande :</p>
          <p>{avgPieces}</p>
        </div>
        <div className="w-full md:w-2/6 py-2 md:py-0 text-sm h-full flex rounded-md flex-col items-center justify-center shadow border">
          <p>Moyenne vélos par commande :</p>
          <p>{avgVelos}</p>
        </div>
      </div>
      <StatsItemsWrapper articles={articles} magasins={boutiques} vendeurs={vendeurs} />
    </div>
  );
};

export default page;
