import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useState } from 'react';
import { ParticulierTableau } from '@/types/entities';
import { updateRowWhere } from '@/utils/updateRowWhere';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
const DialogUpdateParticulier = ({
  selectedParticulier,
  dialogOpen,
  setDialogOpen,
}: {
  selectedParticulier: ParticulierTableau;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [newNom, setNewNom] = useState(selectedParticulier.nom);
  const [newPrenom, setNewPrenom] = useState(selectedParticulier.prenom);
  const [newAdresse, setNewAdresse] = useState(selectedParticulier.adresse);
  const [newVille, setNewVille] = useState(selectedParticulier.ville);
  const [newCp, setNewCp] = useState(selectedParticulier.cp);
  const [newProvince, setNewProvince] = useState(selectedParticulier.province);
  const [newTelephone, setNewTelephone] = useState(selectedParticulier.telephone);
  const router = useRouter();
  const handleUpdateParticulier = async () => {
    if (!newNom || !newPrenom || !newAdresse || !newVille || !newCp || !newProvince || !newTelephone) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    const data = {
      nom: newNom,
      prenom: newPrenom,
      adresse: newAdresse,
      ville: newVille,
      cp: newCp,
      province: newProvince,
      telephone: newTelephone,
    };
    const isUpdated = await updateRowWhere(data, 'particuliers', 'id_particulier', selectedParticulier.id_particulier);
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
          <DialogTitle>
            Modifier le profil de {selectedParticulier.prenom} {selectedParticulier.nom}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nom" className="text-right">
              Nom
            </Label>
            <Input id="nom" value={newNom} onChange={(e) => setNewNom(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prenom" className="text-right">
              Prénom
            </Label>
            <Input
              id="prenom"
              value={newPrenom}
              onChange={(e) => setNewPrenom(e.target.value)}
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
            disabled={!newNom || !newPrenom || !newAdresse || !newVille || !newCp || !newProvince || !newTelephone}
            onClick={() => handleUpdateParticulier()}
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateParticulier;
