import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useState } from 'react';
import { ParticulierTableau } from '@/types/entities';
import { updateRowWhere } from '@/utils/updateRowWhere';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { createParticulier } from '@/utils/createParticulier';
const DialogUpdateParticulier = ({
  selectedParticulier,
  dialogOpen,
  setDialogOpen,
  typeAction,
}: {
  selectedParticulier: ParticulierTableau;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  typeAction: 'ajout' | 'modification';
}) => {
  const [newEmail, setNewEmail] = useState<string>();
  const [newMdp, setNewMdp] = useState<string>();
  const [newNom, setNewNom] = useState(selectedParticulier.nom);
  const [newPrenom, setNewPrenom] = useState(selectedParticulier.prenom);
  const [newAdresse, setNewAdresse] = useState(selectedParticulier.adresse);
  const [newVille, setNewVille] = useState(selectedParticulier.ville);
  const [newCp, setNewCp] = useState(selectedParticulier.cp);
  const [newProvince, setNewProvince] = useState(selectedParticulier.province);
  const [newTelephone, setNewTelephone] = useState(selectedParticulier.telephone);
  const [newFideloDate, setNewFideloDate] = useState<string>();
  const [newFidelo, setNewFidelo] = useState<string>();
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

  const handleAddParticulier = async () => {
    if (
      !newEmail ||
      !newMdp ||
      !newNom ||
      !newPrenom ||
      !newAdresse ||
      !newVille ||
      !newCp ||
      !newProvince ||
      !newTelephone
    ) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (!newFidelo && newFideloDate) {
      toast.error('Veuillez sélectionner un fidélo');
      return;
    }

    if (newFidelo && !newFideloDate) {
      toast.error('Veuillez sélectionner une date de souscription');
      return;
    }

    const data = {
      email: newEmail,
      password: newMdp,
      nom: newNom,
      prenom: newPrenom,
      adresse: newAdresse,
      ville: newVille,
      cp: newCp,
      province: newProvince,
      telephone: newTelephone,
      fidelo: newFidelo,
      date_souscription: newFideloDate,
    };

    const isCreated = await createParticulier(data);
    setDialogOpen(false);
    if (isCreated) {
      toast.success('Client ajouté avec succès');
    } else {
      toast.error("Erreur lors de l'ajout du client");
    }
    router.refresh();
  };

  const isDisabled = () => {
    if (typeAction === 'ajout') {
      return (
        !newNom ||
        !newPrenom ||
        !newAdresse ||
        !newVille ||
        !newCp ||
        !newProvince ||
        !newTelephone ||
        !newEmail ||
        !newMdp
      );
    } else {
      return !newNom || !newPrenom || !newAdresse || !newVille || !newCp || !newProvince || !newTelephone;
    }
  };

  return (
    <Dialog open={dialogOpen}>
      <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>
            {typeAction === 'modification' &&
              `Modifier le profil de ${selectedParticulier.prenom} ${selectedParticulier.nom}`}
            {typeAction === 'ajout' && `Ajouter un client`}
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
                  id="email"
                  placeholder="Email"
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
                  id="mdp"
                  placeholder="Mot de passe"
                  type="password"
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
            <Label htmlFor="adresse" className="text-right">
              Adresse
            </Label>
            <Input
              id="adresse"
              placeholder="Adresse"
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="province" className="text-right">
              Province
            </Label>
            <Input
              id="province"
              placeholder="Province"
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
              placeholder="Téléphone"
              value={newTelephone}
              onChange={(e) => setNewTelephone(e.target.value)}
              className="col-span-3"
            />
          </div>
          {typeAction === 'ajout' && (
            <>
              <Separator />
              <span className="w-full text-center text-xs opacity-35">Optionnel</span>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Fidélo" className="text-right">
                  Fidélo
                </Label>
                <Select name="Fidélo" onValueChange={(value) => setNewFidelo(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={<span className="opacity-80">Séléctionner un fidélo</span>} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fidélo">Fidélo</SelectItem>
                    <SelectItem value="Fidélo Or">Fidélo Or</SelectItem>
                    <SelectItem value="Fidélo Platine">Fidélo Platine</SelectItem>
                    <SelectItem value="Fidélo Max">Fidélo Max</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date_embauche" className="text-right">
                  Date de souscription
                </Label>
                <DatePicker date={newFideloDate} setDate={setNewFideloDate} />
              </div>
            </>
          )}
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

export default DialogUpdateParticulier;
