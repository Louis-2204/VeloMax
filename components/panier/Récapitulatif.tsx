import Image from "next/image";
import { Separator } from "../ui/separator";
import { useContext } from "react";
import { ShoppingCartContext } from "@/context/ShoppingCartContext";
import { Button } from "../ui/button";

const Récapitulatif = ({ items, proceedToDelivery }: { items: { id: string, nom: string, prix: number, image: string, quantite: number, type: "vélo" | "pièce" }[], proceedToDelivery: () => void }) => {

    const { removeFromCart, addToCart } = useContext(ShoppingCartContext);

    const checkProceedToDelivery = () => {
        proceedToDelivery();
    }

    return items.length > 0 && (
        <div className="flex flex-col-reverse lg:flex-row gap-4 justify-between w-full px-16">
            <div className="flex flex-col gap-3 w-full lg:w-7/12 pb-6">
                {
                    items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center w-full p-3 h-32 border rounded-md border-vm_bg_lightgray">
                            <div className="flex h-full gap-4 items-center">
                                <Image alt="produit" src={item.image} width={100} height={100} className="rounded-md w-[6.5rem] h-[6.5rem] border p-1 overflow-hidden" />
                                <div className="h-full justify-between flex flex-col">
                                    <div className="font-extrabold text-lg text-vm_text_gray">{item.nom}</div>
                                    <div className="text-vm_text_gray_secondary hover:underline cursor-pointer" onClick={() => removeFromCart(item.id, true)}>
                                        Retirer
                                    </div>
                                </div>
                            </div>
                            <div className="h-full justify-between flex flex-col items-end">
                                <div className="font-bold text-lg text-vm_secondary">{item.prix} €</div>
                                <div className="text-vm_text_gray_secondary w-fit border rounded-md p-1 text-xs">
                                    <div className="flex gap-3 px-1 justify-around items-center">
                                        <Button className="flex items-center justify-center font-bold h-1 w-1 p-2" onClick={() => removeFromCart(item.id)}>
                                            -
                                        </Button>
                                        <div className="font-bold">{item.quantite}</div>
                                        <Button className="flex items-center justify-center font-bold h-1 w-1 p-2" onClick={() => addToCart(item)}>
                                            +
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="w-full lg:max-w-xs h-fit flex flex-col lg:sticky top-0 border rounded-md border-vm_bg_lightgray p-4">
                <div className="text-center font-bold text-vm_text_gray">Récapitulatif de la commande</div>
                <Separator className="mt-2 mb-4 bg-vm_secondary" />
                <div className="pb-4">
                    <div className="flex justify-between items-center">
                        <div className="text-vm_text_gray font-semibold">Sous-total :</div>
                        <div className="text-vm_text_gray font-extrabold">{(items.reduce((acc, item) => acc + item.prix * item.quantite, 0)).toFixed(2).toString()} €</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-vm_text_gray font-semibold">TVA (20%) :</div>
                        <div className="text-vm_text_gray font-extrabold">{((items.reduce((acc, item) => acc + item.prix * item.quantite, 0)) * 0.2).toFixed(2).toString()} €</div>
                    </div>
                </div>

                <div className="flex justify-between p-2 bg-vm_bg_lightgray rounded-md">
                    <div className="text-vm_text_gray font-semibold">Total :</div>
                    <div className="text-vm_text_gray font-extrabold">{((items.reduce((acc, item) => acc + item.prix * item.quantite, 0)) * 1.2).toFixed(2).toString()} €</div>
                </div>

                <div className="mt-4">
                    <button className="w-full bg-vm_secondary rounded-md py-1 text-white font-bold" onClick={() => checkProceedToDelivery()}>
                        Passer à la livraison
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Récapitulatif;