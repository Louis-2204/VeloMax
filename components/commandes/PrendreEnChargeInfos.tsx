import moment from "moment";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { prendreEnCharge } from "@/utils/commandes/prendreEnCharge";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const PrendreEnChargeInfos = ({ commande, vendeurs, setDialogOpen }: { commande: any, vendeurs: any, setDialogOpen: any }) => {

    const isStockAvailable = commande.items.every((item: any) => item.quantite < item.nb_stock.quantite);
    const { toast } = useToast();
    const router = useRouter();

    const MaxDelaiApprovisionnement = Math.max(
        ...(commande.items.flatMap((item: any) =>
            item.pieces_velo ? item.pieces_velo.map((piece: any) => piece.delai_approvisionnement) : item.delai_approvisionnement[0].delai_approvisionnement
        ))
    );

    const handlePrendreEnCharge = async (FormData: FormData) => {
        const vendeur = FormData.get('vendeur')?.toString() || ''; // Convert FormDataEntryValue to string
        await prendreEnCharge(commande, vendeur, !isStockAvailable ? moment(commande.livraison).add(MaxDelaiApprovisionnement, 'days').format('YYYY-MM-DD') : moment(commande.livraison).format('YYYY-MM-DD'));
        toast({
            title: "Commande prise en charge",
            description: "La commande a été prise en charge avec succès !",
        })
        router.refresh();
        setDialogOpen(false);
    };

    const oneItemHasAucunFournisseur = commande.items.some((item: any) => item.pieces_velo && item.pieces_velo.some((piece: any) => piece.id_piece === "aucun fournisseur"));

    return (
        <div className="w-full">
            <form
                action={handlePrendreEnCharge}
                className="w-full flex flex-col gap-2">
                <div className="grid w-full items-center gap-1.5">
                    <Label className="text-lg font-semibold" htmlFor="vendeur">
                        Vendeur
                    </Label>
                    <Select
                        name="vendeur"
                        required
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selectionner un vendeur" />
                        </SelectTrigger>
                        <SelectContent>
                            {vendeurs &&
                                vendeurs.length > 0 &&
                                vendeurs.map((vendeur: any) => (
                                    <SelectItem key={vendeur.nom} value={vendeur.id_vendeur}>
                                        {vendeur.prenom} {vendeur.nom}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </div>
                {!isStockAvailable && !oneItemHasAucunFournisseur ? (
                    <div className="text-red-500 text-xs">
                        En prenant en charge cette commande la date de livraison au plus tôt sera modifiée pour le {moment(commande.livraison).add(MaxDelaiApprovisionnement, 'days').format('DD/MM/YYYY')} en raison du stock disponible.
                    </div>
                ) : oneItemHasAucunFournisseur && (
                    <div className="text-red-500 text-xs">
                        <span className="font-semibold">Une ou plusieurs pièces de ce vélo n'ont pas de fournisseur</span>, la date de livraison au plus tôt sera modifiée pour le {moment(commande.livraison).add(MaxDelaiApprovisionnement, 'days').format('DD/MM/YYYY')} sans prendre en compte les pièces sans fournisseur.
                    </div>
                )}
                <Button className="w-full bg-vm_secondary_2 hover:bg-vm_secondary" type="submit">
                    Prendre en charge
                </Button>
            </form>
        </div>
    );
};

export default PrendreEnChargeInfos;