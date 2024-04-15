'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { updateRowWhere } from '@/utils/updateRowWhere';
import { toast } from 'sonner';
const ParticulierForm = ({ profileConnected }: { profileConnected: any }) => {
  const [newNom, setNewNom] = useState(profileConnected.nom);
  const [newPrenom, setNewPrenom] = useState(profileConnected.prenom);
  const [newTelephone, setNewTelephone] = useState(profileConnected.telephone);
  const [newAdresse, setNewAdresse] = useState(profileConnected.adresse);
  const [newCodePostal, setNewCodePostal] = useState(profileConnected.cp);
  const [newVille, setNewVille] = useState(profileConnected.ville);
  const [newProvince, setNewProvince] = useState(profileConnected.province);

  const is_disabled = () => {
    return !newNom || !newPrenom || !newTelephone || !newAdresse || !newCodePostal || !newVille || !newProvince;
  };

  const handleUpdate = async () => {
    if (is_disabled()) return toast.error('Veuillez remplir tous les champs');
    const data = {
      nom: newNom,
      prenom: newPrenom,
      telephone: newTelephone,
      adresse: newAdresse,
      cp: newCodePostal,
      ville: newVille,
      province: newProvince,
    };
    const is_updated = await updateRowWhere(data, 'particuliers', 'id_particulier', profileConnected.id_particulier);
    if (is_updated) {
      toast.success('Profil mis à jour');
    } else {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <label htmlFor="">Nom</label>
        <Input
          className="bg-background transition-colors duration-500"
          placeholder="Entrez votre nom"
          value={newNom}
          onChange={(e) => setNewNom(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="">Prénom</label>
        <Input
          className="bg-background transition-colors duration-500"
          placeholder="Entrez votre prénom"
          value={newPrenom}
          onChange={(e) => setNewPrenom(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="">Téléphone</label>
        <Input
          className="bg-background transition-colors duration-500"
          placeholder="Entrez votre numéro de téléphone"
          value={newTelephone}
          onChange={(e) => setNewTelephone(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="">Adresse</label>
        <Input
          className="bg-background transition-colors duration-500"
          placeholder="Entrez votre adresse"
          value={newAdresse}
          onChange={(e) => setNewAdresse(e.target.value)}
        />
      </div>

      <div className="flex w-full gap-2">
        <div className="flex w-1/2 flex-col gap-1">
          <label htmlFor="">Code postal</label>
          <Input
            className="bg-background transition-colors duration-500"
            placeholder="Code postal"
            value={newCodePostal}
            onChange={(e) => setNewCodePostal(e.target.value)}
          />
        </div>

        <div className="flex w-1/2 flex-col gap-1">
          <label htmlFor="">Ville</label>
          <Input
            className="bg-background transition-colors duration-500"
            placeholder="Entrez votre ville"
            value={newVille}
            onChange={(e) => setNewVille(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="">Province</label>
        <Input
          className="bg-background transition-colors duration-500"
          placeholder="Entrez votre province"
          value={newProvince}
          onChange={(e) => setNewProvince(e.target.value)}
        />
      </div>

      <Button
        disabled={is_disabled()}
        onClick={() => handleUpdate()}
        className="max-w-xs bg-vm_secondary hover:bg-vm_secondary_2 text-white"
      >
        Mettre à jour
      </Button>
    </>
  );
};

export default ParticulierForm;
