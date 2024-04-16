'use client';
import { useContext, useEffect, useState } from 'react';
import { Icons } from '@/components/icons/icons';
import Récapitulatif from '@/components/panier/Récapitulatif';
import Livraison from '@/components/panier/Livraison';
import Paiement from '@/components/panier/Paiement';
import { ShoppingCartContext } from '@/context/ShoppingCartContext';
import { useToast } from '@/components/ui/use-toast';
import { createCommande } from '@/utils/commandes/createCommande';
import { useRouter } from 'next/navigation';
import { getUserFidelo } from '@/utils/getUserFidelo';

const page = () => {
  const { getCart, clearCart } = useContext(ShoppingCartContext);
  const items = getCart();

  const { toast } = useToast();

  const router = useRouter();

  const [userFidelo, setUserFidelo] = useState<any>(null);
  const [state, setState] = useState('récapitulatif');
  const [infos, setInfos] = useState<{ items: { id: string; nom: string; quantite: number; prix: number; image: string; type: "vélo" | "pièce" }[]; nom: string; prenom: string; adresse: string; ville: string; codePostal: string }>({ items: [], nom: '', prenom: '', adresse: '', ville: '', codePostal: '' });


  useEffect(() => {
    getUserFidelo().then((data) => {
      setUserFidelo(data);
    });
  }, []);

  const proceedToDelivery = () => {
    setState('livraison');
  };

  const proceedToPayment = (nom: string, prenom: string, adresse: string, ville: string, codePostal: string) => {
    setInfos({ items: items, nom: nom, prenom: prenom, adresse: adresse, ville: ville, codePostal: codePostal });
    setState('paiement');
  };

  const confirmCommand = async (total: any) => {
    const commande = await createCommande(infos, total);
    if (!commande) {
      return toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la confirmation de la commande',
      });
    }
    setState('done'),
      toast({
        title: 'Commande confirmée',
        description: 'Votre commande a bien été prise en compte ! Vous allez être redirigé vers vos commandes dans quelques secondes',
        action:
          <div className="relative">
            <svg className="w-8 h-8" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className="text-vm_secondary progress-ring__circle stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset="0"
              ></circle>
            </svg>
          </div>
      }),

      setTimeout(() => {
        router.push('/profil/mes-commandes');
        clearCart();
      }, 5000);
  };

  return userFidelo && items.length > 0 ? (
    <div className="w-full max-w-8xl h-full flex-col">
      <div className="w-full flex justify-center pb-10 px-6">
        <div className="flex w-full max-w-lg py-5 items-center text-black/75">
          <span
            className={`relative flex justify-center items-center flex-shrink h-12 w-12 rounded-full ${state === 'récapitulatif' ? 'border-2 border-vm_secondary' : ''
              } ${state === 'livraison' || state === 'paiement' || state === 'done' ? 'bg-vm_secondary' : 'bg-vm_bg_gray'
              }`}
          >
            <div className="font-bold text-lg">1</div>
            <div
              className={`absolute flex gap-1 items-center -bottom-6 text-sm ${state === 'livraison' || state === 'paiement' || state === 'done'
                ? 'text-vm_secondary'
                : 'text-vm_text_gray_secondary'
                }`}
            >
              Récapitulatif{' '}
              {state === 'livraison' || state === 'paiement' || state === 'done' ? (
                <Icons.check className="w-4 h-4 text-vm_secondary" />
              ) : (
                ''
              )}
            </div>
          </span>
          <div
            className={`flex-grow border-t-2 ${state === 'livraison' || state === 'paiement' || state === 'done'
              ? 'border-vm_secondary'
              : 'border-vm_bg_gray'
              }`}
          ></div>
          <span
            className={`relative flex justify-center items-center flex-shrink h-12 w-12 rounded-full ${state === 'livraison' ? 'border-2 border-vm_secondary' : ''
              } ${state === 'paiement' || state === 'done' ? 'bg-vm_secondary' : 'bg-vm_bg_gray'}`}
          >
            <div className="font-bold text-lg">2</div>
            <div
              className={`absolute flex gap-1 items-center -bottom-6 text-sm ${state === 'paiement' || state === 'done' ? 'text-vm_secondary' : 'text-vm_text_gray_secondary'
                }`}
            >
              Livraison{' '}
              {state === 'paiement' || state === 'done' ? <Icons.check className="w-4 h-4 text-vm_secondary" /> : ''}
            </div>
          </span>
          <div
            className={`flex-grow border-t-2 ${state === 'paiement' || state === 'done' ? 'border-vm_secondary' : 'border-vm_bg_gray'
              }`}
          ></div>
          <span
            className={`relative flex justify-center items-center flex-shrink h-12 w-12 rounded-full ${state === 'paiement' ? 'border-2 border-vm_secondary' : ''
              } ${state === 'done' ? 'bg-vm_secondary' : 'bg-vm_bg_gray'}`}
          >
            <div className="font-bold text-lg">3</div>
            <div
              className={`absolute flex gap-1 items-center -bottom-6 text-sm ${state === 'done' ? 'text-vm_secondary' : 'text-vm_text_gray_secondary'
                }`}
            >
              Paiement {state === 'done' ? <Icons.check className="w-4 h-4 text-vm_secondary" /> : ''}
            </div>
          </span>
        </div>
      </div>

      {state === 'récapitulatif' && <Récapitulatif userFidelo={userFidelo} items={items} proceedToDelivery={() => proceedToDelivery()} />}
      {state === 'livraison' && <Livraison userFidelo={userFidelo} items={items} proceedToPayment={(nom, prenom, adresse, ville, codePostal) => proceedToPayment(nom, prenom, adresse, ville, codePostal)} />}
      {(state === 'paiement' || state === 'done') && (
        <Paiement
          userFidelo={userFidelo}
          items={items}
          confirmCommand={(total) => confirmCommand(total)}
        />
      )}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold text-vm_text_gray dark:text-white transition-colors duration-500">Votre panier est vide</h1>
    </div>
  );
};

export default page;

// const items = [
//     {
//         nom: 'Kilimanjaro',
//         prix: 2000,
//         image: 'https://contents.mediadecathlon.com/p2322255/k$20b3ee8829babba2ce91de43f7e68841/sq/9f1a5599-a724-4816-bba4-f1a3fa099760.jpg?format=auto&f=800x0'
//     },
//     {
//         nom: 'HBHBZHCZHI',
//         prix: 2000,
//         image: 'https://contents.mediadecathlon.com/p2322255/k$20b3ee8829babba2ce91de43f7e68841/sq/9f1a5599-a724-4816-bba4-f1a3fa099760.jpg?format=auto&f=800x0'
//     },
//     {
//         nom: 'HBHBZHCZHI',
//         prix: 2000,
//         image: 'https://contents.mediadecathlon.com/p2322255/k$20b3ee8829babba2ce91de43f7e68841/sq/9f1a5599-a724-4816-bba4-f1a3fa099760.jpg?format=auto&f=800x0'
//     },
//     {
//         nom: 'HBHBZHCZHI',
//         prix: 2000,
//         image: 'https://contents.mediadecathlon.com/p2322255/k$20b3ee8829babba2ce91de43f7e68841/sq/9f1a5599-a724-4816-bba4-f1a3fa099760.jpg?format=auto&f=800x0'
//     },
//     {
//         nom: 'HBHBZHCZHI',
//         prix: 2000,
//         image: 'https://contents.mediadecathlon.com/p2322255/k$20b3ee8829babba2ce91de43f7e68841/sq/9f1a5599-a724-4816-bba4-f1a3fa099760.jpg?format=auto&f=800x0'
//     }
// ];
