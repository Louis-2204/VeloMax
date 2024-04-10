import React from 'react';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { SubmitButton } from '@/app/login/submit-button';

const Livraison = ({ items, proceedToPayment }: { items: { nom: string, prix: number, image: string }[], proceedToPayment: () => void }) => {
    return (
        <div className="flex flex-col-reverse lg:flex-row gap-4 justify-between w-full px-16">

            <div className="flex flex-col gap-3 w-full lg:w-7/12 pb-6 border p-4 rounded-md border-vm_bg_lightgray">
                <form className="animate-in flex flex-col w-full justify-center gap-4 text-foreground">

                    <div className="flex lg:flex-col md:flex-row flex-col gap-4">
                        <div className="grid w-full md:w-1/2 lg:w-full items-center gap-1.5">
                            <Label className="text-lg font-semibold" htmlFor="nom">
                                Nom
                            </Label>
                            <Input
                                type="text"
                                id="nom"
                                name='nom'
                                placeholder="Entrez votre nom"
                                className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                            />
                        </div>

                        <div className="grid w-full md:w-1/2 lg:w-full items-center gap-1.5">
                            <Label className="text-lg font-semibold" htmlFor="prenom">
                                Prénom
                            </Label>
                            <Input
                                type="text"
                                id="prenom"
                                name='prenom'
                                placeholder="Entrez votre prénom"
                                className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label className="text-lg font-semibold" htmlFor="adresseDeLivraison">
                            Adresse de livraison
                        </Label>
                        <Input
                            type="text"
                            id="adresseDeLivraison"
                            name='adresseDeLivraison'
                            placeholder="Entrez l'adresse de livraison"
                            className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                        />
                    </div>

                    <div className="flex lg:flex-col md:flex-row flex-col gap-4">
                        <div className="grid w-full md:w-1/2 lg:w-full items-center gap-1.5">
                            <Label className="text-lg font-semibold" htmlFor="ville">
                                Ville
                            </Label>
                            <Input
                                type="text"
                                id="ville"
                                name='ville'
                                placeholder="Entrez la ville de livraison"
                                className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                            />
                        </div>

                        <div className="grid w-full md:w-1/2 lg:w-full items-center gap-1.5">
                            <Label className="text-lg font-semibold" htmlFor="codePostal">
                                Code Postal
                            </Label>
                            <Input
                                type="text"
                                id="codePostal"
                                name='codePostal'
                                placeholder="Entrez le code postal de livraison"
                                className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                            />
                        </div>
                    </div>

                </form>
            </div>

            <div className="flex flex-col gap-4 w-full lg:max-w-xs h-fit lg:sticky top-0">
                <div className="flex flex-col border rounded-md border-vm_bg_lightgray p-4">
                    <div className="text-center font-bold text-vm_text_gray">Récapitulatif de la commande</div>
                    <Separator className="mt-2 mb-4 bg-vm_secondary" />
                    <div className="pb-4">
                        <div className="flex justify-between items-center">
                            <div className="text-vm_text_gray font-semibold">Sous-total :</div>
                            <div className="text-vm_text_gray font-extrabold">{(items.reduce((acc, item) => acc + item.prix, 0)).toFixed(2).toString()} €</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-vm_text_gray font-semibold">TVA (20%) :</div>
                            <div className="text-vm_text_gray font-extrabold">{(items.reduce((acc, item) => acc + item.prix * 0.2, 0)).toFixed(2).toString()} €</div>
                        </div>
                    </div>

                    <div className="flex justify-between p-2 bg-vm_bg_lightgray rounded-md">
                        <div className="text-vm_text_gray font-semibold">Total :</div>
                        <div className="text-vm_text_gray font-extrabold">{(items.reduce((acc, item) => acc + item.prix * 1.2, 0)).toFixed(2).toString()} €</div>
                    </div>

                    <div className="mt-4">
                        <button className="w-full bg-vm_secondary rounded-md py-1 text-white font-bold" onClick={() => proceedToPayment()}>
                            Passer au paiement
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="text-center font-medium">
                        Livraison  éstimée pour le 23 Mai 2024
                    </div>

                    <div className="text-center font-light">
                        En cas d'indisponibilité des pièces une
                        nouvelle date de livraison au plus tôt
                        vous sera communiqué par mail et sur
                        votre espace commandes
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Livraison;