import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useState } from 'react';
import { ParticulierTableau, Piece } from '@/types/entities';
import { updateRowWhere } from '@/utils/updateRowWhere';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { createParticulier } from '@/utils/createParticulier';
import { createPiece } from '@/utils/createPiece';
const DialogPiece = ({
  selectedPiece,
  dialogOpen,
  setDialogOpen,
  typeAction,
}: {
  selectedPiece: Piece;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  typeAction: 'ajout' | 'modification';
}) => {
  const [newNom, setNewNom] = useState(selectedPiece.nom);
  const [newDescription, setNewDescription] = useState(selectedPiece.description);
  const [newPrix, setNewPrix] = useState(selectedPiece.prix_unitaire);
  const [newType, setNewType] = useState(selectedPiece.type);
  const [newDateIntroMarche, setNewDateIntroMarche] = useState<string | undefined>(
    selectedPiece.date_introduction_marche
  );
  const [newDateDiscontinuation, setNewDateDiscontinuation] = useState<string | undefined>(
    selectedPiece.date_discontinuation_production
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
    const isUpdated = await updateRowWhere(data, 'pieces', 'id_piece', selectedPiece.id_piece);
    setDialogOpen(false);
    if (isUpdated) {
      toast.success('Pièce modifiée avec succès');
    } else {
      toast.error('Erreur lors de la modification de la pièce');
    }
    router.refresh();
  };

  const handleAddParticulier = async () => {
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

    const isCreated = await createPiece(data);
    setDialogOpen(false);
    if (isCreated) {
      toast.success('Pièce ajoutée avec succès');
    } else {
      toast.error("Erreur lors de l'ajout de la pièce");
    }
    router.refresh();
  };

  const isDisabled = () => {
    return !newNom || !newDescription || !newPrix || !newType || !newDateIntroMarche;
  };

  return (
    <Dialog open={dialogOpen}>
      <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>
            {typeAction === 'modification' && `Modifier la pièce ${selectedPiece.nom}`}
            {typeAction === 'ajout' && `Ajouter une pièce`}
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
            <Select name="type" onValueChange={(value: Piece['type']) => setNewType(value)} value={newType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={<span className="opacity-80">Séléctionner un type</span>} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cadre">Cadre</SelectItem>
                <SelectItem value="Guidon">Guidon</SelectItem>
                <SelectItem value="Freins">Freins</SelectItem>
                <SelectItem value="Selle">Selle</SelectItem>
                <SelectItem value="Dérailleur Avant">Dérailleur Avant</SelectItem>
                <SelectItem value="Dérailleur Arrière">Dérailleur Arrière</SelectItem>
                <SelectItem value="Roue avant">Roue avant</SelectItem>
                <SelectItem value="Roue arrière">Roue arrière</SelectItem>
                <SelectItem value="Réflecteurs">Réflecteurs</SelectItem>
                <SelectItem value="Pédalier">Pédalier</SelectItem>
                <SelectItem value="Ordinateur">Ordinateur</SelectItem>
                <SelectItem value="Panier">Panier</SelectItem>
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

export default DialogPiece;
