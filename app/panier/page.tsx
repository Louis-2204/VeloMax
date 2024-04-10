"use client";
import { useContext, useState } from "react";
import { Icons } from "@/components/icons/icons";
import Récapitulatif from "@/components/panier/Récapitulatif";
import Livraison from "@/components/panier/Livraison";
import Paiement from "@/components/panier/Paiement";
import { ShoppingCartContext } from "@/context/ShoppingCartContext";

const page = () => {

    const { getCart } = useContext(ShoppingCartContext);
    const [state, setState] = useState('récapitulatif');

    const items = getCart();
    console.log(items)

    return (
        <div className="w-full max-w-8xl h-full flex-col">

            <div className="w-full flex justify-center pb-10 px-6">
                <div className="flex w-full max-w-lg py-5 items-center text-black/75">
                    <span className={`relative flex justify-center items-center flex-shrink h-12 w-12 rounded-full ${state === 'récapitulatif' ? 'border-2 border-vm_secondary' : ''} ${state === 'livraison' || state === 'paiement' || state === 'done' ? 'bg-vm_secondary' : 'bg-vm_bg_gray'}`}>
                        <div className="font-bold text-lg">1</div>
                        <div className={`absolute flex gap-1 items-center -bottom-6 text-sm ${state === 'livraison' || state === 'paiement' || state === 'done' ? 'text-vm_secondary' : 'text-vm_text_gray_secondary'}`}>
                            Récapitulatif {state === 'livraison' || state === 'paiement' || state === 'done' ? <Icons.check className="w-4 h-4 text-vm_secondary" /> : ''}
                        </div>
                    </span>
                    <div className={`flex-grow border-t-2 ${state === 'livraison' || state === 'paiement' || state === 'done' ? 'border-vm_secondary' : 'border-vm_bg_gray'}`}></div>
                    <span className={`relative flex justify-center items-center flex-shrink h-12 w-12 rounded-full ${state === 'livraison' ? 'border-2 border-vm_secondary' : ''} ${state === 'paiement' || state === 'done' ? 'bg-vm_secondary' : 'bg-vm_bg_gray'}`}>
                        <div className="font-bold text-lg">2</div>
                        <div className={`absolute flex gap-1 items-center -bottom-6 text-sm ${state === 'paiement' || state === 'done' ? 'text-vm_secondary' : 'text-vm_text_gray_secondary'}`}>
                            Livraison {state === 'paiement' || state === 'done' ? <Icons.check className="w-4 h-4 text-vm_secondary" /> : ''}
                        </div>
                    </span>
                    <div className={`flex-grow border-t-2 ${state === 'paiement' || state === 'done' ? 'border-vm_secondary' : 'border-vm_bg_gray'}`}></div>
                    <span className={`relative flex justify-center items-center flex-shrink h-12 w-12 rounded-full ${state === 'paiement' ? 'border-2 border-vm_secondary' : ''} ${state === 'done' ? 'bg-vm_secondary' : 'bg-vm_bg_gray'}`}>
                        <div className="font-bold text-lg">3</div>
                        <div className={`absolute flex gap-1 items-center -bottom-6 text-sm ${state === 'done' ? 'text-vm_secondary' : 'text-vm_text_gray_secondary'}`}>
                            Paiement {state === 'done' ? <Icons.check className="w-4 h-4 text-vm_secondary" /> : ''}
                        </div>
                    </span>
                </div>
            </div>


            {state === 'récapitulatif' && <Récapitulatif items={items} proceedToDelivery={() => setState('livraison')} />}
            {state === 'livraison' && <Livraison items={items} proceedToPayment={() => setState('paiement')} />}
            {(state === 'paiement' || state === 'done') && <Paiement items={items} pay={() => { setState('done'), alert('Paiement effectué avec succès, vous serrez redirigé automatiquement vers la page d\'accueil dans quelques secondes.'), setTimeout(() => { window.location.href = '/' }, 5000) }} />}

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