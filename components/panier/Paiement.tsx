import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Icons } from "../icons/icons";

const Paiement = ({ items, pay }: { items: { nom: string, prix: number, image: string }[], pay: () => void }) => {
    return (
        <div className="flex flex-col-reverse lg:flex-row gap-4 justify-between w-full px-16">

            <div className="flex flex-col gap-3 w-full lg:w-7/12 pb-6 border p-4 rounded-md border-vm_bg_lightgray">
                <form className="animate-in flex flex-col w-full justify-center gap-4 text-foreground">

                    <div className="grid w-full items-center gap-1.5">
                        <Label className="text-lg font-semibold" htmlFor="nomSurLaCarte">
                            Nom sur la carte
                        </Label>
                        <Input
                            type="text"
                            id="nomSurLaCarte"
                            name='nomSurLaCarte'
                            placeholder="Entrez le nom sur la carte"
                            className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                        />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label className="text-lg font-semibold" htmlFor="numeroDeCarte">
                            Numéro de carte
                        </Label>
                        <Input
                            type="text"
                            id="numeroDeCarte"
                            name='numeroDeCarte'
                            placeholder="Entrez les 16 chiffres de la carte"
                            className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                        />
                    </div>

                    <div className="text-lg font-semibold">
                        Expiration :
                    </div>

                    <div className="flex flex-col  sm:flex-row gap-4">
                        <div className="grid w-full md:w-1/3 lg:w-full items-center gap-1.5">
                            <Label className="text-lg font-semibold" htmlFor="moisExpiration">
                                Mois
                            </Label>
                            <Input
                                type="text"
                                id="moisExpiration"
                                name='moisExpiration'
                                placeholder="Mois (XX)"
                                className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                            />
                        </div>

                        <div className="grid w-full md:w-1/3 lg:w-full items-center gap-1.5">
                            <Label className="text-lg font-semibold" htmlFor="anneeExpiration">
                                Année
                            </Label>
                            <Input
                                type="text"
                                id="anneeExpiration"
                                name='anneeExpiration'
                                placeholder="Année (XXXX)"
                                className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                            />
                        </div>

                        <div className="grid w-full md:w-1/3 lg:w-full items-center gap-1.5">
                            <Label className="text-lg font-semibold flex gap-1 items-center" htmlFor="CVV">
                                CVV
                                <div title="Le CVV est le code de sécurité à 3 chiffres situé au dos de votre carte.">
                                    <Icons.questionMarkCircle className="w-5 h-5 text-vm_text_gray" />
                                </div>
                            </Label>
                            <Input
                                type="text"
                                id="CVV"
                                name='CVV'
                                placeholder="CVV"
                                className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                            />
                        </div>
                    </div>

                </form>
            </div>

            <div className="w-full lg:max-w-xs h-fit flex flex-col gap-4 lg:sticky top-0">
                <div className="flex flex-col border rounded-md border-vm_bg_lightgray p-4">
                    <div className="text-center font-bold text-vm_text_gray">Récapitulatif de la commande</div>
                    <Separator className="mt-2 mb-4 bg-vm_secondary" />
                    <div className="pb-4">
                        <div className="flex justify-between items-center">
                            <div className="text-vm_text_gray font-semibold">Sous-total :</div>
                            <div className="text-vm_text_gray font-extrabold">{items.reduce((acc, item) => acc + item.prix, 0)} €</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-vm_text_gray font-semibold">TVA (20%) :</div>
                            <div className="text-vm_text_gray font-extrabold">{items.reduce((acc, item) => acc + item.prix * 0.2, 0)} €</div>
                        </div>
                    </div>

                    <div className="flex justify-between p-2 bg-vm_bg_lightgray rounded-md">
                        <div className="text-vm_text_gray font-semibold">Total :</div>
                        <div className="text-vm_text_gray font-extrabold">{items.reduce((acc, item) => acc + item.prix * 1.2, 0)} €</div>
                    </div>

                    <div className="mt-4">
                        <button className="w-full bg-vm_secondary rounded-md py-1 text-white font-bold" onClick={() => pay()}>
                            Payer
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

export default Paiement;