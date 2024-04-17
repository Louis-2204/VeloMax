import CommandesPrendreEnChargeTableau from "@/components/admin/salaries/CommandesPrendreEnChargeTableau";
import { getUnaffectedCommande } from "@/utils/commandes/getUnaffectedCommande";
import { get_all_vendeurs } from "@/utils/get_all_vendeurs";

const page = async ({ params }: { params: { id_boutique: string } }) => {
    const commandes = await getUnaffectedCommande(params.id_boutique);
    const vendeurs = await get_all_vendeurs(params.id_boutique);

    return (
        <div className="w-full flex justify-center p-2">
            <CommandesPrendreEnChargeTableau commandes={commandes} vendeurs={vendeurs} />
        </div>
    );
};

export default page;