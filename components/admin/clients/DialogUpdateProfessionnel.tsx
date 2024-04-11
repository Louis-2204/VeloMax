import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useState } from 'react';
import { ParticulierTableau, Professionnel } from '@/types/entities';
import { updateRowWhere } from '@/utils/updateRowWhere';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createProfessionnel } from '@/utils/createProfessionnel';
const DialogUpdateProfessionnel = ({
  selectedProfessionnel,
  dialogOpen,
  setDialogOpen,
  typeAction,
}: {
  selectedProfessionnel: Professionnel;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  typeAction: 'ajout' | 'modification';
}) => {
  const [newEmail, setNewEmail] = useState<string>();
  const [newMdp, setNewMdp] = useState<string>();
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

  const handleAddProfessionnel = async () => {
    if (
      !newEmail ||
      !newMdp ||
      !newNomCompany ||
      !newNomContact ||
      !newAdresse ||
      !newVille ||
      !newCp ||
      !newProvince ||
      !newTelephone
    ) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const data = {
      email: newEmail,
      password: newMdp,
      nom_compagnie: newNomCompany,
      nom_contact: newNomContact,
      adresse: newAdresse,
      ville: newVille,
      cp: newCp,
      province: newProvince,
      telephone: newTelephone,
    };

    const isCreated = await createProfessionnel(data);
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
        !newEmail ||
        !newMdp ||
        !newNomCompany ||
        !newNomContact ||
        !newAdresse ||
        !newVille ||
        !newCp ||
        !newProvince ||
        !newTelephone
      );
    }
    return !newNomCompany || !newNomContact || !newAdresse || !newVille || !newCp || !newProvince || !newTelephone;
  };

  return (
    <Dialog open={dialogOpen}>
      <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>
            {typeAction === 'modification' && ` Modifier le profil de ${selectedProfessionnel.nom_compagnie}`}
            {typeAction === 'ajout' && 'Ajouter un client'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {
            // Si on est en mode ajout, on affiche les champs email et mot de passe
            typeAction === 'ajout' && (
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
                    value={newMdp}
                    onChange={(e) => setNewMdp(e.target.value)}
                    type="password"
                    className="col-span-3"
                  />
                </div>
              </>
            )
          }
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nom_company" className="text-right">
              Nom de la compagnie
            </Label>
            <Input
              id="nom_company"
              placeholder="Nom de la compagnie"
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
              placeholder="Nom du contact"
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
              id="cp"
              placeholder="Code postal"
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
        </div>
        <DialogFooter>
          <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
          <Button
            disabled={isDisabled()}
            onClick={() => {
              if (typeAction === 'ajout') handleAddProfessionnel();
              else handleUpdateProfessionnel();
            }}
          >
            {typeAction === 'ajout' ? 'Ajouter' : 'Modifier'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateProfessionnel;
