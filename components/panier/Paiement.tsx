"use client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Icons } from "../icons/icons";
import { useState } from "react";
import { useToast } from '../ui/use-toast';
import RecapPrix from "../RecapPrix";

const Paiement = ({ user, items, confirmCommand }: { user: any, items: { nom: string, prix: number, image: string, quantite: number }[], confirmCommand: () => void }) => {

    const { toast } = useToast();

    const [nomSurLaCarte, setNomSurLaCarte] = useState('');
    const [numeroDeCarte, setNumeroDeCarte] = useState('');
    const [moisExpiration, setMoisExpiration] = useState('');
    const [anneeExpiration, setAnneeExpiration] = useState('');
    const [CVV, setCVV] = useState('');

    const checkConfirmCommand = () => {
        if (nomSurLaCarte === '' || numeroDeCarte === '' || moisExpiration === '' || anneeExpiration === '' || CVV === '') {
            return toast({
                title: 'Erreur',
                description: 'Veuillez renseigner tous les champs',
            });
        }
        confirmCommand();
    }

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
                            value={nomSurLaCarte}
                            onChange={(e) => setNomSurLaCarte(e.target.value)}
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
                            value={numeroDeCarte}
                            onChange={(e) => setNumeroDeCarte(e.target.value)}
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
                                value={moisExpiration}
                                onChange={(e) => setMoisExpiration(e.target.value)}
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
                                value={anneeExpiration}
                                onChange={(e) => setAnneeExpiration(e.target.value)}
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
                                value={CVV}
                                onChange={(e) => setCVV(e.target.value)}
                            />
                        </div>
                    </div>

                </form>
            </div>

            <div className="w-full lg:max-w-xs h-fit flex flex-col gap-4 lg:sticky top-0">

                <RecapPrix user={user} items={items} checkConfirmCommand={checkConfirmCommand} />

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