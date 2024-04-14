import { getMoyCommandesPrice } from '@/utils/statistiques/getMoyCommandesPrice';
import { getMoyPiecesCommandes } from '@/utils/statistiques/getMoyPiecesCommandes';
import { getMoyVelosCommandes } from '@/utils/statistiques/getMoyVelosCommandes';

const page = async () => {
  const [avgPieces, avgVelos, avgPrice] = await Promise.all([
    getMoyPiecesCommandes(),
    getMoyVelosCommandes(),
    getMoyCommandesPrice(),
  ]);
  return (
    <div className="flex flex-col md:flex-row w-full max-w-8xl gap-2 py-4 justify-center items-center">
      <div className="flex w-full h-10 divide-x-2">
        <div className="w-2/6 h-full flex flex-col items-center justify-center bg-green-100">
          <p>Montant moyen des commandes :</p>
          <p>{avgPrice + ' €'}</p>
        </div>
        <div className="w-2/6 h-full flex flex-col items-center justify-center bg-green-400">
          <p>Moyenne pièces par commande :</p>
          <p>{avgPieces}</p>
        </div>
        <div className="w-2/6 h-full flex flex-col items-center justify-center bg-green-700">
          <p>Moyenne vélos par commande :</p>
          <p>{avgVelos}</p>
        </div>
      </div>
    </div>
  );
};

export default page;
