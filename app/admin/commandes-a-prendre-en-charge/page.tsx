import CommandesPrendreEnChargeTableau from "@/components/admin/salaries/CommandesPrendreEnChargeTableau";
import { getUnaffectedCommande } from "@/utils/commandes/getUnaffectedCommande";
import { getProfileConnected } from "@/utils/getProfileConnected";
import { get_all_vendeurs } from "@/utils/get_all_vendeurs";

const page = async () => {

    const user = await getProfileConnected();
    const commandes = await getUnaffectedCommande();
    const vendeurs = await get_all_vendeurs(user.role === 'admin' ? null : user.id_boutique);

    return (
        <div className="w-full p-2">
            <CommandesPrendreEnChargeTableau commandes={commandes} vendeurs={vendeurs} />
        </div>
    );
};

export default page;