import { Separator } from "../ui/separator";
import { useContext } from "react";
import { ShoppingCartContext } from "@/context/ShoppingCartContext";
import RecapProduits from "../RecapProduits";
import RecapPrix from "../RecapPrix";

const Récapitulatif = ({ compagnieReduction, userFidelo, items, proceedToDelivery }: { compagnieReduction: any, userFidelo: any, items: { id: string, nom: string, prix: number, image: string, quantite: number, type: "vélo" | "pièce" }[], proceedToDelivery: () => void }) => {

    const { removeFromCart, addToCart } = useContext(ShoppingCartContext);

    const checkProceedToDelivery = () => {
        proceedToDelivery();
    }

    return items.length > 0 && (
        <div className="flex flex-col-reverse lg:flex-row gap-4 justify-between w-full px-16">

            <RecapProduits items={items} addToCart={addToCart} removeFromCart={removeFromCart} />

            <RecapPrix compagnieReduction={compagnieReduction} userFidelo={userFidelo} items={items} checkProceedToDelivery={checkProceedToDelivery} />

        </div >
    );
};

export default Récapitulatif;