import CommandesTableau from "@/components/profil/CommandesTableau";
import { getCommande } from "@/utils/commandes/getCommande";
import { getUserConnected } from "@/utils/getUserConnected";

const page = async () => {

  const user = await getUserConnected();
  const commandes = await getCommande(user?.id as string);

  return (
    <div className="w-full flex justify-center">
      <CommandesTableau commandes={commandes as any[]} />
    </div>
  )
};

export default page;
