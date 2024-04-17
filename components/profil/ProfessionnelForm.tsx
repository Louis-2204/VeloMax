'use client';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { updateRowWhere } from '@/utils/updateRowWhere';

const ProfessionnelForm = ({ profileConnected }: { profileConnected: any }) => {
  const [newNomEntreprise, setNewNomEntreprise] = useState(profileConnected.nom_entreprise);
  const [newNomContact, setNewNomContact] = useState(profileConnected.nom_contact);
  const [newTelephone, setNewTelephone] = useState(profileConnected.telephone);
  const [newAdresse, setNewAdresse] = useState(profileConnected.adresse);
  const [newCodePostal, setNewCodePostal] = useState(profileConnected.code_postal);
  const [newVille, setNewVille] = useState(profileConnected.ville);
  const [newProvince, setNewProvince] = useState(profileConnected.province);

  const is_disabled = () => {
    return (
      !newNomEntreprise || !newNomContact || !newTelephone || !newAdresse || !newCodePostal || !newVille || !newProvince
    );
  };

  const handleUpdate = async () => {
    if (is_disabled()) return toast.error('Veuillez remplir tous les champs');
    const data = {
      nom_entreprise: newNomEntreprise,
      nom_contact: newNomContact,
      telephone: newTelephone,
      adresse: newAdresse,
      code_postal: newCodePostal,
      ville: newVille,
      province: newProvince,
    };
    const is_updated = await updateRowWhere(
      data,
      'professionnels',
      'id_profesionnel',
      profileConnected.id_professionnel
    );
    if (is_updated) {
      toast.success('Profil mis à jour');
    } else {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <label htmlFor="">Nom de l'entreprise</label>
        <Input
          className="bg-background transition-colors duration-500"
          placeholder="Entrez le nom de l'entreprise"
          value={newNomEntreprise}
          onChange={(e) => setNewNomEntreprise(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="">Nom du contact</label>
        <Input
          className="bg-background transition-colors duration-500"
          placeholder="Entrez le nom du contact"
          value={newNomContact}
          onChange={(e) => setNewNomContact(e.target.value)}
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
        className="w-full md:max-w-xs bg-vm_secondary hover:bg-vm_secondary_2 text-white"
      >
        Mettre à jour
      </Button>
    </>
  );
};

export default ProfessionnelForm;
