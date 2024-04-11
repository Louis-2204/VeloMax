import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useState } from 'react';
import { ParticulierTableau, Professionnel } from '@/types/entities';
import { updateRowWhere } from '@/utils/updateRowWhere';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
const DialogUpdateProfessionnel = ({
  selectedProfessionnel,
  dialogOpen,
  setDialogOpen,
}: {
  selectedProfessionnel: Professionnel;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [newNomCompany, setNewNomCompany] = useState(selectedProfessionnel.nom_compagnie);
  const [newNomContact, setNewNomContact] = useState(selectedProfessionnel.nom_contact);
  const [newAdresse, setNewAdresse] = useState(selectedProfessionnel.adresse);
  const [newVille, setNewVille] = useState(selectedProfessionnel.ville);
  const [newCp, setNewCp] = useState(selectedProfessionnel.cp);
  const [newProvince, setNewProvince] = useState(selectedProfessionnel.province);
  const [newTelephone, setNewTelephone] = useState(selectedProfessionnel.telephone);
  const router = useRouter();
  const handleUpdateProfessionnel = async () => {
    if (!newNomCompany || !newNomContact || !newAdresse || !newVille || !newCp || !newProvince || !newTelephone) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    const data = {
      nom_compagnie: newNomCompany,
      nom_contact: newNomContact,
      adresse: newAdresse,
      ville: newVille,
      cp: newCp,
      province: newProvince,
      telephone: newTelephone,
    };
    const isUpdated = await updateRowWhere(
      data,
      'professionnels',
      'id_professionnel',
      selectedProfessionnel.id_professionnel
    );
    setDialogOpen(false);
    if (isUpdated) {
      toast.success('Client modifié avec succès');
    } else {
      toast.error('Erreur lors de la modification du Client');
    }
    router.refresh();
  };

  return (
    <Dialog open={dialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le profil de {selectedProfessionnel.nom_compagnie}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nom_company" className="text-right">
              Nom de la compagnie
            </Label>
            <Input
              id="nom_company"
              value={newNomCompany}
              onChange={(e) => setNewNomCompany(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nom_contact" className="text-right">
              Nom du contact
            </Label>
            <Input
              id="nom_contact"
              value={newNomContact}
              onChange={(e) => setNewNomContact(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="adresse" className="text-right">
              Adresse
            </Label>
            <Input
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
            <Input id="ville" value={newVille} onChange={(e) => setNewVille(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cp" className="text-right">
              Code postal
            </Label>
            <Input id="cp" value={newCp} onChange={(e) => setNewCp(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="province" className="text-right">
              Province
            </Label>
            <Input
              id="province"
              value={newProvince}
              onChange={(e) => setNewProvince(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="telephone" className="text-right">
              Téléphone
            </Label>
            <Input
              id="telephone"
              value={newTelephone}
              onChange={(e) => setNewTelephone(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
          <Button
            disabled={
              !newNomCompany || !newNomContact || !newAdresse || !newVille || !newCp || !newProvince || !newTelephone
            }
            onClick={() => handleUpdateProfessionnel()}
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateProfessionnel;
