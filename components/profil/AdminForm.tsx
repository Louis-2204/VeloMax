'use client';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { updateRowWhere } from '@/utils/updateRowWhere';

const AdminForm = ({ profileConnected }: { profileConnected: any }) => {
  const [newNom, setNewNom] = useState(profileConnected.nom);
  const [newPrenom, setNewPrenom] = useState(profileConnected.prenom);

  let user_infos: { table: string; id_name: string; id: string } | null = null;

  switch (profileConnected.role) {
    case 'vendeur':
      user_infos = {
        table: 'vendeurs',
        id_name: 'id_vendeur',
        id: profileConnected.id_vendeur,
      };
      break;
    case 'admin':
      user_infos = {
        table: 'admin',
        id_name: 'id_admin',
        id: profileConnected.id_admin,
      };
      break;
    case 'gerant':
      user_infos = {
        table: 'gerants',
        id_name: 'id_gerant',
        id: profileConnected.id_gerant,
      };
      break;
    default:
      break;
  }

  const handleUpdate = async () => {
    if (!newNom || !newPrenom) return toast.error('Veuillez remplir tous les champs');
    if (!user_infos) return toast.error('Erreur lors de la mise à jour');
    const data = {
      nom: newNom,
      prenom: newPrenom,
    };
    const is_updated = await updateRowWhere(data, user_infos.table, user_infos.id_name, user_infos.id);
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
        <label htmlFor="">Prenom</label>
        <Input
          className="bg-background transition-colors duration-500"
          placeholder="Entrez votre prenom"
          value={newPrenom}
          onChange={(e) => setNewPrenom(e.target.value)}
        />
      </div>

      <Button
        disabled={!newNom || !newPrenom}
        onClick={() => handleUpdate()}
        className="w-full md:max-w-xs bg-vm_secondary hover:bg-vm_secondary_2 text-white"
      >
        Mettre à jour
      </Button>
    </>
  );
};

export default AdminForm;
