import CommandesPrisesEnChargeTableau from "@/components/commandes/CommandesPrisesEnChargeTableau";
import { getCommandesPrisesEnCharge } from "@/utils/commandes/getCommandesPrisesEnCharge";
import { getProfileConnected } from "@/utils/getProfileConnected";
import { get_all_clients } from "@/utils/get_all_clients";
import { get_all_produits } from "@/utils/get_all_produits";
import { get_all_vendeurs } from "@/utils/get_all_vendeurs";

const page = async ({ params }: { params: { id_boutique: string } }) => {

    const user = await getProfileConnected();
    const commandes = await getCommandesPrisesEnCharge(params.id_boutique);
    const vendeurs = await get_all_vendeurs(params.id_boutique) as any[];
    const clients = await get_all_clients() as any[];
    const produits = await get_all_produits() as any[];


    return (
        <div className="w-full flex justify-center p-2">
            <CommandesPrisesEnChargeTableau user={user} clients={clients} commandes={commandes} vendeurs={vendeurs} id_boutique={params.id_boutique} produits={produits} />
        </div>
    );
};

export default page;