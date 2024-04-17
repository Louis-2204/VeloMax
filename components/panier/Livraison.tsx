"use client";
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import RecapPrix from '../RecapPrix';

const Livraison = ({ compagnieReduction, userFidelo, items, proceedToPayment }: { compagnieReduction: any, userFidelo: any, items: { nom: string, prix: number, image: string, quantite: number }[], proceedToPayment: (nom: string, prenom: string, adresse: string, ville: string, codePostal: string) => void }) => {

    const { toast } = useToast();

    const checkProceedToPayment = () => {
        if (nom === '' || prenom === '' || adresseDeLivraison === '' || ville === '' || codePostal === '') {
            return toast({
                title: 'Erreur',
                description: 'Veuillez renseigner tous les champs',
            });
        }
        proceedToPayment(nom, prenom, adresseDeLivraison, ville, codePostal);
    }

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [adresseDeLivraison, setAdresseDeLivraison] = useState('');
    const [ville, setVille] = useState('');
    const [codePostal, setCodePostal] = useState('');

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
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
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
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
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
                            value={adresseDeLivraison}
                            onChange={(e) => setAdresseDeLivraison(e.target.value)}
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
                                value={ville}
                                onChange={(e) => setVille(e.target.value)}
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
                                value={codePostal}
                                onChange={(e) => setCodePostal(e.target.value)}
                            />
                        </div>
                    </div>

                </form>
            </div>

            <div className="flex flex-col gap-4 w-full lg:max-w-xs h-fit lg:sticky top-0">

                <RecapPrix compagnieReduction={compagnieReduction} userFidelo={userFidelo} items={items} checkProceedToPayment={checkProceedToPayment} />

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