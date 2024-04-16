import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useState } from 'react';
import { Velo } from '@/types/entities';
import { updateRowWhere } from '@/utils/updateRowWhere';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createVelo } from '@/utils/createVelo';
const DialogVelo = ({
  selectedVelo,
  dialogOpen,
  setDialogOpen,
  typeAction,
}: {
  selectedVelo: Velo;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  typeAction: 'ajout' | 'modification';
}) => {
  const [newNom, setNewNom] = useState(selectedVelo.nom);
  const [newDescription, setNewDescription] = useState(selectedVelo.description);
  const [newGrandeur, setNewGrandeur] = useState(selectedVelo.description);
  const [newPrix, setNewPrix] = useState(selectedVelo.prix_unitaire);
  const [newType, setNewType] = useState(selectedVelo.type);
  const [newDateIntroMarche, setNewDateIntroMarche] = useState<string | undefined>(
    selectedVelo.date_introduction_marche
  );
  const [newDateDiscontinuation, setNewDateDiscontinuation] = useState<string | undefined>(
    selectedVelo.date_discontinuation_production
  );

  const router = useRouter();
  const handleUpdateParticulier = async () => {
    if (!newNom || !newDescription || !newPrix || !newType || !newDateIntroMarche) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    const data = {
      nom: newNom,
      description: newDescription,
      prix_unitaire: newPrix,
      type: newType,
      date_introduction_marche: newDateIntroMarche,
      date_discontinuation_production: newDateDiscontinuation,
    };
    const isUpdated = await updateRowWhere(data, 'vélos', 'id_velo', selectedVelo.id_velo);
    setDialogOpen(false);
    if (isUpdated) {
      toast.success('Vélo modifié avec succès');
    } else {
      toast.error('Erreur lors de la modification du vélo');
    }
    router.refresh();
  };

  const handleAddParticulier = async () => {
    if (!newNom || !newDescription || !newPrix || !newType || !newDateIntroMarche || !newGrandeur) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const data = {
      nom: newNom,
      description: newDescription,
      prix_unitaire: newPrix,
      grandeur: newGrandeur,
      type: newType,
      date_introduction_marche: newDateIntroMarche,
      date_discontinuation_production: newDateDiscontinuation,
    };

    const isCreated = await createVelo(data);
    setDialogOpen(false);
    if (isCreated) {
      toast.success('Vélo ajouté avec succès');
    } else {
      toast.error("Erreur lors de l'ajout du vélo");
    }
    router.refresh();
  };

  const isDisabled = () => {
    return !newNom || !newDescription || !newPrix || !newType || !newDateIntroMarche || !newGrandeur;
  };

  return (
    <Dialog open={dialogOpen}>
      <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>
            {typeAction === 'modification' && `Modifier le vélo ${selectedVelo.nom}`}
            {typeAction === 'ajout' && `Ajouter un vélo`}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="grandeur" className="text-right">
              Grandeur
            </Label>
            <Input
              id="grandeur"
              placeholder="Grandeur"
              value={newGrandeur}
              onChange={(e) => setNewGrandeur(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prix" className="text-right">
              Prix unitaire
            </Label>
            <Input
              id="prix"
              placeholder="Prix unitaire"
              value={newPrix}
              type="number"
              onChange={(e) => setNewPrix(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select name="type" onValueChange={(value: Velo['type']) => setNewType(value)} value={newType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={<span className="opacity-80">Séléctionner un type</span>} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BMX">BMX</SelectItem>
                <SelectItem value="VTT">VTT</SelectItem>
                <SelectItem value="Vélo de course">Vélo de course</SelectItem>
                <SelectItem value="Classique">Classique</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date_intro_marche" className="text-right">
              Date introduction marché
            </Label>
            <DatePicker date={newDateIntroMarche} setDate={setNewDateIntroMarche} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date_discontinuation" className="text-right">
              Date discontinuation production (optionnel)
            </Label>
            <DatePicker date={newDateDiscontinuation} setDate={setNewDateDiscontinuation} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
          <Button
            disabled={isDisabled()}
            onClick={() => {
              if (typeAction === 'ajout') {
                handleAddParticulier();
              } else if (typeAction === 'modification') {
                handleUpdateParticulier();
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

export default DialogVelo;
