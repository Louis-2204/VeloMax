import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const page = () => {
  return (
    <div className="flex flex-col gap-2 max-w-xl">
      <div className="flex flex-col gap-1">
        <label htmlFor="">Nom</label>
        <Input placeholder="Entrez votre nom" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="">Prénom</label>
        <Input placeholder="Entrez votre prénom" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="">Téléphone</label>
        <Input placeholder="Entrez votre numéro de téléphone" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="">Adresse</label>
        <Input placeholder="Entrez votre adresse" />
      </div>

      <div className="flex w-full gap-2">
        <div className="flex w-1/2 flex-col gap-1">
          <label htmlFor="">Code postal</label>
          <Input placeholder="Code postal" />
        </div>

        <div className="flex w-1/2 flex-col gap-1">
          <label htmlFor="">Ville</label>
          <Input placeholder="Entrez votre ville" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="">Province</label>
        <Input placeholder="Entrez votre province" />
      </div>

      <Button className="max-w-xs bg-vm_secondary hover:bg-vm_secondary_2 text-white"> Mettre à jour</Button>
      <Button className="max-w-xs bg-red-800 hover:bg-red-900 text-white"> Déconnexion</Button>
    </div>
  );
};

export default page;
