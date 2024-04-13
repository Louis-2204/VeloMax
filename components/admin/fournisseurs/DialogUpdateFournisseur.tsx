'use client';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useState } from 'react';
import { FournisseurTableau, Vendeur } from '@/types/entities';
import { updateRowWhere } from '@/utils/updateRowWhere';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createVendeur } from '@/utils/createVendeur';
import { useParams } from 'next/navigation';
const DialogUpdateFournisseur = ({
  selectedFournisseur,
  dialogOpen,
  setDialogOpen,
  is_admin,
}: {
  selectedFournisseur: FournisseurTableau;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  is_admin: boolean;
}) => {
  const [newNomEntreprise, setNewNomEntreprise] = useState(selectedFournisseur.nom_entreprise);
  const [newNomContact, setNewNomContact] = useState(selectedFournisseur.nom_contact);
  const [newSiret, setNewSiret] = useState(selectedFournisseur.siret);
  const [newAdresse, setNewAdresse] = useState(selectedFournisseur.adresse);
  const [newVille, setNewVille] = useState(selectedFournisseur.ville);
  const [newCp, setNewCp] = useState(selectedFournisseur.cp);
  const [newLibelle, setNewLibelle] = useState(selectedFournisseur.libelle);
  const router = useRouter();
  const params = useParams();
  const handleUpdateFournisseur = async () => {
    if (isDisabled()) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    const data = {
      nom_entreprise: newNomEntreprise,
      nom_contact: newNomContact,
      adresse: newAdresse,
      ville: newVille,
      cp: newCp,
      libelle: newLibelle,
    };
    const isUpdated = await updateRowWhere(data, 'fournisseurs', 'id_fournisseur', selectedFournisseur.id_fournisseur);
    setDialogOpen(false);
    if (isUpdated) {
      toast.success('Fournisseur modifié avec succès');
    } else {
      toast.error('Erreur lors de la modification du fournisseur');
    }
    router.refresh();
  };

  const isDisabled = () => {
    return !newNomEntreprise || !newNomContact || !newAdresse || !newVille || !newCp || !newSiret;
  };

  return (
    <Dialog open={dialogOpen}>
      <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>Modifier le profil de {selectedFournisseur.nom_entreprise}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nom" className="text-right">
              Nom de l'entreprise
            </Label>
            <Input
              placeholder="Nom de l'entreprise"
              id="nom_entreprise"
              value={newNomEntreprise}
              onChange={(e) => setNewNomEntreprise(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prenom" className="text-right">
              Nom du contact
            </Label>
            <Input
              id="nom_contact"
              placeholder="Nom du contact"
              value={newNomContact}
              onChange={(e) => setNewNomContact(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="siret" className="text-right">
              Siret
            </Label>
            <Input
              id="siret"
              placeholder="Siret"
              value={newSiret}
              onChange={(e) => setNewSiret(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="adresse" className="text-right">
              Adresse
            </Label>
            <Input
              placeholder="Adresse"
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
            <Input
              placeholder="Ville"
              id="ville"
              value={newVille}
              onChange={(e) => setNewVille(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cp" className="text-right">
              Code postal
            </Label>
            <Input
              placeholder="Code postal"
              id="cp"
              value={newCp}
              onChange={(e) => setNewCp(e.target.value)}
              className="col-span-3"
            />
          </div>
          {is_admin && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="temps" className="text-right">
                Temps
              </Label>
              <Select
                defaultValue={newLibelle}
                onValueChange={(value) => setNewLibelle(value as 'Très bon' | 'Bon' | 'Moyen' | 'Mauvais')}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={<span className="opacity-80">Libelle</span>} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Très bon">Très bon</SelectItem>
                  <SelectItem value="Bon">Bon</SelectItem>
                  <SelectItem value="Moyen">Moyen</SelectItem>
                  <SelectItem value="Mauvais">Mauvais</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
          <Button
            disabled={isDisabled()}
            onClick={() => {
              handleUpdateFournisseur();
            }}
          >
            Modifier
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateFournisseur;
