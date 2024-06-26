'use client';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useState } from 'react';
import { Vendeur } from '@/types/entities';
import { updateRowWhere } from '@/utils/updateRowWhere';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createVendeur } from '@/utils/createVendeur';
import { useParams } from 'next/navigation';
const DialogUpdateVendeur = ({
  selectedVendeur,
  dialogOpen,
  setDialogOpen,
  typeAction,
}: {
  selectedVendeur: Vendeur;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  typeAction: 'ajout' | 'modification';
}) => {
  const [newEmail, setNewEmail] = useState<string>();
  const [newMdp, setNewMdp] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string | undefined>(selectedVendeur.date_embauche);
  const [newNom, setNewNom] = useState(selectedVendeur.nom);
  const [newPrenom, setNewPrenom] = useState(selectedVendeur.prenom);
  const [newTemps, setNewTemps] = useState<'partiel' | 'plein'>(selectedVendeur.temps);
  const router = useRouter();
  const params = useParams();
  const handleUpdateVendeur = async () => {
    if (!newNom || !newPrenom || !newTemps || !selectedDate) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    const data = {
      nom: newNom,
      prenom: newPrenom,
      temps: newTemps,
      date_embauche: selectedDate,
    };
    const isUpdated = await updateRowWhere(data, 'vendeurs', 'id_vendeur', selectedVendeur.id_vendeur);
    setDialogOpen(false);
    if (isUpdated) {
      toast.success('Vendeur modifié avec succès');
    } else {
      toast.error('Erreur lors de la modification du vendeur');
    }
    router.refresh();
  };

  const handleCreateVendeur = async () => {
    if (!newEmail || !newMdp || !newNom || !newPrenom || !newTemps || !selectedDate) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    const isCreated = await createVendeur(
      newEmail,
      newMdp,
      newNom,
      newPrenom,
      newTemps,
      params.id_boutique as string,
      selectedDate
    );
    setDialogOpen(false);
    if (isCreated) {
      toast.success('Vendeur ajouté avec succès');
    } else {
      toast.error("Erreur lors de l'ajout du vendeur");
    }
    router.refresh();
  };

  const isDisabled = () => {
    if (typeAction === 'ajout') {
      return !newEmail || !newMdp || !newNom || !newPrenom || !newTemps || !selectedDate;
    } else {
      return !newNom || !newPrenom || !newTemps || !selectedDate;
    }
  };

  return (
    <Dialog open={dialogOpen}>
      <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>
            {typeAction === 'modification' && `Modifier le profil de ${selectedVendeur.prenom} ${selectedVendeur.nom}`}
            {typeAction === 'ajout' && 'Ajouter un vendeur'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {typeAction === 'ajout' && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  placeholder="Email"
                  id="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mdp" className="text-right">
                  Mot de passe
                </Label>
                <Input
                  placeholder="Mot de passe"
                  id="mdp"
                  value={newMdp}
                  onChange={(e) => setNewMdp(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nom" className="text-right">
              Nom
            </Label>
            <Input
              placeholder="Nom"
              id="nom"
              value={newNom}
              onChange={(e) => setNewNom(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prenom" className="text-right">
              Prénom
            </Label>
            <Input
              id="prenom"
              placeholder="Prénom"
              value={newPrenom}
              onChange={(e) => setNewPrenom(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="temps" className="text-right">
              Temps
            </Label>
            <Select defaultValue={newTemps} onValueChange={(value) => setNewTemps(value as 'partiel' | 'plein')}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={<span className="opacity-80">Plein/Partiel</span>} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plein">Plein</SelectItem>
                <SelectItem value="partiel">Partiel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date_embauche" className="text-right">
              Date d'embauche
            </Label>
            <DatePicker date={selectedDate} setDate={setSelectedDate} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
          <Button
            disabled={isDisabled()}
            onClick={() => {
              if (typeAction === 'ajout') {
                handleCreateVendeur();
              } else {
                handleUpdateVendeur();
              }
            }}
          >
            {typeAction === 'ajout' ? 'Ajouter' : 'Modifier'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateVendeur;
