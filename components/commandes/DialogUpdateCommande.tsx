'use client';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { updateRowWhere } from '@/utils/updateRowWhere';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createCommande } from '@/utils/commandes/createCommande';
import { Icons } from '../icons/icons';
import DialogSelectItems from './DialogSelectItems';
const DialogUpdateCommande = ({
    clients,
    id_boutique,
    produits,
    selectedCommande,
    dialogOpen,
    setDialogOpen,
    typeAction,
    vendeurs
}: {
    clients: any[];
    id_boutique: string;
    produits: any[];
    selectedCommande: any;
    dialogOpen: boolean;
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
    typeAction: 'ajout' | 'modification';
    vendeurs: any[];
}) => {
    const [selectedDate, setSelectedDate] = useState<string | undefined>(selectedCommande.livraison);
    const [newVendeur, setNewVendeur] = useState<string>(selectedCommande.id_vendeur);
    const [newPrenomClient, setNewPrenomClient] = useState<string>(selectedCommande.prenom);
    const [newNomClient, setNewNomClient] = useState<string>(selectedCommande.nom);
    const [newAdresse, setNewAdresse] = useState<string>(selectedCommande.adresse);
    const [newVille, setNewVille] = useState<string>(selectedCommande.ville);
    const [newCodePostal, setNewCodePostal] = useState<string>(selectedCommande.cp);
    const [newStatut, setNewStatut] = useState<'En attente de restockage' | 'Envoyée' | 'En traitement'>(selectedCommande.status);
    const [newIdClient, setNewIdClient] = useState<string>('');

    const [selectedItems, setSelectedItems] = useState<{ id: string; nom: string; quantite: number; prix: number; image: string; type: 'vélo' | 'pièce' }[]>([]);

    const [subDialogOpen, setSubDialogOpen] = useState(false);

    const router = useRouter();

    const handleUpdateCommande = async () => {
        if (!newVendeur || !newPrenomClient || !newNomClient || !newAdresse || !newVille || !newCodePostal || !newStatut || !selectedDate) {
            toast.error('Veuillez remplir tous les champs');
            return;
        }
        const data = {
            id_vendeur: newVendeur,
            prenom: newPrenomClient,
            nom: newNomClient,
            adresse: newAdresse,
            ville: newVille,
            cp: newCodePostal,
            status: newStatut,
            livraison: selectedDate,
        };
        const isUpdated = await updateRowWhere(data, 'commandes', 'id_commande', selectedCommande.id_commande);
        setDialogOpen(false);
        if (isUpdated) {
            toast.success('Commande modifiée avec succès');
        } else {
            toast.error('Erreur lors de la modification de la commande');
        }
        router.refresh();
    };

    const handleCreateCommande = async () => {
        if (!newVendeur || !newPrenomClient || !newNomClient || !newAdresse || !newVille || !newCodePostal || !newStatut || !selectedDate || !newIdClient || selectedItems.length === 0) {
            toast.error('Veuillez remplir tous les champs');
            return;
        }
        const isCreated = await createCommande({
            prenom: newPrenomClient,
            nom: newNomClient,
            adresse: newAdresse,
            ville: newVille,
            codePostal: newCodePostal,
            items: selectedItems,
        },
            newVendeur,
            id_boutique,
            newIdClient,
            newStatut
        );

        setDialogOpen(false);
        if (isCreated) {
            toast.success('Commande créée avec succès');
        } else {
            toast.error("Erreur lors de l'ajout de la commande");
        }
        router.refresh();
    };

    const isDisabled = () => {
        if (typeAction === 'ajout') {
            return !newVendeur || !newPrenomClient || !newNomClient || !newAdresse || !newVille || !newCodePostal || !newStatut || !selectedDate || !newIdClient || selectedItems.length === 0;
        } else {
            return !newVendeur || !newPrenomClient || !newNomClient || !newAdresse || !newVille || !newCodePostal || !newStatut || !selectedDate;
        }
    };

    return (
        <Dialog open={dialogOpen}>
            <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-screen">
                <DialogHeader>
                    <DialogTitle>
                        {typeAction === 'modification' && `Modifier la commande`}
                        {typeAction === 'ajout' && 'Créer une commande'}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {typeAction === 'ajout' && (
                        <>
                            <Button
                                onClick={() => setSubDialogOpen(true)}
                                variant="outline"
                            >
                                Ajouter des articles
                            </Button>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="idClient" className="text-right">
                                    Client
                                </Label>
                                <Select
                                    value={newIdClient}
                                    onValueChange={(value) => setNewIdClient(value as string)}
                                >
                                    <SelectTrigger className='col-span-3'>
                                        <SelectValue placeholder="Client">
                                            <div className="flex items-center gap-2">
                                                {clients.find(client => client.id_particulier ? client.id_particulier === newIdClient : client.id_professionnel === newIdClient)?.id_particulier
                                                    ? <Icons.profil className='w-5 h-5' />
                                                    : <Icons.building className='w-5 h-5' />
                                                }
                                                {clients.find(client => client.id_particulier ? client.id_particulier === newIdClient : client.id_professionnel === newIdClient)?.id_particulier
                                                    ? clients.find(client => client.id_particulier ? client.id_particulier === newIdClient : client.id_professionnel === newIdClient)?.prenom + ' ' + clients.find(client => client.id_particulier ? client.id_particulier === newIdClient : client.id_professionnel === newIdClient)?.nom
                                                    : clients.find(client => client.id_particulier ? client.id_particulier === newIdClient : client.id_professionnel === newIdClient)?.nom_contact + ', ' + clients.find(client => client.id_particulier ? client.id_particulier === newIdClient : client.id_professionnel === newIdClient)?.nom_compagnie
                                                }
                                            </div>
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clients.map((client) => (
                                            <SelectItem key={client.id_particulier || client.id_professionnel} value={client.id_particulier || client.id_professionnel}>
                                                <div className="flex items-center gap-2">
                                                    {client.id_particulier
                                                        ? <Icons.profil className='w-5 h-5' />
                                                        : <Icons.building className='w-5 h-5' />
                                                    }
                                                    {client.id_particulier
                                                        ? `${client.prenom} ${client.nom}`
                                                        : `${client.nom_contact}, ${client.nom_compagnie}`
                                                    }
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="vendeur" className="text-right">
                            Vendeur
                        </Label>
                        <Select
                            value={newVendeur}
                            onValueChange={(value) => setNewVendeur(value as string)}
                        >
                            <SelectTrigger className='col-span-3'>
                                <SelectValue placeholder="Vendeur">
                                    {vendeurs.find((vendeur) => vendeur.id_vendeur === newVendeur)?.prenom}{' '}{vendeurs.find((vendeur) => vendeur.id_vendeur === newVendeur)?.nom}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {vendeurs.map((vendeur) => (
                                    <SelectItem key={vendeur.id_vendeur} value={vendeur.id_vendeur}>
                                        {vendeur.prenom} {vendeur.nom}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="livraison" className="text-right">
                            Livraison
                        </Label>
                        <DatePicker
                            date={selectedDate}
                            setDate={setSelectedDate}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="prenomClient" className="text-right">
                            Prénom
                        </Label>
                        <Input
                            id="prenomClient"
                            placeholder="Prénom pour la livraison"
                            value={newPrenomClient}
                            onChange={(e) => setNewPrenomClient(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nomClient" className="text-right">
                            Nom
                        </Label>
                        <Input
                            placeholder="Nom pour la livraison"
                            id="nomClient"
                            value={newNomClient}
                            onChange={(e) => setNewNomClient(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="adresse" className="text-right">
                            Adresse
                        </Label>
                        <Input
                            placeholder="Adresse"
                            id="adresse"
                            value={newAdresse}
                            onChange={(e) => setNewAdresse(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="ville" className="text-right">
                            Ville
                        </Label>
                        <Input
                            placeholder="Ville"
                            id="ville"
                            value={newVille}
                            onChange={(e) => setNewVille(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="codePostal" className="text-right">
                            Code postal
                        </Label>
                        <Input
                            placeholder="Code postal"
                            id="codePostal"
                            value={newCodePostal}
                            onChange={(e) => setNewCodePostal(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="statut" className="text-right">
                            Statut
                        </Label>
                        <Select
                            value={newStatut}
                            onValueChange={(value) => setNewStatut(value as 'En attente de restockage' | 'Envoyée' | 'En traitement')}
                        >
                            <SelectTrigger className='col-span-3'>
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="En attente de restockage">En attente de restockage</SelectItem>
                                <SelectItem value="Envoyée">Envoyée</SelectItem>
                                <SelectItem value="En traitement">En traitement</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
                    <Button
                        disabled={isDisabled()}
                        onClick={() => {
                            if (typeAction === 'ajout') {
                                handleCreateCommande();
                            } else {
                                handleUpdateCommande();
                            }
                        }}
                    >
                        {typeAction === 'ajout' ? 'Ajouter' : 'Modifier'}
                    </Button>
                </DialogFooter>
            </DialogContent>
            <DialogSelectItems setSubDialogOpen={setSubDialogOpen} subDialogOpen={subDialogOpen} selectedItems={selectedItems} setSelectedItems={setSelectedItems} produits={produits} />
        </Dialog >
    );
};

export default DialogUpdateCommande;
