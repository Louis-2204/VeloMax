import { Separator } from "./ui/separator";

const RecapPrix = ({ items, checkProceedToDelivery, checkProceedToPayment, checkConfirmCommand, type }: { items: any[], checkProceedToDelivery?: () => void, type?: string, checkProceedToPayment?: () => void, checkConfirmCommand?: () => void }) => {
    return (
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

            {type !== 'detailCommande' && type !== 'commandeAprendreEnCharge' && (
                checkProceedToDelivery ? (
                    <div className="mt-4">
                        <button className="w-full bg-vm_secondary rounded-md py-1 text-white font-bold" onClick={() => checkProceedToDelivery()}>
                            Passer à la livraison
                        </button>
                    </div>
                ) : checkProceedToPayment ? (
                    checkProceedToPayment && (
                        <div className="mt-4">
                            <button className="w-full bg-vm_secondary rounded-md py-1 text-white font-bold" onClick={() => checkProceedToPayment()}>
                                Passer au paiement
                            </button>
                        </div>
                    )
                ) : checkConfirmCommand && (
                    <div className="mt-4">
                        <button className="w-full bg-vm_secondary rounded-md py-1 text-white font-bold" onClick={() => checkConfirmCommand()}>
                            Payer
                        </button>
                    </div>
                )
            )}
        </div>
    );
};

export default RecapPrix;