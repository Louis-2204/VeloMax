import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useState } from 'react';
import { Vendeur } from '@/types/entities';
import { updateVendeur } from '@/utils/updateVendeur';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
const DialogUpdateVendeur = ({
  selectedVendeur,
  dialogOpen,
  setDialogOpen,
}: {
  selectedVendeur: Vendeur;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(selectedVendeur.date_embauche);
  const [newNom, setNewNom] = useState(selectedVendeur.nom);
  const [newPrenom, setNewPrenom] = useState(selectedVendeur.prenom);
  const [newTemps, setNewTemps] = useState<'partiel' | 'plein'>(selectedVendeur.temps);
  const router = useRouter();
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
    const isUpdated = await updateVendeur(data, selectedVendeur.id_vendeur);
    setDialogOpen(false);
    if (isUpdated) {
      toast.success('Vendeur modifié avec succès');
    } else {
      toast.error('Erreur lors de la modification du vendeur');
    }
    router.refresh();
  };

  return (
    <Dialog open={dialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Modifier le profil de {selectedVendeur.prenom} {selectedVendeur.nom}
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
          <Button disabled={!newNom || !newPrenom || !newTemps || !selectedDate} onClick={() => handleUpdateVendeur()}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateVendeur;
